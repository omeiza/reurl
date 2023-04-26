/**
 * Helper methods
 * Author: https://github.com/omeiza
 */

require('../utils/env.util');
const crypto = require('crypto');
const helpers = {};

/**
 * generateRandomString
 * @param strLen
 * @return {boolean|string}
 */
helpers.generateRandomString = (strLen) => {
	strLen = typeof(strLen) === 'number' && strLen > 0 ? strLen : false;

	if (strLen) {
		const charToPickFrom = process.env.CHAR_TO_PICKFROM;

		let str = '';
		for (let i = 1; i <= strLen; i++) {
			const randomNumber = charToPickFrom.charAt(Math.random() * charToPickFrom.length);
			str += randomNumber;
		}

		return str;
	}

	return false;
}

/**
 * hash to help generate password hash
 * @param str
 * @return {boolean|string}
 */
helpers.hash = (str) => {
	if (typeof(str) === 'string' && str.trim().length > 0) {
		return crypto.createHmac(process.env.HASH_ALGO, process.env.HASHING_SECRET).update(str).digest('hex');
	}

	return false;
}

/**
 * generateKey
 * @param count
 * @return {string}
 */
helpers.generateKey = (count = 32) => {
	return (new Date()).getTime().toString(36) + helpers.generateRandomString(count);
}

/**
 * @TODO: Ensure ID generated is unique
 * @param count
 * @return {boolean|string}
 */
helpers.uniqueID = (count) => {
	return helpers.generateRandomString(count);
}

module.exports = helpers;