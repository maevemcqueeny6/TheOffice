// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var employees = [
  {
    routeName: "michaelscott",
    name: "Michael Scott",
    role: "Regional Manager",
    age: 40,
    productivity: 1
  },
  {
    routeName: "dwightschrute",
    name: "Dwight Schrute",
    role: "Sith Lord",
    age: 35,
    productivity: 1200
  },
  {
    routeName: "jimhalpert",
    name: "Jim Halpert",
    role: "Assistant Regional Manager",
    age: 30,
    productivity: 1350
  },
  {
    routeName: "meredithpalmer",
    name: "Meredith Palmer",
    role: "Saleswoman",
    age: 45,
    productivity: 10
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Displays all employees
app.get("/api/employees", function(req, res) {
  return res.json(employees);
});

// Displays a single character, or returns false
app.get("/api/employees/:employee", function(req, res) {
  var chosen = req.params.employee;

  console.log(chosen);

  for (var i = 0; i < employees.length; i++) {
    if (chosen === employees[i].routeName) {
      return res.json(employees[i]);
    }
  }

  return res.json(false);
});

// Create New employees - takes in JSON input
app.post("/api/employees", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newemployee = req.body;

  // Using a RegEx Pattern to remove spaces from newemployee
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newemployee.routeName = newemployee.name.replace(/\s+/g, "").toLowerCase();

  console.log(newemployee);

  employees.push(newemployee);

  res.json(newemployee);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
