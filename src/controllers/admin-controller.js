import { db } from "../models/db.js";

export const adminController = {
  index: {
    auth: { strategy: "session", scope: "admin" },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials
      const allUsers = await db.userStore.getAllUsers();
      const categories = await db.categoryStore.getAllCategories();
      const viewData = {
        title: "Placemark - Admin Panel",
        user: loggedInUser,
        allUsers: allUsers,
        categories: categories,
      };
      return h.view("admin-view", viewData);
    },
  },

  deleteUser: {
    auth: { strategy: "session", scope: "admin"},
    handler: async function (request, h) {
      const userId = request.params.id;
      await db.userStore.deleteUserById(userId);
      return h.redirect("/adminpanel");
    }
  }
};
