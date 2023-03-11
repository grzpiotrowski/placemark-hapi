import { usersApi } from "./api/users-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: usersApi.find },
  { method: "POST", path: "/api/users", config: usersApi.create },
  { method: "DELETE", path: "/api/users", config: usersApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: usersApi.findOne },
];
