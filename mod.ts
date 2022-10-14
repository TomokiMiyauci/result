// Copyright 2022-latest Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export { Result } from "./results.ts";
export {
  type Container,
  type ErrContainer,
  type OkContainer,
  type ResultConstructor,
  type ResultContainer,
} from "./types.ts";
export { isErr, isOk, match, type Patterns, unsafe } from "./utils.ts";
