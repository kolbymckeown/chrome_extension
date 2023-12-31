import { queryClient } from '@/hooks/use-query';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ChakraProvider, Text } from '@chakra-ui/react';
import AuthProvider from '@/providers/auth.provider';
import { ErrorBoundary } from 'react-error-boundary';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function App({ Component, pageProps }: AppProps) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);
  return (
    <ErrorBoundary
      fallback={
        <Text color="red.500" fontSize="xl">
          Something went wrong...
        </Text>
      }
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <div suppressHydrationWarning>
              <AuthProvider />
              {typeof window === 'undefined' ? null : render ? (
                <BrowserRouter>
                  <Component {...pageProps} />
                </BrowserRouter>
              ) : null}
            </div>
          </ChakraProvider>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
