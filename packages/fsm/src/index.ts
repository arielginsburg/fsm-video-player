export type State = string;
export type EventType = string;

export interface Event<TEventType extends EventType = EventType> {
  type: TEventType;
}

export type Transition<TState extends State, TEventType extends EventType> = {
  [K in TEventType]?: TState;
};

export interface FSMDefinition<
  TState extends State,
  TEventType extends EventType
> {
  initial: TState;
  states: {
    [K in TState]: {
      on: Transition<TState, TEventType>;
    };
  };
}

export class FSM<TState extends State, TEventType extends EventType> {
  private currentState: TState;
  private definition: FSMDefinition<TState, TEventType>;

  constructor(definition: FSMDefinition<TState, TEventType>) {
    this.definition = definition;
    this.currentState = definition.initial;
  }

  public getState(): TState {
    return this.currentState;
  }

  public transition(event: Event<TEventType>) {
    const nextState = this.definition.states[this.currentState].on[
      event.type
    ] as TState | undefined;
    if (nextState) {
      this.currentState = nextState;
    }
  }
}
