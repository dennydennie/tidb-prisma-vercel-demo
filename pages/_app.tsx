import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
