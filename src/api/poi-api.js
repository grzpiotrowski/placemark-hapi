import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PoiSpec, PoiSpecPlus, PoiArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const poiApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getAllPois();
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PoiArraySpec, failAction: validationError },
    description: "Get all POIs",
    notes: "Returns all POIs",
  },

  findByUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const pois = await db.poiStore.getUserPois(request.params.id);
        return pois;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PoiArraySpec, failAction: validationError },
    description: "Get user POIs",
    notes: "Returns all POIs belonging to the user",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Find a POI",
    notes: "Returns a POI",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = request.payload;
        const newPoi = await db.poiStore.addPoi(poi);
        if (newPoi) {
          return h.response(newPoi).code(201);
        }
        return Boom.badImplementation("error creating poi");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a POI",
    notes: "Returns the newly created POI",
    validate: { payload: PoiSpec },
    response: { schema: PoiSpecPlus, failAction: validationError },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const updatedPoiData = request.payload;
        const existingPoi = await db.poiStore.getPoiById(request.params.id);
        if (!existingPoi) {
          return Boom.notFound("No POI with this id");
        }

        const updatedPoi = {
          ...existingPoi,
          ...updatedPoiData
        }
        
        const updatedPoiReceived = await db.poiStore.updatePoi(existingPoi, updatedPoi);
        if (updatedPoiReceived) {
          return h.response(updatedPoiReceived).code(200);
        }
        return Boom.badImplementation("Error updating POI");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a POI",
    notes: "Updates and returns the modified POI",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        await db.poiStore.deletePoiById(poi._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete a POI",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.poiStore.deleteAllPois();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all POIs",
  },

  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await db.imageStore.uploadImage(request.payload.imagefile);
          poi.img = url;
          await db.poiStore.updatePoi(poi, poi);
        }
        return h.response().code(204);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
    tags: ["api"],
    description: "Upload an image",
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const poi = await db.poiStore.getPoiById(request.params.id);
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        await db.imageStore.deleteImage(poi.img);
        poi.img = undefined;
        await db.poiStore.updatePoi(poi, poi);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Poi with this id");
      }
    },
    tags: ["api"],
    description: "Delete a POI",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

};
