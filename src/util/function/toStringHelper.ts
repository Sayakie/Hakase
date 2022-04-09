class ToStringHelper {
  private readonly holders: Map<string, string> = new Map()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(private readonly target: any) {}

  /**
   * Adds a name/value pair to the formatted output in `name=value` format.
   *
   * @param {string} name The name of the property to add
   * @param {string | number | boolean} value The value
   * @returns {ToStringHelper} This helper for chaining
   */
  public add(name: string, value: string | number | boolean): ToStringHelper {
    if (name === ``) {
      throw new Error(`Name cannot be empty`)
    }

    if (typeof value === `string`) {
      this.holders.set(name, value)
    } else if (typeof value === `number`) {
      this.holders.set(name, String(value))
    } else if (typeof value === `boolean`) {
      this.holders.set(name, String(value))
    }

    return this
  }

  public toString(): string {
    const holders = this.holders.entries()
    const output = []

    output.push([this.target.constructor.name, `{`])
    for (const [name, value] of holders) {
      output.push(`${name}=${value}`)

      if (name !== `__proto__`) {
        output.push(`, `)
      }
    }
    output.push(`}`)

    return output.join(``)
  }
}

export function toStringHelper(target: any): ToStringHelper {
  return new ToStringHelper(target?.constructor.name ?? target)
}
