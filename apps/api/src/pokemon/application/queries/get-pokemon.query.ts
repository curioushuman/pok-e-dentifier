import { QueryHandler, IQueryHandler, IQuery } from '@nestjs/cqrs';

export class GetPokemonQuery implements IQuery {
  constructor(public readonly name: string) {}
}

@QueryHandler(GetPokemonQuery)
export class GetPokemonHandler implements IQueryHandler {
  async execute(query: GetPokemonQuery): Promise<string> {
    const { name } = query;
    return `Pokemon: ${name}`;
  }
}
