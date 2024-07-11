import { FSM, FSMDefinition } from "fsm";

export type PlayerState = "idle" | "playing" | "paused" | "seeking" | "error";
export type PlayerEvent = "PLAY" | "PAUSE" | "SEEKING" | "SEEKED" | "ERROR";

export interface PlayerContext {
  videoElement: HTMLVideoElement | null;
}

const playerFSMDefinition: FSMDefinition<PlayerState, PlayerEvent> = {
  initial: "idle",
  states: {
    idle: {
      on: {
        PLAY: "playing",
        ERROR: "error",
      },
    },
    playing: {
      on: {
        PAUSE: "paused",
        SEEKING: "seeking",
        ERROR: "error",
      },
    },
    paused: {
      on: {
        PLAY: "playing",
        SEEKING: "seeking",
        ERROR: "error",
      },
    },
    seeking: {
      on: {
        PLAY: "playing",
        SEEKED: "paused",
        ERROR: "error",
      },
    },
    error: {
      on: {
        PLAY: "playing",
      },
    },
  },
};

export const playerFSM = new FSM(playerFSMDefinition);
