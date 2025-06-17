import React, { FC } from 'react'
// import { Provider } from 'react-redux'
import { AppProps } from 'next/app'
// import { store } from '../src/redux/store'
import Head from 'next/head'
// import '../src/styles/_reset.scss'
// import '../src/styles/fonts.scss'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
	return (
		// <Provider store={store}>
		<>
			<Head>
				<title>Hive App</title>
			</Head>
			<Component {...pageProps} />
			{/* </Provider> */}
		</>
	)
}
export default MyApp
