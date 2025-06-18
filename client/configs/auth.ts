import type { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { emit } from 'process'

export const authConfig: AuthOptions = {
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Credentials({
			credentials: {
				email: {
					label: 'email',
					type: 'email',
					required: true,
				},
				password: {
					label: 'password',
					type: 'password',
					required: true,
				},
			},
			async authorize(credentials) {
				try {
					// 1. Отправляем запрос к вашему API
					const response =
						await fetch(
							'http://localhost:3333/auth/login',
							{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify(
									credentials
								),
							}
						)

					// 2. Обрабатываем ответ
					if (!response.ok)
						return null

					const user =
						await response.json()
					// 3. Возвращаем данные пользователя
					return {
						id: user.id,
						email: user.email,
						name: user.name, // Опционально
					}
				} catch (error) {
					console.error(
						'Auth error:',
						error
					)
					return null
				}
			},
		}),
	],
}
