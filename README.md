# URL Shortener
Node.js backend web services for a URL shortener. This was created for learning purpose and can be used as such by anyone 😊.

## 🧰 Tools
-   Node.js (v18.2)
-   Sequelize ORM (v6)
-   MySQL (v8)
-   Passport JS

## ⚒️ Setup
If you want to run this site locally:

-   Make sure you have [Node](https://nodejs.org/en/download) and [MySQL](https://formulae.brew.sh/formula/mysql) installed
-   `git clone https://github.com/omeiza/shortner-backend-node.git`
-   Run `npm install` to install dependencies from package.json
-   Set up your MySQL database

## ⚙️ Configuration
In the project root folder, create a `.env.development` file and add the following and their values `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`, `HASHING_SECRET`, `HASH_ALGO` (`md5`, `sha256`, or `sha3-256`), and `CHAR_TO_PICKFROM`, which could be `abcdefghijklmnopqrstuvwxyz0123456789`.

To get the social login (Twitter & Google) to work, the following keys need to be setup in the .env file as well: `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`, `TWITTER_CALLBACK_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_CALLBACK_UR`

## 🏃 Run application
-   Run `npm run sync` to create the required database tables 
-   Run `npm run dev`
-   Let's go!

## Info
This project has been moved and continued using python at [reurl.app](https://github.com/omeiza/reurl.app)

