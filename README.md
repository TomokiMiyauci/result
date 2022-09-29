# result-js

The standard API for result in JavaScript.

## What

It brings a standard Result type to the JavaScript world.

Provides a new standard way of error handling.

Containers are designed to be the smallest and most self-contained.

### What is not

- Not a Monad
- Not a Rust::std::result

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
const result = Result.err("any error value");
```

## Define a container as the return value

The `Result` defines OK on the left and error on the right.

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

The container has `isOk` method. This allows you to identify `Ok` containers and
`Err` containers.

The custom type guard narrows down the type of the container.

```ts
import { Result } from "https://deno.land/x/result_js@$VERSION/mod.ts";
declare const result: Result<number, RangeError>;

if (result.isOk()) {
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
assertEquals(result.isOk(), false);
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

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/result_js/mod.ts).

## License

Copyright © 2022-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license

Inspired by
[Rust, Result](https://doc.rust-lang.org/std/result/enum.Result.html#).
