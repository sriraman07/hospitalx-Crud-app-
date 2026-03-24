const express = require("express");
const Patient = require("../Models/patient");       
const auth = require("../Middleware/authMiddleware"); 

const router = express.Router();

// ADD PATIENT
router.post("/", auth, async (req, res) => {
  const { name, bedId } = req.body;

  try {
    //  Check for missing fields
    if (!name || !bedId) {
      return res.status(400).json({ msg: "Name and bedId are required" });
    }

    const patient = new Patient({
      name,
      bedId,
      userId: req.user.id,
    });

    await patient.save();

    res.status(201).json({ msg: "Patient added", patient });
  } catch (err) {
    console.error("ADD PATIENT ERROR:", err.message); // ✅ Log real error
    res.status(500).json({ msg: err.message });
  }
});

// GET ALL PATIENTS (only for logged-in user)
router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.find({ userId: req.user.id });
    res.json(patients);
  } catch (err) {
    console.error("GET PATIENTS ERROR:", err.message); // ✅ Log real error
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE PATIENT
router.put("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, // ✅ Only owner can update
      req.body,
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    res.json({ msg: "Patient updated", patient });
  } catch (err) {
    console.error("UPDATE PATIENT ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

// DELETE PATIENT
router.delete("/:id", auth, async (req, res) => {
  try {
    const patient = await Patient.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // ✅ Only owner can delete
    });

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    res.json({ msg: "Patient deleted" });
  } catch (err) {
    console.error("DELETE PATIENT ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;