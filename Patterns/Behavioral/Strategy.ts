/**
 * Strategy pattern — shipping rates example.
 *
 * Intent: Define a family of algorithms, encapsulate each one, and make them
 * interchangeable. Strategy lets the algorithm vary independently from clients.
 *
 * When to use:
 * - You need to swap algorithms at runtime
 * - You want to avoid large conditional statements
 */

interface ShippingCompany {
  calculate(pkg: { from: string; to: string; weight: string }): string;
}

class Shipping {
  private company: ShippingCompany | null = null;

  public setStrategy(company: ShippingCompany): void {
    this.company = company;
  }

  public calculate(pkg: { from: string; to: string; weight: string }): string {
    if (!this.company) return "";
    return this.company.calculate(pkg);
  }
}

class UPS implements ShippingCompany {
  calculate(_pkg: { from: string; to: string; weight: string }): string {
    return "$45.95";
  }
}

class USPS implements ShippingCompany {
  calculate(_pkg: { from: string; to: string; weight: string }): string {
    return "$39.40";
  }
}

class Fedex implements ShippingCompany {
  calculate(_pkg: { from: string; to: string; weight: string }): string {
    return "$43.20";
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
  const pkg = { from: "76712", to: "10012", weight: "1kg" };
  const ups = new UPS();
  const usps = new USPS();
  const fedex = new Fedex();
  const shipping = new Shipping();

  shipping.setStrategy(ups);
  log.add(`UPS Strategy: ${shipping.calculate(pkg)}`);
  shipping.setStrategy(usps);
  log.add(`USPS Strategy: ${shipping.calculate(pkg)}`);
  shipping.setStrategy(fedex);
  log.add(`Fedex Strategy: ${shipping.calculate(pkg)}`);

  log.show();
};

run();


