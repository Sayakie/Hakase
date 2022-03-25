import type { If } from 'discord.js'

/**
 * A readonly map with a typed key and value.
 *
 * @template K The key type
 * @template V The value type
 * @template Owned Whether the key has
 */
export interface ReadonlyTypedMap<K, V, Owned extends boolean = boolean>
  extends ReadonlyMap<K, V> {
  has(key: K): this is ReadonlyTypedMap<K, V, true>

  get(key: K): If<Owned, V, undefined>
}

/**
 * A map with a typed key and value.
 *
 * @template K The key type
 * @template V The value type
 * @template Owned Whether the key has
 */
export class TypedMap<K, V, Owned extends boolean = boolean> extends Map<K, V> {
  public has(key: K): this is TypedMap<K, V, true> {
    return super.has(key)
  }

  public get(key: K): If<Owned, V, undefined> {
    return super.get(key) as If<Owned, V, undefined>
  }
}
