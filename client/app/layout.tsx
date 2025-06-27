'use client';
import { ProviderSession } from '../providers/session';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>Hive App</title>
      </Head>
      <body>
        <ProviderSession>
          <Provider store={store}>
            root layout
            <main className="container">{children}</main>
          </Provider>
        </ProviderSession>
      </body>
    </html>
  );
}
