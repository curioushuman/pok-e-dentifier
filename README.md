# Pok-e-dentifier

For those embarrassing pokemon moments..

## Built with

- Nx
- Quasar
- Nest.js
- K8s
- Skaffold

## Status

Not quite production ready, outstanding:

- App
  - Connection to API
  - Auth
  - Further tidying
  - Testing
- API
  - Connection to Poke-API
  - Auth
- CI/CD
  - More info available in [poke-k8s](https://github.com/curioushuman/poke-k8s) repo

## What you can do

### API

- Run tests (see below)

### Entire app

Not yet... Grrrr.

# Setup

To get things running locally you'll need to

## Install K8s

- Clone the [poke-k8s repo](https://github.com/curioushuman/poke-k8s) to the same directory as this repo
- Follow the (Simple) setup steps from that repo

## Software

*Apologies:* this is directed towards those on MacOS.

### nx cli

This is optional, but without it you'll need to replace any commands starting with:

```bash
$ nx <do_a_thing>
```

With:

```bash
$ npx nx <do_a_thing>
```

To install:

```bash
$ npm i -g nx
```

### skaffold cli

```bash
$ brew install skaffold
```

# Testing

## All

TBC

## API (only)

### Unit tests

Handled *outside of k8s* via Jest, managed by Nx.

```bash
$ nx run api:test-unit
# To leave it running
$ nx run api:test-unit --watch
```

Matches files using Jest [standard testMatch pattern](https://jestjs.io/docs/configuration#testmatch-arraystring).

### Integration tests

Handled *outside of k8s* via Jest, managed by Nx.

```bash
$ nx run api:test-integration
```

Matches files with the file pattern `*.ispec.ts`.

### Unit + Integration

Handled *outside of k8s* via Jest, managed by Nx.

```bash
$ nx run api:test
```

Matches both of the above patterns.

### E2E tests

Handled **INSIDE of k8s** via Jest, supported by Nx, enabled via Skaffold.

```bash
# Tells skaffold.yaml to use the 'test' stage of Docker container
$ nx run api:pre-test-e2e
# Then tests are automatically run and watched within k8s
$ skaffold dev
```

Matches files with the file pattern `*.e2e.ts`.

### Manual testing within Kubernetes

Handled **INSIDE of k8s** via Nest cli, supported by Nx, enabled via Skaffold.

```bash
# Tells skaffold.yaml to use the 'development' stage of Docker container
$ nx run api:pre-dev
# Skaffold will deploy k8s and Nest will start
$ skaffold dev
```

This will spin up the k8s cluster, and start Nest with:

- hot reloading
- watch

**Note:** you only have to run pre-dev if you've previously been running e2e tests.

## App

TBC

# Appendix

## Important notes

At this stage, we don't employ *all* of the benefits of Nx as a monorepo provider. This is mainly down to:

- K8s for service delivery
- Inconsistent results for Vue (et al) within Nx

Things I would like to work on next:

- Taking full advantage of Nx build and build caching
  - Currently we build within the respective Dockerfiles
    - Which means semi-duplicated package.json files
    - And potential productivity costs
  - When there is time I will play with this further
    - May require some faffing on the Quasar front
- Shared repo for UI elements

## Inspiration

### API

* [VincentJouanne/nest-clean-architecture](https://github.com/VincentJouanne/nest-clean-architecture)
  * Very tidy, very advanced combination of Nest.js & DDD

## Important notes / decisions

### Testing

**#1 We have specifically not included skaffold within Nx**

- It disables Skaffold's natural rollback function upon CTRL+C (as the CTRL C is picked up only by Nx)
- It has no dependencies that Nx can help us with (as Skaffold will rebuild from Dockerfile anyway)
- It disables Skaffold terminal colours

I'm sure there are solutions to some of these, but they're low priority when we already have a working solution.

**#2 *pre-test-e2e* and *pre-dev* do not build the docker containers**

Because Skaffold does.

## Packages/libraries

### Runtypes

Borrowed from [VincentJouanne](https://github.com/VincentJouanne), they use it to implement very neat encapsulated Value Objects.

* [Runtypes](https://github.com/pelotom/runtypes)
