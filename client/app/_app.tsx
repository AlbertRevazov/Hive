import React, { FC } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ProviderSession } from '../providers/session'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

const MyApp: FC<AppProps> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<Provider store={store}>
			<Head>
				<title>Hive App</title>
			</Head>
			<Component {...pageProps} />
		</Provider>
	)
}
export default MyApp
