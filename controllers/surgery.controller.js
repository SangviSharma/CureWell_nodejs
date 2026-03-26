const db = require("../config/db");

exports.getSurgeries = (req, res) => {
  db.query("SELECT * FROM surgeries", (err, results) => {
    if (err) return res.status(500).json(err);

    const formatted = results.map((row) => ({
      id: row.id,
      doctorId: row.doctor_id,      
      date: row.date,
      startTime: row.start_time,    
      endTime: row.end_time,      
      category: row.category,
    }));

    res.json(formatted);
  });
};

exports.getSurgeryById = (req, res) => {
  db.query(
    "SELECT * FROM surgeries WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Not found" });
      }

      const row = result[0];

      res.json({
        id: row.id,
        doctorId: row.doctor_id,
        date: row.date,
        startTime: row.start_time,
        endTime: row.end_time,
        category: row.category,
      });
    }
  );
};

exports.createSurgery = (req, res) => {
  const { doctorId, date, startTime, endTime, category } = req.body;

  if (!doctorId || !date || !startTime || !endTime || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO surgeries (doctor_id, date, start_time, end_time, category) VALUES (?, ?, ?, ?, ?)",
    [doctorId, date, startTime, endTime, category],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Surgery added successfully" });
    }
  );
};

exports.updateSurgery = (req, res) => {
  const { startTime, endTime } = req.body;

  db.query(
    "UPDATE surgeries SET start_time=?, end_time=? WHERE id=?",
    [startTime, endTime, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Surgery updated successfully" });
    }
  );
};

exports.getTodaySurgeries = (req, res) => {
  db.query(
    "SELECT * FROM surgeries WHERE date = CURDATE()",
    (err, results) => {
      if (err) return res.status(500).json(err);

      const formatted = results.map((row) => ({
        id: row.id,
        doctorId: row.doctor_id,
        date: new Date(row.date).toLocaleDateString("en-CA"),
        startTime: row.start_time,
        endTime: row.end_time,
        category: row.category,
      }));

      res.json(formatted);
    }
  );
};