// Copyright © 2023 Tomoki Miyauchi. All rights reserved. MIT license.
// This module is browser compatible.

/** Light-weight JavaScript value inspection. */
export function inspect(value: unknown): string {
  switch (typeof value) {
    case "string":
      return `"${value}"`;

    case "bigint":
      return `${value}n`;

    default:
      return String(value);
  }
}
