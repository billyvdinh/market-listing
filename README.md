# Market Listing 

## Tech Stack: Next.js/TypeScript, Prisma/Postgres, Auth0, Material-UI


Market listing app started with Next.js/Typescript, used Prisma/Postgres as Database, Auth0 as Auth Provider.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the app, you need to add some environment vars to configure (1) a local database connection and (2) Auth0:

For the database, make sure you have postgresql installed, and then create a db. If on macOS:
```
brew install postgresql
brew services start postgresql
createdb market-listing-dev
```

Then create a `.env` file at the root of the project that looks like (if on macOS, replace {your-user-name} with your macOS username):
```
DATABASE_URL="postgres://{your-user-name}@localhost:5432/market-listing-dev?connection_limit=1"

# Auth0
# Custom secret known by server only
AUTH0_SECRET=abc123
# The base url of your application
AUTH0_BASE_URL=http://localhost:3000
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=https://dev-12345.us.auth0.com
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=def456
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=12345678abcdefg
```

To confirm the database is setup correctly and to create your initial DB, run: `npx prisma db push`

The values for the Auth0 secrets can be retrieved from the Auth0 dashboard (or ask a dev on the team)

Once local variables are setup, you can run the app from the root of the directory:
```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project Structure

### Next.js Basics
The basic structure of the repo follows the standard structure of a [Next.js](https://nextjs.org/docs) project.

### Lib
`lib` is where most _non-react-component_ code lives. There is an onion architecture layered in the following way (starting from center and going out)

* The `db` directory contains the [Prisma](https://www.prisma.io/) Schema file which is used for generating ORM, defining the DB tables, etc.

* The `domains` directory contains methods pertaining to core business logic and services. There are no references to Next.js API routes, react components, etc. Methods in `domains` interface with the Prisma ORM to read and write to the database and [Nextjs-auth0](https://github.com/auth0/nextjs-auth0) sessions to extract user data (and in the future other 3rd party services). (Note: Because Next.js blurs the line between front and back-end, methods in this directory could be called directly from Next.js Pages via methods like [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), when data does not require authentication)

* The `apiRoutes` directory contains methods for handling Next.js API Route requests. It is responsible for mapping requests from Next.js API Route controllers (found in `pages/api/`) to core logic in `domains`. 

* The `apiClients` directory contains methods _used within the react app_ for interacting with Next.js APIs (and possibly other data sources in the future). SWR is used for querying and caching data. 

* The `mui` directory contains some helper functions and the UI Theme file for [MUI](https://mui.com/), which is the library we use for React UI components and styling

## Services
TODO: add info about services (Auth0)
See *Deployment* section of this doc for more info about infrastructure services.

## Environments
TODO: add info about environements (dev/prod)

## Deployment

The Next.js app is deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). Automatic deployments are setup through a connection between Vercel and Github.

The PostgreSQL database is deployed to [Heorku](https://heroku.com). Deploying/configuring infrastructure and running migrations is currently _not_ managed through automatic deployments. This can be done through a CLI or the Heroku dashboard. 

TODO: add more info about Heroku deployments.  

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

