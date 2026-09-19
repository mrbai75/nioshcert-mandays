// API client — wrapper fetch untuk backend NestJS
// Base URL: proxy /api -> http://localhost:3001 (lihat vite.config.ts)

export interface ApiError {
  status: number;
  message: string;
  details?: unknown;
}

export class ApiClientError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.details = details;
  }
}

const API_BASE = '/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    let details: unknown;

    try {
      const body = await response.json();
      message = body.message ?? body.error ?? message;
      details = body;
    } catch {
      message = response.statusText || message;
    }

    throw new ApiClientError(response.status, message, details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse<T>(response);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(response);
  },
};
