import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // Response interceptor for handling responses
    this.client.interceptors.response.use(
      (response): AxiosResponse => response,
      (error: AxiosError): Promise<never> => {
        const apiError: ApiError = {
          message: "An unexpected error occurred",
          status: error.response?.status,
        };

        if (error.response) {
          const data = error.response.data as any;
          apiError.message = data.error || data.message || apiError.message;
        }

        return Promise.reject(apiError);
      }
    );
  }

  // Generic request method
  private async request<T>(
    method: string,
    url: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      // Remove Content-Type header if sending FormData so axios sets the correct boundary
      let headers = undefined;
      if (typeof FormData !== "undefined" && data instanceof FormData) {
        headers = {};
        // Remove Content-Type so axios sets it automatically
        // @ts-ignore
        if (this.client.defaults.headers && this.client.defaults.headers["Content-Type"]) {
          delete this.client.defaults.headers["Content-Type"];
        }
      }
      const response = await this.client.request<T>({
        method,
        url,
        data,
        ...(headers ? { headers } : {}),
      });

      return {
        data: response.data,
        status: response.status,
        message: "Success",
      };
    } catch (error) {
      throw error;
    }
  }

  // HTTP methods
  async get<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>("GET", url);
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>("POST", url, data);
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>("PUT", url, data);
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>("DELETE", url);
  }

  // Add auth token to requests
  setAuthToken(token: string): void {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Remove auth token from requests
  removeAuthToken(): void {
    delete this.client.defaults.headers.common["Authorization"];
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
