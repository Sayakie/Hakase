/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: `ts-jest/presets/default-esm`,
  extensionsToTreatAsEsm: [`.ts`, `.mts`],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  testEnvironment: `node`,
  moduleNameMapper: {
    '^@/(.*)$': `<rootDir>/src/$1`,
  }
};
