import { Pokemon } from '../../domain/entities/pokemon';

/**
 * Heavily inspired by: https://github.com/VincentJouanne/nest-clean-architecture
 */
export const PokemonBuilder = () => {
  const defaultProperties = {
    name: 'jigglypuff',
    slug: 'jigglypuff',
  };
  const overrides = {
    name: 'jigglypuff',
    slug: 'jigglypuff',
  };

  return {
    withPunctuation() {
      overrides.name = 'farfetched';
      overrides.slug = overrides.name;
      return this;
    },

    withDash() {
      overrides.name = 'hakamo-o';
      overrides.slug = overrides.name;
      return this;
    },

    build(): Pokemon {
      return Pokemon.check({
        ...defaultProperties,
        ...overrides,
      });
    },
  };
};
