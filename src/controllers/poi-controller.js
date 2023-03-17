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
};
