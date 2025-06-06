import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AppLayout } from '@/layout/AppLayout';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchInterval: 1000 * 30, // 30 seconds
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster theme='dark' />
        <AppLayout>
          {/* This is where the main content of the app will be rendered */}
          <Component {...pageProps} />
        </AppLayout>
      </QueryClientProvider>
    </WalletProvider>
  );
}
