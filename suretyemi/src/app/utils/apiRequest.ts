import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method,
} from "axios";
import {
  getUserData,
  getToken,
  setLocalToken,
  // setLocalRefreshTkn,
} from "./common";
import * as urls from "./url";

// --- Type Definitions ---

// Define the shape of your User Data
interface UserData {
  BankCode?: string;
  TranCode?: string;
  UserName?: string;
  userCd?: string;
  compCd?: string;
  clientCd?: string;
  sessionToken?: string;
  // Add other fields as necessary
}

// Define the shape of Identity Data stored in localStorage
interface IdentityData {
  ip?: string;
}

// Define the shape of Location Data
interface LocationData {
  latitude: string | number;
  longitude: string | number;
}

// Define Token structure
interface TokenData {
  accessToken: string;
  refreshToken: string;
}

// Extend Axios config to allow the _retry flag
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// ------------------------

// Use require for package.json to avoid strict TS structure issues with JSON imports
// Alternatively, enable "resolveJsonModule" in tsconfig.json
const packageJson = require("./../../../package.json");

const currentVersion: string = packageJson.version;

const axiosInstance = axios.create({
  baseURL: process.env.baseURL, // Ensure this is defined in your env types
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Basic " +
      btoa(
        // process.env.REACT_APP_AUTHENTICATION_USERNAME +
        "softtech" +
        ":" +
        // process.env.REACT_APP_AUTHENTICATION_PASSWORD
        "softtech"
      ),
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },

  async (error: any) => {
    if (!error.response) {
      // Handle network errors
      return Promise.reject(error);
    }

    const originalRequest = error.config as CustomAxiosRequestConfig;

    // Check if the error is due to an expired access token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = getToken();

      if (token && token.refreshToken) {
        try {
          // Refresh token logic
          await refreshAccessToken(token.refreshToken);

          // Get new token after refresh
          const newToken = getToken();

          if (newToken && originalRequest.headers) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newToken.accessToken}`;
          }

          // Retry the original request with the new token
          // Note: Using axiosInstance ensures the baseURL and defaults are kept
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Function to refresh access token
const refreshAccessToken = async (refreshToken: string): Promise<void> => {
  const userData = getUserData() as UserData;

  const getIdentifyData = localStorage.getItem("_identityData");
  const identifyData: IdentityData = getIdentifyData ? JSON.parse(getIdentifyData) : {};

  const payload = {
    Domain: window.location.hostname,
    RefreshToken: refreshToken,
    BankCode: userData.BankCode || "",
    UserId: userData.TranCode,
    UserName: userData.UserName,
    IpAddress: identifyData?.ip,
  };

  try {
    const response = await axios({
      method: "POST",
      url: urls.refreshToken,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          btoa(
            (process.env.REACT_APP_AUTHENTICATION_USERNAME || "") +
            ":" +
            (process.env.REACT_APP_AUTHENTICATION_PASSWORD || "")
          ),
      },
    });

    if (response.data && response.data.JwtToken) {
      setLocalToken(response.data.JwtToken);
    }
  } catch (error) {
    if (window.location.pathname !== "/sessionout") {
      window.location.href = "/sessionout";
    }
  }
};

// Generic API Request Wrapper
export const apiRequest = async <T = any>(
  method: Method | string,
  endpoint: string,
  data: any = null,
  config: AxiosRequestConfig = {}
): Promise<T | string> => {
  // Safe parsing of localStorage
  const getLocation = localStorage.getItem("location");
  const location: LocationData = getLocation ? JSON.parse(getLocation) : { latitude: "", longitude: "" };

  const getIdentifyData = localStorage.getItem("_identityData");
  const identifyData: IdentityData = getIdentifyData ? JSON.parse(getIdentifyData) : {};

  const userData = getUserData() as UserData;

  try {
    const payload = {
      ...data,
      compCd: data?.compCd || undefined,
      userCd: userData?.userCd || undefined,
      reqDomain: window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "",
      sessionToken: userData?.sessionToken || undefined,
      latitude: location?.latitude?.toString() || "",
      longitude: location?.longitude?.toString() || "",
    };

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: payload,
      ...config,
    });

    // Handle successful response
    // Assuming 'statusCode' 3 means session expired
    if (response.data.statusCode === 3) {
      if (window.location.pathname !== "/sessionout") {
        window.location.href = "/sessionout";
      }
      return "";
    } else {
      return response.data;
    }
  } catch (error: any) {
    console.error("error", error);
    throw new Error(error.message || String(error));
  }
};

// Generic Multipart Request Wrapper
export const apiRequestMultiPart = async <T = any>(
  method: Method | string,
  endpoint: string,
  data: any,
  config: AxiosRequestConfig = {}
): Promise<T | string> => {
  try {
    const getLocation = localStorage.getItem("location");
    const location: LocationData = getLocation ? JSON.parse(getLocation) : { latitude: "", longitude: "" };

    const getIdentifyData = localStorage.getItem("_identityData");
    const identifyData: IdentityData = getIdentifyData ? JSON.parse(getIdentifyData) : {};

    const userData = getUserData() as UserData;

    // Destructure UploadFile to separate it from the JSON payload
    const { UploadFile, ...otherPayload } = data;

    const form = new FormData();
    if (UploadFile) {
      form.append("file", UploadFile);
    }

    const payload = {
      ...otherPayload,
      compCd: userData?.compCd || undefined,
      userCd: userData?.userCd || undefined,
      clientCd: userData?.clientCd || undefined,
      reqDomain: window.location.hostname,
      ipAddress: identifyData?.ip,
      channelId: "",
      sessionToken: userData?.sessionToken || undefined,
      latitude: location?.latitude?.toString() || "",
      longitude: location?.longitude?.toString() || "",
    };

    // Append JSON data as a Blob
    form.append(
      "data",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const response = await axiosInstance({
      method,
      url: endpoint,
      data: form,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      ...config,
    });

    // Handle successful response
    // Assuming STATUS "3" or "6" indicates specific server status codes (e.g. session out)
    if (response.data.STATUS === "3" || response.data.STATUS === "6") {
      if (window.location.pathname !== "/sessionout") {
        window.location.href = "/sessionout";
      }
      return "";
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};