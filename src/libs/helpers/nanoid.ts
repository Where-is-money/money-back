import { customAlphabet } from 'nanoid';

export function CustomNanoId() {
  return customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 10)();
}
