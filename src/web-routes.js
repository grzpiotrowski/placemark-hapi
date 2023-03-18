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
    { method: "GET", path: "/dashboard/deletepoi/{id}", config: dashboardController.deletePoi },

    { method: "GET", path: "/poi/{id}", config: poiController.index },
    { method: "GET", path: "/poi/edit/{id}", config: poiController.showEditPoi },
    { method: "POST", path: "/poi/update/{id}", config: poiController.updatePoi },

    { method: "GET", path: "/adminpanel", config: adminController.index },
    { method: "GET", path: "/adminpanel/deleteuser/{id}", config: adminController.deleteUser },
    { method: "GET", path: "/adminpanel/deletepoi/{id}", config: adminController.deletePoi },
    { method: "GET", path: "/adminpanel/deletecategory/{id}", config: adminController.deleteCategory },
    { method: "POST", path: "/adminpanel/addcategory", config: adminController.addCategory },
  ];
