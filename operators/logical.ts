// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isErr, isOk } from "./query.ts";
import { type Result } from "../spec.ts";

/** Returns {@linkcode res} if the {@linkcode result} is {@linkcode Err}, otherwise returns the {@linkcode Ok}.
 *
 * @example
 * ```ts
 * import { or } from "https://deno.land/x/result_js/operators/logical.ts";
 * import { Err, Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const result: Result<unknown, unknown>;
 *
 * assertEquals(or(Ok(0), result), Ok(0));
 * assertEquals(or(Err(1), result), result);
 * ```
 */
export function or<T, E>(
  result: Result<T, E>,
  res: Result<T, E>,
): Result<T, E> {
  if (isErr(result)) return res;

  return result;
}

/** Calls {@linkcode fn} if the {@linkcode result} is {@linkcode Err}, otherwise returns the {@linkcode Ok}.
 *
 * @example
 * ```ts
 * import { orElse } from "https://deno.land/x/result_js/operators/logical.ts";
 * import { Err, Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const square: (value: number) => Ok<number>
 *
 * assertEquals(orElse(Ok(3), square), Ok(3));
 * assertEquals(orElse(Err(2), square), Ok(4));
 * ```
 */
export function orElse<T, E, F>(
  result: Result<T, E>,
  fn: (value: E) => Result<T, F>,
): Result<T, F> {
  if (isErr(result)) return fn(result.get);

  return result;
}

/** Returns {@linkcode res} if the {@linkcode result} is {@linkcode Ok}, otherwise returns the {@linkcode Err}.
 *
 * @example
 * ```ts
 * import { and } from "https://deno.land/x/result_js/operators/logical.ts";
 * import { Err, Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const result: Result<unknown, unknown>;
 *
 * assertEquals(and(Ok(0), result), result);
 * assertEquals(and(Err(1), result), Err(1));
 * ```
 */
export function and<E, U>(
  result: Result<unknown, E>,
  res: Result<U, E>,
): Result<U, E> {
  if (isOk(result)) return res;

  return result;
}

/** Calls {@linkcode fn} if the {@linkcode result} is {@linkcode Ok}, otherwise returns the {@linkcode Err}.
 *
 * @example
 * ```ts
 * import { andThen } from "https://deno.land/x/result_js/operators/logical.ts";
 * import { Err, Ok } from "https://deno.land/x/result_js/spec.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * declare const square: (value: number) => Ok<number>;
 *
 * assertEquals(andThen(Ok(3), square), Ok(9));
 * assertEquals(andThen(Err(1), square), Err(1));
 * ```
 */
export function andThen<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>,
): Result<U, E> {
  if (isOk(result)) return fn(result.get);

  return result;
}
