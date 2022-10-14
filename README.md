# result-js

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/result_js)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/result_js/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/result)](https://github.com/TomokiMiyauci/result-js/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/result-js/branch/main/graph/badge.svg?token=xCMzpv1veg)](https://codecov.io/github/TomokiMiyauci/result-js)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/result-js)](https://github.com/TomokiMiyauci/result-js/blob/main/LICENSE)

[![test](https://github.com/TomokiMiyauci/result-js/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/result-js/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/result.png?mini=true)](https://nodei.co/npm/@miyauci/result/)

The standard API for result in JavaScript.

## What

It brings a standard Result representation to the JavaScript world.

Provides an API for complete representation of two states representing success
and failure.

Our goal is to become the standard error handling method for third-party
libraries.

It has the following features:

- Simple and lean

  Designed to be used as client JavaScript (Off Course server side). It provides
  an API that is as small and lean as possible. There is not a single useless
  API for you to use.

- `Ok` and `Err`

  The `Result` consists of two containers, `Ok` and `Err`. The naming is
  inspired by
  [Rust::std:Result](https://doc.rust-lang.org/std/result/enum.Result.html#) and
  is short and easy to understand.

- Self-contained

  `Result` is self-contained. This means that type declarations, container
  creation, retrieval of values from containers, and comparison of container
  types are provided by `Result`.

If you want to know more, see [Definition](./specs/api.md).

### What is not

Client JavaScript is a special execution environment. Unnecessary API bloat is
reflected in bundle size, to the detriment of users.

Unfortunately, being a dynamic language, JavaScript tree-shaking has its
limitations.

Therefore, intentionally, it does not have the following features.

- Monad laws
- Rust::std::result like

These may include some APIs that are not used for all libraries.

## Create Ok(success) container

Ok container is created with `Result#ok`. Accepts any value.

```ts
import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
const result = Result.ok("any success value");
```

## Create Err(failure) container

Err container is created with `Result#err`. Accepts any value.

```ts
import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
const result = Result.err("any failure value");
```

## Define a container as the return value

The `Result` defines OK on the left and failure on the right.

```ts
import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";

function div(left: number, right: number): Result<number, RangeError> {
  if (right === 0) {
    return Result.err(new RangeError("Division by zero"));
  }
  return Result.ok(left / right);
}
```

## Retrieving values from containers

The container has a `type` that represents the type of its own container. This
allows you to identify `Ok` containers and `Err` containers.

```ts
import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
declare const result: Result<number, RangeError>;

if (result.type === "ok") {
  result.value;
} else {
  result.value;
}
```

These are all the functions of a container.

## Handle dangerous code

Wrap code that may throw errors in a container.

```ts
import { unsafe } from "https://deno.land/x/result_js@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

const result = unsafe(() => {
  throw Error("Dangerous!!");
});
assertEquals(result.value, Error());
assertEquals(result.type, "err");
```

By default, the Err container value is of type `unknown`. If you know more about
the error being thrown, you can give a more detailed type.

For example, instantiation of `Headers` is known to throw `TypeError`.

```ts
import { unsafe } from "https://deno.land/x/result_js@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

const result = unsafe<Headers, TypeError>(() =>
  new Headers({ "?": "invalid field name" })
);
assertEquals(result.value, new TypeError());
```

> You would have wanted to specify only the type of error.
> `unsafe<TypeError>(() => new Headers());` Unfortunately, this is not possible.
> TypeScript will only allow partial generics to be specified if The remaining
> generics become default type arguments. For that reason, `unsafe` accepts the
> type `Ok` on the left and `Err` on the right.

## Pattern matching

It provides an interface similar to pattern matching in functional programming
languages.

```ts
import { match, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

const value = match(Result.ok("Tom"), {
  ok: (value) => "Hello " + value,
  err: (value) => "Goodby " + value,
});
assertEquals(value, "Hello Tom");
```

## Validate container

Provides a function to check the type of container with Type guard.

### isOk

Whether the `ResultContainer` is `OkContainer` or not.

```ts
import { isOk, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isOk(Result.ok("OK!!")), true);
assertEquals(isOk(Result.err("Error!!")), false);
```

### isErr

Whether the `ResultContainer` is `ErrContainer` or not.

```ts
import { isErr, Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
import { assertEquals } from "https://deno.land/std@$VERSION/testing/asserts.ts";

assertEquals(isErr(Result.err("Error!!")), true);
assertEquals(isErr(Result.ok("OK!!")), false);
```

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/result_js/mod.ts).

## License

Copyright © 2022-present [Tomoki Miyauchi](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license

Inspired by
[Rust, Result](https://doc.rust-lang.org/std/result/enum.Result.html#).
