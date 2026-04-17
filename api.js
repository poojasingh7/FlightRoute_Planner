import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");

// Flights
export const searchFlight = (from, to, mode) =>
  API.get(`/flights?from=${from}&to=${to}&mode=${mode}`);

// Saved Routes
export const saveRoute = (data) => API.post("/routes", data);
export const getSavedRoutes = () => API.get("/routes");
export const deleteRoute = (id) => API.delete(`/routes/${id}`);