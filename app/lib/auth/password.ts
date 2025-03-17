import { createHash, randomBytes } from 'crypto';

export async function hashPassword(password: string): Promise<string> {
  // In a real app, use bcrypt or argon2 - this is a simplified version
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256')
    .update(password + salt)
    .digest('hex');
  return `${salt}:${hash}`;
}

export async function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
): Promise<boolean> {
  const [salt, hash] = storedPassword.split(':');
  const suppliedHash = createHash('sha256')
    .update(suppliedPassword + salt)
    .digest('hex');
  return hash === suppliedHash;
} 