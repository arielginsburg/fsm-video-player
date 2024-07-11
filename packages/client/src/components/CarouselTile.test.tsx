import { render, screen, fireEvent } from "@testing-library/react";
import CarouselTile from "./CarouselTile";
import { formatTime } from "../utils";
import { Video } from "../App";

vi.mock("../assets/play.svg?react", () => ({
  default: () => <div data-testid="play-icon" />,
}));

vi.mock("../utils", () => ({
  formatTime: vi.fn((time) => `${time} seconds`),
}));

describe("CarouselTile", () => {
  const mockVideo: Video = {
    id: 1,
    title: "Test Video",
    duration: 120,
    fileUrl: "http://example.com/video.mp4",
    thumbnail: "http://example.com/thumbnail.jpg",
  };

  const defaultProps = {
    video: mockVideo,
    selectedVideoId: 2,
    onCarouselTileClick: vi.fn(),
  };

  it("renders the video title", () => {
    render(<CarouselTile {...defaultProps} />);
    expect(screen.getByText(mockVideo.title)).toBeInTheDocument();
  });

  it("renders the formatted duration", () => {
    render(<CarouselTile {...defaultProps} />);
    expect(screen.getByText("120 seconds")).toBeInTheDocument();
    expect(formatTime).toHaveBeenCalledWith(mockVideo.duration);
  });

  it("renders the thumbnail as background image", () => {
    render(<CarouselTile {...defaultProps} />);
    const thumbnailElement = screen.getByRole("img", { hidden: true });
    expect(thumbnailElement).toHaveStyle(
      `background-image: url(${mockVideo.thumbnail})`
    );
  });

  it("renders the play icon when not selected", () => {
    render(<CarouselTile {...defaultProps} />);
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
  });

  it('renders "NOW PLAYING" when selected', () => {
    render(<CarouselTile {...defaultProps} selectedVideoId={mockVideo.id} />);
    expect(screen.getByText("NOW PLAYING")).toBeInTheDocument();
    expect(screen.queryByTestId("play-icon")).not.toBeInTheDocument();
  });

  it("calls onCarouselTileClick with video id when clicked", () => {
    render(<CarouselTile {...defaultProps} />);
    fireEvent.click(screen.getByText(mockVideo.title));
    expect(defaultProps.onCarouselTileClick).toHaveBeenCalledWith(mockVideo.id);
  });
});
