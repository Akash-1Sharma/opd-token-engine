const { v4: uuidv4 } = require("uuid");
const { doctors, tokens } = require("../data/store");

const PRIORITY = {
  EMERGENCY: 1,
  PAID: 2,
  FOLLOW_UP: 3,
  WALK_IN: 4,
  ONLINE: 5
};

// Create doctor
function createDoctor(id, slots) {
  doctors[id] = { id, slots };
}

// Allocate token
function allocateToken(doctorId, slotTime, source) {
  const doctor = doctors[doctorId];
  if (!doctor) return { error: "Doctor not found" };

  const slot = doctor.slots[slotTime];
  if (!slot) return { error: "Invalid slot" };

  const token = {
    id: uuidv4(),
    doctorId,
    slotTime,
    source,
    priority: PRIORITY[source],
    status: "ACTIVE",
    createdAt: Date.now(),
    checkedIn: false
  };

  // If capacity available
  if (slot.tokens.length < slot.capacity) {
    slot.tokens.push(token);
    tokens[token.id] = token;
    return { message: "Token allocated", token };
  }

  // Emergency handling (bump lowest priority)
  if (source === "EMERGENCY") {
    slot.tokens.sort((a, b) => b.priority - a.priority);
    const removed = slot.tokens.pop();
    removed.status = "CANCELLED";

    slot.tokens.push(token);
    tokens[token.id] = token;

    return {
      message: "Emergency token allocated by bumping lower priority",
      token
    };
  }

  // Add to waiting queue
  slot.waitingQueue.push(token);
  slot.waitingQueue.sort((a, b) => a.priority - b.priority);

  tokens[token.id] = token;

  return {
    message: "Slot full, added to waiting queue",
    token
  };
}

// Cancel token and reallocate
function cancelToken(tokenId) {
  const token = tokens[tokenId];
  if (!token) return { error: "Invalid token" };

  token.status = "CANCELLED";

  const slot =
    doctors[token.doctorId].slots[token.slotTime];

  slot.tokens = slot.tokens.filter(t => t.id !== tokenId);

  // Reallocate from waiting queue
  if (slot.waitingQueue.length > 0) {
    const next = slot.waitingQueue.shift();
    next.status = "ACTIVE";
    slot.tokens.push(next);
  }

  return { message: "Token cancelled and slot reallocated" };
}

// No-show handling
function handleNoShows() {
  const now = Date.now();

  Object.values(doctors).forEach(doctor => {
    Object.values(doctor.slots).forEach(slot => {
      slot.tokens.forEach(token => {
        const diffMinutes = (now - token.createdAt) / 60000;
        if (!token.checkedIn && diffMinutes > slot.graceMinutes) {
          token.status = "NO_SHOW";
          slot.tokens = slot.tokens.filter(t => t.id !== token.id);

          if (slot.waitingQueue.length > 0) {
            const next = slot.waitingQueue.shift();
            next.status = "ACTIVE";
            slot.tokens.push(next);
          }
        }
      });
    });
  });
}

module.exports = {
  createDoctor,
  allocateToken,
  cancelToken,
  handleNoShows
};
