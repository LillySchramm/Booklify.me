// Adapted version of https://github.com/nestjs/schedule with some changes:
// 1. The cron timings can be defined in the config file
// 2. The cron jobs can be enabled/disabled in the config file
// 3. Adds a mechanism to avoid running the same cron job twice at the same time if the previous run is still running
// 4. More logging and debug information

import {
    Injectable,
    Logger,
    OnApplicationBootstrap,
    OnApplicationShutdown,
    OnModuleInit,
    SetMetadata,
    applyDecorators,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronCallback, CronJob, CronJobParams } from 'cron';
import * as config from 'config';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export const INTERNAL_CRON = 'INTERNAL_CRON';

export function Cron(): MethodDecorator {
    return applyDecorators(SetMetadata(INTERNAL_CRON, 'true'));
}

type CronOptions = {
    name: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
type TargetHost = { target: Function };
type RefHost<T> = { ref?: T };

type CronOptionsHost = {
    options: CronOptions & Record<'cronTime', CronJobParams['cronTime']>;
};

type CronJobOptions = TargetHost & CronOptionsHost & RefHost<CronJob>;

@Injectable()
export class CronService
    implements OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit
{
    private readonly logger = new Logger(CronService.name);
    private readonly cronJobs: Record<string, CronJobOptions> = {};
    private readonly cronJobsRunning: Record<string, boolean> = {};

    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly metadataScanner: MetadataScanner,
        private readonly discoveryService: DiscoveryService,
        private readonly reflector: Reflector,
    ) {}

    onModuleInit() {
        this.explore();
    }

    onApplicationBootstrap() {
        const cronKeys = Object.keys(this.cronJobs);
        cronKeys.forEach((key) => {
            if (!this.isConJobConfigured(key)) {
                this.logger.error(`Cron '${key}' not found in config!`);
                return;
            }

            if (!this.isCronJobEnabled(key)) {
                this.logger.warn(`Cron '${key}' is disabled!`);
                return;
            }

            const { options, target } = this.cronJobs[key];
            const cronJob = CronJob.from({
                ...options,
                onTick: target as CronCallback<null, false>,
                start: true,
            });

            this.cronJobs[key].ref = cronJob;
            this.schedulerRegistry.addCronJob(key, cronJob);
        });
    }

    onApplicationShutdown() {
        Array.from(this.schedulerRegistry.getCronJobs().keys()).forEach((key) =>
            this.schedulerRegistry.deleteCronJob(key),
        );
    }

    isConJobConfigured(name: string): boolean {
        return config.has(`tasks.${name}`);
    }

    isCronJobEnabled(name: string): boolean {
        return config.get<boolean>(`tasks.${name}.enabled`);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    private getMetadata<T>(key: string, target: Function): T | undefined {
        const isObject =
            typeof target === 'object'
                ? target !== null
                : typeof target === 'function';

        return isObject ? this.reflector.get(key, target) : undefined;
    }

    public addCron(
        // eslint-disable-next-line @typescript-eslint/ban-types
        methodRef: Function,
        options: CronOptions & Record<'cronTime', CronJobParams['cronTime']>,
    ) {
        const name = options.name;
        this.cronJobs[name] = {
            target: methodRef,
            options,
        };

        this.logger.log(`Cron ${name} added with timing ${options.cronTime}!`);
    }

    explore() {
        const instanceWrappers: InstanceWrapper[] = [
            ...this.discoveryService.getControllers(),
            ...this.discoveryService.getProviders(),
        ];
        instanceWrappers.forEach((wrapper: InstanceWrapper) => {
            const { instance } = wrapper;

            if (!instance || !Object.getPrototypeOf(instance)) {
                return;
            }

            const processMethod = (name: string) =>
                this.lookupSchedulers(instance, name);

            this.metadataScanner
                .getAllMethodNames(Object.getPrototypeOf(instance))
                .forEach(processMethod);
        });
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    lookupSchedulers(instance: Record<string, Function>, key: string) {
        const isCron = this.reflector.get(INTERNAL_CRON, instance[key]);

        if (!isCron) {
            return;
        }

        if (!this.isConJobConfigured(key)) {
            this.logger.error(`Cron '${key}' not found in config!`);
            return;
        }

        const methodRef = instance[key];
        const cronMetadata: CronOptions & Record<'cronTime', string> = {
            cronTime: config.get<string>(`tasks.${key}.cron`),
            name: key,
        };
        const cronFn = this.wrapFunctionInTryCatchBlocks(
            methodRef,
            instance,
            key,
        );

        return this.addCron(cronFn, cronMetadata);
    }

    private wrapFunctionInTryCatchBlocks(
        // eslint-disable-next-line @typescript-eslint/ban-types
        methodRef: Function,
        instance: object,
        name: string,
    ) {
        return async (...args: unknown[]) => {
            if (this.cronJobsRunning[name]) {
                this.logger.warn(
                    `Cron '${name}' is still running, skipping this run!`,
                );
                return;
            }
            this.cronJobsRunning[name] = true;

            this.logger.debug(`Cron '${name}' started!`);
            const date = new Date();

            try {
                await methodRef.call(instance, ...args);
            } catch (error) {
                this.logger.error(error);
            }

            const duration = new Date().getTime() - date.getTime();
            this.logger.debug(`Cron '${name}' finished after ${duration}ms!`);

            this.cronJobsRunning[name] = false;
        };
    }
}
