/**
 * Heavily inspired by: https://github.com/VincentJouanne/nest-clean-architecture
 */
import { Static, String } from 'runtypes';

/**
 * Looking at the list of names the following rules seem to apply
 * - unicode only i.e. flabébé becomes flabebe
 * - dashes are allowed e.g. hakamo-o
 * - lowercase only e.g. Hakamo-o returns nothing
 *
 * Uncertain about
 * - spaces, I couldn't find one with a space
 */
export const SlugRegex = /^[a-z-]+$/;

export const Slug = String.withBrand('Slug').withConstraint(
  (maybeSlug) => SlugRegex.test(maybeSlug) || 'Invalid Pokemon slug'
);

// Other things
// - unicode I think i.e. flabébé becomes flabebe
// - need this in a mapper

export type Slug = Static<typeof Slug>;
