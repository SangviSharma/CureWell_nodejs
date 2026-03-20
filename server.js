const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const doctorRoutes = require("./routes/doctor.route");
const surgeryRoutes = require("./routes/surgery.route");

app.use("/api/doctors", doctorRoutes);
app.use("/api/surgeries", surgeryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});