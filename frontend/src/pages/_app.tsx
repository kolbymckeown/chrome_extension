import { queryClient } from '@/hooks/use-query';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@/providers/auth.provider';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <AuthProvider />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  );
}
