import React, { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  ReplyIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";

import useSpotify from "../hooks/useSpotify";
import useSongInfo from "../hooks/useSongInfo";
import { currentTrackIdState, isPlayingState } from "../atoms/songs.atom";

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = async () => {
    if(!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(({ body: song }) => {
        const { item: currentTrack, is_playing } = song;
        if(currentTrack) {
          const { id } = currentTrack;
          setIsPlaying(is_playing);
          setCurrentTrackId(id);
        }
      });
    }
  };

  useEffect(() => {
    if(spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(30);
    }
  }, [songInfo, currentTrackIdState, spotifyApi]);

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(({ body: playbackState }) => {
      const { is_playing } = playbackState;
      if(is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if(volume > 0 && volume < 100) {
      debounceAdjustVolume(volume);
    }
  }, [volume]);

  const debounceAdjustVolume = useCallback(
    debounce((volume) => {
      console.log("hello there");
      spotifyApi.setVolume(volume);
    }, 500),
    []
  );

  return (
    <div
      className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3
      text-xs md:text-base px-2 md:px-8"
    >
      {/* Left Hand Side Section  */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0].url}
          alt="Song Info Cover"
        />

        <div>
          <h3>{songInfo?.name}</h3>
          <p>
            {songInfo?.artists?.map(({ name: artist }) => artist).join(", ")}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="playerBtn" />
        <RewindIcon className="playerBtn" />
        
        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="playerBtn w-12 h-12" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="playerBtn w-12 h-12" />
        )}

        <FastForwardIcon className="playerBtn" />
        <ReplyIcon className="playerBtn" />
      </div>

      <div className="flex items-center justify-end space-x-2 md:space-x-4">
        <VolumeOffIcon onClick={() => volume > 0 && setVolume(0)} className="playerBtn" />
        <input
          type="range" value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="w-14 md:w-28" min={0} max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 91 && setVolume(volume => volume + 10)}
          className="playerBtn"
        />
      </div>
    </div>
  );
}

export default Player;
