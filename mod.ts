// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Error handling with the {@linkcode Result} type.
 * {@linkcode Result<T, E>} is the type used for returning and propagating errors.
 * It is an enum with the variants, {@linkcode Ok(T)}, representing success and containing a value, and {@linkcode Err(E)}, representing error and containing an error value.
 *
 * ## Operators overview
 * {@linkcode Result} provides a wide variety of different operators.
 *
 * ## Querying the variant
 * The {@linkcode isOk} and {@linkcode isErr} return `true` if the {@linkcode Result} is {@linkcode Ok} or {@linkcode Err}, respectively.
 *
 * ## Extracting contained values
 * Extract the contained value in a {@linkcode Result<T, E>} when it is the {@linkcode Ok}. If the {@linkcode Result} is {@linkcode Err}:
 * - {@linkcode expect} throws with a provided custom message
 * - {@linkcode unwrap} throws with a generic message
 * - {@linkcode unwrapOr} returns the provided default value
 * - {@linkcode unwrapOrElse} returns the result of evaluating the provided function
 *
 * Extract the contained value in a {@linkcode Result<T, E>} when it is the {@linkcode Err}. If the {@linkcode Result} is {@linkcode Ok}:
 * - {@linkcode expectErr} throws with a provided custom message
 * - {@linkcode unwrapErr} throws with a generic message
 *
 * ## Transforming contained values
 * Transforms the contained value of the {@linkcoce Ok}:
 * - {@linkcode map} transforms {@linkcode Result<T, E>} into {@linkcode Result<U, E>} by applying the provided function to the contained value of {@linkcode Ok} and leaving {@linkcode Err}
 *
 * Transforms the contained value of the {@linkcode Err}:
 * - {@linkcode mapErr} transforms {@linkcode Result<T, E>} into {@linkcode Result<T, F>} by applying the provided function to the contained value of {@linkcode Err} and leaving {@linkcode Ok}
 *
 * Transform a {@linkcode Result<T, E>} into a value of a possibly different type `U`:
 * - {@linkcode mapOr} applies the provided function to the contained value of {@linkcode Ok}, or returns the provided default value if the {@linkcode Result} is {@linkcode Err}
 * - {@linkcode mapOrElse} applies the provided function to the contained value of {@linkcode Ok}, or applies the provided default fallback function to the contained value of {@linkcode Err}
 *
 * ## Logical operators
 * Treat the {@linkcode Result} as a boolean value, where {@linkcode Ok} acts like `true` and {@linkcode Err} acts like `false`.
 *
 * The {@linkcode and} and {@linkcode or} take another {@linkcode Result} as input, and produce a {@linkcode Result} as output.
 * The {@linkcode and} can produce a {@linkcode Result<U, E>} value having a different inner type `U` than {@linkcode Result<T, E>}.
 * The {@linkcode or} can produce a {@linkcode Result<T, F>} value having a different error type `F` than {@linkcode Result<T, E>}.
 *
 * | name            | result | input  | output |
 * | --------------- | ------ | ------ | ------ |
 * | {@linkcode and} | ok     | result | result |
 * | {@linkcode and} | err    | result | err    |
 * | {@linkcode or}  | ok     | result | ok     |
 * | {@linkcode or}  | err    | result | result |
 *
 * The {@linkcode andThen} and {@linkcode orElse} take a function as input, and only evaluate the function when they need to produce a new value.
 * The {@linkcode andThen} can produce a {@linkcode Result<U, E>} value having a different inner type `U` than {@linkcode Result<T, E>}.
 * The {@linkcode orElse} can produce a {@linkcode Result<T, F>} value having a different error type `F` than {@linkcode Result<T, E>}.
 *
 * | name                | result   | function input | function result | output |
 * | ------------------- | -------- | -------------- | --------------- | ------ |
 * | {@linkcode andThen} | `Ok<T>`  | `T`            | result          | result |
 * | {@linkcode andThen} | err      | -              | -               | err    |
 * | {@linkcode orElse}  | ok       | -              | -               | ok     |
 * | {@linkcode orElse}  | `Err<E>` | `E`            | result          | result |
 *
 * @module
 */

export {
  Err,
  type ErrConstructor,
  Ok,
  type OkConstructor,
  type Result,
  ResultType,
} from "./spec.ts";
export { isErr, isOk } from "./operators/query.ts";
export { and, andThen, or, orElse } from "./operators/logical.ts";
export { map, mapOr, mapOrElse } from "./operators/transform.ts";
export {
  expect,
  expectErr,
  match,
  type Matcher,
  unwrap,
  unwrapErr,
  unwrapOr,
  unwrapOrElse,
} from "./operators/extract.ts";
