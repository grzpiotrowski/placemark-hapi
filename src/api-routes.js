import { usersApi } from "./api/users-api.js";
import { poiApi } from "./api/poi-api.js";
import { categoryApi } from "./api/category-api.js"

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: usersApi.find },
  { method: "POST", path: "/api/users", config: usersApi.create },
  { method: "DELETE", path: "/api/users", config: usersApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: usersApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: usersApi.authenticate },

  { method: "POST", path: "/api/pois", config: poiApi.create },
  { method: "DELETE", path: "/api/pois", config: poiApi.deleteAll },
  { method: "GET", path: "/api/pois", config: poiApi.find },
  { method: "GET", path: "/api/pois/{id}", config: poiApi.findOne },
  { method: "DELETE", path: "/api/pois/{id}", config: poiApi.deleteOne },

  { method: "POST", path: "/api/categories", config: categoryApi.create },
  { method: "DELETE", path: "/api/categories", config: categoryApi.deleteAll },
  { method: "GET", path: "/api/categories", config: categoryApi.find },
  { method: "GET", path: "/api/categories/{id}", config: categoryApi.findOne },
  { method: "DELETE", path: "/api/categories/{id}", config: categoryApi.deleteOne },

];
