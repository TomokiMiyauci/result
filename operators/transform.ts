// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { isErr, isOk } from "./query.ts";
import { Ok, type Result } from "../spec.ts";

/** Maps a {@linkcode Result<T, E>} to {@linkcode Result<U, E>} by applying {@linkcode fn} to a contained {@linkcode Ok}, leaving an {@linkcode Err}.
 *
 * @example
 * ```ts
 * import { Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { map } from "https://deno.land/x/result_js/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result: Result<string, unknown> = Ok("Hello, World!");
 * const resultLen = map(result, (v) => v.length);
 *
 * assertEquals(resultLen, Ok(13));
 * ```
 */
export function map<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> {
  if (isOk(result)) return Ok(fn(result.get));

  return result;
}

/** Returns the provided {@linkcode defaultValue} (if {@linkcode Err}), or applies {@linkcode fn} to the contained value (if {@linkcode Ok}),
 *
 * @example
 * ```ts
 * import { Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { mapOr } from "https://deno.land/x/result_js/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result: Result<string, number> = Ok("Hello");
 * assertEquals(mapOr(result, 0, ({ length }) => length), 5);
 * ```
 */
export function mapOr<T, U>(
  result: Result<T, unknown>,
  defaultValue: U,
  fn: (value: T) => U,
): U {
  if (isErr(result)) return defaultValue;

  return fn(result.get);
}

/** Maps a {@linkcode Result<T, E>} to {@linkcode U} by applying {@linkcode defaultFn} to a contained {@linkcode Err}, or {@linkcode fn} to a contained {@linkcode Ok}.
 *
 * @example
 * ```ts
 * import { Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { mapOrElse } from "https://deno.land/x/result_js/operators/transform.ts";
 * import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result: Result<string, string> = Ok("Hello");
 * assertEquals(mapOrElse(result, () => 2 ** 3, ({ length }) => length), 5);
 * ```
 */
export function mapOrElse<T, E, U>(
  result: Result<T, E>,
  defaultFn: (value: E) => U,
  fn: (value: T) => U,
): U {
  if (isErr(result)) return defaultFn(result.get);

  return fn(result.get);
}
