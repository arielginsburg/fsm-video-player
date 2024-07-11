import { render, screen } from "@testing-library/react";
import NowPlayingSection from "./NowPlayingSection";

describe("NowPlayingSection", () => {
  it('renders the "NOW PLAYING" text', () => {
    render(<NowPlayingSection title="Video Title" />);
    expect(screen.getByText("NOW PLAYING")).toBeInTheDocument();
  });

  it("renders the provided title", () => {
    const testTitle = "Video Title";
    render(<NowPlayingSection title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});
