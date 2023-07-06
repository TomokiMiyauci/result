// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** The result type. */
export enum ResultType {
  Ok,
  Err,
}

/** Common type. */
interface Container {
  /** {@linkcode Result} type. */
  get type(): ResultType;

  /** Return contained value. */
  get get(): unknown;
}

/** The {@linkcode Err} API. */
export interface Err<E> extends Container {
  get type(): ResultType.Err;

  get get(): E;
}

/** The {@linkcode Ok} API. */
export interface Ok<T> extends Container {
  get type(): ResultType.Ok;

  get get(): T;
}

export interface OkConstructor {
  /** {@linkcode Ok} value of type {@linkcode T} . */
  <const T>(value: T): Ok<T>;
}

export interface ErrConstructor {
  /** {@linkcode Err} value of type {@linkcode E} . */
  <const E>(value: E): Err<E>;
}

/** {@linkcode Ok} constructor.
 *
 * @example
 * ```ts
 * import { Ok } from "https://deno.land/x/result_js/spec.ts";
 * const ok = Ok(0);
 * ```
 */
export const Ok: OkConstructor = function Ok<T>(value: T): Ok<T> {
  return {
    get type(): ResultType.Ok {
      return ResultType.Ok;
    },
    get get(): T {
      return value;
    },
  };
};

/** {@linkcode Err} constructor.
 *
 * @example
 * ```ts
 * import { Err } from "https://deno.land/x/result_js/spec.ts";
 * const err = Err(0);
 * ```
 */
export const Err: ErrConstructor = function Err<E>(value: E): Err<E> {
  return {
    get type(): ResultType.Err {
      return ResultType.Err;
    },
    get get(): E {
      return value;
    },
  };
};

/** Representation of {@linkcode Ok} or {@linkcode Err}. */
export type Result<T, E> = Ok<T> | Err<E>;
