import { Record, Static, String } from 'runtypes';

/**
 * This is the form of the data we expect (and process) from the Poke API
 * The full API can be found at https://pokeapi.co/docs/v2
 * We can use this runtype to check the data we get from the API
 */

export const PokeApiPokemonDto = Record({
  name: String,
});

export type PokeApiPokemonDto = Static<typeof PokeApiPokemonDto>;
