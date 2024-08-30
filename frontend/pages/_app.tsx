import '../styles/globals.scss'; // Caminho correto para o arquivo SCSS
import { AppProps } from 'next/app'; // Importa o tipo AppProps
import { IBM_Plex_Sans } from "next/font/google";
import Head from "next/head";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={ibmPlexSans.className}>
      <Head>
        <link rel="icon" href="/assets/birds.png" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
