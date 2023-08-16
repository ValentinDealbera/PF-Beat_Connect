"use client";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import global_es from "../lenguage/es/global.json";
import global_en from "../lenguage/en/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import SecurityHOC from "./securityHoc";

interface Props {
  children: React.ReactNode;
}

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

export default function AppProvider({ children }: Props) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18next}>
            <Toaster
              richColors
              position="bottom-left"
              toastOptions={{
                className: "max-w-[85vw] xs:max-w-none z-50 ",
              }}
            />
            <SecurityHOC >
            {children}
            </SecurityHOC>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
