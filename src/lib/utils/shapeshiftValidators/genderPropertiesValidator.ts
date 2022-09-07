import { s } from '@sapphire/shapeshift'

export const genderPropertiesValidator = s.array(
  s.object({
    gender: s.string,
    palettes: s.array(
      s.object({ name: s.string, particle: s.string, sprite: s.string, texture: s.string }).partial
    )
  })
)
