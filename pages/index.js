import Head from "next/head";
import { getSession } from "next-auth/react";

import Sidebar from "../components/Sidebar";
import Body from "../components/Body";
import Player from "../components/Player";

export default function Home() {
  return (
    <>
      <Head>
        <title> Listening is everything | Spotify 2.0 </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Body />
        </main>

        <footer className="sticky bottom-0 w-full">
          <Player />
        </footer>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  };
}