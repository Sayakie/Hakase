import { Result } from "@sapphire/result";
import { isNullish } from "@sapphire/utilities";
import type { LocaleString } from "discord-api-types/v10";
import Redis from "ioredis";

import type { Species } from "#lib/pokemon/Species.js";

export enum RedisKey {
  GetPokemon = "getPokemon",
}

export type RedisKeyQuery<K extends RedisKey> = K extends "getPokemon"
  ? Species
  : null;

export type RedisData<K extends RedisKey> = K extends "getPokemon"
  ? Species
  : null;

export class RedisClient extends Redis.default {
  public async fetch<K extends RedisKey>(
    key: K,
    query: RedisKeyQuery<K>,
    locale: LocaleString,
  ): Promise<RedisData<K> | null> {
    const result = await Result.fromAsync(async () => {
      const raw = await this.get(`${key}:${query}:${locale}`);

      if (isNullish(raw)) return raw;

      return JSON.parse(raw) as RedisData<K>;
    });

    return result.unwrapOr(null);
  }

  public async insert<K extends RedisKey>(
    key: K,
    query: RedisKeyQuery<K>,
    locale: LocaleString,
    data: unknown,
  ): Promise<"OK"> {
    return super.set(`${key}:${query}:${locale}`, JSON.stringify(data));
  }
}
