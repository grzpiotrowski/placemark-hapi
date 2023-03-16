import { usersApi } from "./api/users-api.js";
import { poiApi } from "./api/poi-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: usersApi.find },
  { method: "POST", path: "/api/users", config: usersApi.create },
  { method: "DELETE", path: "/api/users", config: usersApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: usersApi.findOne },

  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },
];
