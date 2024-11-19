import CryptoJS from 'crypto-js'

export class CryptoEncoder {
  // localStorage에서 솔트를 가져오거나, 없으면 생성하여 저장
  private static getSalt(): string {
    let salt = localStorage.getItem('hash_salt') // localStorage에서 솔트 확인
    if (!salt) {
      salt = CryptoEncoder.generateSalt() // 솔트 생성
      localStorage.setItem('hash_salt', salt) // localStorage에 저장
    }
    return salt
  }

  // 무작위 솔트 생성
  private static generateSalt(): string {
    return CryptoJS.lib.WordArray.random(16).toString() // 16바이트 랜덤 솔트
  }

  // 비밀번호 해싱
  public static async hash(data: string): Promise<string> {
    if (!data || typeof data !== 'string') {
      throw new Error('Invalid data: Password must be a non-empty string.')
    }

    const salt = this.getSalt() // 솔트 가져오기
    const hashedData = CryptoJS.SHA256(data + salt).toString()
    return `${hashedData}:${salt}` // 해시와 솔트를 함께 반환
  }

  // 비밀번호 비교
  public static async compare(data: string, stored: string): Promise<boolean> {
    if (!data || typeof data !== 'string' || !stored || typeof stored !== 'string') {
      throw new Error('Invalid input: Both data and stored strings must be non-empty.')
    }

    const [storedHash, salt] = stored.split(':')
    if (!storedHash || !salt) {
      throw new Error('Invalid stored format: Expected "hash:salt" format.')
    }

    const hashedData = CryptoJS.SHA256(data + salt).toString()
    return hashedData === storedHash
  }
}
