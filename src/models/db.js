import { poiMemStore } from "./mem/poi-mem-store.js";

export const db = {
  poiStore: null,

  init() {
    this.poiStore = poiMemStore;
  },
};