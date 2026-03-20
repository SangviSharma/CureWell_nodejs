const db = require("../config/db");

exports.getAllSurgeries = (callback) => {
  db.query("SELECT * FROM surgeries", callback);
};

exports.checkConflict = (data, callback) => {
  const { doctor_id, date, start_time, end_time } = data;

  const query = `
    SELECT * FROM surgeries 
    WHERE doctor_id = ? AND date = ?
    AND (
      (start_time < ? AND end_time > ?) OR
      (start_time < ? AND end_time > ?)
    )
  `;

  db.query(
    query,
    [doctor_id, date, end_time, start_time, start_time, end_time],
    callback
  );
};

exports.addSurgery = (data, callback) => {
  const { doctor_id, date, start_time, end_time, category } = data;

  db.query(
    "INSERT INTO surgeries (doctor_id, date, start_time, end_time, category) VALUES (?, ?, ?, ?, ?)",
    [doctor_id, date, start_time, end_time, category],
    callback
  );
};

exports.updateSurgery = (id, data, callback) => {
  const { start_time, end_time } = data;

  db.query(
    "UPDATE surgeries SET start_time=?, end_time=? WHERE id=?",
    [start_time, end_time, id],
    callback
  );
};