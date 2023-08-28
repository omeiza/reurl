import { UserTypes } from "./user";

export type LinkTypes = {
	id: string,
	user: UserTypes,
	title: string,
	longUrl: string,
	shortUrl: string,
	customUrl: string,
	viewCount: number,
	status: string
}