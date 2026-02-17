import React, { useState } from "react"
import { addCandidate } from "../api"

function ReferralForm({ onCandidateAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: ""
  })

  const [resumeFile, setResumeFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.phone || !formData.jobTitle) {
      alert("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("phone", formData.phone)
      data.append("jobTitle", formData.jobTitle)

      if (resumeFile) {
        data.append("resume", resumeFile)
      }

      const result = await addCandidate(data)

      if (result.success) {
        alert("Candidate added successfully")
        setFormData({ name: "", email: "", phone: "", jobTitle: "" })
        setResumeFile(null)
        onCandidateAdded()
      }
    } catch {
      alert("Failed to submit referral")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form">
      <h2>Refer a Candidate</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
        <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
        <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default ReferralForm
