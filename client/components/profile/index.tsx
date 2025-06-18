'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export const Profile = () => {
	const session = useSession()
	const { data } = session
	return (
		<>
			{session?.data ? (
				<>
					<div>
						<h1>
							Profile
							of{' '}
							{
								data
									?.user
									?.name
							}
						</h1>
						{data
							?.user
							?.image && (
								<img
									src={
										data
											.user
											.image
									}
									alt=''
								/>
							)}
					</div>
					<Link
						href='#'
						onClick={() =>
							signOut(
								{
									callbackUrl: '/',
								}
							)
						}
					>
						Sign Out
					</Link>
				</>
			) : (
				<Link
					href='#'
					onClick={() =>
						signIn()
					}
				>
					Sign In
				</Link>
			)}
		</>
	)
}
