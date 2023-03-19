import { db } from "../models/db.js";

export const poiController = {
  index: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const viewData = {
        title: "Placemark - POI",
        poi: poi,
      };
      return h.view("poi-view", viewData);
    },
  },

  showEditPoi: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.params.id);
      const categories = await db.categoryStore.getAllCategories();
      const viewData = {
        title: "Placemark - Edit POI",
        poi: poi,
        categories: categories,
      };
      return h.view("poi-edit-view", viewData);
     },
  },

  updatePoi: {
    handler: async function (request, h) {
      const poi = await db.poiStore.getPoiById(request.payload.id)
      const updatedPoi = {
        name: request.payload.name,
        category: request.payload.category,
        description: request.payload.description,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.poiStore.updatePoi(poi, updatedPoi);
      return h.redirect(`/poi/${request.payload.id}`);
    },
  },
};
