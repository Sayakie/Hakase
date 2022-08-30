import { default as Redis } from 'ioredis'

import type { Species } from '#lib/pokemon/Species.js'

export enum RedisKey {
  GetPokemon = `getPokemon`
}

export type RedisQuery<K extends RedisKey> = K extends `getPokemon` ? Species : null

export class RedisClient extends Redis.default {
  public async insert<K extends RedisKey>(
    key: K,
    query: RedisQuery<K>,
    data: unknown
  ): Promise<`OK`> {
    return super.set(`${key}:${query}`, JSON.stringify(data))
  }
}
