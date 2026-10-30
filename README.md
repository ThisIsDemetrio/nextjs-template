# Next.js template

Built on Next.js 16 (App Router), React 19, TypeScript, CSS Modules, ESLint 9 and `node:test`. The mock API is a plain `node:http` server.

## Install

Requires Node 24 or newer.

```sh
nvm use
npm install
```

## Start

```sh
npm run dev
```

This starts the app on http://localhost:3000 and the mock API on http://localhost:4000 together.

To run them separately:

```sh
npm run mock
npm run dev:next
```

The app reads the API base URL from `API_URL`. In development it comes from `.env.development`. For a production build, set it yourself:

```sh
API_URL=https://api.example.com npm run build
npm start
```

## Test

```sh
npm test
```

Tests live next to the code as `*.test.ts` and start their own mock server, so nothing else needs to be running.

## Lint and typecheck

```sh
npm run lint
npm run typecheck
```
