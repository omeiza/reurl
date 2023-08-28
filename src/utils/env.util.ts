/**
 * Get application environment + env file to use
 * Author: https://github.com/omeiza
 */

if (!(process.env.NODE_ENV === 'production')) {
    console.log(`Environment is ${process.env.NODE_ENV}`);
    const path = `.env.${process.env.NODE_ENV}`;
    require('dotenv').config({path: __dirname + '/../../' + path});
}