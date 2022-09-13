import type { AppProps } from 'next/app'

import Head from 'next/head'

import '../stylesheets/application.css'

function App({ Component, pageProps }: AppProps) {
  return <>
      <Head>
        <title>NextNewsletter 🚀</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app-content">
        <Component {...pageProps} />
      </main>
    </>
}

export default App
