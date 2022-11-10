import type { AppProps } from "next/app";
import { SnackbarProvider } from "notistack";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
