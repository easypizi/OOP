/**
 * Abstract Factory pattern — families of related objects.
 *
 * Intent: Provide an interface for creating families of related or dependent
 * objects without specifying their concrete classes.
 *
 * When to use:
 * - You need to create related objects that must be used together
 * - You want to enforce consistency among products
 */

type EmployeeType = "fulltime" | "parttime" | "temporary" | "contractor";

interface EmployeeProduct {
  readonly type: EmployeeType;
  readonly hourly: string;
  say(): void;
}

class FullTime implements EmployeeProduct {
  public readonly type: EmployeeType = "fulltime";
  public readonly hourly = "$12";
  public say(): void {
    log.add(`${this.type}: rate ${this.hourly}/hour`);
  }
}

class PartTime implements EmployeeProduct {
  public readonly type: EmployeeType = "parttime";
  public readonly hourly = "$11";
  public say(): void {
    log.add(`${this.type}: rate ${this.hourly}/hour`);
  }
}

class Temporary implements EmployeeProduct {
  public readonly type: EmployeeType = "temporary";
  public readonly hourly = "$10";
  public say(): void {
    log.add(`${this.type}: rate ${this.hourly}/hour`);
  }
}

class Contractor implements EmployeeProduct {
  public readonly type: EmployeeType = "contractor";
  public readonly hourly = "$15";
  public say(): void {
    log.add(`${this.type}: rate ${this.hourly}/hour`);
  }
}

class EmployeeFactory {
  public createEmployee(type: EmployeeType): EmployeeProduct {
    switch (type) {
      case "fulltime":
        return new FullTime();
      case "parttime":
        return new PartTime();
      case "temporary":
        return new Temporary();
      case "contractor":
        return new Contractor();
      default:
        // exhaustive check
        throw new Error("Unknown employee type");
    }
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
  const employees: EmployeeProduct[] = [];
  const factory = new EmployeeFactory();

  employees.push(factory.createEmployee("fulltime"));
  employees.push(factory.createEmployee("parttime"));
  employees.push(factory.createEmployee("temporary"));
  employees.push(factory.createEmployee("contractor"));

  for (const e of employees) e.say();
  log.show();
};

run();

export {};

