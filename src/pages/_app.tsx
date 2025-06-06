import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { config } from '@/web3/config';

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
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Toaster theme='dark' />
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
