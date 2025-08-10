/**
 * Chain of Responsibility pattern — ATM dispensing example.
 *
 * Intent: Decouple sender and receivers by giving multiple objects a chance
 * to handle the request. The request is passed along a chain until a handler
 * processes it (fully or partially).
 *
 * When to use:
 * - You have multiple potential handlers for a request
 * - The handler should be determined at runtime
 * - You want to avoid tight coupling between sender and receiver
 */

class Request {
  public amount: number;

  constructor(amount: number) {
    this.amount = amount;
    log.add(`Requested: $${amount}\n`);
  }

  public get(bill: number): this {
    const count = Math.floor(this.amount / bill);
    this.amount -= count * bill;
    log.add(`Dispense ${count} $${bill} bills`);
    return this;
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
  const request = new Request(378);
  request.get(100).get(50).get(20).get(10).get(5).get(1);
  log.show();
};

run();


