const db = require("../config/db");

exports.getAllDoctors = (callback) => {
  db.query("SELECT * FROM doctors", callback);
};

exports.addDoctor = (data, callback) => {
  const { name, specialization, availability } = data;

  db.query(
    "INSERT INTO doctors (name, specialization, availability) VALUES (?, ?, ?)",
    [name, specialization, availability],
    callback
  );
};

exports.updateDoctor = (id, data, callback) => {
  const { name, specialization } = data;

  db.query(
    "UPDATE doctors SET name=?, specialization=? WHERE id=?",
    [name, specialization, id],
    callback
  );
};

exports.deleteDoctor = (id, callback) => {
  db.query("DELETE FROM doctors WHERE id=?", [id], callback);
};