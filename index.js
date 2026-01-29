const express = require("express");
const app = express();
const opdRoutes = require("./routes/opdRoutes");

app.use(express.json());
app.use("/api", opdRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
