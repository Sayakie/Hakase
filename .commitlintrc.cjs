const [OFF, WARN, ERROR] = [0, 1, 2]

module.exports = {
  extends: [
    `@commitlint/config-angular`
  ],
  rules: {
    'type-enum': [
      ERROR,
      `always`,
      [`chore`, `build`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`, `types`, `typings`, `wip`]
    ],
    'scope-case': [OFF]
  }
}
