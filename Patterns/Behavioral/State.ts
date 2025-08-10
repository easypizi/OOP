/**
 * State pattern — traffic light example.
 *
 * Intent: Allow an object to alter its behavior when its internal state changes.
 * The object will appear to change its class.
 *
 * When to use:
 * - Complex conditional logic that depends on state
 * - Object behavior changes at runtime
 */

interface LightState {
  go(): void;
}

class TrafficLight {
  private count = 0;
  private currentState: LightState;

  constructor() {
    this.currentState = new Red(this);
  }

  public change(state: LightState): void {
    if (this.count++ >= 10) return;
    this.currentState = state;
    this.currentState.go();
  }

  public start(): void {
    this.currentState.go();
  }
}

class Red implements LightState {
  constructor(private readonly light: TrafficLight) {}
  public go(): void {
    log.add("Red --> for 1 minute");
    this.light.change(new Green(this.light));
  }
}

class Yellow implements LightState {
  constructor(private readonly light: TrafficLight) {}
  public go(): void {
    log.add("Yellow --> for 10 seconds");
    this.light.change(new Red(this.light));
  }
}

class Green implements LightState {
  constructor(private readonly light: TrafficLight) {}
  public go(): void {
    log.add("Green --> for 1 minute");
    this.light.change(new Yellow(this.light));
  }
}

const log = (() => {
  let buffer = "";
  return {
    add(msg: string) {
      buffer += msg + "\n";
    },
    show() {
      alert(buffer);
      buffer = "";
    },
  };
})();

const run = (): void => {
  const light = new TrafficLight();
  light.start();
  log.show();
};

run();

export {};

