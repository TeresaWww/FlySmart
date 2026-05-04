export type ApiClientOptions = {
  baseUrl?: string
}

function defaultBaseUrl(): string {
  // Set in `.env` as VITE_API_BASE_URL="https://your-backend"
  return (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_API_BASE_URL ?? ''
}

export class ApiError extends Error {
  status: number
  payload?: unknown
  constructor(message: string, status: number, payload?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export function createApiClient(opts: ApiClientOptions = {}) {
  const baseUrl = opts.baseUrl ?? defaultBaseUrl()

  async function request<TResponse>(path: string, init: RequestInit): Promise<TResponse> {
    const url = `${baseUrl}${path}`
    const res = await fetch(url, {
      ...init,
      headers: {
        'content-type': 'application/json',
        ...(init.headers ?? {}),
      },
    })

    const text = await res.text()
    const payload = text ? safeJson(text) : null

    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.status} ${res.statusText}`, res.status, payload)
    }
    return payload as TResponse
  }

  return {
    post<TResponse>(path: string, body: unknown, init?: RequestInit) {
      return request<TResponse>(path, {
        method: 'POST',
        body: JSON.stringify(body),
        ...init,
      })
    },
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

