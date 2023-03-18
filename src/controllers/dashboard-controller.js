import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials
      const groupedPois = await db.poiStore.getUserPoisGroupedByCategory(loggedInUser._id);
      const categories = await db.categoryStore.getAllCategories();
      const isAdmin = loggedInUser.scope.includes("admin");
      const viewData = {
        title: "Placemark - Dashboard",
        user: loggedInUser,
        groupedPois: groupedPois,
        categories: categories,
        isAdmin: isAdmin,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPoi: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoi = {
        userid: loggedInUser._id,
        name: request.payload.name,
        category: request.payload.category,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude
      };
      await db.poiStore.addPoi(newPoi);
      return h.redirect("/dashboard");
    },
  },
  
  deletePoi: {
    handler: async function(request, h) {
      const poiId = request.params.id;
      await db.poiStore.deletePoiById(poiId);
      return h.redirect("/dashboard");
    }
  }
};
