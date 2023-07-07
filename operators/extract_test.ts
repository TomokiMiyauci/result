// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.

import {
  expect,
  expectErr,
  match,
  unwrap,
  unwrapErr,
  unwrapOr,
  unwrapOrElse,
} from "./extract.ts";
import { Err, Ok } from "../spec.ts";
import {
  assertEquals,
  assertSpyCallArgs,
  assertSpyCalls,
  assertThrows,
  describe,
  it,
  spy,
} from "../_dev_deps.ts";

describe("unwrap", () => {
  it("should return Ok value", () => {
    assertEquals(unwrap(Ok(0)), 0);
  });

  it("should throw error if Err", () => {
    assertThrows(
      () => unwrap(Err(1)),
      Error,
      "called unwrap on an Err: 1",
    );
  });
});

describe("unwrapErr", () => {
  it("should return Err value", () => {
    assertEquals(unwrapErr(Err(1)), 1);
  });

  it("should throw error if Ok", () => {
    assertThrows(
      () => unwrapErr(Ok(0)),
      Error,
      "called unwrapErr on an Ok: 0",
    );
  });
});

describe("unwrapOr", () => {
  it("should Ok value if Ok", () => {
    assertEquals(unwrapOr(Ok(0), 1), 0);
  });

  it("should default value if Err", () => {
    assertEquals(unwrapOr(Err(1), 0), 0);
  });
});

describe("unwrapOrElse", () => {
  it("should Ok value if Ok", () => {
    const fn = spy(() => 1);
    assertEquals(unwrapOrElse(Ok(0), fn), 0);
    assertSpyCalls(fn, 0);
  });

  it("should default value if Err", () => {
    const fn = spy(() => 0);
    assertEquals(unwrapOrElse(Err(1), fn), 0);
    assertSpyCalls(fn, 1);
    assertSpyCallArgs(fn, 0, [1]);
  });
});

describe("expect", () => {
  it("should return Ok value", () => {
    assertEquals(expect(Ok(0), ""), 0);
  });

  it("should throw error if Err", () => {
    const message = "<message>";
    assertThrows(() => expect(Err(1), message), Error, message);
  });

  it("should throw custom error instance if Err", () => {
    const message = "<message>";
    assertThrows(
      () => expect(Err(1), message, RangeError),
      RangeError,
      message,
    );
  });
});

describe("expectErr", () => {
  it("should return Err value", () => {
    assertEquals(expectErr(Err(1), ""), 1);
  });

  it("should throw error if Ok", () => {
    const message = "<message>";
    assertThrows(() => expectErr(Ok(0), message), Error, message);
  });

  it("should throw custom error instance if Ok", () => {
    const message = "<message>";
    assertThrows(
      () => expectErr(Ok(0), message, RangeError),
      RangeError,
      message,
    );
  });
});

describe("match", () => {
  it("should call Ok if Ok", () => {
    const s = spy(() => 1);
    const n = spy(() => 2);

    assertEquals(match(Ok(0), { Ok: s, Err: n }), 1);
    assertSpyCalls(s, 1);
    assertSpyCalls(n, 0);
    assertSpyCallArgs(s, 0, [0]);
  });

  it("should call Err if Err", () => {
    const s = spy(() => 1);
    const n = spy(() => 2);

    assertEquals(match(Err(1), { Ok: s, Err: n }), 2);
    assertSpyCalls(s, 0);
    assertSpyCalls(n, 1);
    assertSpyCallArgs(n, 0, [1]);
  });
});
