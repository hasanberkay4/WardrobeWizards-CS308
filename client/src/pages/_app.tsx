import { useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { StoreProvider } from "../context/Store"
import { AuthProvider } from '../context/Auth';
import { AdminAuthProvider } from '../context/AdminAuth';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require('preline')
  }, [])

  return (
    <StoreProvider>
      <AuthProvider>
        <AdminAuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AdminAuthProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
