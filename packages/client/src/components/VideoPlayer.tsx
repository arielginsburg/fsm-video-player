import React, { useState, useRef, useEffect, useCallback } from "react";
import { playerFSM, PlayerState } from "../fsm/playerFSM";
import { volumeFSM, VolumeState } from "../fsm/volumeFSM";
import { Video } from "../App";
import PlayerControls from "./PlayerControls";

export interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(
    playerFSM.getState()
  );
  const [volumeState, setVolumeState] = useState<VolumeState>(
    volumeFSM.getState()
  );
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onPlaying = () => {
    playerFSM.transition({ type: "PLAY" });
    setPlayerState(playerFSM.getState());
  };

  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime || 0);
  };

  const onPause = () => {
    playerFSM.transition({ type: "PAUSE" });
    setPlayerState(playerFSM.getState());
  };

  const onVolumeChange = () => {
    if (videoRef.current) {
      if (videoRef.current.muted || videoRef.current.volume === 0) {
        volumeFSM.transition({ type: "MUTE" });
        setVolumeState(volumeFSM.getState());
      } else {
        volumeFSM.transition({ type: "UNMUTE" });
        setVolumeState(volumeFSM.getState());
      }
    }
  };

  const onSeeking = () => {
    playerFSM.transition({ type: "SEEKING" });
    setPlayerState(playerFSM.getState());
  };

  const onSeeked = () => {
    playerFSM.transition({ type: "SEEKED" });
    setPlayerState(playerFSM.getState());
  };

  const play = () => {
    videoRef.current?.play().catch(() => {
      const videoElement = videoRef.current as HTMLVideoElement;

      if (!videoElement.muted) {
        videoElement.muted = true;
        videoElement.play().catch(() => {
          videoElement.muted = false;
        });
      }
    });
  };

  const pause = () => {
    videoRef.current?.pause();
  };

  const togglePlay = useCallback(
    () => (playerFSM.getState() === "playing" ? pause() : play()),
    []
  );

  const mute = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  const unmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const toggleMute = useCallback(
    () => (volumeFSM.getState() === "muted" ? unmute() : mute()),
    []
  );

  const onError = () => {
    playerFSM.transition({ type: "ERROR" });
    setPlayerState(playerFSM.getState());
  };

  const updateCurrentTime = useCallback((currentTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className="group/video-player relative w-full h-full">
      <video
        className="w-full h-full"
        role="video"
        ref={videoRef}
        src={video.fileUrl}
        onLoadedData={play}
        onPlaying={onPlaying}
        onTimeUpdate={onTimeUpdate}
        onPause={onPause}
        onVolumeChange={onVolumeChange}
        onSeeking={onSeeking}
        onSeeked={onSeeked}
        onError={onError}
      />
      <div className="absolute top-2 left-2 rounded-md p-2 text-white text-[10px] font-mono bg-[rgba(0,0,0,0.5)]">
        <div>{`player state: ${playerState}`}</div>
        <div>{`volume state: ${volumeState}`}</div>
      </div>
      <div className="absolute bottom-2 box-border px-[10%] w-full max-w-[1000px] opacity-0 transition-[opacity] ease-in-out duration-500 group-hover/video-player:opacity-100">
        <PlayerControls
          playerState={playerState}
          volumeState={volumeState}
          duration={video.duration}
          currentTime={currentTime}
          togglePlay={togglePlay}
          toggleMute={toggleMute}
          updateCurrentTime={updateCurrentTime}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
