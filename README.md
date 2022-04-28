# Pok-e-dentifier

For those embarrassing pokemon moments..

# Built with

- Turborepo
- Quasar
- Nest.js

# Setup

# Development

## Running in dev mode

Run all the apps (aggh):

```bash
$ npm run dev
```

Run just one of them:

```bash
$ turbo run dev --filter=./apps/web
```

For more info on [turbo --filter](https://turborepo.org/docs/core-concepts/filtering) hit the [docs](https://turborepo.org/docs).

## Installing packages

```bash
# Install from root, calling out the app/package target
# npm i --workspace <app_name> <package_name>
# npm i -w <app_name> <package_name>
$ npm i --workspace web tailwindcss
```

# App specific notes

TBC

# Appendix

## Typescript configuration

Turborepo uses a `base.json` TS configuration file that is intended to be shared by all or some of the apps within the monorepo. It is not a hard and fast rule, but useful if you would like to employ it.

Apps not currently using shared tsconfig base:

- quasar
- web

## Inspiration / Props

Thanks to these repos for inspiration and some core code/structure:

- https://github.com/arneesh/turborepo-vue-starter

Other repos I found that I would like to experiment with soon:

- https://github.com/initred/nuxt3-tailwindcss3-starter-kit
  - Nuxt3 and Tailwind loveliness
  - _Issues_
    - Couldn't get Nuxt to resolve node_modules from monorepo root
- https://github.com/ycjcl868/monorepo
  - PNMP + Rollup modularity
  - _Issues_
    - I need to spend some time with PNPM and Rollup first

## Adding additional vanilla Vue apps

### 1. Create Vue App

TBC

### 2. Add Vuetify (optional)

Currently Vue CLI doesn't seem to currently (2022.04.28) play well with monorepos, so you need to install from your app root and then do some fiddling about.

**Note:** be sure to commit all changes prior to this so you can:

- Reset if you don't like it
- See what changes it makes

```bash
# CD into app root
$ cd apps/my-app
# Install Vuetify
$ vue add vuetify
```

Have a look at the changes, and make sure you're happy. Then we need to make it more turborepo-ish:

1. Remove node_modules dir from apps/my-app
2. Copy any DevDependencies
   - FROM @/my-app/package.json
   - TO @/package.json
   - Removing any duplicates if they exist
3. npm install from root

### 3. Add vitest (optional)

Vitest has already been included as a dev-dependency at root, you'll just need to add the scripts to your app/package.json:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```
