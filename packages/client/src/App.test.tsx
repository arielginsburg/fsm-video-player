import { act, render, screen, waitFor } from "@testing-library/react";
import App, { Video } from "./App";
import { VideoPlayerProps } from "./components/VideoPlayer";
import { NowPlayingSectionProps } from "./components/NowPlayingSection";
import { VideoCarouselProps } from "./components/VideoCarousel";

const mockVideoPlayerProps = vi.fn();
const mockVideoCarouselProps = vi.fn();
const mockNowPlayingSectionProps = vi.fn();

vi.mock("./components/VideoPlayer", () => ({
  default: (props: VideoPlayerProps) => {
    mockVideoPlayerProps(props);
    return <div data-testid="video-player"></div>;
  },
}));

vi.mock("./components/VideoCarousel", () => ({
  default: (props: VideoCarouselProps) => {
    mockVideoCarouselProps(props);
    return <div data-testid="video-carousel"></div>;
  },
}));

vi.mock("./components/NowPlayingSection", () => ({
  default: (props: NowPlayingSectionProps) => {
    mockNowPlayingSectionProps(props);
    return <div data-testid="now-playing-section"></div>;
  },
}));

describe("App", () => {
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
  ];

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockVideos),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the main title", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText("TOP VIDEOS")).toBeInTheDocument();
  });

  it("fetches and displays videos", async () => {
    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/videos"
      );
    });

    await waitFor(() => {
      const videoPlayer = screen.getByTestId("video-player");
      expect(videoPlayer).toBeInTheDocument();
      expect(mockVideoPlayerProps).toHaveBeenCalledWith({
        video: mockVideos[0],
      });
    });

    const videoCarousel = screen.getByTestId("video-carousel");
    expect(videoCarousel).toBeInTheDocument();
    expect(mockVideoCarouselProps).toHaveBeenCalledWith({
      videos: mockVideos,
      selectedVideoId: mockVideos[0].id,
      onCarouselTileClick: expect.any(Function),
    });

    const nowPlayingSection = screen.getByTestId("now-playing-section");
    expect(nowPlayingSection).toBeInTheDocument();
    expect(mockNowPlayingSectionProps).toHaveBeenCalledWith({
      title: mockVideos[0].title,
    });
  });

  it("handles empty video list", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue([]),
    });

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/videos"
      );
    });

    const videoPlayer = screen.queryByTestId("video-player");
    expect(videoPlayer).not.toBeInTheDocument();

    const videoCarousel = screen.getByTestId("video-carousel");
    expect(videoCarousel).toBeInTheDocument();
    expect(mockVideoCarouselProps).toHaveBeenCalledWith({
      videos: [],
      selectedVideoId: -1,
      onCarouselTileClick: expect.any(Function),
    });

    const nowPlayingSection = screen.getByTestId("now-playing-section");
    expect(nowPlayingSection).toBeInTheDocument();
    expect(mockNowPlayingSectionProps).toHaveBeenCalledWith({
      title: "",
    });
  });

  it("handles fetch error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    global.fetch = vi.fn().mockRejectedValue(new Error("Fetch error"));

    await act(async () => {
      render(<App />);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/api/videos"
      );
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error fetching videos:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });
});
