import { v4 } from "uuid";

let pois = [];

export const poiMemStore = {
  async getAllPois() {
    return pois;
  },

  async addPoi(poi) {
    poi._id = v4();
    pois.push(poi);
    return poi;
  },

  async getPoiById(id) {
    return pois.find((poi) => poi._id === id);
  },

  async deletePoiById(id) {
    const index = pois.findIndex((poi) => poi._id === id);
    pois.splice(index, 1);
  },

  async deleteAllPois() {
    pois = [];
  },
};
