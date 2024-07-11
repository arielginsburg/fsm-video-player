import { FSM, FSMDefinition } from "fsm";

export type VolumeState = "muted" | "unmuted";
export type VolumeEvent = "MUTE" | "UNMUTE";

const volumeFSMDefinition: FSMDefinition<VolumeState, VolumeEvent> = {
  initial: "unmuted",
  states: {
    unmuted: {
      on: {
        MUTE: "muted",
      },
    },
    muted: {
      on: {
        UNMUTE: "unmuted",
      },
    },
  },
};

export const volumeFSM = new FSM(volumeFSMDefinition);
