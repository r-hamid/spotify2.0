import React from "react";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <>
      <Head>
        <title> Listening is everything | Spotify 2.0 </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col bg-black min-h-screen justify-center items-center w-full">
        <img className="w-52 mb-5" src="/logo.png" alt="Spotify logo" />
        {Object.values(providers).map(({ id, name }) => (
          <div key={name}>
            <button
              className="text-white bg-spotify-500 p-5 rounded-full"
              onClick={() => signIn(id, { callbackUrl: "/" })}
            >
              Login with {name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Login;

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers
    }
  };
}