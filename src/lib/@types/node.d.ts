type ReadonlyWeakMap<K extends object, V> = Pick<WeakMap<K, V>, `get` | `has`>
