import axios from "axios";

// Update the API_URL to match the server's actual endpoint structure
// The server doesn't have an /api prefix
const API_URL = 'http://localhost:3000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Auth API calls
export const verifyAuth = () => api.get("/auth/verify");
export const getDiscordAuthUrl = () => `${API_URL}/auth/discord`;
export const handleDiscordCallback = (code) =>
  api.get(`/auth/discord/callback?code=${code}`);
export const logout = () => api.get("/auth/logout");

// Homework API calls
export const getHomeworks = () => api.get('/homeworks');
export const getHomeworkById = (id) => api.get(`/homeworks/${id}`);
export const createHomework = (homework) => api.post('/homeworks', homework);
export const updateHomework = (id, homework) => api.put(`/homeworks/${id}`, homework);
export const deleteHomework = (id) => api.delete(`/homeworks/${id}`);

// Subject API calls
export const getSubjects = () => api.get('/subjects');
export const getSubjectById = (id) => api.get(`/subjects/${id}`);
export const createSubject = (subject) => api.post('/subjects', subject);
export const updateSubject = (id, subject) => api.put(`/subjects/${id}`, subject);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

// State API calls
export const getStates = () => api.get('/states');
export const getStateById = (id) => api.get(`/states/${id}`);
export const createState = (state) => api.post('/states', state);
export const updateState = (id, state) => api.put(`/states/${id}`, state);
export const deleteState = (id) => api.delete(`/states/${id}`);

export default api;
