export type UserTypes = {
	id: number,
	email: string,
	passwordHash?: string,
	username: string,
	apiKey: string,
	isAdmin: boolean,
	isActive: boolean
}