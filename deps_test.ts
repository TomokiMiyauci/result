// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { inspect } from "./deps.ts";
import { assertEquals, describe, it } from "./_dev_deps.ts";

describe("inspect", () => {
  it("should return string", () => {
    const table: [actual: unknown, expected: string][] = [
      ["", `""`],
      [0, "0"],
      [0n, "0n"],
      [false, "false"],
      [null, "null"],
      [{}, "[object Object]"],
    ];

    table.forEach(([actual, expected]) => {
      assertEquals(inspect(actual), expected);
    });
  });
});
