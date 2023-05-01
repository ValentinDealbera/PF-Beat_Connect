import "@/styles/globals.scss";
import { Header, Footer, Master, HOC, AdminHeaderBar } from "@/components";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "../lenguage/es/global.json";
import global_en from "../lenguage/en/global.json";

i18next.init({
  interpolation: {
    escapeValue: false,
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
            <I18nextProvider i18n={i18next}>
              <AdminHeaderBar />
              {headerVisibility && <Header />}
              <Master>
                <Toaster
                  position="bottom-left"
                  toastOptions={{
                    className: "max-w-[85vw] xs:max-w-none ",
                  }}
                />
                <Component {...pageProps} />
              </Master>
              {headerVisibility && <Footer mode={mode} />}
            </I18nextProvider>
          </HOC>
        </PersistGate>
      </Provider>
    </>
  );
}
