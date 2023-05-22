import Mongoose from "mongoose";

const { Schema } = Mongoose;

const poiSchema = new Schema({
  name: String,
  img: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  description: String,
  latitude: Number,
  longitude: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});

export const Poi = Mongoose.model("Poi", poiSchema);

