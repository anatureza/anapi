<h1 align="center">
  <br>
  <a href="https://www.instagram.com/osamantesdanatureza/"><img src="https://i.imgur.com/CYvCLum.jpg" title="Os Amantes da Natureza" width="200" style="border-radius:8px"/></a>
  <br>
  anapi
  <br>
</h1>

<h4 align="center">The API to publish andd manage animals and adoptions for the <a href="https://www.instagram.com/osamantesdanatureza/" target="_blank">Amantes da Natureza</a>.</h4>

<p align="center">
  <a href="https://github.com/anatureza/anapi/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/anatureza/anapi?style=for-the-badge"
    alt="License - MIT">
  </a>
</p>

<p align="center">
  <a href="#getting-started">Getting started</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#credits">Credits</a>
</p>

![Screenshot](https://i.imgur.com/P89AdDi.png)

# Getting started

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. If you feel like, you can install [yarn](https://classic.yarnpkg.com/en/docs/install/) globally to use alongside or instead of npm. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/anatureza/anapi.git

# Go into the repository
$ cd anapi

# Install dependencies
$ yarn install
```

## Environment variables

### Database

In order to establish a connection with the database you have to create a `.env` file in the root folder and follow this template where I'm using a PostgreSQL DB:

```
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=database_name
```

> Note: If you have any doubt about connecting to the database or you'd like to use another DB, you should see [TypeORM connection docs](https://typeorm.io/#/connection)

### JWT

You also need to generate a MD5 Hash Code in order to run JWT Authentication.

- You can generate a MD5 Hash [here](https://www.md5hashgenerator.com)
- Add the hash you generated in the `.env` file you created:

```
# JWT_Secret
JWT_SECRET=generated_md5_hash_here
```

## Run the app

```bash
# Run migrations
yarn typeorm migration:run

# Run the app
$ yarn dev
```

Now the app will be running on `http://localhost:3000`

# Technologies

This project is being developed with the following technologies:

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [Insomnia](https://insomnia.rest/)
- [JSONWebToken](https://github.com/auth0/node-jsonwebtoken#readme)

# License

This project is under the [MIT](https://github.com/anatureza/anapi/blob/main/LICENSE) license

# Credits

- Thanks [@amitmerchant1990](https://github.com/amitmerchant1990) for the README template
