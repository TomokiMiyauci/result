import {
  ErrContainer,
  OkContainer,
  ResultConstructor,
  ResultContainer,
} from "./types.ts";

/** {@link Result} is a type that represents either success ({@link Ok}) or failure ({@link Err}). */
export type Result<T, E> = ResultContainer<T, E>;

/** Represents either success or failure result.
 *
 * ```ts
 * import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
 * const ok = Result.ok("any success value");
 * const err = Result.err("any failure value");
 * ```
 */
export const Result: ResultConstructor = {
  ok: (value) => new Ok(value),
  err: (value) => new Err(value),
};

/** Contains the success value. */
export class Ok<T> implements OkContainer<T> {
  constructor(public value: T) {}

  type = "ok" as const;
}

/** Contains the failure value. */
export class Err<E> implements ErrContainer<E> {
  constructor(public value: E) {}

  type = "err" as const;
}
