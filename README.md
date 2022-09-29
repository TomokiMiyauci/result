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
import { Result } from "https://deno.land/x/result_js/mod.ts";
const result = Result.ok("any success value");
```

## Create Err(failure) container

Err container is created with `Result#err`. Accepts any value.

```ts
import { Result } from "https://deno.land/x/result_js/mod.ts";
const result = Result.err("any error value");
```

## Define a container as the return value

The `Result` defines OK on the left and error on the right.

```ts
import { Result } from "https://deno.land/x/result_js/mod.ts";

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
import { Result } from "https://deno.land/x/result_js/mod.ts";
declare const result: Result<number, RangeError>;

if (result.isOk()) {
  result.value;
} else {
  result.value;
}
```

These are all the functions of a container.

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/result_js/mod.ts).

## License

Copyright © 2022-present [TomokiMiyauci](https://github.com/TomokiMiyauci).

Released under the [MIT](./LICENSE) license

Inspired by
[Rust, Result](https://doc.rust-lang.org/std/result/enum.Result.html#).
