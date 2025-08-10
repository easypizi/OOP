/**
 * Facade pattern — simplified interface to a subsystem.
 *
 * Intent: Provide a unified interface to a set of interfaces in a subsystem.
 * Facade defines a higher-level interface that makes the subsystem easier to use.
 *
 * When to use:
 * - Simplify complex subsystems
 * - Provide a single entry point
 */

class Mortgage {
  constructor(private readonly name: string) {}

  public applyFor(amount: string): string {
    let result = "approved";
    if (!new Bank().verify(this.name, amount)) {
      result = "denied";
    } else if (!new Credit().get(this.name)) {
      result = "denied";
    } else if (!new Background().check(this.name)) {
      result = "denied";
    }
    return `${this.name} has been ${result} for a ${amount} mortgage`;
  }
}

class Bank {
  public verify(_name: string, _amount: string): boolean {
    return true;
  }
}

class Credit {
  public get(_name: string): boolean {
    return true;
  }
}

class Background {
  public check(_name: string): boolean {
    return true;
  }
}

const run = (): void => {
  const mortgage = new Mortgage("Joan Templeton");
  const result = mortgage.applyFor("$100,000");
  alert(result);
};

run();

export {};

