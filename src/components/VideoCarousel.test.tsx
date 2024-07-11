import { render, screen } from "@testing-library/react";
import VideoCarousel from "./VideoCarousel";
import { Video } from "../App";
import { CarouselTileProps } from "./CarouselTile";

vi.mock("./CarouselTile", () => ({
  default: (props: CarouselTileProps) => (
    <div data-testid="carousel-tile">{props.video.title}</div>
  ),
}));

describe("VideoCarousel", () => {
  const mockVideos: Video[] = [
    {
      id: 1,
      title: "Video 1",
      duration: 120,
      thumbnail: "thumb1.jpg",
      fileUrl: "video1.mp4",
    },
    {
      id: 2,
      title: "Video 2",
      duration: 180,
      thumbnail: "thumb2.jpg",
      fileUrl: "video2.mp4",
    },
    {
      id: 3,
      title: "Video 3",
      duration: 240,
      thumbnail: "thumb3.jpg",
      fileUrl: "video3.mp4",
    },
  ];

  const mockOnCarouselTileClick = vi.fn();

  it("renders correct number of CarouselTile components", () => {
    render(
      <VideoCarousel
        videos={mockVideos}
        selectedVideoId={1}
        onCarouselTileClick={mockOnCarouselTileClick}
      />
    );
    const tiles = screen.getAllByTestId("carousel-tile");
    expect(tiles).toHaveLength(mockVideos.length);
  });

  it("passes correct props to CarouselTile components", () => {
    render(
      <VideoCarousel
        videos={mockVideos}
        selectedVideoId={1}
        onCarouselTileClick={mockOnCarouselTileClick}
      />
    );
    mockVideos.forEach((video) => {
      expect(screen.getByText(video.title)).toBeInTheDocument();
    });
  });

  it("renders nothing when videos array is empty", () => {
    render(
      <VideoCarousel
        videos={[]}
        selectedVideoId={1}
        onCarouselTileClick={mockOnCarouselTileClick}
      />
    );
    expect(screen.queryByTestId("carousel-tile")).not.toBeInTheDocument();
  });
});
