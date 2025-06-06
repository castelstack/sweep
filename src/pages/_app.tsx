import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Toaster } from 'sonner';

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
    <QueryClientProvider client={queryClient}>
      <Toaster theme='dark' />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

// 0xf58ef1fc6b5f0b76100be8f745fe90e6c161d740c443ea589377476eb2210ab9
// a3334d93-8f63-41df-a4b9-124a4976a170
// suiprivkey1qzxju57aqx4hhuhcgu4793s82hlgmtzeu7jpujjta7d9hmhw2c63xvum4ps