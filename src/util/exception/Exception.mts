export class Exception extends Error {
  public constructor(message: string, ...args: any[]) {
    const finalMessage =
      message +
      (args.length > 0
        ? (message.endsWith(`.`) ? `` : `.`) + args.join(` `)
        : ``)
    super(finalMessage)
    this.name = this.constructor.name

    Error.captureStackTrace(this, this.constructor)
  }
}
