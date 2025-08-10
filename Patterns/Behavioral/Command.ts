/**
 * Command pattern — calculator example.
 *
 * Intent: Encapsulate a request as an object, thereby letting you parameterize
 * clients with queues, logs, and support undoable operations.
 *
 * When to use:
 * - You need to queue, log, or undo/redo operations
 * - You want to decouple objects that invoke operations from those that perform them
 */

type BinaryOp = (x: number, y: number) => number;

interface Command {
  execute: BinaryOp;
  undo: BinaryOp;
  value: number;
}

const add: BinaryOp = (x, y) => x + y;
const sub: BinaryOp = (x, y) => x - y;
const mul: BinaryOp = (x, y) => x * y;
const div: BinaryOp = (x, y) => x / y;

const createCommand = (execute: BinaryOp, undo: BinaryOp, value: number): Command => ({
  execute,
  undo,
  value,
});

const AddCommand = (value: number): Command => createCommand(add, sub, value);
const SubCommand = (value: number): Command => createCommand(sub, add, value);
const MulCommand = (value: number): Command => createCommand(mul, div, value);
const DivCommand = (value: number): Command => createCommand(div, mul, value);

const Calculator = () => {
  let current = 0;
  const commands: Command[] = [];

  const action = (command: Command): string => {
    const name = command.execute.name || "op";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return {
    execute(command: Command) {
      current = command.execute(current, command.value);
      commands.push(command);
      log.add(`${action(command)}: ${command.value}`);
    },

    undo() {
      const command = commands.pop();
      if (!command) return;
      current = command.undo(current, command.value);
      log.add(`Undo ${action(command)}: ${command.value}`);
    },

    getCurrentValue(): number {
      return current;
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
  const calculator = Calculator();
  calculator.execute(AddCommand(100));
  calculator.execute(SubCommand(24));
  calculator.execute(MulCommand(6));
  calculator.execute(DivCommand(2));
  calculator.undo();
  calculator.undo();
  log.add(`\nValue: ${calculator.getCurrentValue()}`);
  log.show();
};

run();

export {};

