import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { categorySample, testCategories } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Category Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);
    }
  });

  test("create single category", async () => {
    const category = await db.categoryStore.addCategory(categorySample)
    assert.isNotNull(category._id);
    assertSubset(categorySample, category);
  });

  test("get multiple categories", async () => {
    const categories = await db.categoryStore.getAllCategories()
    assert.equal(testCategories.length, testCategories.length)
  });

  test("delete all categories", async () => {
    const categories = await db.categoryStore.getAllCategories();
    assert.equal(testCategories.length, categories.length);
    await db.categoryStore.deleteAllCategories();
    const newCategories = await db.categoryStore.getAllCategories();
    assert.equal(0, newCategories.length);
  });

  test("get a category - success", async () => {
    const category = await db.categoryStore.addCategory(categorySample)
    const newCategory = await db.categoryStore.getCategoryById(category._id);
    assertSubset (categorySample, newCategory);
  });

  test("delete one category - success", async () => {
    await db.categoryStore.deleteCategoryById(testCategories[0]._id);
    const categories = await db.categoryStore.getAllCategories();
    assert.equal(categories.length, testCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(testCategories[0]._id);
    assert.isNull(deletedCategory);
  });

  test("get a category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete one category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const categories = await db.categoryStore.getAllCategories();
    assert.equal(categories.length, testCategories.length);
  });
});
