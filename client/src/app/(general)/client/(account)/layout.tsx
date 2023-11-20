import Template from './templateLayout'

interface Props {
  children: React.ReactNode
}

const SettingsLayout = ({ children }: Props) => (
  <>
    <Template title='Facturacion de la cuenta' aceptedPath='/client/billing'>
      {children}
    </Template>
    <Template title='Configuracion de la cuenta' aceptedPath='/client/settings'>
      {children}
    </Template>
  </>
)

export default SettingsLayout
