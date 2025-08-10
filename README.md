# OOP Design Patterns (TypeScript)

This repository contains concise, runnable examples of classic GoF design patterns implemented in TypeScript. Each example includes JSDoc describing intent, when to use the pattern, and a simple demo via `run()`.

## Navigation

### Behavioral
- Chain of Responsibility: [`Patterns/Behavioral/ChainOfResp.ts`](Patterns/Behavioral/ChainOfResp.ts)
- Command: [`Patterns/Behavioral/Command.ts`](Patterns/Behavioral/Command.ts)
- Iterator: [`Patterns/Behavioral/Iterator.ts`](Patterns/Behavioral/Iterator.ts)
- Mediator: [`Patterns/Behavioral/Mediator.ts`](Patterns/Behavioral/Mediator.ts)
- Memento: [`Patterns/Behavioral/Memento.ts`](Patterns/Behavioral/Memento.ts)
- Observer: [`Patterns/Behavioral/Observer.ts`](Patterns/Behavioral/Observer.ts)
- State: [`Patterns/Behavioral/State.ts`](Patterns/Behavioral/State.ts)
- Strategy: [`Patterns/Behavioral/Strategy.ts`](Patterns/Behavioral/Strategy.ts)
- Template Method: [`Patterns/Behavioral/TemplateMethod.ts`](Patterns/Behavioral/TemplateMethod.ts)
- Visitor: [`Patterns/Behavioral/Visitor.ts`](Patterns/Behavioral/Visitor.ts)

### Creational
- Abstract Factory: [`Patterns/Creational/AbstractFactory.ts`](Patterns/Creational/AbstractFactory.ts)
- Builder: [`Patterns/Creational/Builder.ts`](Patterns/Creational/Builder.ts)
- Factory Method: [`Patterns/Creational/FactoryMethod.ts`](Patterns/Creational/FactoryMethod.ts)
- Prototype: [`Patterns/Creational/Prototype.ts`](Patterns/Creational/Prototype.ts)
- Singleton: [`Patterns/Creational/Singleton.ts`](Patterns/Creational/Singleton.ts)

### Structural
- Adapter: [`Patterns/Structural/Adapter.ts`](Patterns/Structural/Adapter.ts)
- Bridge: [`Patterns/Structural/Bridge.ts`](Patterns/Structural/Bridge.ts)
- Composite: [`Patterns/Structural/Composite.ts`](Patterns/Structural/Composite.ts)
- Decorator: [`Patterns/Structural/Decorator.ts`](Patterns/Structural/Decorator.ts)
- Facade: [`Patterns/Structural/Facade.ts`](Patterns/Structural/Facade.ts)
- Flyweight: [`Patterns/Structural/FlyWeight.ts`](Patterns/Structural/FlyWeight.ts)
- Proxy: [`Patterns/Structural/Proxy.ts`](Patterns/Structural/Proxy.ts)

## How to run

These examples use simple `alert`/`log` calls. The easiest way to run them is in a browser bundler or directly with a TypeScript-enabled playground. If you prefer Node.js, replace `alert()` usages with `console.log()` or provide a DOM shim.

## Notes

- All source files are TypeScript with strict typing and JSDoc at the top of each file.
- Each file contains a `run()` function to demonstrate usage and expected output.