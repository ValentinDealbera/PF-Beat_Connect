import './globals.scss'
import Provider from '@/context/providers/redux.provider'
import Querier from '@/services/querier.service'

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
