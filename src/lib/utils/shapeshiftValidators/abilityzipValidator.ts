import { s } from "@sapphire/shapeshift";

export const abilityZipValidator = s.object({
  abilities: s.array(s.string),
  hiddenAbilities: s.array(s.string).nullish,
});
