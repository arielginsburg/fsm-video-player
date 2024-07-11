import { PlayerState } from "../fsm/playerFSM";
import { VolumeState } from "../fsm/volumeFSM";
import PlayIcon from "../assets/play.svg?react";
import PauseIcon from "../assets/pause.svg?react";
import VolumeIcon from "../assets/volume.svg?react";
import UnmuteIcon from "../assets/unmute.svg?react";
import { formatTime } from "../utils";
import { useRef } from "react";

export interface PlayerControlsProps {
  playerState: PlayerState;
  volumeState: VolumeState;
  duration: number;
  currentTime: number;
  togglePlay: () => void;
  toggleMute: () => void;
  updateCurrentTime: (time: number) => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  playerState,
  volumeState,
  duration,
  currentTime,
  togglePlay,
  toggleMute,
  updateCurrentTime,
}) => {
  const seeking = useRef(false);
  const getSeekTime = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * duration;

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    seeking.current = true;
    updateCurrentTime(getSeekTime(e));
  };

  const onMouseUp = () => {
    seeking.current = false;
  };

  const onMouseLeave = () => {
    seeking.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (seeking.current) {
      updateCurrentTime(getSeekTime(e));
    }
  };

  return (
    <div className="h-10 flex">
      <div className="w-[46px] h-full bg-[rgba(0,0,0,0.5)] rounded-tl-[20px] rounded-bl-[20px]">
        <div
          className="group w-8 h-8 rounded-2xl border-4 border-solid border-white m-1 flex items-center justify-center cursor-pointer"
          onClick={togglePlay}
        >
          {playerState === "playing" ? (
            <PauseIcon className="w-[15px] h-[15px] fill-white group-hover:fill-intuit" />
          ) : (
            <PlayIcon className="relative left-[1px] w-[9px] h-[9px] fill-white group-hover:fill-intuit" />
          )}
        </div>
      </div>
      <div
        className="flex flex-col flex-wrap flex-1 h-full"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="flex-1 bg-[rgba(0,0,0,0.5)]"></div>
        <div className="h-1">
          <div
            role="progressbar"
            className="relative h-full bg-intuit"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          >
            <div className="absolute -top-1 -right-1.5 w-3 h-3 rounded-md bg-white pointer-events-none"></div>
          </div>
        </div>
        <div className="flex flex-1 items-center font-sans text-white text-[9px] bg-[rgba(0,0,0,0.5)] select-none">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      <div className="h-full bg-[rgba(0,0,0,0.5)] rounded-tr-[20px] rounded-br-[20px]">
        <div
          className="group w-5 h-5 m-2.5 cursor-pointer"
          onClick={toggleMute}
        >
          {volumeState === "muted" ? (
            <UnmuteIcon className="w-full h-full fill-white group-hover:fill-intuit" />
          ) : (
            <VolumeIcon className="w-full h-full fill-white group-hover:fill-intuit" />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
