import React, { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard"
import ReferralForm from "./components/ReferralForm"
import { getAllCandidates, getMetrics } from "./api"

function App() {
  const [candidates, setCandidates] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const fetchCandidates = async () => {
    setLoading(true)
    try {
      const result = await getAllCandidates()
      setCandidates(result.data)

      const metricsData = await getMetrics()
      setMetrics(metricsData)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  return (
    <div className="container">
      <h1>Candidate Referral System</h1>

      <div>
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("form")}>Refer Candidate</button>
      </div>

      {activeTab === "dashboard" && (
        <Dashboard
          candidates={candidates}
          metrics={metrics}
          loading={loading}
          onStatusUpdate={fetchCandidates}
          onDelete={fetchCandidates}
        />
      )}

      {activeTab === "form" && (
        <ReferralForm
          onCandidateAdded={() => {
            fetchCandidates()
            setActiveTab("dashboard")
          }}
        />
      )}
    </div>
  )
}

export default App
