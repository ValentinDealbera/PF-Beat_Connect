import "@/styles/globals.scss";
import { Header, Footer, Master, HOC } from "@/components";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster, toast } from 'sonner'
import { ThemeProvider } from 'next-themes';


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
          <HOC>
          <ThemeProvider attribute="class">
          {headerVisibility && <Header />}
          <Master>
          <Toaster position="bottom-left" />
          <Component {...pageProps} />
          </Master>
          {headerVisibility && <Footer mode={mode} />}
          </ThemeProvider>
          </HOC>
        </PersistGate>
      </Provider>
    </>
  );
}
