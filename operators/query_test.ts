// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { isErr, isOk } from "./query.ts";
import { Err, Ok } from "../spec.ts";
import { assert, assertFalse, describe, it } from "../_dev_deps.ts";

describe("isOk", () => {
  it("should return true if it is Ok", () => {
    assert(isOk(Ok(0)));
  });

  it("should return false if it is Err", () => {
    assertFalse(isOk(Err(0)));
  });
});

describe("isErr", () => {
  it("should return true if it is Err", () => {
    assert(isErr(Err(0)));
  });

  it("should return false if it is Ok", () => {
    assertFalse(isErr(Ok(0)));
  });
});
