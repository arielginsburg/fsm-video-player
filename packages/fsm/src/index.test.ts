import { FSM, FSMDefinition } from "./index";

describe("FSM", () => {
  type TestState = "idle" | "started" | "stopped";
  type TestEvent = "START" | "STOP";

  const testFSMDefinition: FSMDefinition<TestState, TestEvent> = {
    initial: "idle",
    states: {
      idle: {
        on: {
          START: "started",
        },
      },
      started: {
        on: {
          STOP: "stopped",
        },
      },
      stopped: {
        on: {
          START: "started",
        },
      },
    },
  };

  it("should initialize with the correct state", () => {
    const fsm = new FSM(testFSMDefinition);
    expect(fsm.getState()).toBe("idle");
  });

  it("should transition to the correct state", () => {
    const fsm = new FSM(testFSMDefinition);
    fsm.transition({ type: "START" });
    expect(fsm.getState()).toBe("started");
    fsm.transition({ type: "STOP" });
    expect(fsm.getState()).toBe("stopped");
    fsm.transition({ type: "START" });
    expect(fsm.getState()).toBe("started");
  });

  it("should not transition on invalid events", () => {
    const fsm = new FSM(testFSMDefinition);
    fsm.transition({ type: "STOP" });
    expect(fsm.getState()).toBe("idle");
  });
});
