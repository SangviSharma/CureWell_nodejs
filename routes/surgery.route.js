const express = require("express");
const router = express.Router();
const surgeryController = require("../controllers/surgery.controller");


router.get("/today", surgeryController.getTodaySurgeries);


router.get("/", surgeryController.getSurgeries);
router.get("/:id", surgeryController.getSurgeryById);

router.post("/", surgeryController.createSurgery);
router.put("/:id", surgeryController.updateSurgery);

module.exports = router;