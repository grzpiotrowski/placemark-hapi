import { usersApi } from "./api/users-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: usersApi.create },
  { method: "GET", path: "/api/users", config: usersApi.find },
];
