const API_URL = import.meta.env.VITE_URL_API
const API_USER = import.meta.env.VITE_USER_API
const API_PASSWORD = import.meta.env.VITE_PASSWORD_API

async function apiRequest(endpoint, method = 'GET', body = null, extraHeaders = {}, options = {}) {
  const headers = {
    Authorization: 'Basic ' + btoa(`${API_USER}:${API_PASSWORD}`),
    ...extraHeaders, // permite sobrescrever ou adicionar cabeçalhos
  }

  const fetchOptions = {
    method,
    headers,
  }

  // Se for um FormData, não define Content-Type (o browser faz isso automaticamente)
  if (body instanceof FormData) {
    fetchOptions.body = body
  } else if (body) {
    headers['Content-Type'] = 'application/json'
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_URL}${endpoint}`, fetchOptions)

  // Se o cliente pediu um blob (ex: PDF), tratamos separadamente sem consumir a stream duas vezes
  if (options.responseType === 'blob') {
    if (!response.ok) {
      // para mensagens de erro lemos o clone (não consome o original)
      const clone = response.clone()
      const text = await clone.text().catch(() => null)
      throw new Error(text || response.statusText || `Erro ${response.status}`)
    }
    // retorna o Blob diretamente
    return response.blob()
  }
  // tenta retornar JSON ou texto
  let data
  try {
    data = await response.json()
  } catch {
    data = await response.text()
  }

  if (!response.ok) {
    throw new Error(typeof data === 'string' ? data : JSON.stringify(data, null, 2))
  }

  return data
}

export function apiGet(endpoint, options = {}) {
  return apiRequest(endpoint, 'GET', null, {}, options)
}

export function apiPost(endpoint, body, extraHeaders = {}, options = {}) {
  return apiRequest(endpoint, 'POST', body, extraHeaders, options)
}

export function apiPut(endpoint, body, extraHeaders = {}, options = {}) {
  return apiRequest(endpoint, 'PUT', body, extraHeaders, options)
}

export function apiDelete(endpoint, extraHeaders = {}, options = {}) {
  return apiRequest(endpoint, 'DELETE', null, extraHeaders, options)
}
