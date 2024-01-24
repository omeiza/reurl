import "../utils/env.util";
import * as crypto from "crypto";

export const generateRandomString = (strLen: number): string => {
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

	return '';
}

export const hash = (str: string): string => {
	if (str.trim().length > 0 && process.env.HASH_ALGO && process.env.HASHING_SECRET) {
		return crypto.createHmac(process.env.HASH_ALGO, process.env.HASHING_SECRET).update(str).digest('hex');
	}

	return crypto.createHmac("sha256", "imagineDragon").update(str).digest('hex');
}

export const generateKey = (count: number = 32): string => {
	return (new Date()).getTime().toString(36) + generateRandomString(count);
}

export const uniqueID = (count: number): string => {
	return generateRandomString(count);
}