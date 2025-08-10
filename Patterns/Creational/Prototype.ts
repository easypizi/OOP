/**
 * Prototype pattern — clone existing objects.
 *
 * Intent: Specify the kinds of objects to create using a prototypical instance,
 * and create new objects by copying this prototype.
 *
 * When to use:
 * - Creating objects is costly; cloning is cheaper
 * - You want to avoid subclass explosion
 */

class Customer {
  constructor(public first: string, public last: string, public status: string) {}
  public say(): void {
    alert(`name: ${this.first} ${this.last}, status: ${this.status}`);
  }
}

class CustomerPrototype {
  constructor(private readonly proto: Customer) {}
  public clone(): Customer {
    const customer = new Customer("", "", "");
    customer.first = this.proto.first;
    customer.last = this.proto.last;
    customer.status = this.proto.status;
    return customer;
  }
}

const run = (): void => {
  const proto = new Customer("n/a", "n/a", "pending");
  const prototype = new CustomerPrototype(proto);
  const customer = prototype.clone();
  customer.say();
};

run();

export {};

