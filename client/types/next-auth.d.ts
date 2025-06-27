import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface User {
		data: {
			id: string
			name?: string | null
			email?: string | null
			image?: string | null
			lastName?: string
			phone?: string
			token?: string
		}
	}

	interface Session {
		user: User
	}
}
