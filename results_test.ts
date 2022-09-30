import { Result } from "./results.ts";
import { assertEquals, describe, it } from "./dev_deps.ts";

describe("Result", () => {
  it("should return Ok container", () => {
    const result = Result.ok("test");
    assertEquals(result.value, "test");
    assertEquals(result.type, "ok");
  });

  it("should return Err container", () => {
    const result = Result.err("test");
    assertEquals(result.value, "test");
    assertEquals(result.type, "err");
  });
});
