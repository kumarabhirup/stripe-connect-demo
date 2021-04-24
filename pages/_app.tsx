import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { appTitle } from '@/constants';
import { DefaultSeoProps, DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import BaseThemeProvider from '@/components/BaseThemeProvider';

const getDefaultSeoConfig = (pathname: string): DefaultSeoProps => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}${pathname}`;
  const title = appTitle;
  const description = `${appTitle} will help programmers learn how Stripe Connect OAuth Process works with React.`;
  return {
    title,
    canonical: url,
    description,
    openGraph: {
      url,
      title,
      type: 'website',
      description,
      site_name: appTitle,
    },
    additionalMetaTags: [{ name: 'application-name', content: title }],
  };
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...getDefaultSeoConfig(router.pathname)} />
      <BaseThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseThemeProvider>
    </>
  );
};

export default MyApp;
