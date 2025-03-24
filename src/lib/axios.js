import axios from "axios";
import { store } from "../store/store";
import { setAuth } from "../slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../services/apiAuth";

export const api = axios.create({
  baseURL: "https://localhost:7000/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const { accessToken } = state.auth;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newTokenResponse = await refreshAccessToken();

        const user = newTokenResponse.user;
        const accessToken = newTokenResponse.accessToken;
        const decodedToken = jwtDecode(accessToken);
        const role = decodedToken.role || "";

        store.dispatch(setAuth({ user, role, accessToken }));

        // Sätt den nya token i headers för nästa request
        api.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);

        // Hantera fel vid refresh token (t.ex. logga ut användaren)
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
