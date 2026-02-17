import axios from "axios"

const BASE_URL = "https://candidate-referral-management-system-48zx.onrender.com"

export const getAllCandidates = async () => {
  const response = await axios.get(`${BASE_URL}/candidates`)
  return response.data
}

export const addCandidate = async (formData) => {
  const response = await axios.post(`${BASE_URL}/candidates`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return response.data
}

export const updateCandidateStatus = async (id, status) => {
  const response = await axios.put(`${BASE_URL}/candidates/${id}/status`, { status })
  return response.data
}

export const deleteCandidate = async (id) => {
  const response = await axios.delete(`${BASE_URL}/candidates/${id}`)
  return response.data
}
