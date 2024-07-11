import { formatTime } from "./utils";

describe("formatTime", () => {
  it("formats seconds to MM:SS when less than an hour", () => {
    expect(formatTime(45)).toBe("0:45");
    expect(formatTime(90)).toBe("1:30");
    expect(formatTime(599)).toBe("9:59");
    expect(formatTime(600)).toBe("10:00");
    expect(formatTime(3599)).toBe("59:59");
  });

  it("formats seconds to HH:MM:SS when an hour or more", () => {
    expect(formatTime(3600)).toBe("1:00:00");
    expect(formatTime(3661)).toBe("1:01:01");
    expect(formatTime(7200)).toBe("2:00:00");
    expect(formatTime(36000)).toBe("10:00:00");
    expect(formatTime(82800)).toBe("23:00:00");
  });

  it("handles edge cases", () => {
    expect(formatTime(0)).toBe("0:00");
    expect(formatTime(1)).toBe("0:01");
    expect(formatTime(59)).toBe("0:59");
    expect(formatTime(60)).toBe("1:00");
    expect(formatTime(3599.999)).toBe("59:59");
  });
});
