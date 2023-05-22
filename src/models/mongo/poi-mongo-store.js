import { Poi } from "./poi.js";

export const poiMongoStore = {
  async getAllPois() {
    const pois = await Poi.find().populate("category").lean();
    return pois;
  },

  async getPoiById(id) {
    if (id) {
      const poi = await Poi.findOne({ _id: id }).populate("category").lean();
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
    const pois = await Poi.find({ userid: id }).populate("category").lean();
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
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
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

  async getAllPoisGroupedByCategory(id) {
    const groupedPois = await Poi.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: "$category"
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
  },

  async updatePoi(poi, updatedPoi) {
    const poiDoc = await Poi.findOne({ _id: poi._id });
    poiDoc.name = updatedPoi.name;
    poiDoc.img = updatedPoi.img;
    poiDoc.category = updatedPoi.category;
    poiDoc.description = updatedPoi.description;
    poiDoc.latitude = updatedPoi.latitude;
    poiDoc.longitude = updatedPoi.longitude;
    await poiDoc.save();
  },
};
