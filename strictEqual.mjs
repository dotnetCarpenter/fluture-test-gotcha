import {strictEqual,deepStrictEqual} from 'assert';
import {Json} from 'fluture-express';
import data1 from './fixture.js';
import data2 from './fixture.mjs';

deepStrictEqual (data1, data1);
deepStrictEqual (data2, data2);

deepStrictEqual (Json (data1), Json (data1));
deepStrictEqual (Json (data2), Json (data2));

strictEqual (data1, data1);
strictEqual (data2, data2);

try {
	// the next line will throw an AssertionError
	strictEqual (Json (data1), Json (data1));
} catch (error) {
	console.error (error)
}

try {
	// the next line will throw an AssertionError
	strictEqual (Json (data2), Json (data2));
} catch (error) {
	console.error (error)
}
