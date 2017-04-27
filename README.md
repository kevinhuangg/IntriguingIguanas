# Root.io

> A singular platform that integrates all the tools necessary for live and remote collaboration

## Team

  - Christine Dey
  - Kevin Huang
  - Allen Le
  - Enoch Kim

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Installing Dependencies](  #installing-dependencies)
1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Server/Database Setup
The `database/db` folder contains data that we need for both development and backend tests. With `knex` installed, you can refer to the commands in this link(http://mherman.org/blog/2016/04/28/test-driven-development-with-node/#.WNqmIHQrJo5) to create the tables and fill in data (No need to create schema and dummy data again). Make sure you have created the databases (psql), following tables, and migrate the migration script in `database/db/migrations`, and seed the data from `database/db/seeds`.
```sh
knex migrate:latest --env development
knex seed:run --env development
```

To have access to the sessions table, run:
```sh
psql rootsdb < node_modules/connect-pg-simple/table.sql
```
## Contributing

See [CONTRIBUTING.md](https://github.com/IntriguingIguanas/IntriguingIguanas/blob/master/STYLE-GUIDE.md) for contribution guidelines.
