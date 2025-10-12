const API_URL = import.meta.env.VITE_URL_API
const API_USER = import.meta.env.VITE_USER_API
const API_PASSWORD = import.meta.env.VITE_PASSWORD_API

async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Authorization': 'Basic ' + btoa(`${API_USER}:${API_PASSWORD}`),
    'Content-Type': 'application/json',
  }

  const options = {
    method,
    headers,
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, options)

  if (!response.ok) {
    const errorText = await response.json()
    return (errorText)
  }

  return response.json()
}


export function apiGet(endpoint) {
  return apiRequest(endpoint, 'GET')
}

export function apiPost(endpoint, body) {
  return apiRequest(endpoint, 'POST', body)
}

export function apiPut(endpoint, body) {
  return apiRequest(endpoint, 'PUT', body)
}

export function apiDelete(endpoint) {
  return apiRequest(endpoint, 'DELETE')
}
