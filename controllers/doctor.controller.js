const doctorModel = require("../models/doctor.model");

exports.getDoctors = (req, res) => {
  doctorModel.getAllDoctors((err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error fetching doctors",
        error: err,
      });
    }

    res.status(200).json(result); 
  });
};

exports.createDoctor = (req, res) => {
  const { name, specialization, availability } = req.body;

  if (!name || !specialization || !availability) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  doctorModel.addDoctor(req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error adding doctor",
        error: err,
      });
    }

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: result,
    });
  });
};

exports.updateDoctor = (req, res) => {
  const { name, specialization } = req.body;
  const { id } = req.params;

  if (!name || !specialization) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  doctorModel.updateDoctor(id, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error updating doctor",
        error: err,
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
    });
  });
};

exports.deleteDoctor = (req, res) => {
  const { id } = req.params;

  doctorModel.deleteDoctor(id, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error deleting doctor",
        error: err,
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  });
};