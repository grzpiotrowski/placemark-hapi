import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    poiService.clearAuth();
    await poiService.createUser(maggie);
    await poiService.authenticate(maggie);
    await poiService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await poiService.createUser(maggie);
    const response = await poiService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await poiService.createUser(maggie);
    const response = await poiService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
