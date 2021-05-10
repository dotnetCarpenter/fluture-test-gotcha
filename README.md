# Fluture Test Gotcha's

When using `'fluture-express'` you need to be aware of the gotcha's in this
repository.

**Using node v14.16.1**

Do `npm test` to see all issues.

## fluture-express's Json

1. `npm run test:node`
1. `npm run test:jasmine`

When using `Json` from `'fluture-express'`, if you test subject is a commonjs
module, then the value in the `Json` object is not reference-equal and tests
with `equivalence` from `'fluture/test/assertions.js'` will fail even though
the tests should pass.

```
Error:
	resolve ({"body": {"data": {"foo": "bar"}}, "head": []}) :: Future({ <resolved> {"body": {"data": {"foo": "bar"}}, "head": []} })
is not equivalent to:
	resolve ({"body": {"data": {"foo": "bar"}}, "head": []}) :: Future({ <resolved> {"body": {"data": {"foo": "bar"}}, "head": []} })

The inner values are not equal: Values have same structure but are not reference-equal
```
_Example of error message when `Json` is not imported via esm._

However, note that it does not matter wether your test data is from a commonjs
module or EcmaScript module (esm).

## Writing your tests in a commonjs module

1. `npm run test:commonjs`

If your node project is written using commonjs, it would seem reasonable to
write your tests in the same module format. But `'fluture/test/assertions.js'`
is in an esm format so trying to `require` `equivalence` will result in the
following error:

```
$ node index.js
internal/modules/cjs/loader.js:1080
	throw new ERR_REQUIRE_ESM(filename, parentPath, packageJsonPath);
      ^

Error [ERR_REQUIRE_ESM]: Must use import to load ES Module: /fluture-test-gotcha/node_modules/fluture/test/assertions.js
require() of ES modules is not supported.
require() of /fluture-test-gotcha/node_modules/fluture/test/assertions.js from /fluture-test-gotcha/index.js is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules.
```
_Example of error when running `node index.js` in this repo._
