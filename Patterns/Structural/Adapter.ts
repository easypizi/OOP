/**
 * Adapter pattern — convert interface of a class into another interface.
 *
 * Intent: Allow classes to work together that otherwise couldn't because of
 * incompatible interfaces.
 *
 * When to use:
 * - Integrating with legacy or third-party code
 * - Unifying different interfaces under a common one
 */

class LegacyShipping {
  public request(zipStart: string, zipEnd: string, weight: string): string {
    return "$49.75";
  }
}

class AdvancedShipping {
  public login(_credentials: { token: string }): void {}
  public setStart(_start: string): void {}
  public setDestination(_destination: string): void {}
  public calculate(_weight: string): string {
    return "$39.50";
  }
}

class ShippingAdapter {
  private readonly shipping: AdvancedShipping;
  constructor(credentials: { token: string }) {
    this.shipping = new AdvancedShipping();
    this.shipping.login(credentials);
  }

  public request(zipStart: string, zipEnd: string, weight: string): string {
    this.shipping.setStart(zipStart);
    this.shipping.setDestination(zipEnd);
    return this.shipping.calculate(weight);
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
  const shipping = new LegacyShipping();
  const credentials = { token: "30a8-6ee1" };
  const adapter = new ShippingAdapter(credentials);

  let cost = shipping.request("78701", "10010", "2 lbs");
  log.add(`Old cost: ${cost}`);

  cost = adapter.request("78701", "10010", "2 lbs");
  log.add(`New cost: ${cost}`);
  log.show();
};

run();

export {};

