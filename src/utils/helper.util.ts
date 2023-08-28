/**
 * Helper/Utility functions
 * Author: https://github.com/omeiza
 */

require('../utils/env.util');
import * as crypto from "crypto";

/**
 * generateRandomString
 * @param strLen
 * @return {boolean|string}
 */
export const generateRandomString = (strLen: number): string | boolean => {
	let isStrLen = strLen > 0 ? strLen : false;

	if (isStrLen) {
		const charToPickFrom: string | undefined = process.env.CHAR_TO_PICKFROM;
		if (charToPickFrom) {
			let str = '';
			for (let i = 1; i <= strLen; i++) {
				const randomNumber = charToPickFrom.charAt(Math.random() * charToPickFrom.length);
				str += randomNumber;
			}

			return str;
		}
	}

	return false;
}

/**
 * hash to help generate password hash
 * @param str
 * @return { boolean|string }
 */
export const hash = (str: string): string | boolean | undefined => {
	if (str.trim().length > 0 && process.env.HASH_ALGO && process.env.HASHING_SECRET) {
		return crypto.createHmac(process.env.HASH_ALGO, process.env.HASHING_SECRET).update(str).digest('hex');
	}

	return false;
}

/**
 * generateKey
 * @param count
 * @return { string }
 */
export const generateKey = (count: number = 32): string => {
	return (new Date()).getTime().toString(36) + generateRandomString(count);
}

/**
 * @TODO: Ensure ID generated is unique
 * @param count
 * @return { boolean|string }
 */
export const uniqueID = (count: number): string | boolean => {
	return generateRandomString(count);
}