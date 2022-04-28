# Pok-e-dentifier

For those embarrassing pokemon moments..

# Setup

# Development

## Running in dev mode

Run all the apps (aggh):

```bash
$ npm run dev
```

Run just one of them:

```bash
$ turbo run dev --filter=./apps/nuxt-app
```

For more info on [turbo --filter](https://turborepo.org/docs/core-concepts/filtering) hit the [docs](https://turborepo.org/docs).

## Installing packages

```bash
# Install from root, calling out the app/package target
# npm i --workspace <app_name> <package_name>
$ npm i --workspace web buefy
```

# Important notes

## Typescript configuration

Turborepo uses a `base.json` TS configuration file that is intended to be shared by all or some of the apps within the monorepo. It is not a hard and fast rule, but useful if you would like to employ it.

Apps not currently using shared tsconfig base:

- nuxt-app

# Extending the repo

## Adding additional Vue-based apps

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

# Appendix

## Inspiration / Props

Thanks to these repos for inspiration and some core code/structure:

- https://github.com/arneesh/turborepo-vue-starter
- https://github.com/initred/nuxt3-tailwindcss3-starter-kit