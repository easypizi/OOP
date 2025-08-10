/**
 * Template Method pattern — database steps example.
 *
 * Intent: Define the skeleton of an algorithm in an operation, deferring some
 * steps to subclasses. Template Method lets subclasses redefine certain steps
 * without changing the algorithm's structure.
 *
 * When to use:
 * - You have an invariant algorithm with variable steps
 * - You want to avoid code duplication across similar algorithms
 */

abstract class DataStore {
  public process(): boolean {
    this.connect();
    this.select();
    this.disconnect();
    return true;
  }

  protected abstract connect(): void;
  protected abstract select(): void;
  protected abstract disconnect(): void;
}

class MySqlDataStore extends DataStore {
  protected connect(): void {
    log.add("MySQL: connect step");
  }
  protected select(): void {
    log.add("MySQL: select step");
  }
  protected disconnect(): void {
    log.add("MySQL: disconnect step");
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
  const mySql = new MySqlDataStore();
  mySql.process();
  log.show();
};

run();

export {};

