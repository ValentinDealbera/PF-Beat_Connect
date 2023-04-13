import "@/styles/globals.scss";
import { Header, Footer } from "@/components";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps, router }) {
  const mode = !router.pathname.startsWith("/client/seller") ? 'transparent' : 'light';
  const headerVisibility = router.pathname.startsWith("/auth") ? false : true;
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
       {headerVisibility && <Header />}
          <Component {...pageProps} />
          <Footer mode={mode} />
        </PersistGate>
      </Provider>
    </>
  );
}
