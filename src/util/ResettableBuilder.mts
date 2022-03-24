// > Strongly inspired by SpongePowered/SpongeAPI
// > https://github.com/SpongePowered/SpongeAPI/blob/5ea62150a66332c66c29ff4bda7abdb4d91c3d34/src/main/java/org/spongepowered/api/util/ResettableBuilder.java

export interface ResettableBuilder<
  Type,
  Builder extends ResettableBuilder<Type, Builder>
> {
  /**
   * Resets this builder to the values of the given built object.
   *
   * @param {Type} value The built object
   * @return {Builder} This builder, for chaining
   */
  from(value: Type): Builder

  /**
   * Resets this builder to a "default" state such that there is no
   * remaining data to set. This is to be the presumed "default"
   * state.
   *
   * @returns {Builder} This builder, for chaining
   */
  reset(): Builder
}
