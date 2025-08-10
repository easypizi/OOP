/**
 * Iterator pattern — typed collection traversal.
 *
 * Intent: Provide a way to access the elements of an aggregate object
 * sequentially without exposing its underlying representation.
 *
 * When to use:
 * - You need multiple traversal strategies over a collection
 * - You want a uniform way to traverse different aggregates
 */

class Iterator<T> {
  private index: number;
  private readonly items: T[];

  constructor(items: T[]) {
    this.index = 0;
    this.items = items;
  }

  public first(): T | undefined {
    this.reset();
    return this.next();
  }

  public next(): T | undefined {
    return this.items[this.index++];
  }

  public hasNext(): boolean {
    return this.index < this.items.length;
  }

  public reset(): void {
    this.index = 0;
  }

  public each(callback: (item: T) => void): void {
    for (let item = this.first(); this.hasNext(); item = this.next()) {
      if (item !== undefined) callback(item);
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
  const items = ["one", 2, "circle", true, "Applepie"] as const;
  const iter = new Iterator<(typeof items)[number]>(items as unknown as Array<(typeof items)[number]>);

  for (let item = iter.first(); iter.hasNext(); item = iter.next()) {
    if (item !== undefined) log.add(String(item));
  }
  log.add("");

  iter.each((item) => log.add(String(item)));
  log.show();
};

run();


