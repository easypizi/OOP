/**
 * Factory Method pattern — create objects via dedicated factory.
 *
 * Intent: Define an interface for creating an object, but let subclasses decide
 * which class to instantiate. Factory Method lets a class defer instantiation
 * to subclasses.
 *
 * When to use:
 * - You want to delegate object creation logic
 * - You need variants of products sharing a common interface
 */

interface Person {
  name: string;
  say(): void;
}

class FMEmployee implements Person {
  constructor(public name: string) {}
  public say(): void {
    log.add(`I am employee ${this.name}`);
  }
}

class FMVendor implements Person {
  constructor(public name: string) {}
  public say(): void {
    log.add(`I am vendor ${this.name}`);
  }
}

interface PersonFactory {
  create(name: string): Person;
}

class FMEmployeeFactory implements PersonFactory {
  public create(name: string): Person {
    return new FMEmployee(name);
  }
}

class FMVendorFactory implements PersonFactory {
  public create(name: string): Person {
    return new FMVendor(name);
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
  const persons: Person[] = [];
  const employeeFactory = new FMEmployeeFactory();
  const vendorFactory = new FMVendorFactory();

  persons.push(employeeFactory.create("Joan DiSilva"));
  persons.push(employeeFactory.create("Tim O'Neill"));
  persons.push(vendorFactory.create("Gerald Watson"));
  persons.push(vendorFactory.create("Nicole McNight"));

  for (const p of persons) p.say();
  log.show();
};

run();

export {};

