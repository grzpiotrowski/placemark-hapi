import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { categorySample, testCategories } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

const categories = new Array(testCategories.length);

suite("Category API tests", () => {

  setup(async () => {
    await poiService.deleteAllCategories();
  });

  teardown(async () => {});

  test("create a category", async () => {
    const returnedCategory = await poiService.createCategory(categorySample);
    assert.isNotNull(returnedCategory);
    assertSubset(categorySample, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await poiService.createCategory(categorySample);
    const response = await poiService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await poiService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createCategory(testCategories[i]);
    }
    let returnedCategories = await poiService.getAllCategories();
    assert.equal(returnedCategories.length, testCategories.length);
    await poiService.deleteAllCategories();
    returnedCategories = await poiService.getAllCategories();
    assert.equal(returnedCategories.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
      const response = await poiService.deleteCategory("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

});
