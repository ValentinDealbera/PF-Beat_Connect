import "@/styles/globals.scss";
import { Header, Footer, Master, HOC } from "@/components";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from 'next-themes';

import { Toaster, toast } from "sonner";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from 'next-themes';
import i18next from "i18next";
import global_es from "../lenguage/es/global.json";
import global_en from "../lenguage/en/global.json";


i18next.init({
  interpolation: {
    escapeValue: false
  },
  lng: "es",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

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
        

            <ThemeProvider attribute="class">
            <I18nextProvider i18n={i18next}>
              {headerVisibility && <Header />}
              <Master>
                <Toaster position="bottom-left" />
                <Component {...pageProps} />
              </Master>
              {headerVisibility && <Footer mode={mode} />}
            </I18nextProvider>
              </ThemeProvider>

          </HOC>
        </PersistGate>
      </Provider>
    </>
  );
}
