// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { and, andThen, or, orElse } from "./logical.ts";
import { Err, Ok } from "../spec.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("or", () => {
  it("should return res if it is Err, otherwise return Ok", () => {
    assertEquals(or(Ok(0), Ok(1)), Ok(0));
    assertEquals(or(Ok(0), Err(1)), Ok(0));
    assertEquals(or(Err(1), Err(2)), Err(2));
    assertEquals(or(Err(1), Ok(0)), Ok(0));
  });
});

describe("and", () => {
  it("should return Err if it is Err, otherwise return res", () => {
    assertEquals(and(Ok(0), Err(1)), Err(1));
    assertEquals(and(Ok(0), Ok(-0)), Ok(-0));
    assertEquals(and(Err(0), Err(1)), Err(0));
    assertEquals(and(Err(0), Ok(1)), Err(0));
  });
});

describe("andThen", () => {
  it("should return Ok and call fn if result is Ok", () => {
    const fn = spy((v: number) => Ok(v ** 3));
    assertEquals(andThen(Ok(2), fn), Ok(8));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [2]);
  });

  it("should return Err and call fn if result is Ok", () => {
    const fn = spy((v: number) => Err(v ** 3));
    assertEquals(andThen(Ok(2), fn), Err(8));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [2]);
  });

  it("should return Err and not call fn if result is Err", () => {
    const fn = spy((v: number) => Err(v ** 3));
    assertEquals(andThen(Err(2), fn), Err(2));
    assertSpyCalls(fn, 0);
  });
});

describe("orElse", () => {
  it("should return Err and call fn if result is Err", () => {
    const fn = spy(() => Err(1));
    assertEquals(orElse(Err(0), fn), Err(1));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [0]);
  });

  it("should return Ok and call fn if result is Err", () => {
    const fn = spy(() => Ok(1));
    assertEquals(orElse(Err(0), fn), Ok(1));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [0]);
  });

  it("should return Ok and not call fn if result is Ok", () => {
    const fn = spy(() => Ok(1));
    assertEquals(orElse(Ok(0), fn), Ok(0));
    assertSpyCalls(fn, 0);
  });
});
