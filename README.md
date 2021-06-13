# Fluture Test Gotcha's

When writing unit test for code that is using `'fluture-express'` you need to
be aware of the gotcha's in this repository.

### TL;DR

>`equivalence` checks the inner value of two Futures using `assert.deepStrictEqual`.
That in turn test the prototypes of the inner value.
Because `Json` has a CommonJS version and a ESM version, those two prototypes
will be different and `equivalence` will fail for two seemingly identical values.

_[- Main issue](#main-issue)_

-----------------------------------------------------------------

**Using node v14.16.1**

Run `npm test` to see all issues in your terminal.

- [fluture-express's Json](#fluture-expresss-json)
	- [Main issue](#main-issue)
- [Writing your tests in a commonjs module](#writing-your-tests-in-a-commonjs-module)
- [Using Jasmine as test runner](#using-jasmine-as-test-runner)

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

However, note that it does not matter if your test data is from a commonjs
module or EcmaScript module (esm).

The following code snippet (written with [Jasmine][Jasmine]) highlights the
successful match and the failed match:

```js
// success
it ('Future Json from esm and data from commonjs', () => {
	return equivalence (resolve (Json (data1))) (testFunction4);
});
// failure
it ('FAIL: Future Json from commonjs and data from commonjs', () => {
	return equivalence (resolve (Json (data1))) (testFunction3);
});
```
_spec.mjs_

### Main issue

1. `npm run test:prototype`

`equivalence` checks the inner value of two Futures using `assert.deepStrictEqual`.
That in turn test the prototypes of the inner value.
Because `Json` has a CommonJS version and a ESM version, those two prototypes
will be different and `equivalence` will fail for two seemingly identical values.

The following code illustrates the issue, where `Json` and `esmJson`
is `import {Json} from 'fluture-express'`, the latter from a separate
esm file. `commonjsJson` is `const {Json} = require ('fluture-express')`
from _mainIssue.js_.

```js
const localJsonPrototype    = Object.getPrototypeOf (Json (data)),
      esmJsonPrototype      = Object.getPrototypeOf (esmJson (data)),
      commonjsJsonPrototype = Object.getPrototypeOf (commonjsJson (data))

localJsonPrototype === esmJsonPrototype
localJsonPrototype !== commonjsJsonPrototype
esmJsonPrototype !== commonjsJsonPrototype

// Success because deepStrictEqual is on `data` and not Future
equivalence (commonjsResolve (data)) (resolve (data))

// Success because instances of esmJson and Json has same prototype
equivalence (commonjsResolve (esmJson (data))) (resolve (Json (data)))
deepStrictEqual (esmJson (data), Json (data))

// Failure because instances of commonjsJson and esmJson does not have same
// prototype
equivalence (commonjsResolve (commonjsJson (data))) (resolve (esmJson (data)))
```


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


## Using Jasmine as test runner

1. `npm run test:jasmine-gotcha`

`expectAsync(actual)` from the [Jasmine][Jasmine] documentation:

> Create an asynchronous expectation for a spec. Note that the matchers that
> are provided by an asynchronous expectation all return promises which must be
> either returned from the spec or waited for using await in order for Jasmine
> to associate them with the correct spec.

```js
await expectAsync(somePromise).toBeResolved();
// or
return expectAsync(somePromise).toBeResolved();
```

`equivalence` returns a `Promise`, so the return value supposely goes as
argument to `expectAsync`. However, if you do that, you suppress any error
message from `equivalence`.

For asynchronous tests, [Jasmine][Jasmine] need you to return your "test"
`Promise`. Here is a few ways you can that and retain the error message
from `equivalence`:

```js
describe ('Show how jasmine will display error messages from equivalence', () => {

	it ('bare equivalence: Future Json from commonjs and data from commonjs', () =>
		equivalence (resolve (Json (data1))) (testFunction3));

	it ('await equivalence: Future Json from commonjs and data from commonjs', async () => {
		await equivalence (resolve (Json (data1))) (testFunction3);
	});

	it ('Promise.all: Future Json from commonjs and data from commonjs', () => {
		const actual = equivalence (resolve (Json (data1))) (testFunction3);
		const result = expectAsync(actual).toBeResolvedTo(data1);

		return Promise.all ([actual, result]);
	});

});
```

[Jasmine]: http://jasmine.github.io/
