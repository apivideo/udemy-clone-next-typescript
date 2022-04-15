import { GlobalStyle } from '../styles/globalStyles.js';
import AuthProvider from '@components/Providers/Auth';
import React from 'react';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Udemy clone | api.video</title>
        <link rel="icon" href="/udemy-clone.svg" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
