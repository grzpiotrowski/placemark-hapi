import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { poiSample, testPois } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Poi Model tests", () => {

  setup(async () => {
    db.init("json");
    await db.poiStore.deleteAllPois();
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPois[i] = await db.poiStore.addPoi(testPois[i]);
    }
  });

  test("create single poi", async () => {
    const poi = await db.poiStore.addPoi(poiSample)
    assert.isNotNull(poi._id);
    assertSubset(poiSample, poi);
  });

  test("get multiple pois", async () => {
    const pois = await db.poiStore.getAllPois()
    assert.equal(testPois.length, testPois.length)
  });

  test("delete all pois", async () => {
    const pois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, pois.length);
    await db.poiStore.deleteAllPois();
    const newPois = await db.poiStore.getAllPois();
    assert.equal(0, newPois.length);
  });

  test("get a poi - success", async () => {
    const poi = await db.poiStore.addPoi(poiSample)
    const newPoi = await db.poiStore.getPoiById(poi._id);
    assertSubset (poiSample, newPoi);
  });

  test("delete one poi - success", async () => {
    await db.poiStore.deletePoiById(testPois[0]._id);
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testPois.length - 1);
    const deletedPoi = await db.poiStore.getPoiById(testPois[0]._id);
    assert.isNull(deletedPoi);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.poiStore.getPoiById(""));
    assert.isNull(await db.poiStore.getPoiById());
  });

  test("delete one poi - fail", async () => {
    await db.poiStore.deletePoiById("bad-id");
    const pois = await db.poiStore.getAllPois();
    assert.equal(pois.length, testPois.length);
  });
});
