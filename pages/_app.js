// pages/_app.js
import '@/styles/globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Add next/image optimization hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image:width" content="150" />
        <meta property="og:image:height" content="50" />
      </Head>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;