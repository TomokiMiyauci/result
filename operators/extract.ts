// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { inspect } from "../deps.ts";
import { isErr, isOk } from "./query.ts";
import { type Result } from "../spec.ts";

/** Returns the contained {@linkcode Ok} value.
 *
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrap } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrap(Ok(0)), 0);
 * ```
 * @throws {Error} if the {@linkcode result} is {@linkcode Err}.
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrap } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertThrows(() => unwrap(Err(1)));
 * ```
 */
export function unwrap<T>(result: Result<T, unknown>): T {
  if (isOk(result)) return result.get;

  throw new Error(`called unwrap on an Err: ${inspect(result.get)}`);
}

/** Returns the contained {@linkcode Err} value.
 *
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrapErr } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrapErr(Err(0)), 0);
 * ```
 * @throws {Error} if the {@linkcode result} is {@linkcode Ok}.
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrapErr } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertThrows(() => unwrapErr(Ok(0)));
 * ```
 */
export function unwrapErr<E>(result: Result<unknown, E>): E {
  if (isErr(result)) return result.get;

  throw new Error(`called unwrapErr on an Ok: ${inspect(result.get)}`);
}

/** Returns the contained {@linkcode Ok} value, otherwise {@linkcode defaultValue}.
 *
 * @example
 * ```ts
 * import { Ok, Err } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrapOr } from "https://deno.land/x/result_js/mod.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrapOr(Ok(0), 1), 0);
 * assertEquals(unwrapOr(Err(1), 1), 1);
 * ```
 */
export function unwrapOr<T>(result: Result<T, unknown>, defaultValue: T): T {
  if (isOk(result)) return result.get;

  return defaultValue;
}

/** Returns the contained {@linkcode Ok} value, otherwise computes it from a closure.
 *
 * @example
 * ```ts
 * import { Ok, Err } from "https://deno.land/x/result_js/spec.ts";
 * import { unwrapOrElse } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * assertEquals(unwrapOrElse(Ok(0), () => 2 ** 3), 0);
 * assertEquals(unwrapOrElse(Err(1), () => 2 ** 3), 8);
 * ```
 */
export function unwrapOrElse<T, E>(
  result: Result<T, E>,
  fn: (value: E) => T,
): T {
  if (isOk(result)) return result.get;

  return fn(result.get);
}

/** Returns the contained {@linkcode Ok} value.
 *
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { expect } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result = Ok(0);
 * declare const message: string;
 *
 * assertEquals(expect(result, message), 0);
 * ```
 *
 * @throws {Error} {@linkcode msg}
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * import { expect } from "https://deno.land/x/result_js/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expect(Err(0), message), Error, message);
 * ```
 *
 * Change error constructor:
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * import { expect } from "https://deno.land/x/result_js/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expect(Err(0), message, RangeError), RangeError, message);
 * ```
 */
export function expect<T>(
  result: Result<T, unknown>,
  msg: string,
  error: ErrorConstructor = Error,
): T {
  if (isOk(result)) return result.get;

  throw new error(msg);
}

/** Returns the contained {@linkcode Err} value.
 *
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * import { expectErr } from "https://deno.land/x/result_js/operators/extract.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result = Err(0);
 * declare const message: string;
 *
 * assertEquals(expectErr(result, message), 0);
 * ```
 *
 * @throws {Error} {@linkcode msg}
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { expectErr } from "https://deno.land/x/result_js/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expectErr(Ok(0), message), Error, message);
 * ```
 *
 * Change error constructor:
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { expectErr } from "https://deno.land/x/result_js/mod.ts";
 * import { assertThrows } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const message: string;
 * assertThrows(() => expectErr(Ok(0), message, RangeError), RangeError, message);
 * ```
 */
export function expectErr<E>(
  result: Result<unknown, E>,
  msg: string,
  error: ErrorConstructor = Error,
): E {
  if (isErr(result)) return result.get;

  throw new error(msg);
}

/** {@linkcode Result} matcher. */
export interface Matcher<T, E, U> {
  /** Match on {@linkcode Ok}. */
  Ok: (value: T) => U;

  /** Match on {@linkcode Err}. */
  Err: (value: E) => U;
}

/** Pattern matching for {@linkcode result}. Match on {@linkcode matcher.Ok} if {@linkcode Ok}, otherwise match on {@linkcode matcher.Err}.
 *
 * @example
 * ```ts
 * import { Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { match } from "https://deno.land/x/result_js/operators/extract.ts";
 *
 * declare const result: Result<number, unknown>;
 *
 * match(result, {
 *  Ok: (value) => value,
 *  Err: (value) => 500,
 * });
 * ```
 */
export function match<T, E, U>(
  result: Result<T, E>,
  matcher: Readonly<Matcher<T, E, U>>,
): U {
  if (isOk(result)) return matcher.Ok(result.get);

  return matcher.Err(result.get);
}
