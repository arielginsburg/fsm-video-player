import { render, screen, fireEvent, act } from "@testing-library/react";
import VideoPlayer from "./VideoPlayer";
import { playerFSM } from "../fsm/playerFSM";
import { volumeFSM } from "../fsm/volumeFSM";
import { Video } from "../App";
import { PlayerControlsProps } from "./PlayerControls";

const mockPlayerControlsProps = vi.fn();

vi.mock("./PlayerControls", () => ({
  default: (props: PlayerControlsProps) => {
    mockPlayerControlsProps(props);
    return <div data-testid="player-controls"></div>;
  },
}));

describe("VideoPlayer", () => {
  const mockVideo: Video = {
    id: 1,
    duration: 100,
    title: "Test",
    fileUrl: "http://example.com/video.mp4",
    thumbnail: "http://example.com/thumbnail.jpg",
  };

  beforeEach(() => {
    playerFSM.transition({ type: "PAUSE" });
    volumeFSM.transition({ type: "UNMUTE" });
  });

  it("renders video element with correct source", () => {
    render(<VideoPlayer video={mockVideo} />);
    const videoElement = screen.getByRole("video") as HTMLVideoElement;
    expect(videoElement).toBeInTheDocument();
    expect(videoElement.src).toBe(mockVideo.fileUrl);
  });

  it("displays current player and volume states", () => {
    render(<VideoPlayer video={mockVideo} />);
    expect(screen.getByText("player state: idle")).toBeInTheDocument();
    expect(screen.getByText("volume state: unmuted")).toBeInTheDocument();
  });

  it("updates player state when video plays", () => {
    render(<VideoPlayer video={mockVideo} />);
    const videoElement = screen.getByRole("video");

    act(() => {
      fireEvent.playing(videoElement);
    });

    expect(screen.getByText("player state: playing")).toBeInTheDocument();
  });

  it("updates player state when video pauses", () => {
    render(<VideoPlayer video={mockVideo} />);
    const videoElement = screen.getByRole("video");

    act(() => {
      fireEvent.play(videoElement);
      fireEvent.pause(videoElement);
    });

    expect(screen.getByText("player state: paused")).toBeInTheDocument();
  });

  it("updates volume state when video is muted", () => {
    render(<VideoPlayer video={mockVideo} />);
    const videoElement = screen.getByRole("video") as HTMLVideoElement;

    act(() => {
      videoElement.muted = true;
      fireEvent.volumeChange(videoElement);
    });

    expect(screen.getByText("volume state: muted")).toBeInTheDocument();
  });

  it("passes correct props to PlayerControls", () => {
    render(<VideoPlayer video={mockVideo} />);
    const playerControls = screen.getByTestId("player-controls");
    expect(playerControls).toBeInTheDocument();
    expect(mockPlayerControlsProps).toHaveBeenCalledWith({
      playerState: "idle",
      volumeState: "unmuted",
      duration: mockVideo.duration,
      currentTime: 0,
      togglePlay: expect.any(Function),
      toggleMute: expect.any(Function),
      updateCurrentTime: expect.any(Function),
    });
  });
});
