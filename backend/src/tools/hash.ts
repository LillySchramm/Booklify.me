import { compare, hash } from 'bcrypt';

const SALT_ROUNDS = 8;

export async function secureHash(token: string): Promise<string> {
    return hash(token, SALT_ROUNDS);
}

export async function checkHash(hash: string, token: string): Promise<boolean> {
    return compare(token, hash);
}
