/**
 * Memento pattern — snapshot and restore object state.
 *
 * Intent: Capture and externalize an object's internal state so that the
 * object can be restored to this state later, without violating encapsulation.
 *
 * When to use:
 * - Implement undo/rollback
 * - Save checkpoints for complex objects
 */

class Person {
  constructor(
    public name: string,
    public street: string,
    public city: string,
    public state: string,
  ) {}

  public hydrate(): string {
    const memento = JSON.stringify(this);
    return memento;
  }

  public dehydrate(memento: string): void {
    const m = JSON.parse(memento) as Person;
    this.name = m.name;
    this.street = m.street;
    this.city = m.city;
    this.state = m.state;
  }
}

class CareTaker {
  private readonly mementos: Record<string | number, string> = {};

  public add(key: string | number, memento: string): void {
    this.mementos[key] = memento;
  }

  public get(key: string | number): string {
    return this.mementos[key];
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
  const mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
  const john = new Person("John Wang", "48th Street", "San Jose", "CA");
  const caretaker = new CareTaker();

  caretaker.add(1, mike.hydrate());
  caretaker.add(2, john.hydrate());

  mike.name = "King Kong";
  john.name = "Superman";

  mike.dehydrate(caretaker.get(1));
  john.dehydrate(caretaker.get(2));

  log.add(mike.name);
  log.add(john.name);
  log.show();
};

run();

export {};

