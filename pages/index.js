import Head from "next/head";

import Sidebar from "../components/Sidebar";
import Body from "../components/Body";

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

        <footer>
          {/* Footer Content */}
        </footer>
      </div>
    </>
  )
}
