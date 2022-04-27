# Pok-e-dentifier

For those embarrassing pokemon moments..

# Setup

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