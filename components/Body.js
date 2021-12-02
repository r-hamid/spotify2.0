import React, { useState, useEffect } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { playlistIdState, playlistState } from "../atoms/playlist.atom";
import useSpotify from "../hooks/useSpotify";

import Songs from "../components/Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500"
];

const Body = () => {
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const playlistId = useRecoilValue(playlistIdState);
  const [color, setColor] = useState(null);
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop());
    console.log(`Selected Playlist: ${playlistId}`);

    if(spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log("Something went wrong >>>>> ", err))
    }
  }, [playlistId, spotifyApi, session]);

  return (
    <div className="flex-grow text-gray-300 h-screen overflow-y-scroll scrollbar-hide">

      <header
        className="absolute top-5 right-8 bg-black text-gray-200 cursor-pointer rounded-full
        flex items-center space-x-3 p-1 pr-2 hover:opacity-90"
      >
        <img className="rounded-full w-10" src={session?.user.image} alt="Profile picture" />
        <p> {session?.user.name} </p>
        <ChevronDownIcon className="w-5" />
      </header>

      <div
        className={`flex w-full items-end space-x-7 bg-gradient-to-b to-black ${color} h-80
        text-white p-8`}
      >
        <img className="h-44 shadow-2xl" src={playlist?.images?.[0].url} alt="Playlist image" />
        <div>
          <p>Playlist</p>
          <h1 className="text-xl sm:text-2xl lg:text-4xl">{playlist?.name}</h1>
        </div>
      </div>

      <div>
        <Songs />
      </div>

    </div>
  );
}

export default Body;
