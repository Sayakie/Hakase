import { s } from "@sapphire/shapeshift";

const TimeUnits = [
  "Morning",
  "Day",
  "Afternoon",
  "Midnight",
  "Night",
  "Dusk",
  "Dawn",
];

const WeatherUnits = ["Clear", "Rain", "Snow", "Storm"];

const StatusUnits = [
  "Burn",
  "Freeze",
  "Paralysis",
  "Poison",
  "Sleep",
  "Confusion",
];

const TypeUnits = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
  "Shiny",
  "ha", // Hidden Ability
];

const NatureUnits = [
  "Hardy",
  "Serious",
  "Docile",
  "Bashful",
  "Quirky",
  "Lonely",
  "Brave",
  "Adamant",
  "Naughty",
  "Bold",
  "Relaxed",
  "Impish",
  "Lax",
  "Timid",
  "Hasty",
  "Jolly",
  "Naive",
  "Modest",
  "Mild",
  "Quiet",
  "Rash",
  "Calm",
  "Gentle",
  "Sassy",
  "Careful",
];

const EggGroupUnits = [
  "Mineral",
  "Monster",
  "Field",
  "Dragon",
  "Ditto",
  "Water1",
  "Water2",
  "Water3",
  "Bug",
  "Amorphous",
  "Flying",
  "Grass",
  "Fairy",
  "Humanlike",
  "Undiscovered",
];

const ExperienceGroupUnits = [
  "Slow",
  "MediumSlow",
  "MediumFast",
  "Fast",
  "Fluctuating",
  "Erratic",
];

const SpawnLocationUnits = [
  "UnderGround",
  "Land",
  "Water",
  "Air",
  "AirPersistent",
];

export const TimeValidator = s.enum(...TimeUnits);
export const UpperCasedTimeValidator = s.enum(
  ...TimeUnits.map((it) => it.toUpperCase()),
);

export const WeatherValidator = s.enum(...WeatherUnits);
export const UpperCasedWeatherValidator = s.enum(
  ...WeatherUnits.map((it) => it.toUpperCase()),
);

export const StatusValidator = s.enum(...StatusUnits);
export const UpperCasedStatusValidator = s.enum(
  ...StatusUnits.map((it) => it.toUpperCase()),
);

export const TypeValidator = s.enum(...TypeUnits);
export const UpperCasedTypeValidator = s.enum(
  ...TypeUnits.map((it) => it.toUpperCase()),
);

export const NatureValidator = s.enum(...NatureUnits);
export const UpperCasedNatureValidator = s.enum(
  ...NatureUnits.map((it) => it.toUpperCase()),
);

export const EggGroupValidator = s.enum(...EggGroupUnits);
export const UpperCasedEggGroupValidator = s.enum(
  ...EggGroupUnits.map((it) => it.toUpperCase()),
);

export const ExperienceGroupValidator = s.enum(...ExperienceGroupUnits);
export const UpperCasedExperienceGroupValidator = s.enum(
  ...ExperienceGroupUnits.map((it) => it.toUpperCase()),
);

export const SpawnLocationValidator = s.enum(...SpawnLocationUnits);
export const UpperCasedSpawnLocationValidator = s.enum(
  ...SpawnLocationUnits.map((it) => it.toUpperCase()),
);

export const GenderValidator = s.enum("Male", "Female");
export const UpperCasedGenderValidator = s.enum("MALE", "FEMALE");
