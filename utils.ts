// Copyright 2022-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

import { Result } from "./results.ts";
import { ErrContainer, OkContainer, ResultContainer } from "./types.ts";

/** Whether the {@link ResultContainer } is {@link OkContainer} or not.
 *
 * @example
 * ```ts
 * import { isOk, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isOk(Result.ok("OK!!")), true);
 * assertEquals(isOk(Result.err("Error!!")), false);
 * ```
 */
export function isOk<T, E>(
  resultContainer: ResultContainer<T, E>,
): resultContainer is OkContainer<T> {
  return resultContainer.type === "ok";
}

/** Whether the {@link ResultContainer } is {@link ErrContainer} or not.
 *
 * @example
 * ```ts
 * import { isErr, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * assertEquals(isErr(Result.err("Error!!")), true);
 * assertEquals(isErr(Result.ok("OK!!")), false);
 * ```
 */
export function isErr<T, E>(
  resultContainer: ResultContainer<T, E>,
): resultContainer is ErrContainer<E> {
  return resultContainer.type === "err";
}

/** Wrap code that may throw errors in a container.
 *
 * @example
 * ```ts
 * import { unsafe } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const result = unsafe(() => {
 *   throw Error("Dangerous!!");
 * });
 * assertEquals(result.value, Error());
 * assertEquals(result.type, "err");
 * ```
 */
export function unsafe<T, E>(
  fn: () => T,
): ResultContainer<T, E> {
  try {
    return Result.ok(fn());
  } catch (e) {
    return Result.err<E>(e);
  }
}

/** Matching patterns. */
export interface Patterns<T, E, U> {
  /** Match if the result is {@link OkContainer}. */
  ok: (value: T) => U;

  /** Match if the result is {@link ErrContainer}. */
  err: (value: E) => U;
}

/** Pattern matching for {@link Result}.
 *
 * @example
 * ```ts
 * import { match, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const value = match(Result.ok("Tom"), {
 *   ok: (value) => "Hello " + value,
 *   err: (value) => "Goodby " + value,
 * });
 * assertEquals(value, "Hello Tom");
 * ```
 */
export function match<T, E, U>(
  resultContainer: ResultContainer<T, E>,
  patterns: Patterns<T, E, U>,
): U {
  return isOk(resultContainer)
    ? patterns.ok(resultContainer.value)
    : patterns.err(resultContainer.value);
}
