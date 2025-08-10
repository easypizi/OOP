/**
 * Builder pattern — step-by-step product construction.
 *
 * Intent: Separate the construction of a complex object from its representation
 * so that the same construction process can create different representations.
 *
 * When to use:
 * - Complex creation logic split into steps
 * - Different representations of the same construction process
 */

interface Vehicle {
  say(): void;
}

interface Builder<T extends Vehicle> {
  step1(): void;
  step2(): void;
  get(): T;
}

class Shop {
  public construct<T extends Vehicle>(builder: Builder<T>): T {
    builder.step1();
    builder.step2();
    return builder.get();
  }
}

class Car implements Vehicle {
  private doors = 0;
  public addParts(): void {
    this.doors = 4;
  }
  public say(): void {
    log.add(`I am a ${this.doors}-door car`);
  }
}

class Truck implements Vehicle {
  private doors = 0;
  public addParts(): void {
    this.doors = 2;
  }
  public say(): void {
    log.add(`I am a ${this.doors}-door truck`);
  }
}

class CarBuilder implements Builder<Car> {
  private car: Car | null = null;
  public step1(): void {
    this.car = new Car();
  }
  public step2(): void {
    this.car?.addParts();
  }
  public get(): Car {
    if (!this.car) throw new Error("Car not built");
    return this.car;
  }
}

class TruckBuilder implements Builder<Truck> {
  private truck: Truck | null = null;
  public step1(): void {
    this.truck = new Truck();
  }
  public step2(): void {
    this.truck?.addParts();
  }
  public get(): Truck {
    if (!this.truck) throw new Error("Truck not built");
    return this.truck;
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
  const shop = new Shop();
  const car = shop.construct(new CarBuilder());
  const truck = shop.construct(new TruckBuilder());
  car.say();
  truck.say();
  log.show();
};

run();

export {};

