import { GlobalStyle } from "../styles/globalStyles.js";
import AuthProvider from '@components/Providers/Auth';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
