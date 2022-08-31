# Changelog
All notable changes to this project will be documented in this file.

# [@Sayakie/Hakase@2.1.1](https://github.com/Sayakie/Hakase/compare/@Sayakie/Hakase@2.1.0...@Sayakie/Hakase@2.1.1) - (2022-08-31)

## 🐛 Bug Fixes

- Cliff refer invalid version link ([e9f975b](https://github.com/Sayakie/Hakase/commit/e9f975b49d11bb72e49146174753d32ceb1f3fb5))

# [@Sayakie/Hakase@2.1.0](https://github.com/favware/cliff-jumper/compare/@Sayakie/Hakase@2.0.0...@Sayakie/Hakase@2.1.0) - (2022-08-31)

## 🐛 Bug Fixes

- Cliff refer invalid commit url ([5ec9250](https://github.com/Sayakie/Hakase/commit/5ec925093ea74ff2e22d681094a9bc4738a14662))
- `REDIS_TASK_DB` throwing that is missing even though its optional ([cee84f4](https://github.com/Sayakie/Hakase/commit/cee84f4f7ef6fe30e889490271d482376b736b2d))
- Always return empty string since pokemon has form ([f53f016](https://github.com/Sayakie/Hakase/commit/f53f0164f17b263727804e8a24b9cacaede04987))

## 🚀 Features

- **config:** Add Redis scheduler to schedule corresponding tasks ([3d67dae](https://github.com/Sayakie/Hakase/commit/3d67daed252b0fc6266d68ab421c3dcd94a9e78f))
- Add `cliff-jumper` ([c1e48c1](https://github.com/Sayakie/Hakase/commit/c1e48c17d9557a2d6884cd21c24964c21e8a954f))

# [@Sayakie/Hakase@2.0.0](https://github.com/favware/cliff-jumper/tree/@Sayakie/Hakase@2.0.0) - (2022-08-30)

## ⌨️ Typings

- Do infer better type ([6c8e917](https://github.com/favware/cliff-jumper/commit/6c8e917cecae441611da67fcb6b6e7d9e27edd8d))
- Fix typo to correct ([154f5ed](https://github.com/favware/cliff-jumper/commit/154f5ed0736f5916885e5d8fb07b699275cc10cf))

## 🏃 Performance

- Handle empty string returns early ([3860bf7](https://github.com/favware/cliff-jumper/commit/3860bf7881ac7b671a03775c0131b64f719d206d))

## 🏠 Refactor

- Change `const enum` for regular `enum` ([2f417b1](https://github.com/favware/cliff-jumper/commit/2f417b1b3c59788b1bf43582c77fddacc5088944))
- Separete function performs same feature ([e952a4a](https://github.com/favware/cliff-jumper/commit/e952a4a759eade4438a89d8bbced3d1f6693a6ea))
- Handle species loader at static initializer block ([ad2e3d1](https://github.com/favware/cliff-jumper/commit/ad2e3d1c3f7af919b354e96a9c54e41b624499f6))
- Remove unnecessary compare process ([8f55e8a](https://github.com/favware/cliff-jumper/commit/8f55e8a66dcbcff201e51701d5f7c21c2cfa09e2))
- Change pokemonResponseBuilder result spec ([2710b43](https://github.com/favware/cliff-jumper/commit/2710b43878a93f1c719494211f80a1bd45a25c7e))
- Divide method to get suitable fuzzy strategy ([ac41a2d](https://github.com/favware/cliff-jumper/commit/ac41a2dec5c4fa464c34d1943b5b28fc2cb5189b))
- Retyping similarity result ([ba4c764](https://github.com/favware/cliff-jumper/commit/ba4c764c41bda5a3d94b65eb8cc1605329ef22ee))
- Use custom JSON parser for better error report ([613cdd9](https://github.com/favware/cliff-jumper/commit/613cdd9ea9c14bda8ceaa821f91cb6bc22ef868c))
- Rename identifier more specific ([50403c4](https://github.com/favware/cliff-jumper/commit/50403c4dff3f16a6b9000e513913d69e1350e07b))
- **listener:** Use constant identifiable name ([deb7e95](https://github.com/favware/cliff-jumper/commit/deb7e95be75b8a671d66eb8268b475d981b125b5))
- Reposition project working dir ([e3b9fc4](https://github.com/favware/cliff-jumper/commit/e3b9fc47ee02029095153c949c8a0cb72a5c8d7c))
- **lib:** Separate species concerns ([0950d67](https://github.com/favware/cliff-jumper/commit/0950d677a6c283a2cdef260921a14a9e784efc64))
- Unpack monorepo (#40) ([11ece38](https://github.com/favware/cliff-jumper/commit/11ece3863571ace59e84c7bbc04b524ca2c5e6e5))
- **FormBelongToSpecies:** Expose unsafe ([a5b9ec1](https://github.com/favware/cliff-jumper/commit/a5b9ec14ad440d5bffc8cc4d50bb0a52489c4f79))
- **MegaForm:** Allow to take null in param ([9ae6ce1](https://github.com/favware/cliff-jumper/commit/9ae6ce1e6a9351d8b24d635a02e0a18652a587e9))
- **typings:** Add `Unknown` evolution type ([4e22180](https://github.com/favware/cliff-jumper/commit/4e221803ff71f552d37835f6e5fae0e8f87942f5))
- **Client:** Move loaders to master bootloader ([28a9cce](https://github.com/favware/cliff-jumper/commit/28a9ccebcb303cdb640ac3ef5ace96c804d586e0))
- **EnumForm:** Separate Meowth to common forms ([7d6bd2c](https://github.com/favware/cliff-jumper/commit/7d6bd2cddbc650a07d11591cc7fa3351ccbe8a2b))
- **Util:** Re-add missing helper functions ([72c7b3c](https://github.com/favware/cliff-jumper/commit/72c7b3cb49cfdef7c4d65c3832003c2963a547bf))
- **PokemonUtil:** Fix incorrect drop info ([02e6908](https://github.com/favware/cliff-jumper/commit/02e69084f297ce3946b69b8e818126a27f98cb78))
- **PokemonUtil:** Add `#getDrop` function ([47dc0af](https://github.com/favware/cliff-jumper/commit/47dc0afe501f7abe0a54bfe14b0b3e08e359a5af))
- **PokemonUtil:** Add a new `getBaseStats` method ([3c6e592](https://github.com/favware/cliff-jumper/commit/3c6e59251404907b3542ed4f6cbcc53ec555576a))
- **PokemonUtil:** Make loaders return unmodifiable maps ([d3cf678](https://github.com/favware/cliff-jumper/commit/d3cf678e9d1ea7aa0aa62edbaf0bb75f6672decf))
- **PokemonUtil:** Separate load methods ([6d06246](https://github.com/favware/cliff-jumper/commit/6d0624687c28ef46ec640aca3f7b2f060f498df8))

## 🐛 Bug Fixes

- **ci:** Invalid resolution path on lint-staged ([f604a89](https://github.com/favware/cliff-jumper/commit/f604a896d063ecf68e659c9f04d514ecb51d4e45))
- **deps:** Update all non-major dependencies (#45) ([38447c3](https://github.com/favware/cliff-jumper/commit/38447c3595310db7172247c87e84b5ee8b7c3de0))
- **ci:** Remove unhandled rule ([9ec72fb](https://github.com/favware/cliff-jumper/commit/9ec72fbe622ecc2b4d02cf255bbc3f15bfb67d96))
- Missing `packageRule` selector ([750443a](https://github.com/favware/cliff-jumper/commit/750443acf23008e247833c1977a1275787c3d295))
- **client:** Add default value against match threshold is missing ([09230f8](https://github.com/favware/cliff-jumper/commit/09230f8c2f9817276fb1ea6b204dee5ba61eb7fe))
- Resolve merge conflicts ([5f991d5](https://github.com/favware/cliff-jumper/commit/5f991d57d5f84b63901dfe1bf0b4cdb8bfa716b8))
- **Locale:** Add missing comma ([73e4f18](https://github.com/favware/cliff-jumper/commit/73e4f182463179f313883e3aa4f871950f1f29b3))
- The Wyrdeer have invalid dex ([e332161](https://github.com/favware/cliff-jumper/commit/e332161fcefd41e3354728183d4ee861ec28513b))
- Pokedex on every species is broken (#35) ([0729ed5](https://github.com/favware/cliff-jumper/commit/0729ed59597af6e2bbf35ba00316e4f2b44dceaa))
- Circular dependency error (#33) ([ce84c06](https://github.com/favware/cliff-jumper/commit/ce84c06633b3bb308af047574b02078668e48d93))
- **GendorForm:** Inconsistent getter against others ([9541533](https://github.com/favware/cliff-jumper/commit/9541533dedb4d8ec6c65c78ea0e13ec0a5331bc1))
- **Util:** Prevents printing duplicate spawn times ([9bbbe93](https://github.com/favware/cliff-jumper/commit/9bbbe93944799e87594a9abe11e5939d14795779))
- **Typings:** Remove invalid nullable types ([68f4394](https://github.com/favware/cliff-jumper/commit/68f4394b27445071bddab03109d22345de86b3d6))
- **EnumGroudon:** Occurs illegal access before initialization ([b28c483](https://github.com/favware/cliff-jumper/commit/b28c483f3c9a353bddd364f90260427625f0c104))
- **EnumSpecies:** Add fallback when localized name do not available ([98fbce6](https://github.com/favware/cliff-jumper/commit/98fbce6a579ea08e83b5afd7dbf917f9b23335a8))
- **PokemonUtil:** Remove debug logger ([7777fcb](https://github.com/favware/cliff-jumper/commit/7777fcb5ad18db5fa23e8888212483efd24ee9f2))
- **Locale:** Rename invalid translation key ([c895515](https://github.com/favware/cliff-jumper/commit/c8955152d91c9a1af77c60e7f46ef7942d146d30))
- **Util:** Make sure split namespace if exists ([9319996](https://github.com/favware/cliff-jumper/commit/931999622cfe1731dddb234134cea0dfc5a0c435))
- **Util:** Replace biomes so that print expected the one ([d50c947](https://github.com/favware/cliff-jumper/commit/d50c947bb93f6ee2e04df8c609e86ffb54b6d370))
- **typings:** Remove useless generic type from pre-evolutions filtering ([26b3f63](https://github.com/favware/cliff-jumper/commit/26b3f6355e9c2e5ff91e47b91ecf45242ff04992))
- **App:** Add missing emojis ([23696ed](https://github.com/favware/cliff-jumper/commit/23696edcbb273bb9912fd95a14f5b5f10eeefa7f))
- **EnumForm:** Duplicate forms will remove safely ([bdfedae](https://github.com/favware/cliff-jumper/commit/bdfedaedb42450de029f8da69c72263194ced5a3))
- **EnumForm:** Add normal form of Slowbro ([8edf9ef](https://github.com/favware/cliff-jumper/commit/8edf9ef0f5fa6d958a66306ea20829d78a6481e9))
- **PokemonUtil:** Fix to enhanced type ([b124c8c](https://github.com/favware/cliff-jumper/commit/b124c8c12cc8ccb8a5978b1f77386eae7a01bc0a))
- **PokemonUtil:** Move variant check logic to first ([c40144e](https://github.com/favware/cliff-jumper/commit/c40144ed1a47a5a8dd32fe7db8eb43b4b87fb246))
- **typings:** Take NestedBaseStats to BaseStats ([1c9ceee](https://github.com/favware/cliff-jumper/commit/1c9ceee91f20385a2e97c52954cf2dd800278055))
- Pokemon that spawns at nether could not be appeared ([d6ca455](https://github.com/favware/cliff-jumper/commit/d6ca4558e3a741aefa524762d117ec6e705e2da0))

## 📝 Documentation

- Update README.md ([d151cc1](https://github.com/favware/cliff-jumper/commit/d151cc155d08cf1919fe744318f1a16c8ce53fc3))
- Add SECURITY.md ([2bd4f5c](https://github.com/favware/cliff-jumper/commit/2bd4f5c28a74b503bee40e7b2882b713a6448437))
- Create CONTRIBUTING.md ([e36daff](https://github.com/favware/cliff-jumper/commit/e36daffa5f31749e7ec62b370f5ad2886e356b64))
- Update Code of Conduct doc ([7de73c1](https://github.com/favware/cliff-jumper/commit/7de73c19643b5bc36db3a6a95d5de225e4834cc3))
- Add commit message convention ([7f3581e](https://github.com/favware/cliff-jumper/commit/7f3581eb740e208a2aa98badbb3e9093d3af9a9b))
- Add license and legals (#23) ([1d1bb37](https://github.com/favware/cliff-jumper/commit/1d1bb37fb417f88cbfe12355cff7080ec584408b))

## 🚀 Features

- Landing v2 (#50) ([7db3ffc](https://github.com/favware/cliff-jumper/commit/7db3ffc185bc98f2590cd0b73e27e5398cf83212))
- Add utilities to get images/sprites ([72c1a3e](https://github.com/favware/cliff-jumper/commit/72c1a3ed62138b4bd56505c605f2b31e9b5a3366))
- Allow to consume nullish params ([2045aeb](https://github.com/favware/cliff-jumper/commit/2045aebb9f8d22597665ba163e42e8da66ac1caa))
- Add cokemon cquery regex to capture ([ec231c0](https://github.com/favware/cliff-jumper/commit/ec231c033dd44c484d3c985cfac8e95d90a0c400))
- Add get Species from localized names ([65a8a5e](https://github.com/favware/cliff-jumper/commit/65a8a5eb05a151c73b24c5956129d1568b345815))
- **utils:** Add branding colors ([fbc6bff](https://github.com/favware/cliff-jumper/commit/fbc6bffbdb8fd4c1c0845534566bd6e46c94a57d))
- Add info slash-command ([5a51c07](https://github.com/favware/cliff-jumper/commit/5a51c074dc4d18758edf70fcaae3d6df1d14040c))
- Add branding-colors, memoty units ([897eb82](https://github.com/favware/cliff-jumper/commit/897eb82fb9b4dc28d61b3fdb031b8e40f666980c))
- Add 2 patches ([5708cbc](https://github.com/favware/cliff-jumper/commit/5708cbc5777152048e3e607b3eec93e495869a30))
- Implement loaders (#41) ([b232ce9](https://github.com/favware/cliff-jumper/commit/b232ce905e72881d1039cd13ceb9fd5fcec1b9ab))
- Landing monorepo (#39) ([b9c20c5](https://github.com/favware/cliff-jumper/commit/b9c20c59c112c5501dc76109a9fb6507c854efbe))
  - 💥 **BREAKING CHANGE:** `#getNationalPokedex()` would be return applied padding with, if treat as string

* feat(Client): `version` should be include "dev"

Client#version property is always return the version string read from
the `package.json` file, but it should be include "dev" if the envrionment
is development. (e.g. `0.0.1-dev`)

* chore(Constant): use left shift instead of hex

* feat(Translation): add translatable interface

* chore(Species): apply translatable interface

* chore: add Codespace build script

* chore: define workspace scopes

* chore(packages): initial `sapphire-framework`

* chore(package): initial `utilities`

* feat(*)!: prepare monorepo

Added turbo.json
Added tsup.config.ts
  - 💥 **BREAKING CHANGE:** removed jest (replaced to vitest)
  - 💥 **BREAKING CHANGE:** removed scripts
  - removed check-dev-engines.mjs
  - removed dev-patch.mjs
  - 💥 **BREAKING CHANGE:** removed unused config files
  - 💥 **BREAKING CHANGE:** removed unused typings

* chore(ide): add exclude files

* chore(packages): add build script

* fix(sapphire-framework): overriden member miss 'override' modifier

* chore: update gitignore

* feat(utilities): expose `@sapphire/utilities`

* feat: support vendor workspace

* chore: update tsconfig

* chore: specify more detailed to correct

* chore(packages): fix typo

* chore(sapphire-framework): expose `@sapphire/framework`

* feat(sapphire-framework): support localizations

* chore(hakase): initial `Hakase` app

* chore: setting up linting cover range

* chore: bump deps links

* feat(hakase): add basic structures

* feat(sapphire-framework): add localizable slash command

* chore(hakase): make accept multiple entries

* chore: add initial pokemon command

* chore: fix  typo

* chore(lint): allow namespace

* feat(packages): initial `pokemon-datapacks` package

* chore: max line length to 100

* chore: use tslib globally

* chore(utilities): sort export orders
- **FormBelongToSpecies:** Add name prop ([36aae70](https://github.com/favware/cliff-jumper/commit/36aae7034c0788504f113b04a29e15f3949e86a9))
- **Locale:** Add wyrdeer ([dac7d68](https://github.com/favware/cliff-jumper/commit/dac7d687420dc1b555d7e5088d72ee8d66f72fdd))
- Add extension property ([afbc838](https://github.com/favware/cliff-jumper/commit/afbc838db0a22533683e8d7944d8cea81df9a1fc))
- Add ReadonlyWeakMap and apply it ([fb733e7](https://github.com/favware/cliff-jumper/commit/fb733e764bd15d2b27d50abfda1d03b361150656))
- Add functions to get image and sprite ([3d4c74f](https://github.com/favware/cliff-jumper/commit/3d4c74f11463e11f49509a56c8003c69dd2cda8c))
- Add loaders ([19f64c8](https://github.com/favware/cliff-jumper/commit/19f64c8fa9757643ae45c1e57914dfbc68dbbfdf))
- Add types ([048fc90](https://github.com/favware/cliff-jumper/commit/048fc9095cd7dcb3e03847468682595a008aa633))
- **Util:** Add TypedMap and StackableArrayMap ([50e39bc](https://github.com/favware/cliff-jumper/commit/50e39bca964832474f5cc51b7d6a313a5f22f329))
- **Species:** Add Wyrdeer ([8254415](https://github.com/favware/cliff-jumper/commit/8254415e1b169ca3f0c8191d6d9171072986a503))
- Add hisuian forms ([856bd5c](https://github.com/favware/cliff-jumper/commit/856bd5c88994d19bd8b362da60d384758f55ff28))
- **PokemonUtil:** Add branch to get prefix for regional forms ([6ff1330](https://github.com/favware/cliff-jumper/commit/6ff133034984a4b337df46323462ae5c156d11e5))
- **PokemonUtil:** Add a new branch for party condition ([7d140e1](https://github.com/favware/cliff-jumper/commit/7d140e10756708df17c2ad89e1aaef8d385b73a3))
- **PokemonUtil:** Add Jirachi gif ([4c0aff6](https://github.com/favware/cliff-jumper/commit/4c0aff6539f44e5f73d04a5a4603da63238840cc))
- **Locale:** Add move translation keys ([0d003b7](https://github.com/favware/cliff-jumper/commit/0d003b72ab0ca83c686ccaa6033f0a1efef23f61))
- **Locale:** Add missing biome ([38221be](https://github.com/favware/cliff-jumper/commit/38221beeafd7a5f80dc674c106f528d8a636bf7b))
- **PokemonUtil:** Make sure do not expand moves if that is a regional forms ([3112e0c](https://github.com/favware/cliff-jumper/commit/3112e0c58e3fef5c287c1bbe93b11e2e9bb6f9f2))
- **Locale:** Add evolution translation key ([2b132a7](https://github.com/favware/cliff-jumper/commit/2b132a7553121e665eaed101dc5338be818c4ecc))
- **Locale:** Add Alcremie items ([4870eeb](https://github.com/favware/cliff-jumper/commit/4870eebc7de30c42f6fecfd6104f94d9219fcd90))
- **Locale:** Add Alcremie forms ([9f1038d](https://github.com/favware/cliff-jumper/commit/9f1038d32fb9f53ce85cfdae6594571e0eebd897))
- **Locale:** Add Item keySet for en-US ([77e9639](https://github.com/favware/cliff-jumper/commit/77e96394d0038d83f0349718b602d0570cf9f7ba))
- **Handler:** Attach advanced search system ([5da76f5](https://github.com/favware/cliff-jumper/commit/5da76f56b6938bdadfac41c056f46ab83f98c43e))
- **Util:** Add pokedrops ([6eace45](https://github.com/favware/cliff-jumper/commit/6eace459cbd0e7fdf4a1add9e601fd7ba993b46e))
- **RegionalForm:** Implement `#values` interface ([a6dc5ef](https://github.com/favware/cliff-jumper/commit/a6dc5ef3c8efa82fc92e13c0c92e0dc6fc217aab))
- **Locale:** Add new evolution translation keys ([1867138](https://github.com/favware/cliff-jumper/commit/1867138710b4f3bb3d33dd9535e2a8ed5fe6124d))
- **typings:** Add unknown condition ([a6ec18d](https://github.com/favware/cliff-jumper/commit/a6ec18daf8e321319a874300e5514b2e2425930e))
- **Locale:** Add missing translation key for evolution spec ([8d463e5](https://github.com/favware/cliff-jumper/commit/8d463e5847b5818a5001fbb0213eecdfbecc58ef))
- **Locale:** Add evYields translation key ([a6cc164](https://github.com/favware/cliff-jumper/commit/a6cc164aebbee0ae4222e1ad9b39226c5d608752))
- **Constants:** Add loaded stores ([b4aa9ab](https://github.com/favware/cliff-jumper/commit/b4aa9ab3bd05b3c681a886e8b57ddd9271fecbba))
- **Database:** Move saved db directory ([7310851](https://github.com/favware/cliff-jumper/commit/73108511466d695e8b7bcb9f3c2fc7938838113e))
- **Cloneable:** Add description for `Cloneable` interface ([18561c5](https://github.com/favware/cliff-jumper/commit/18561c549a857ee491190c55630518ec1f13d518))
- **Util:** Add template generators ([b7d5beb](https://github.com/favware/cliff-jumper/commit/b7d5beb83f6721ce376bf7c6919b126defbad502))
- **PokemonUtil:** Add exporting types ([460fb5e](https://github.com/favware/cliff-jumper/commit/460fb5e8041bea52a99f20f6a9df8bda62dfefd1))
- **PokemonUtil:** Add resources getter methods ([cf93639](https://github.com/favware/cliff-jumper/commit/cf93639663e1b8dcb500956c8b066a9e21c14d8a))
- **PokemonUtil:** Fix invalid length order ([3b08e27](https://github.com/favware/cliff-jumper/commit/3b08e278128b12c594b0169fee1bd1dc785ff25a))
- **PokemonUtil:** Add `#getPokeDropFromSpecies` method ([8aa5054](https://github.com/favware/cliff-jumper/commit/8aa5054c6bae7ed5bd1d64496a92638eb32ba293))
- **Interface:** Add  interface and implements ([c085215](https://github.com/favware/cliff-jumper/commit/c085215bbf6d1aa79085cdfa214cc6941651def7))
- **Form:** Add "PinToPrefix" flag for mega forms ([8637059](https://github.com/favware/cliff-jumper/commit/863705998a32e30ea4544de786aa06a19ce1f51c))
- Add patch converts some unstructured data ([9e1f305](https://github.com/favware/cliff-jumper/commit/9e1f305385d1f185a4f2ca7fd6b8e8d0dae8b5b9))

## 🪞 Styling

- Make Directories as readonly ([943c2c0](https://github.com/favware/cliff-jumper/commit/943c2c0e3685c80fd08dc0943b6c0e1c6e4ace10))
- **Species:** Make Species not this ([67cce60](https://github.com/favware/cliff-jumper/commit/67cce60f7fd28e0fd4535854f3b4d1b35a1b449e))
- **Species:** Use grave accent instead of apostrophe ([d3ff905](https://github.com/favware/cliff-jumper/commit/d3ff9055252ef5d40e8705c0c4ed911cbd3c59aa))
- **Species:** Make implementation as private ([e0991cf](https://github.com/favware/cliff-jumper/commit/e0991cf4f94124c4427ebecd3465d4c6cb100a2c))

