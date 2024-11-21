import { hashSync, compareSync, genSaltSync } from 'bcrypt-ts'

export class BcryptEncoder {
  // 비밀번호 해싱
  public static hash(rawPassword: string): string {
    if (!rawPassword || typeof rawPassword !== 'string') {
      throw new Error('Invalid input: Password must be a non-empty string.')
    }

    const salt = genSaltSync(import.meta.env.VITE_APP_BCRYPT_COST || 12)
    return hashSync(rawPassword, salt)
  }

  // 비밀번호 비교
  public static compare(rawPassword: string, storedPassword: string): boolean {
    if (!rawPassword || typeof rawPassword !== 'string' || !storedPassword || typeof storedPassword !== 'string') {
      throw new Error('Invalid input: Both raw password and stored hash must be non-empty strings.')
    }

    // bcrypt의 compareSync는 솔트를 포함한 저장된 해시와 원본 비밀번호를 비교
    return compareSync(rawPassword, storedPassword)
  }
}
