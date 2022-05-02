import { Name } from '../value-objects/name';
import { Record, Static } from 'runtypes';

export const Pokemon = Record({
  email: Name,
});

export type Pokemon = Static<typeof Pokemon>;
