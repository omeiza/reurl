# URL Shortener
Node.js backend web services for a URL shortener. It allows user authentication and allow authenticated user to create a URL, edit a URL, and delete a URL.

This was created for learning purpose and can be used as such by anyone.

## Tools
-   Node.js (v18.2)
-   [sequelize ORM (v6)](https://sequelize.org/)
-   MySQL (v8)

## Installation
If you want to run this site locally:

-   Make sure you have [Node](https://nodejs.org/en/download) and [MySQL](https://formulae.brew.sh/formula/mysql) installed
-   `git clone https://github.com/omeiza/shortner-backend-node.git`
-   Run `npm install` to install dependencies
-   Set up your MySQL database

## Configuration
In the project root folder, create a `.env.development` file and add your database/project configuration like below.
```markdown
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=shortener
DB_PORT=3306
HASH_ALGO=MD5
HASHING_SECRET=flyingmonkey
CHAR_TO_PICKFROM=abcdefghijklmnopqrstuvwxyz0123456789
```

## Run application
-   Run `npm run dev`
-   Let's go!
