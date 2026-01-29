const express = require("express");
const router = express.Router();
const service = require("../services/tokenService");

router.post("/doctor", (req, res) => {
  const { id, slots } = req.body;
  service.createDoctor(id, slots);
  res.json({ message: "Doctor created" });
});

router.post("/token", (req, res) => {
  const { doctorId, slotTime, source } = req.body;
  const result = service.allocateToken(doctorId, slotTime, source);
  res.json(result);
});

router.post("/cancel/:id", (req, res) => {
  res.json(service.cancelToken(req.params.id));
});

module.exports = router;
