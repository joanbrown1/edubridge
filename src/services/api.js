class APIService {
  constructor() {
    this.baseURL =
      import.meta.env.VITE_API_URL || "https://api.edubridge.jaybrown.xyz/api";
    this.timeout = 30000; // 30 seconds
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    config.signal = controller.signal;

    try {
      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error("Request timeout - please try again");
      }
      throw error;
    }
  }

  async processText(text, level = "high-school") {
    return this.request("/process-text", {
      method: "POST",
      body: JSON.stringify({ text, level }),
    });
  }

  async processFile(file, level = "high-school") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);

    return this.request("/process-file", {
      method: "POST",
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  }

  async getDemoContent() {
    return this.request("/demo");
  }

  async healthCheck() {
    return this.request("/health");
  }
}

export const apiService = new APIService();
