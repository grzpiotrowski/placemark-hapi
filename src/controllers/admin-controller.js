import { db } from "../models/db.js";

export const adminController = {
  index: {
    auth: { strategy: "session", scope: "admin" },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials
      const allUsers = await db.userStore.getAllUsers();
      const allPois = await db.poiStore.getAllPois();
      const categories = await db.categoryStore.getAllCategories();

      const viewData = {
        title: "Placemark - Admin Panel",
        user: loggedInUser,
        allUsers: allUsers,
        allPois: allPois,
        categories: categories,
        isAdmin: true,
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
  },

  deletePoi: {
    auth: { strategy: "session", scope: "admin"},
    handler: async function (request, h) {
      const poiId = request.params.id;
      await db.poiStore.deletePoiById(poiId);
      return h.redirect("/adminpanel");
    }
  },

  addCategory: {
    handler: async function (request, h) {
      const newCategory = {
        name: request.payload.name,
      };
      await db.categoryStore.addCategory(newCategory);
      return h.redirect("/adminpanel");
    },
  },

  deleteCategory: {
    auth: { strategy: "session", scope: "admin"},
    handler: async function (request, h) {
      const categoryId = request.params.id;
      await db.categoryStore.deleteCategoryById(categoryId);
      return h.redirect("/adminpanel");
    }
  },
};
