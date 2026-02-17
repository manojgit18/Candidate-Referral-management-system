const express = require("express")
const router = express.Router()

const multer = require("multer")
const path = require("path")
const Candidate = require("../models/candidateModel")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueName =
      "resume-" + Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  },
})

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase()
  const mimeType = file.mimetype

  if (ext === ".pdf" && mimeType === "application/pdf") {
    cb(null, true)
  } else {
    cb(new Error("Only PDF files are allowed for resume upload"), false)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
})

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body

    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and job title are required",
      })
    }

    const resumeUrl = req.file ? `uploads/${req.file.filename}` : null

    const newCandidate = new Candidate({
      name,
      email,
      phone,
      jobTitle,
      resumeUrl,
    })

    const savedCandidate = await newCandidate.save()

    res.status(201).json({
      success: true,
      message: "Candidate referred successfully",
      data: savedCandidate,
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message)
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      })
    }

    if (error.message === "Only PDF files are allowed for resume upload") {
      return res.status(400).json({
        success: false,
        message: error.message,
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    })
  }
})

router.get("/", async (req, res) => {
  try {
    const candidates = await Candidate.find({}).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    })
  } catch {
    res.status(500).json({
      success: false,
      message: "Server error. Could not fetch candidates.",
    })
  }
})

router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      })
    }

    const allowedStatuses = ["Pending", "Reviewed", "Hired"]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Pending, Reviewed, or Hired",
      })
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    )

    if (!updatedCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Candidate status updated successfully",
      data: updatedCandidate,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid candidate ID format",
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error. Could not update status.",
    })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const deletedCandidate = await Candidate.findByIdAndDelete(id)

    if (!deletedCandidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Candidate deleted successfully",
      data: deletedCandidate,
    })
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid candidate ID format",
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error. Could not delete candidate.",
    })
  }
})

module.exports = router
