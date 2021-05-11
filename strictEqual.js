const {strictEqual,deepStrictEqual} = require ('assert');
const {Json} = require ('fluture-express');
const data1 = require ('./fixture.js');

deepStrictEqual (data1, data1);
deepStrictEqual (Json (data1), Json (data1));

strictEqual (data1, data1);

// the next line will throw an AssertionError
strictEqual (Json (data1), Json (data1));
