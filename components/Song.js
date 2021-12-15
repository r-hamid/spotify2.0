import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { currentTrackIdState } from "../atoms/songs.atom";

const Song = ({ order, track }) => {
  const [track_duration, setTrackDuration] = useState("");
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);

  const { id, name, album, artists, duration_ms } = track;
  const { name: albumTitle, images } = album;
  const { url: track_cover } = images[0];

  useEffect(() => {
    let seconds = duration_ms / 1000;
    const minutes = seconds / 60;
    seconds = seconds % 60;
    setTrackDuration(`${("0"+minutes.toFixed(0)).slice(-2)}:${("0"+seconds.toFixed(0)).slice(-2)}`);
  }, [duration_ms]);

  const selectTrack = () => {
    setCurrentTrackId(id);
  };

  return (
    <>
      <div onClick={selectTrack} className="grid grid-cols-2 mx-5 my-3 text-gray-500 hover:bg-gray-800 rounded-lg p-3 cursor-pointer">
        <div className="flex space-x-4 items-center">
          <p>{order}</p>
          <div>
            <img className="h-10" src={track_cover} alt="track cover" />
          </div>
          <div> 
            <p className="text-lg text-white w-40 md:w-72 lg:w-96 truncate">{name}</p>
            <p className="text-sm">
              {artists?.map(({ name: artist }) => artist).join(", ")}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0">
          <p className="text-sm w-40 md:w-72 lg:w-96 truncate hidden md:inline">{albumTitle}</p>
          <p>{track_duration}</p>
        </div>
      </div>
      <hr className="border-t-[0.1px] border-gray-900" />
    </>
  );
}

export default Song;
