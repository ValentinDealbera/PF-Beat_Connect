import '@/styles/globals.scss'
import { Header } from '@/components'
import { Provider } from 'react-redux'
import store,{persistor} from '@/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return (
    <>
     <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <Header/>
    <Component {...pageProps} />
    </PersistGate>
      </Provider>
    </>
    )
}