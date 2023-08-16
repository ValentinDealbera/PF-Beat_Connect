import Template from "./templateLayout";

type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <>
      <Template title="Facturacion de la cuenta" aceptedPath="/client/billing">
        {children}
      </Template>
      <Template
        title="Configuracion de la cuenta"
        aceptedPath="/client/settings"
      >
        {children}
      </Template>
    </>
  );
}
