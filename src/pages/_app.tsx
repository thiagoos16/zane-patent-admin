import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import { GeneralOrientationProvider } from '../hooks/useGeneralOrientationsContext';
import { RequisiteOrientationProvider } from '../hooks/useRequisitesOrientationsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RequisiteOrientationProvider>
      <GeneralOrientationProvider>
        <Component {...pageProps} />
      </GeneralOrientationProvider>
      </RequisiteOrientationProvider>
    </ChakraProvider>
  )
}

export default MyApp
