'use client'
import React from 'react'
import { Profile } from '../components/profile'
import { ProviderSession } from '../providers/session'

const Index = () => {
	return (
		<ProviderSession>
			<Profile />
		</ProviderSession>
	)
}

export default Index
