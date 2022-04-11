declare module 'merge-options' {
  function mergeOptions<A, B>(arg1: A, arg2: B): A & B
  function mergeOptions<A, B, C>(arg1: A, arg2: B, arg3: C): A & B & C
  function mergeOptions<A, B, C, D>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D
  ): A & B & C & D
  function mergeOptions<A, B, C, D, E>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E
  ): A & B & C & D & E
  function mergeOptions<A, B, C, D, E, F>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E,
    arg6: F
  ): A & B & C & D & E & F
  function mergeOptions<A, B, C, D, E, F, G>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E,
    arg6: F,
    arg7: G
  ): A & B & C & D & E & F & G
  function mergeOptions<A, B, C, D, E, F, G, H>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E,
    arg6: F,
    arg7: G,
    arg8: H
  ): A & B & C & D & E & F & G & H
  function mergeOptions<A, B, C, D, E, F, G, H, I>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E,
    arg6: F,
    arg7: G,
    arg8: H,
    arg9: I
  ): A & B & C & D & E & F & G & H & I
  function mergeOptions<A, B, C, D, E, F, G, H, I, J>(
    arg1: A,
    arg2: B,
    arg3: C,
    arg4: D,
    arg5: E,
    arg6: F,
    arg7: G,
    arg8: H,
    arg9: I,
    arg10: J
  ): A & B & C & D & E & F & G & H & I & J

  export default mergeOptions
}
