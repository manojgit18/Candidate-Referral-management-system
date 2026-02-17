import React, { useState } from "react"
import CandidateCard from "./CandidateCard"

function Dashboard({ candidates, loading, onStatusUpdate, onDelete }) {
  const [searchTitle, setSearchTitle] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const filteredCandidates = candidates.filter((candidate) => {
    const titleMatch = candidate.jobTitle
      .toLowerCase()
      .includes(searchTitle.toLowerCase())

    const statusMatch = filterStatus === "" || candidate.status === filterStatus

    return titleMatch && statusMatch
  })

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Search by job title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>

      {loading && <p>Loading...</p>}

      {!loading &&
        filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate._id}
            candidate={candidate}
            onStatusUpdate={onStatusUpdate}
            onDelete={onDelete}
          />
        ))}
    </div>
  )
}

export default Dashboard
