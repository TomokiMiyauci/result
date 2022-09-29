import { Result } from "./results.ts";

/** Wrap code that may throw errors in a container.
 *
 * ```ts
 * import { unsafe } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";
 *
 * const result = unsafe(() => {
 *   throw Error("Dangerous!!");
 * });
 * assertEquals(result.value, Error());
 * assertEquals(result.isOk(), false);
 * ```
 */
export function unsafe<T, E>(
  fn: () => T,
): Result<T, E> {
  try {
    return Result.ok(fn());
  } catch (e) {
    return Result.err<E>(e);
  }
}
