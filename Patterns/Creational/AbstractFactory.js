function Employee(name) {
  this.name = name;

  this.say = function () {
    log.add("I am employee " + name);
  };
}

function EmployeeFactory() {
  this.create = function (name) {
    return new Employee(name);
  };
}

function Vendor(name) {
  this.name = name;

  this.say = function () {
    log.add("I am vendor " + name);
  };
}

function VendorFactory() {
  this.create = function (name) {
    return new Vendor(name);
  };
}

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
  let persons = [];
  let employeeFactory = new EmployeeFactory();
  let vendorFactory = new VendorFactory();

  persons.push(employeeFactory.create("Joan DiSilva"));
  persons.push(employeeFactory.create("Tim O'Neill"));
  persons.push(vendorFactory.create("Gerald Watson"));
  persons.push(vendorFactory.create("Nicole McNight"));

  for (let i = 0, len = persons.length; i < len; i++) {
    persons[i].say();
  }

  log.show();
}

run();
