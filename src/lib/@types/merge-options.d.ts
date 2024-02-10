declare module "merge-options" {
  function mergeOptions<T, O extends Partial<T> = Partial<T>, O0 extends O = O>(
    origin: T,
    override0: O0,
  ): T & O0;
  function mergeOptions<O0>(origin: unknown, override0: O0): O0;
  function mergeOptions<
    T,
    O extends Partial<T> = Partial<T>,
    O0 extends O = O,
    O1 extends O = O,
  >(origin: T, override0: O0, override1: O1): T & O0 & O1;
  function mergeOptions<O0, O1>(
    origin: unknown,
    override0: O0,
    override1: O1,
  ): O0 & O1;
  function mergeOptions<
    T,
    O extends Partial<T> = Partial<T>,
    O0 extends O = O,
    O1 extends O = O,
    O2 extends O = O,
  >(origin: T, override0: O0, override1: O1, override2: O2): T & O0 & O1 & O2;
  function mergeOptions<O0, O1, O2>(
    origin: unknown,
    override0: O0,
    override1: O1,
    override2: O2,
  ): O0 & O1 & O2;
  function mergeOptions<
    T,
    O extends Partial<T> = Partial<T>,
    O0 extends O = O,
    O1 extends O = O,
    O2 extends O = O,
    O3 extends O = O,
  >(
    origin: T,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
  ): T & O0 & O1 & O2 & O3;
  function mergeOptions<O0, O1, O2, O3>(
    origin: unknown,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
  ): O0 & O1 & O2 & O3;
  function mergeOptions<
    T,
    O extends Partial<T> = Partial<T>,
    O0 extends O = O,
    O1 extends O = O,
    O2 extends O = O,
    O3 extends O = O,
    O4 extends O = O,
  >(
    origin: T,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
    override4: O4,
  ): T & O0 & O1 & O2 & O3 & O4;
  function mergeOptions<O0, O1, O2, O3, O4>(
    origin: unknown,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
    override4: O4,
  ): O0 & O1 & O2 & O3 & O4;
  function mergeOptions<
    T,
    O extends Partial<T> = Partial<T>,
    O0 extends O = O,
    O1 extends O = O,
    O2 extends O = O,
    O3 extends O = O,
    O4 extends O = O,
    O5 extends O = O,
  >(
    origin: T,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
    override4: O4,
    override5: O5,
  ): T & O0 & O1 & O2 & O3 & O4 & O5;
  function mergeOptions<O0, O1, O2, O3, O4, O5>(
    origin: unknown,
    override0: O0,
    override1: O1,
    override2: O2,
    override3: O3,
    override4: O4,
    override5: O5,
  ): O0 & O1 & O2 & O3 & O4 & O5;

  function mergeOptions<R, T>(origin: T, ...overrides: unknown[]): R;

  export default mergeOptions;
}
