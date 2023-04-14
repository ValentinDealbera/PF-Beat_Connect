import "@/styles/globals.scss";
import { Header, Footer, Master } from "@/components";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster, toast } from 'sonner'


export default function App({ Component, pageProps, router }) {
  const mode = !router.pathname.startsWith("/client/seller")
    ? "transparent"
    : "light";
  const headerVisibility =
    router.pathname.startsWith("/auth") ||
    router.pathname.startsWith("/landing") ||
    router.pathname.startsWith("/admin")
      ? false
      : true;



  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {headerVisibility && <Header />}
          <Master>
          <Toaster position="bottom-left" />
          <Component {...pageProps} />
          </Master>
          <Footer mode={mode} />
        </PersistGate>
      </Provider>
    </>
  );
}
