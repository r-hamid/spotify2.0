import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import spotifyApi from "../lib/Spotify";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if(session) {
      if(session.error === "RefreshAccessTokenError") {
        signIn();
      }
    }

    spotifyApi.setAccessToken(session?.user.accessToken);
  }, [session])

  return spotifyApi;
}

export default useSpotify;
