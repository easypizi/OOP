/**
 * Observer pattern — event subscription example.
 *
 * Intent: Define a one-to-many dependency so that when one object changes
 * state, all its dependents are notified and updated automatically.
 *
 * When to use:
 * - Publish/subscribe scenarios
 * - Decouple event producers from consumers
 */

class Click<T = unknown> {
  private handlers: Array<(payload: T) => void> = [];

  public subscribe(fn: (payload: T) => void): void {
    this.handlers.push(fn);
  }

  public unsubscribe(fn: (payload: T) => void): void {
    this.handlers = this.handlers.filter((item) => item !== fn);
  }

  public fire(payload: T, thisObj?: unknown): void {
    const scope: any = thisObj ?? (globalThis as any);
    this.handlers.forEach((handler) => handler.call(scope, payload));
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
  const clickHandler = (item: string) => {
    log.add(`fired: ${item}`);
  };

  const click = new Click<string>();
  click.subscribe(clickHandler);
  click.fire("event #1");
  click.unsubscribe(clickHandler);
  click.fire("event #2");
  click.subscribe(clickHandler);
  click.fire("event #3");

  log.show();
};

run();


