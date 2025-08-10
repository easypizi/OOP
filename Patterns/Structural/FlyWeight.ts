/**
 * Flyweight pattern — share common state to reduce memory.
 *
 * Intent: Use sharing to support large numbers of fine-grained objects efficiently.
 *
 * When to use:
 * - Many similar objects with shared intrinsic state
 * - Memory footprint reduction is critical
 */

class Flyweight {
  constructor(
    public readonly make: string,
    public readonly model: string,
    public readonly processor: string,
  ) {}
}

const FlyWeightFactory = (() => {
  const flyweights: Record<string, Flyweight> = {};
  return {
    get(make: string, model: string, processor: string): Flyweight {
      const key = make + model;
      if (!flyweights[key]) {
        flyweights[key] = new Flyweight(make, model, processor);
      }
      return flyweights[key];
    },
    getCount(): number {
      return Object.keys(flyweights).length;
    },
  };
})();

class Computer {
  public readonly flyweight: Flyweight;
  constructor(
    make: string,
    model: string,
    processor: string,
    public memory: string,
    public tag: string,
  ) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
  }
  public getMake(): string {
    return this.flyweight.make;
  }
}

const ComputerCollection = () => {
  const computers: Record<string, Computer> = {};
  let count = 0;
  return {
    add(make: string, model: string, processor: string, memory: string, tag: string) {
      computers[tag] = new Computer(make, model, processor, memory, tag);
      count++;
    },
    get(tag: string): Computer | undefined {
      return computers[tag];
    },
    getCount(): number {
      return count;
    },
  };
};

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
  const computers = ComputerCollection();
  computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
  computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
  computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
  computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

  log.add(`Computers: ${computers.getCount()}`);
  log.add(`Flyweights: ${FlyWeightFactory.getCount()}`);
  log.show();
};

run();

export {};

