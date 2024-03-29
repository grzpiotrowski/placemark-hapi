import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, poiSample, testPois, categorySample } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Poi API tests", () => {

  let user = null;
  let mountains = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    await poiService.deleteAllPois();
    await poiService.deleteAllCategories();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    mountains = await poiService.createCategory(categorySample);
    poiSample.userid = user._id;
    poiSample.category = mountains._id;
  });

  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await poiService.createPoi(poiSample);
    assert.isNotNull(returnedPoi);
    assertSubset(poiSample, returnedPoi);
  });

  test("delete a poi", async () => {
    const poi = await poiService.createPoi(poiSample);
    const response = await poiService.deletePoi(poi._id);
    assert.equal(response.status, 204);
    try {
      const returnedPoi = await poiService.getPoi(poi.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });

  test("create multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      testPois[i].userid = user._id;
      testPois[i].category = mountains._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(testPois[i]);
    }
    let returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, testPois.length);
    await poiService.deleteAllPois();
    returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("remove non-existant poi", async () => {
    try {
      const response = await poiService.deletePoi("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });

  test("update a poi", async () => {
    const createdPoi = await poiService.createPoi(poiSample);
    assert.isNotNull(createdPoi);
    assertSubset(poiSample, createdPoi);
  
    const updatedData = {
      name: "New Name",
      description: "New Description",
      latitude: 12.1234,
      longitude: -6.123,
    };
  
    const updatedPoi = await poiService.updatePoi(createdPoi._id, updatedData);
    assert.isNotNull(updatedPoi);
    assertSubset(updatedData, updatedPoi);
  
    const retrievedPoi = await poiService.getPoi(updatedPoi._id);
    assertSubset(updatedData, retrievedPoi);
  });

});
