import { randomBytes } from 'crypto';

const CHARSET64 =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-'.split(
        ''
    );
const CHARSET32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');

export function generateSaveRandomNumber(): number {
    // For some arcane reason does "2 ^ 32 - 1" not work

    return randomBytes(4).readUint32BE() / (4294967296 - 1);
}

function getRandomString(length: number, charset: string[]): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomValue = generateSaveRandomNumber();
        const maxIndex = charset.length - 1;
        result += charset[Math.round(maxIndex * randomValue)];
    }

    return result;
}

export function getRandomString32(length: number): string {
    return getRandomString(length, CHARSET32);
}
export function getRandomString64(length: number): string {
    return getRandomString(length, CHARSET64);
}
