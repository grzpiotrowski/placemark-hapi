import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

suite("Poi API tests", () => {

  setup(async () => {
  });

  teardown(async () => {});

  test("create poi", async () => {
  });

  test("delete a poi", async () => {
  });

  test("create multiple pois", async () => {
  });

  test("remove non-existant poi", async () => {
  });
});
