import { Poi } from "./poi.js";

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().lean();
    return pois;
  },

  async getPoiById(id) {
    if (id) {
      const poi = await Poi.findOne({ _id: id }).lean();
      return poi;
    }
    return null;
  },

  async addPoi(poi) {
    const newPoi = new Poi(poi);
    const poiObj = await newPoi.save();
    return this.getPoiById(poiObj._id);
  },

  async getUserPois(id) {
    const pois = await Poi.find({ userid: id }).lean();
    return pois;
  },

  async getUserPoisGroupedByCategory(id) {
    const groupedPois = await Poi.aggregate([
      {
        $match: {
          userid: id
        }
      },
      {
        $group: {
          _id: "$category",
          pois: { $push: "$$ROOT" }
        }
      }      
    ]);
    return groupedPois;
  },

  async deletePoiById(id) {
    try {
      await Poi.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPois() {
    await Poi.deleteMany({});
  }
};
