import { s } from "@sapphire/shapeshift";

export const battleStatsValidator = s.object({
  attack: s.number,
  defense: s.number,
  hp: s.number,
  specialAttack: s.number,
  specialDefense: s.number,
  speed: s.number,
});
