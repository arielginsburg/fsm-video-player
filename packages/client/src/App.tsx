import React, { useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";
import VideoCarousel from "./components/VideoCarousel";
import NowPlayingSection from "./components/NowPlayingSection";

export interface Video {
  id: number;
  title: string;
  duration: number;
  thumbnail: string;
  fileUrl: string;
}

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const App: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState(-1);
  const selectedVideo = videos.find((video) => video.id === selectedVideoId);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/videos`);
        const data: Video[] = await response.json();

        if (data.length > 0) {
          setVideos(data);
          setSelectedVideoId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-[80%] min-w-[360px] bg-zinc-900 px-[15px] pb-[15px] xl:pb-7">
      <div className="h-[54px] flex flex-row flex-wrap items-center mx-auto px-[15px] sm:px-0">
        <div className="h-[3px] flex-1 bg-intuit mr-2 sm:hidden"></div>
        <h1 className="h-[25px] inline-block flex-none font-proximaNovaCondExtrabldIt text-2xl italic tracking-[1.6px] text-left text-intuit">
          TOP VIDEOS
        </h1>
        <div className="h-[3px] flex-1 bg-intuit ml-2 sm:ml-2.5"></div>
      </div>
      <div className="flex flex-col xl:flex-row flex-wrap mx-auto">
        <div className="flex-1 w-full box-border bg-black aspect-video">
          {selectedVideo && <VideoPlayer video={selectedVideo} />}
        </div>
        <NowPlayingSection title={selectedVideo?.title ?? ""} />
        <VideoCarousel
          videos={videos}
          selectedVideoId={selectedVideoId}
          onCarouselTileClick={setSelectedVideoId}
        />
      </div>
    </div>
  );
};

export default App;
