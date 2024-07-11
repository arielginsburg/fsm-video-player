import { Video } from "../App";
import CarouselTile from "./CarouselTile";

export interface VideoCarouselProps {
  videos: Video[];
  selectedVideoId: number;
  onCarouselTileClick: (id: number) => void;
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({
  videos,
  selectedVideoId,
  onCarouselTileClick,
}) => {
  return (
    <div className="relative overflow-auto xl:static p-[9px] xl:p-0 bg-black xl:bg-transparent">
      <div className="w-0 h-auto flex flex-row xl:w-[371px] xl:h-[82px] xl:flex-col">
        {videos.map((video) => (
          <CarouselTile
            key={video.id}
            video={video}
            selectedVideoId={selectedVideoId}
            onCarouselTileClick={onCarouselTileClick}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
