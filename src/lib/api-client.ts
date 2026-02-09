const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  role?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  tenantSlug: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Asset {
  id: string;
  name: string;
  description?: string;
  assetCode: string;
  categoryId: string;
  category?: AssetCategory;
  locationId?: string;
  location?: Location;
  purchaseDate?: string;
  purchasePrice?: number;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE" | "RETIRED";
  serialNumber?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssetCategory {
  id: string;
  name: string;
  description?: string;
  tenantId: string;
  createdAt: string;
}

export interface Location {
  id: string;
  name: string;
  description?: string;
  address?: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  tenantId: string;
  createdAt: string;
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.loadTokens();
  }

  private loadTokens(): void {
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("accessToken");
    }
  }

  private setTokens(tokens: AuthTokens): void {
    this.accessToken = tokens.accessToken;
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("expiresIn", tokens.expiresIn.toString());
    }
  }

  clearTokens(): void {
    this.accessToken = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresIn");
    }
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<{ data?: T; error?: string; message?: string }> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...(options.headers || {}),
        },
      });

      const contentType = response.headers.get("content-type");
      let responseData: any = {};

      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else {
        const text = await response.text();
        responseData = { message: text };
      }

      if (!response.ok) {
        const error = responseData.error || responseData.message || `HTTP ${response.status}`;
        return { error };
      }

      return { data: responseData.data || responseData, message: responseData.message };
    } catch (error) {
      console.error("[v0] API request failed:", error);
      return { error: error instanceof Error ? error.message : "Network error" };
    }
  }

  // Auth endpoints
  async register(payload: RegisterRequest): Promise<{ user?: User; tenant?: Tenant; error?: string }> {
    const result = await this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (result.error) {
      return { error: result.error };
    }

    const data = result.data as any;
    if (data?.accessToken) {
      this.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      });
    }

    return { user: data?.user, tenant: data?.tenant };
  }

  async login(payload: LoginRequest): Promise<{ user?: User; tokens?: AuthTokens; error?: string }> {
    const result = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (result.error) {
      return { error: result.error };
    }

    const data = result.data as any;
    if (data?.accessToken) {
      this.setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
      });
    }

    return {
      user: data?.user,
      tokens: data?.accessToken ? { accessToken: data.accessToken, refreshToken: data.refreshToken, expiresIn: data.expiresIn } : undefined,
    };
  }

  async forgotPassword(payload: ForgotPasswordRequest): Promise<{ message?: string; error?: string }> {
    const result = await this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { message: result.message, error: result.error };
  }

  async resetPassword(payload: ResetPasswordRequest): Promise<{ message?: string; error?: string }> {
    const result = await this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { message: result.message, error: result.error };
  }

  async verifyEmail(token: string): Promise<{ user?: User; error?: string }> {
    const result = await this.request(`/auth/verify-email?token=${token}`, {
      method: "GET",
    });

    if (result.error) {
      return { error: result.error };
    }

    return { user: result.data?.user };
  }

  async logout(): Promise<void> {
    this.clearTokens();
  }

  // Asset endpoints
  async getAssets(params?: Record<string, any>): Promise<{ assets?: Asset[]; error?: string }> {
    const query = params ? `?${new URLSearchParams(params).toString()}` : "";
    const result = await this.request(`/assets${query}`, { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { assets: result.data?.assets || result.data };
  }

  async getAsset(id: string): Promise<{ asset?: Asset; error?: string }> {
    const result = await this.request(`/assets/${id}`, { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { asset: result.data?.asset || result.data };
  }

  async createAsset(payload: Partial<Asset>): Promise<{ asset?: Asset; error?: string }> {
    const result = await this.request("/assets", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { asset: result.data?.asset || result.data };
  }

  async updateAsset(id: string, payload: Partial<Asset>): Promise<{ asset?: Asset; error?: string }> {
    const result = await this.request(`/assets/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { asset: result.data?.asset || result.data };
  }

  async deleteAsset(id: string): Promise<{ message?: string; error?: string }> {
    const result = await this.request(`/assets/${id}`, { method: "DELETE" });
    return { message: result.message, error: result.error };
  }

  // Asset Categories
  async getAssetCategories(): Promise<{ categories?: AssetCategory[]; error?: string }> {
    const result = await this.request("/asset-categories", { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { categories: result.data?.categories || result.data };
  }

  async createAssetCategory(payload: Partial<AssetCategory>): Promise<{ category?: AssetCategory; error?: string }> {
    const result = await this.request("/asset-categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { category: result.data?.category || result.data };
  }

  // Locations
  async getLocations(): Promise<{ locations?: Location[]; error?: string }> {
    const result = await this.request("/locations", { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { locations: result.data?.locations || result.data };
  }

  async getLocation(id: string): Promise<{ location?: Location; error?: string }> {
    const result = await this.request(`/locations/${id}`, { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { location: result.data?.location || result.data };
  }

  async createLocation(payload: Partial<Location>): Promise<{ location?: Location; error?: string }> {
    const result = await this.request("/locations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { location: result.data?.location || result.data };
  }

  async updateLocation(id: string, payload: Partial<Location>): Promise<{ location?: Location; error?: string }> {
    const result = await this.request(`/locations/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { location: result.data?.location || result.data };
  }

  async deleteLocation(id: string): Promise<{ message?: string; error?: string }> {
    const result = await this.request(`/locations/${id}`, { method: "DELETE" });
    return { message: result.message, error: result.error };
  }

  // Users
  async getUsers(): Promise<{ users?: UserData[]; error?: string }> {
    const result = await this.request("/users", { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { users: result.data?.users || result.data };
  }

  async getUser(id: string): Promise<{ user?: UserData; error?: string }> {
    const result = await this.request(`/users/${id}`, { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { user: result.data?.user || result.data };
  }

  async createUser(payload: Partial<UserData>): Promise<{ user?: UserData; error?: string }> {
    const result = await this.request("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { user: result.data?.user || result.data };
  }

  async updateUser(id: string, payload: Partial<UserData>): Promise<{ user?: UserData; error?: string }> {
    const result = await this.request(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    if (result.error) {
      return { error: result.error };
    }
    return { user: result.data?.user || result.data };
  }

  async deleteUser(id: string): Promise<{ message?: string; error?: string }> {
    const result = await this.request(`/users/${id}`, { method: "DELETE" });
    return { message: result.message, error: result.error };
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{ stats?: Record<string, any>; error?: string }> {
    const result = await this.request("/dashboard/stats", { method: "GET" });
    if (result.error) {
      return { error: result.error };
    }
    return { stats: result.data };
  }
}

export const apiClient = new ApiClient();
