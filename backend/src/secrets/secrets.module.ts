import { Module } from '@nestjs/common';
import { SecretsService } from './secrets.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    providers: [SecretsService],
    exports: [SecretsService],
    imports: [PrismaModule],
})
export class SecretsModule {}
