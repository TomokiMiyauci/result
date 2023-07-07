// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

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
