let Participant = function (name) {
  this.name = name;
  this.chatroom = null;
};

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    log.add(from.name + " to " + this.name + ": " + message);
  },
};

let Chatroom = function () {
  let participants = {};

  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {
        // single message
        to.receive(message, from);
      } else {
        // broadcast message
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    },
  };
};

// log helper

let log = (function () {
  let log = "";

  return {
    add: function (msg) {
      log += msg + "\n";
    },
    show: function () {
      alert(log);
      log = "";
    },
  };
})();

function run() {
  let yoko = new Participant("Yoko");
  let john = new Participant("John");
  let paul = new Participant("Paul");
  let ringo = new Participant("Ringo");

  let chatroom = new Chatroom();
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
}
