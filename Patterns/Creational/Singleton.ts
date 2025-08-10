/**
 * Singleton pattern — single instance access.
 *
 * Intent: Ensure a class has only one instance and provide a global point of access to it.
 *
 * When to use:
 * - A single shared resource (e.g., configuration, logger)
 * - You need controlled access to a sole instance
 */

class Singleton {
  private static instance: Singleton | null = null;
  private constructor(public readonly value: string) {}

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton("I am the instance");
    }
    return Singleton.instance;
  }
}

const run = (): void => {
  const instance1 = Singleton.getInstance();
  const instance2 = Singleton.getInstance();
  alert(`Same instance? ${instance1 === instance2}`);
};

run();

export {};

