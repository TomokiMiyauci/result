import { Result } from "./results.ts";
import { isErr, isOk, match, unsafe } from "./utils.ts";
import {
  assertEquals,
  assertSpyCall,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "./dev_deps.ts";

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

describe("match", () => {
  it("should call ok handler when the result is Ok container", () => {
    const ok = spy();
    const err = spy();
    match({ type: "ok", value: "" }, {
      ok,
      err,
    });

    assertSpyCall(ok, 0, {
      args: [""],
    });
    assertSpyCalls(err, 0);
  });

  it("should call err handler when the result is Err container", () => {
    const ok = spy();
    const err = spy();
    match({ type: "err", value: 0 }, {
      ok,
      err,
    });

    assertSpyCalls(ok, 0);
    assertSpyCall(err, 0, {
      args: [0],
    });
  });

  it("should return matched pattern return value", () => {
    const value = match({ type: "err", value: 0 }, {
      ok: (value) => value + 1,
      err: (value) => value + 2,
    });

    assertEquals(value, 2);
  });

  it("should satisfy example", () => {
    const value = match(Result.ok("Tom"), {
      ok: (value) => "Hello " + value,
      err: (value) => "Goodby " + value,
    });
    assertEquals(value, "Hello Tom");
  });
});

describe("isOk", () => {
  it("should return true when the result container is Ok container", () => {
    assertEquals(isOk({ type: "ok", value: undefined }), true);
  });

  it("should return false when the result container is not Ok container", () => {
    assertEquals(isOk({ type: "err", value: undefined }), false);
  });

  it("should pass example", () => {
    assertEquals(isOk(Result.ok("OK!!")), true);
    assertEquals(isOk(Result.err("Error!!")), false);
  });
});

describe("isErr", () => {
  it("should return true when the result container is Err container", () => {
    assertEquals(isErr({ type: "err", value: undefined }), true);
  });

  it("should return false when the result container is not Err container", () => {
    assertEquals(isErr({ type: "ok", value: undefined }), false);
  });

  it("should pass example", () => {
    assertEquals(isErr(Result.err("Error!!")), true);
    assertEquals(isErr(Result.ok("OK!!")), false);
  });
});
