import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { poiController } from "./controllers/poi-controller.js";
import { adminController } from "./controllers/admin-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
  
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addpoi", config: dashboardController.addPoi },

    { method: "GET", path: "/poi/{id}", config: poiController.index },

    { method: "GET", path: "/adminpanel", config: adminController.index },
    { method: "GET", path: "/adminpanel/deleteuser/{id}", config: adminController.deleteUser },
  ];
