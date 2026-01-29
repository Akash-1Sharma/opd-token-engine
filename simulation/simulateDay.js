const { createDoctor, allocateToken } = require("../services/tokenService");

createDoctor("D1", {
  "9-10": { capacity: 3, tokens: [] },
  "10-11": { capacity: 2, tokens: [] }
});

createDoctor("D2", {
  "9-10": { capacity: 2, tokens: [] }
});

createDoctor("D3", {
  "9-10": { capacity: 1, tokens: [] }
});

console.log(allocateToken("D1", "9-10", "ONLINE"));
console.log(allocateToken("D1", "9-10", "WALK_IN"));
console.log(allocateToken("D1", "9-10", "EMERGENCY")); // bump logic
