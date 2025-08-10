/**
 * Decorator pattern — add responsibilities dynamically.
 *
 * Intent: Attach additional responsibilities to an object dynamically.
 * Decorators provide a flexible alternative to subclassing for extending functionality.
 *
 * When to use:
 * - You want to add behavior without modifying original classes
 * - You want to compose behaviors at runtime
 */

class User {
  constructor(public name: string) {}
  public say(): void {
    log.add(`User: ${this.name}`);
  }
}

class DecoratedUser {
  public name: string;
  constructor(public user: User, public street: string, public city: string) {
    this.name = user.name;
  }
  public say(): void {
    log.add(`Decorated User: ${this.name}, ${this.street}, ${this.city}`);
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
  const user = new User("Kelly");
  user.say();
  const decorated = new DecoratedUser(user, "Broadway", "New York");
  decorated.say();
  log.show();
};

run();


