import Head from "next/head";
import Footers from "./componnents/Footers";
import Navbar from "./componnents/Navbar";
import CoinFlip from "./pages/CoinFlip";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vent Flip - Steamland</title>
        <meta
          name="description"
          content="Vent Flip is an interesting game that combines elements from coin tossing games with a futuristic twist and a unique fantasy world. This game is a bro project created by the Steamland team
          interacts with the solana blockchain and is dedicated to providing a fun and challenging gaming experience for its players."
        />
      </Head>
      <div>
        <Navbar />
        <CoinFlip />
        <Footers />
      </div>
    </div>
  );
}
