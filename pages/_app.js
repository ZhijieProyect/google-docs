import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Head from 'next/head';
import { Provider } from "next-auth/client"
import "../styless.css"

// MyApp is constructed by a Head with Style and all Possible component with their properties
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
        />
      </Head>
      
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

/*function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/

export default MyApp;
