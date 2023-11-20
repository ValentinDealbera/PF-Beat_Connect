import './globals.scss'
import Provider from '@/services/provider'
import Querier from '@/services/querier'

interface Props {
  children: React.ReactNode
}

const RootLayout = (props: Props) => (
  <html lang='es'>
    <head />
    <body className=''>
      <Provider>
        <Querier>{props.children}</Querier>
      </Provider>
    </body>
  </html>
)

export default RootLayout
