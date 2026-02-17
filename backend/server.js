require("dotenv").config()

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const candidateRoutes = require("./routes/candidateRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/candidates", candidateRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Worko Referral API is running!" })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT)
  })
  .catch(() => {
    process.exit(1)
  })
