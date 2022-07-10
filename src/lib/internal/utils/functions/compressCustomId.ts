import { serialize } from 'binarytf'
import { brotliCompressSync } from 'node:zlib'

export function compressCustomId<T>(params: T): string {
  const serializedId = brotliCompressSync(serialize<T>(params)).toString(`binary`)

  if (serializedId.length > 80) {
  }

  return serializedId
}
