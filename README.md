# lamb-types

Type definitions for [Lamb](https://github.com/ascartabelli/lamb/).

[![NPM version](https://img.shields.io/npm/v/lamb-types.svg)](https://www.npmjs.com/package/lamb-types)

![Lamb logo](https://ascartabelli.github.io/lamb/images/logo_600x130.png "Lamb, because it's docile like a lamb")

## Disclaimer

These type definitions are still a work in progress and some types are missing.
In the future [Lamb](https://github.com/ascartabelli/lamb/) will ship with its own types.

The version number of this package will reflect the "major" and "minor" bits of [Lamb](https://github.com/ascartabelli/lamb/)'s version (currently `0.61.x`), but will have its own "patch" number.

## Usage

Install the package and add this to the compiler options of your `jsconfig` / `tsconfig` file:

```js
{
    // ...

    "compilerOptions": {
        "types": ["lamb-types"]
    }

    // ...
}
```
