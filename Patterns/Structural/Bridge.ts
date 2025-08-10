/**
 * Bridge pattern — decouple abstraction from implementation.
 *
 * Intent: Separate an abstraction from its implementation so that the two can
 * vary independently.
 *
 * When to use:
 * - You want to switch implementations at runtime
 * - You want to avoid permanent binding between abstraction and implementation
 */

interface OutputDevice {
  click(): void;
  move(): void;
  drag(): void;
  zoom(): void;
}

class Gestures {
  constructor(private readonly output: OutputDevice) {}
  public tap(): void {
    this.output.click();
  }
  public swipe(): void {
    this.output.move();
  }
  public pan(): void {
    this.output.drag();
  }
  public pinch(): void {
    this.output.zoom();
  }
}

class Mouse {
  constructor(private readonly output: OutputDevice) {}
  public click(): void {
    this.output.click();
  }
  public move(): void {
    this.output.move();
  }
  public down(): void {
    this.output.drag();
  }
  public wheel(): void {
    this.output.zoom();
  }
}

class Screen implements OutputDevice {
  click(): void {
    log.add("Screen select");
  }
  move(): void {
    log.add("Screen move");
  }
  drag(): void {
    log.add("Screen drag");
  }
  zoom(): void {
    log.add("Screen zoom in");
  }
}

class Audio implements OutputDevice {
  click(): void {
    log.add("Sound oink");
  }
  move(): void {
    log.add("Sound waves");
  }
  drag(): void {
    log.add("Sound screetch");
  }
  zoom(): void {
    log.add("Sound volume up");
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
  const screen = new Screen();
  const audio = new Audio();
  const hand = new Gestures(screen);
  const mouse = new Mouse(audio);

  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();

  log.show();
};

run();


