/**
 * Mediator pattern — chatroom example.
 *
 * Intent: Define an object that encapsulates how a set of objects interact.
 * Promotes loose coupling by keeping objects from referring to each other explicitly.
 *
 * When to use:
 * - Complex communications with many-to-many relationships
 * - You want to centralize control logic
 */

class Participant {
  public chatroom: Chatroom | null = null;
  constructor(public readonly name: string) {}

  public send(message: string, to?: Participant): void {
    this.chatroom?.send(message, this, to);
  }

  public receive(message: string, from: Participant): void {
    log.add(`${from.name} to ${this.name}: ${message}`);
  }
}

class Chatroom {
  private readonly participants: Record<string, Participant> = {};

  public register(participant: Participant): void {
    this.participants[participant.name] = participant;
    participant.chatroom = this;
  }

  public send(message: string, from: Participant, to?: Participant): void {
    if (to) {
      to.receive(message, from);
      return;
    }
    for (const key in this.participants) {
      if (Object.prototype.hasOwnProperty.call(this.participants, key)) {
        const participant = this.participants[key];
        if (participant !== from) participant.receive(message, from);
      }
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
  const yoko = new Participant("Yoko");
  const john = new Participant("John");
  const paul = new Participant("Paul");
  const ringo = new Participant("Ringo");

  const chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);

  yoko.send("All you need is love.");
  yoko.send("I love you John.");
  john.send("Hey, no need to broadcast", yoko);
  paul.send("Ha, I heard that!");
  ringo.send("Paul, what do you think?", paul);

  log.show();
};

run();


