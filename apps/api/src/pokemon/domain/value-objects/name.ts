/**
 * Heavily inspired by: https://github.com/VincentJouanne/nest-clean-architecture
 */
import { Static, String } from 'runtypes';

/**
 * TODO
 * - [ ] Review naming rules for Pokemon and add a constraint
 */

export const Name = String.withBrand('Name');

export type Name = Static<typeof Name>;
