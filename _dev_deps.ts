// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

export {
  assert,
  assertEquals,
  assertFalse,
  assertThrows,
} from "https://deno.land/std@0.190.0/testing/asserts.ts";
export { describe, it } from "https://deno.land/std@0.190.0/testing/bdd.ts";
export {
  assertSpyCallArgs,
  assertSpyCalls,
  spy,
} from "https://deno.land/std@0.190.0/testing/mock.ts";
