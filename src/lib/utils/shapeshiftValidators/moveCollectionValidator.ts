import { s } from "@sapphire/shapeshift";

export const moveCollectionValidator = s.object({
  eggMoves: s.array(s.string),
  hmMoves: s.array(s.string),
  levelUpMoves: s.array(
    s.object({
      attacks: s.array(s.string),
      level: s.number.positive.safeInt,
    }),
  ),
  tmMoves: s.array(s.string),
  tmMoves1: s.array(s.string),
  tmMoves2: s.array(s.string),
  tmMoves3: s.array(s.string),
  tmMoves4: s.array(s.string),
  tmMoves5: s.array(s.string),
  tmMoves6: s.array(s.string),
  tmMoves7: s.array(s.string),
  tmMoves8: s.array(s.string),
  trMoves: s.array(s.string),
  transferMoves: s.array(s.string),
  tutorMoves: s.array(s.string),
});
