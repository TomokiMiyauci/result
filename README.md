# result-js

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno)](https://deno.land/x/result_js)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/result_js/mod.ts)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/TomokiMiyauci/result-js)](https://github.com/TomokiMiyauci/result-js/releases)
[![codecov](https://codecov.io/github/TomokiMiyauci/result-js/branch/main/graph/badge.svg)](https://codecov.io/github/TomokiMiyauci/result-js)
[![GitHub](https://img.shields.io/github/license/TomokiMiyauci/result-js)](LICENSE)

[![test](https://github.com/TomokiMiyauci/result-js/actions/workflows/test.yaml/badge.svg)](https://github.com/TomokiMiyauci/result-js/actions/workflows/test.yaml)
[![NPM](https://nodei.co/npm/@miyauci/result.png?mini=true)](https://nodei.co/npm/@miyauci/result/)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Minimum result type port of Rust.

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Acknowledgements](#acknowledgements)
- [Contributing](#contributing)
- [License](#license)

## Install

deno.land:

```ts
import * as mod from "https://deno.land/x/result_js/mod.ts";
```

npm:

```bash
npm i @miyauci/result
```

## Usage

Type [Result](https://deno.land/x/result_js/mod.ts?s=Result) represents an
success or failure.

```ts
import {
  Err,
  Ok,
  type Result,
  unwrap,
} from "https://deno.land/x/result_js/mod.ts";
import { assertThrows } from "https://deno.land/std/testing/asserts.ts";

function divide(
  numerator: number,
  denominator: number,
): Result<number, string> {
  if (!denominator) return Err("divide by 0");

  return Ok(numerator / denominator);
}

const opt = divide(100, 0);
assertThrows(() => unwrap(opt));
```

All [operators](https://deno.land/x/result_js/mod.ts#Functions) for
[Result](https://deno.land/x/optio/mod.ts?s=Result) are separated from
prototype.

## API

All APIs can be found in the
[deno doc](https://doc.deno.land/https/deno.land/x/result_js/mod.ts).

## Acknowledgements

- [Rust std::result](https://doc.rust-lang.org/std/result/index.html)

## Contributing

See [contribution](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2023 Tomoki Miyauchi
