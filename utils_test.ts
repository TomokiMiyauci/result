import { unsafe } from "./utils.ts";
import { assertEquals, describe, it } from "./dev_deps.ts";

describe("unsafe", () => {
  it("should return err container when the function throw error", () => {
    const result = unsafe(() => {
      throw Error();
    });
    assertEquals(result.value, Error());
    assertEquals(result.type, "err");
  });

  it("should return err container when the function throw any error", () => {
    const result = unsafe<Headers, TypeError>(() =>
      new Headers({ "?": "invalid field name" })
    );
    assertEquals(result.value, new TypeError());
  });

  it("should return ok container when the function return", () => {
    const result = unsafe(() => {
      return 0;
    });
    assertEquals(result.value, 0);
    assertEquals(result.type, "ok");
  });

  it("should return ok container when the function return undefined", () => {
    const result = unsafe(() => {});
    assertEquals(result.value, undefined);
    assertEquals(result.type, "ok");
  });
});
