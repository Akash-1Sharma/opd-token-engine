const { v4: uuidv4 } = require("uuid");
const { doctors, tokens } = require("../data/store");

const PRIORITY = {
  EMERGENCY: 1,
  PAID: 2,
  FOLLOW_UP: 3,
  WALK_IN: 4,
  ONLINE: 5
};

function createDoctor(id, slots) {
  doctors[id] = { id, slots };
}

function allocateToken(doctorId, slotTime, source) {
  const doctor = doctors[doctorId];
  const slot = doctor.slots[slotTime];

  if (!slot) return { error: "Invalid slot" };

  const token = {
    id: uuidv4(),
    source,
    priority: PRIORITY[source],
    status: "ACTIVE"
  };

  if (slot.tokens.length < slot.capacity) {
    slot.tokens.push(token);
    tokens[token.id] = token;
    return token;
  }

  // Emergency handling
  if (PRIORITY[source] === 1) {
    slot.tokens.sort((a, b) => b.priority - a.priority);
    const removed = slot.tokens.pop();
    removed.status = "CANCELLED";
    slot.tokens.push(token);
    tokens[token.id] = token;
    return token;
  }

  return { error: "Slot full" };
}

function cancelToken(tokenId) {
  const token = tokens[tokenId];
  if (!token) return { error: "Invalid token" };
  token.status = "CANCELLED";
  return token;
}

module.exports = { createDoctor, allocateToken, cancelToken };
