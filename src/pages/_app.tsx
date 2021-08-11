import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import { GeneralOrientationProvider } from '../hooks/useGeneralOrientationsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <GeneralOrientationProvider>
        <Component {...pageProps} />
      </GeneralOrientationProvider>
    </ChakraProvider>
  )
}

export default MyApp
