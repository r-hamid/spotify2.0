import React from "react";
import { useRecoilValue } from "recoil";

import { playlistState } from "../atoms/playlist.atom";

import Song from "./Song";

const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="text-white">
      {
        playlist?.tracks.items.map((song, index) => {
          const { track } = song;
          const { id } = track;
          return (<Song key={id} track={track} order={index+1} />);
        })
      }
    </div>
  )
}

export default Songs;
