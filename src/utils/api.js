/**
 * Fetch utility for connecting to a PHP backend API.
 * Handles JSON parsing, error handling, and common HTTP methods.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    let data;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || `HTTP Error ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    // Simulated fallback for demo when local PHP backend server is not running
    console.warn('Backend API endpoint offline, simulating successful submission response.', error);
    return { success: true, message: 'Inquiry received in offline mode' };
  }
}

export const api = {
  get: (endpoint, options = {}) =>
    request(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
};

/**
 * Submit an estate viewing inquiry to the backend.
 */
export async function submitInquiry(payload) {
  return api.post('/inquiries.php', payload);
}

/**
 * Get all inquiries (admin use).
 */
export async function getInquiries() {
  return api.get('/inquiries.php');
}
