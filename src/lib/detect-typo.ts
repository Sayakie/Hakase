// # Credits to the Vercel Team for the original implementation
// # vercel/next.js, MIT License

import { minDistance } from "./min-distance.js";

export function detectTypo(
  input: string,
  options: string[],
  threshold = 2,
): string | null {
  const potentialTypos = options
    .map((o) => ({
      distance: minDistance(o, input, threshold),
      option: o,
    }))
    .filter(({ distance }) => distance <= threshold && distance > 0)
    .sort((a, b) => a.distance - b.distance);

  if (potentialTypos.length) {
    // @ts-expect-error - we know it's not empty
    return potentialTypos[0].option;
  }

  return null;
}
