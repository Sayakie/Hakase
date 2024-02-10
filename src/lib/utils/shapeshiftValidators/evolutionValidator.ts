import { s } from "@sapphire/shapeshift";
import { toTitleCase } from "@sapphire/utilities";

import {
  StatusValidator,
  TypeValidator,
  UpperCasedGenderValidator,
  UpperCasedNatureValidator,
  UpperCasedTimeValidator,
  UpperCasedWeatherValidator,
} from "#lib/utils/shapeshiftValidators/sharedValidationConstant.js";

export const evolutionValidator = s.array(
  s.object({
    conditions: s.array(
      s.union(
        s.object({
          evoConditionType: s.literal("evolutionScroll"),
          evolutionScroll: s.enum("DARKNESS", "WATERS"),
          maxRangeSquared: s.number.positive.lessThanOrEqual(64),
        }).strict,
        s.object({
          evoConditionType: s.literal("time"),
          time: UpperCasedTimeValidator.transform(toTitleCase),
        }).strict,
        s.object({
          evoConditionType: s.literal("friendship"),
          friendship: s.number.positive.lessThanOrEqual(255),
        }).strict,
        s.object({
          biomes: s.array(s.string),
          evoConditionType: s.literal("biome"),
        }).strict,
        s.object({
          attackIndex: s.number.positive.safeInt,
          evoConditionType: s.literal("move"),
        }).strict,
        s.object({
          evoConditionType: s.literal("nature"),
          natures: UpperCasedNatureValidator,
        }).strict,
        s.object({
          evoConditionType: s.literal("ores"),
          ores: s.number,
        }).strict,
        s.object({
          evoConditionType: s.literal("gender"),
          genders: s.array(UpperCasedGenderValidator),
        }).strict,
        s.object({
          evoConditionType: s.literal("evolutionRock"),
          evolutionRock: s.enum("IceRock", "MossyRock"),
          maxRangeSquared: s.number.positive,
        }).strict,
        s.object({
          evoConditionType: s.literal("weather"),
          weather: UpperCasedWeatherValidator,
        }).strict,
        s.object({
          evoConditionType: s.literal("highAltitude"),
          minAltitude: s.number.safeInt,
        }).strict,
        s.object({
          evoConditionType: s.literal("heldItem"),
          item: s.object({ itemID: s.string }).strict,
        }).strict,
        s.object({
          evoConditionType: s.literal("party"),
          withForms: s.array(s.string).nullish,
          withPokemon: s.array(s.string).nullish,
          withTypes: s.array(TypeValidator).nullish,
        }).strict,
        s.object({
          chance: s.number.positive.lessThanOrEqual(100),
          evoConditionType: s.literal("chance"),
        }).strict,
        s.object({
          evoConditionType: s.literal("statRatio"),
          ratio: s.number,
          stat1: s.any,
          stat2: s.any,
        }).strict,
        s.object({
          evoConditionType: s.literal("moveType"),
          type: TypeValidator,
        }).strict,
        s.object({
          evoConditionType: s.literal("healthAbsence"),
          health: s.string, //s.number.positive.safeInt
        }).strict,
        s.object({
          evoConditionType: s.literal("withinStructure"),
          structure: s.string,
        }).strict,
        s.object({
          condition: s.any,
          evoConditionType: s.literal("invert"),
        }).strict,
        s.object({
          evoConditionType: s.literal("status"),
          type: StatusValidator,
        }).strict,
        s.object({
          evoConditionType: s.literal("recoil"),
          recoil: s.string, //s.number.positive.safeInt
        }).strict,
      ),
    ).optional,
    evoType: s.enum("leveling", "interact", "trade", "ticking"),
    item: s.object({ itemID: s.string }).optional,
    level: s.number.safeInt.optional,
    moves: s.array(s.string).optional,
    to: s.string,
  }),
);
