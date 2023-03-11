import { poiMemStore } from "./mem/poi-mem-store.js";
import { userMemStore } from "./mem/user-mem-store.js";

export const db = {
  poiStore: null,

  init() {
    this.poiStore = poiMemStore;
    this.userStore = userMemStore;
  },
};