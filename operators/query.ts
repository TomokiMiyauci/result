// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { type Err, type Ok, type Result, ResultType } from "../spec.ts";

/** Returns `true` if the {@linkcode result} is a {@linkcode Ok}.
 *
 * @example
 * ```ts
 * import { isOk } from "https://deno.land/x/result_js/operators/query.ts";
 * import { Ok, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result: Result<unknown, unknown> = Ok(1);
 * assert(isOk(result));
 * ```
 */
export function isOk<T>(result: Result<T, unknown>): result is Ok<T> {
  return result.type === ResultType.Ok;
}

/** Returns `true` if the {@linkcode result} is a {@linkcode Err}.
 *
 * @example
 * ```ts
 * import { isErr } from "https://deno.land/x/result_js/operators/query.ts";
 * import { Err, type Result } from "https://deno.land/x/result_js/spec.ts";
 * import { assert } from "https://deno.land/std/testing/asserts.ts";
 *
 * const result: Result<unknown, unknown> = Err(0);
 * assert(isErr(result));
 * ```
 */
export function isErr<E>(result: Result<unknown, E>): result is Err<E> {
  return result.type === ResultType.Err;
}
