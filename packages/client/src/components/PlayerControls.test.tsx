import { render, screen, fireEvent } from "@testing-library/react";
import PlayerControls, { PlayerControlsProps } from "./PlayerControls";

vi.mock("../assets/play.svg?react", () => ({
  default: () => <div data-testid="play-icon" />,
}));
vi.mock("../assets/pause.svg?react", () => ({
  default: () => <div data-testid="pause-icon" />,
}));
vi.mock("../assets/volume.svg?react", () => ({
  default: () => <div data-testid="volume-icon" />,
}));
vi.mock("../assets/unmute.svg?react", () => ({
  default: () => <div data-testid="unmute-icon" />,
}));

describe("PlayerControls", () => {
  const defaultProps: PlayerControlsProps = {
    playerState: "paused" as const,
    volumeState: "unmuted" as const,
    duration: 100,
    currentTime: 0,
    togglePlay: vi.fn(),
    toggleMute: vi.fn(),
    updateCurrentTime: vi.fn(),
  };

  it("renders correctly", () => {
    render(<PlayerControls {...defaultProps} />);
    expect(screen.getByTestId("play-icon")).toBeInTheDocument();
    expect(screen.getByTestId("volume-icon")).toBeInTheDocument();
  });

  it("shows pause icon when playing", () => {
    render(<PlayerControls {...defaultProps} playerState="playing" />);
    expect(screen.getByTestId("pause-icon")).toBeInTheDocument();
  });

  it("shows unmute icon when muted", () => {
    render(<PlayerControls {...defaultProps} volumeState="muted" />);
    expect(screen.getByTestId("unmute-icon")).toBeInTheDocument();
  });

  it("calls togglePlay when play/pause button is clicked", () => {
    render(<PlayerControls {...defaultProps} />);
    fireEvent.click(screen.getByTestId("play-icon").parentElement!);
    expect(defaultProps.togglePlay).toHaveBeenCalledTimes(1);
  });

  it("calls toggleMute when volume button is clicked", () => {
    render(<PlayerControls {...defaultProps} />);
    fireEvent.click(screen.getByTestId("volume-icon").parentElement!);
    expect(defaultProps.toggleMute).toHaveBeenCalledTimes(1);
  });

  it("updates progress bar based on currentTime and duration", () => {
    const { rerender } = render(
      <PlayerControls {...defaultProps} currentTime={50} />
    );
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveStyle({ width: "50%" });

    rerender(<PlayerControls {...defaultProps} currentTime={75} />);
    expect(progressBar).toHaveStyle({ width: "75%" });
  });
});
