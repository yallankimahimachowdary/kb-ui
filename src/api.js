const BASE_URL = 'http://113.30.177.22:5008'

// Get all materials (with optional search, page, size)
export const getMaterials = async (page = 1, size = 12, search = '') => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/materials?page=${page}&size=${size}&search=${search}`)
  return res.json()
}

// Step 1 — Upload PDF file
export const uploadMaterial = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${BASE_URL}/api/v1/admin/materials/upload`, {
    method: 'POST',
    body: formData
  })
  return res.json()
}

// Step 2 — Finalize with annotation
export const finalizeMaterial = async (tracking_token, annotation) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/materials/finalize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tracking_token, annotation })
  })
  return res.json()
}

// Suspend or reactivate material
export const updateMaterialStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/materials/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  return res.json()
}

// Delete material
export const deleteMaterial = async (id) => {
  const res = await fetch(`${BASE_URL}/api/v1/admin/materials/${id}`, {
    method: 'DELETE'
  })
  return res.json()
}

// Chat query
export const sendChatMessage = async (query) => {
  const res = await fetch(`${BASE_URL}/api/v1/chat/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, stream: false })
  })
  return res.json()
}