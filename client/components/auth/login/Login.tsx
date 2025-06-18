'use client'
import { signIn } from 'next-auth/react'

export const Login = () => {
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const formData = new FormData(
			e.target as HTMLFormElement
		)

		const result = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		})

		if (result?.error) {
			alert(result.error)
		} else {
			window.location.href = '/profile'
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='max-w-sm mx-auto mt-10'
		>
			<input
				name='email'
				type='email'
				placeholder='Email'
				required
				className='w-full p-2 mb-3 border rounded'
			/>
			<input
				name='password'
				type='password'
				placeholder='Password'
				required
				className='w-full p-2 mb-3 border rounded'
			/>
			<button
				type='submit'
				className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600'
			>
				Sign In
			</button>
		</form>
	)
}
