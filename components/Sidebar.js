import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon
} from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";

import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlist.atom";

const Sidebar = () => {
  const [playlists, setPlaylist] = useState([]);
  const [, setPlaylistId] = useRecoilState(playlistIdState);

  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  useEffect(() => {
    if(spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylist(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 h-screen 
    overflow-y-scroll scrollbar-hide w-52 hidden md:flex">
      <div className="space-y-4">
        <button onClick={() => signOut()} className="flex items-center space-x-2 hover:text-white">
          <p> Logout </p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5" />
          <p> Home </p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5" />
          <p> Search </p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5" />
          <p> Your Library </p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5" />
          <p> Create Playlist </p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5" />
          <p> Liked Songs </p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5" />
          <p> Your Episodes </p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists... */}
        {
          playlists.map((playlist) => {
            const { id, name } = playlist;
            return (
              <div key={id}>
                <p onClick={() => setPlaylistId(id)} className="hover:text-white cursor-pointer">{name}</p>
              </div>
            );
          })
        }
      </div>
    </div>
  )
}

export default Sidebar;
