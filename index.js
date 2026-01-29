const express = require("express");
const app = express();
const opdRoutes = require("./routes/opdRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("OPD Token Allocation Engine is running 🚀");
});

app.get("/api", (req, res) => {
  res.json({
    message: "OPD Token Allocation Engine API",
    endpoints: [
      "POST /api/doctor",
      "POST /api/token",
      "POST /api/cancel/:id"
    ]
  });
});

app.use("/api", opdRoutes);


const { handleNoShows } = require("./services/tokenService");

// Run no-show check every 1 minute
setInterval(() => {
  handleNoShows();
  console.log("No-show check executed");
}, 60000);


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
