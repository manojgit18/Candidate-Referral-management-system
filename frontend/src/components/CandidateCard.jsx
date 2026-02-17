import React, { useState } from "react"
import { updateCandidateStatus, deleteCandidate } from "../api"

function CandidateCard({ candidate, onStatusUpdate, onDelete }) {
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value
    if (newStatus === candidate.status) return

    setUpdatingStatus(true)
    try {
      await updateCandidateStatus(candidate._id, newStatus)
      onStatusUpdate()
    } catch {
      alert("Failed to update status")
    } finally {
      setUpdatingStatus(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this candidate?")
    if (!confirmed) return

    setDeleting(true)
    try {
      await deleteCandidate(candidate._id)
      onDelete()
    } catch {
      alert("Failed to delete candidate")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3>{candidate.name}</h3>
        <span className={`status status-${candidate.status}`}>
          {candidate.status}
        </span>
      </div>

      <p>{candidate.jobTitle}</p>
      <p>{candidate.email}</p>
      <p>{candidate.phone}</p>

      {candidate.resumeUrl && (
        <a
          href={`https://candidate-referral-management-system-48zx.onrender.com/${candidate.resumeUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          View Resume
        </a>
      )}

      <div style={{ marginTop: "10px" }}>
        <select
          value={candidate.status}
          onChange={handleStatusChange}
          disabled={updatingStatus}
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>

        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{ marginLeft: "10px" }}
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  )
}

export default CandidateCard
