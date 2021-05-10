# Fluture Test Gotcha's

When using `'fluture-express'` you need to be aware of the gotcha's in this
repository.

**Using node v14.16.1**

## fluture-express's Json

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

However, note that it does not matter wether your test data is from a commonjs
module or EcmaScript module (esm).
