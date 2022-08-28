# Contributing

> **Note** The issue tracker is **only for issue reporting or proposals/suggestions**. If you *have a question, you can find us in our [Discord Server]*.

Thanks for your interests in the project! Pull requests welcome for any level of improvement, from a small typo to a new section, help us make the project better.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request. We highly suggest [ESLint] to be installed
in your text editor or IDE of your choice to ensure builds from GitHub Actions do not fail.

1. Fork, clone, and select the **`main`** branch.
2. Create a new branch in your fork.
3. Make your changes.
4. Ensure your linting and tests pass by running `pnpm test && pnpm lint`
5. Commit your changes, and push them.
6. Submit a Pull Request [here]!

## New contributor onboarding

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

- Everything in this repository should be generally useful for the majority of users. Don't let that stop you if you've got a good concept though, as your idea still might be a great addition.
- Everything should be shard compliant. If code you put in a pull request would break when sharding, break other things from supporting sharding, or is incompatible with sharding; then you will need to think of a way to make it work with sharding in mind before the pull request will be accepted and merged.
- Everything should follow [OOP paradigms] and generally rely on behaviour over state where possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.
- Everything should follow our ESLint rules as closely as possible, and should pass lint tests even if you must disable a rule for a single line.
- Scripts that are to be ran outside of the scope of the context should be added to [scripts] directory and should be in the `.mjs` file format.

## Commiting to this repo

We use the [Angular commit convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) for commits that are used for an automated changelog generation, so it would be advisable to respect that. If you're not used to it or are afraid to mistype a commit, you can run `pnpm commit` or `git cz` (if you have installed `commitizen`) which would take you through a few questions and write the commit for you.

## Add yourself as a contributor

Don't afraid to add yourself as a contributor. Even a small pieces, such as a typo correction, is an wonderful contribution.

<!-- Link Dump --->

[discord server]: https://discord.gg/PZFErxEhKp
[here]: https://github.com/Sayakie/Hakase/pulls
[eslint]: https://eslint.org/
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
[scripts]: /scripts
