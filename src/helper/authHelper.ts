export async function hashPassword(password: string): Promise<string> {
  const messageBytes = new TextEncoder().encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', messageBytes)
  const hashBytes = Array.from(new Uint8Array(hashBuffer))
  return hashBytes.map((byte) => byte.toString(16).padStart(2, '0')).join('')
}
