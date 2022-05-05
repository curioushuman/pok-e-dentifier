import { Pokemon } from '../../domain/entities/pokemon';
import type { Slug } from '../../domain/value-objects/slug';

export abstract class PokemonRepository {
  abstract findOne(slug: Slug): Promise<Pokemon>;
}
