/**
 * Visitor pattern — apply operations to object structure.
 *
 * Intent: Represent an operation to be performed on elements of an object
 * structure without changing the classes of the elements on which it operates.
 *
 * When to use:
 * - You have many distinct operations over a stable set of classes
 * - You want to keep operations separate from object data
 */

interface Visitor {
  visit(employee: Employee): void;
}

class Employee {
  constructor(
    private name: string,
    private salary: number,
    private vacation: number,
  ) {}

  public accept(visitor: Visitor): void {
    visitor.visit(this);
  }

  public getName(): string {
    return this.name;
  }
  public getSalary(): number {
    return this.salary;
  }
  public setSalary(salary: number): void {
    this.salary = salary;
  }
  public getVacation(): number {
    return this.vacation;
  }
  public setVacation(vacation: number): void {
    this.vacation = vacation;
  }
}

class ExtraSalary implements Visitor {
  public visit(emp: Employee): void {
    emp.setSalary(emp.getSalary() * 1.1);
  }
}

class ExtraVacation implements Visitor {
  public visit(emp: Employee): void {
    emp.setVacation(emp.getVacation() + 2);
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
  const employees = [
    new Employee("John", 10000, 10),
    new Employee("Mary", 20000, 21),
    new Employee("Boss", 250000, 51),
  ];

  const visitorSalary = new ExtraSalary();
  const visitorVacation = new ExtraVacation();

  for (const emp of employees) {
    emp.accept(visitorSalary);
    emp.accept(visitorVacation);
    log.add(`${emp.getName()}: $${emp.getSalary()} and ${emp.getVacation()} vacation days`);
  }

  log.show();
};

run();

export {};

