import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
