// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import { map, mapErr, mapOr, mapOrElse } from "./transform.ts";
import { Err, Ok } from "../spec.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("map", () => {
  it("should call mapper if it is Ok", () => {
    const INPUT = "Hello, World!";
    const result: Ok<string> = Ok(INPUT);
    const fn = spy((v: string) => v.length);
    const resultLen = map(result, fn);

    assertEquals(resultLen, Ok(13));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
  });

  it("should not call mapper function if it is Err", () => {
    const result: Err<string> = Err("");
    const fn = spy((v: string) => v.length);
    const resultLen = map(result, fn);

    assertEquals(resultLen, Err(""));
    assertSpyCalls(fn, 0);
  });
});

describe("mapErr", () => {
  it("should call mapper if it is Err", () => {
    const INPUT = "Hello, World!";
    const result: Err<string> = Err(INPUT);
    const fn = spy((v: string) => v.length);
    const resultLen = mapErr(result, fn);

    assertEquals(resultLen, Err(13));
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
  });

  it("should not call mapper function if it is Ok", () => {
    const result: Ok<number> = Ok(0);
    const fn = spy((v: string) => v.length);
    const resultLen = mapErr(result, fn);

    assertEquals(resultLen, Ok(0));
    assertSpyCalls(fn, 0);
  });
});

describe("mapOr", () => {
  it("should call mapper if it is Ok", () => {
    const INPUT = "Hello, World!";
    const result: Ok<string> = Ok(INPUT);
    const fn = spy((v: string) => v.length);
    const resultLen = mapOr(result, 0, fn);

    assertEquals(resultLen, INPUT.length);
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
  });

  it("should return default value if it is Err", () => {
    const result: Err<string> = Err("");
    const fn = spy((v: string) => v.length);
    const resultLen = mapOr(result, 0, fn);

    assertEquals(resultLen, 0);
    assertSpyCalls(fn, 0);
  });
});

describe("mapOrElse", () => {
  it("should call mapper if it is Ok", () => {
    const INPUT = "Hello, World!";
    const result: Ok<string> = Ok(INPUT);
    const fn = spy((v: string) => v.length);
    const defaultFn = spy(() => 0);
    const resultLen = mapOrElse(result, defaultFn, fn);

    assertEquals(resultLen, INPUT.length);
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [INPUT]);
    assertSpyCalls(defaultFn, 0);
  });

  it("should return default value if it is Err", () => {
    const result: Err<string> = Err("");
    const fn = spy((v: string) => v.length);
    const defaultFn = spy(() => 0);
    const resultLen = mapOrElse(result, defaultFn, fn);

    assertEquals(resultLen, 0);
    assertSpyCalls(fn, 0);
    assertSpyCalls(defaultFn, 1);
  });
});
