const express = require("express");
const router = express.Router();
const service = require("../services/tokenService");

/* ---------- INFO ROUTES (GET) ---------- */

// Doctor info
router.get("/doctor", (req, res) => {
  res.json({
    endpoint: "/api/doctor",
    method: "POST",
    description: "Create a doctor with OPD slots",
    sampleBody: {
      id: "D1",
      slots: {
        "9-10": { capacity: 2, tokens: [] }
      }
    }
  });
});

// Token info
router.get("/token", (req, res) => {
  res.json({
    endpoint: "/api/token",
    method: "POST",
    description: "Allocate a token to a doctor slot",
    priorityOrder: [
      "EMERGENCY",
      "PAID",
      "FOLLOW_UP",
      "WALK_IN",
      "ONLINE"
    ],
    sampleBody: {
      doctorId: "D1",
      slotTime: "9-10",
      source: "ONLINE"
    }
  });
});

// Cancel info
router.get("/cancel", (req, res) => {
  res.json({
    endpoint: "/api/cancel/:tokenId",
    method: "POST",
    description: "Cancel an allocated token"
  });
});

/* ---------- REAL BUSINESS LOGIC (POST) ---------- */

// Create doctor
router.post("/doctor", (req, res) => {
  const { id, slots } = req.body;
  service.createDoctor(id, slots);
  res.json({ message: "Doctor created successfully" });
});

// Allocate token
router.post("/token", (req, res) => {
  const { doctorId, slotTime, source } = req.body;
  const result = service.allocateToken(doctorId, slotTime, source);
  res.json(result);
});

// Cancel token
router.post("/cancel/:id", (req, res) => {
  res.json(service.cancelToken(req.params.id));
});

module.exports = router;
