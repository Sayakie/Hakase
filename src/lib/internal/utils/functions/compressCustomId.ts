import { brotliCompressSync } from "node:zlib";
import { serialize } from "binarytf";

export function compressCustomId<T>(params: T): string {
  const serializedId = brotliCompressSync(serialize<T>(params)).toString(
    "binary",
  );

  return serializedId;
}
