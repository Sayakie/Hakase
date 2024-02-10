// # Credits to the Vercel Team for the original implementation
// # vercel/next.js, MIT License

// the minimum number of operations required to convert string a to string b.
export function minDistance(a: string, b: string, threshold: number): number {
  const m = a.length;
  const n = b.length;

  if (m < n) {
    return minDistance(b, a, threshold);
  }

  if (n === 0) {
    return m;
  }

  let previousRow = Array.from({ length: n + 1 }, (_, i) => i);

  for (let i = 0; i < m; i++) {
    const s1 = a[i];
    const currentRow = [i + 1];

    for (let j = 0; j < n; j++) {
      const s2 = b[j];
      // @ts-expect-error - we know it's not empty
      const insertions = previousRow[j + 1] + 1;
      // @ts-expect-error - we know it's not empty
      const deletions = currentRow[j] + 1;
      // @ts-expect-error - we know it's not empty
      const substitutions = previousRow[j] + Number(s1 !== s2);

      currentRow.push(Math.min(insertions, deletions, substitutions));
    }
    previousRow = currentRow;
  }

  return previousRow[previousRow.length - 1];
}
