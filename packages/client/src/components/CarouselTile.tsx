import { Video } from "../App";
import PlayIcon from "../assets/play.svg?react";
import { formatTime } from "../utils";

export interface CarouselTileProps {
  video: Video;
  selectedVideoId: number;
  onCarouselTileClick: (id: number) => void;
}

const CarouselTile: React.FC<CarouselTileProps> = ({
  video,
  selectedVideoId,
  onCarouselTileClick,
}) => {
  return (
    <div
      className="flex flex-col gap-3 h-[206px] p-1.5 xl:w-[371px] xl:h-[82px] xl:flex-row xl:py-0 xl:pl-5 xl:pr-0 xl:items-center xl:flex-grow-0 xl:flex-shrink-0 hover:bg-zinc-800 cursor-pointer"
      onClick={() => onCarouselTileClick(video.id)}
    >
      <div
        role="img"
        className="w-36 h-[108px] relative xl:w-[80px] xl:h-[60px] bg-center bg-cover"
        style={{
          backgroundImage: `url(${video?.thumbnail})`,
        }}
      >
        {video?.id === selectedVideoId ? (
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-[15px] leading-[108px] tracking-[1px] xl:text-[11px] xl:leading-[60px] xl:tracking-[0.5px] font-proximaNovaCondBld text-center align-middle text-intuit [text-shadow:_0_0_2px_black]">
            NOW PLAYING
          </div>
        ) : (
          <div className="absolute flex items-center justify-center w-[32px] h-[32px] bottom-2.5 xl:bottom-[5px] left-2.5 xl:left-[5px] xl:w-[22px] xl:h-[22px] rounded-3xl border xl:border-[1.5px] border-solid border-intuit bg-[rgba(0,0,0,0.7)]">
            <PlayIcon className="relative w-2 xl:w-[5px] left-[1px] fill-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-1 xl:h-[60px]">
        <div className="font-proximaNova font-bold text-[15px] tracking-[.2px] text-white text-balance overflow-scroll flex-1 xl:text-[16px] leading-[1.2] xl:tracking-[.3px] xl:align-top xl:mt-0">
          {video?.title}
        </div>
        <div className="font-proximaNova text-[9px] leading-[9px] text-white">
          {formatTime(video?.duration)}
        </div>
      </div>
    </div>
  );
};

export default CarouselTile;
