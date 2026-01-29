const {
  createDoctor,
  allocateToken,
  cancelToken
} = require("../services/tokenService");

// Create doctors
createDoctor("D1", {
  "9-10": {
    capacity: 2,
    tokens: [],
    waitingQueue: [],
    startTime: "09:00",
    graceMinutes: 1
  }
});

createDoctor("D2", {
  "9-10": {
    capacity: 1,
    tokens: [],
    waitingQueue: [],
    startTime: "09:00",
    graceMinutes: 1
  }
});

createDoctor("D3", {
  "10-11": {
    capacity: 1,
    tokens: [],
    waitingQueue: [],
    startTime: "10:00",
    graceMinutes: 1
  }
});

// Simulate day
console.log(allocateToken("D1", "9-10", "ONLINE"));
console.log(allocateToken("D1", "9-10", "WALK_IN"));
console.log(allocateToken("D1", "9-10", "PAID")); // waiting queue

console.log(allocateToken("D1", "9-10", "EMERGENCY")); // bump

console.log(allocateToken("D2", "9-10", "ONLINE"));
console.log(allocateToken("D2", "9-10", "FOLLOW_UP")); // waiting

console.log("Simulation running...");
