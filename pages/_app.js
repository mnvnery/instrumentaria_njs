import Header from '../components/Header'
import '../styles/globals.css'
import { AudioPlayerProvider } from '../components/AudioPlayerContext';


function MyApp({ Component, pageProps }) {
  return (
    <AudioPlayerProvider>
      <Component {...pageProps} />
    </AudioPlayerProvider>
  )
}

export default MyApp
