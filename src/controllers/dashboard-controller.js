import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials
      const groupedPois = await db.poiStore.getUserPoisGroupedByCategory(loggedInUser._id);
      const viewData = {
        title: "Placemark - Dashboard",
        user: loggedInUser,
        groupedPois: groupedPois,
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
};
