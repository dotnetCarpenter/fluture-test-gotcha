import {strictEqual,deepStrictEqual} from 'assert';
import show from 'sanctuary-show';
import {resolve} from 'fluture';
import {Json} from 'fluture-express';
import {equivalence} from 'fluture/test/assertions.js';

import data1 from '../fixture.js';
import data2 from '../fixture.mjs';
import testFunction3 from '../fluture-expressTestSubject.js';
import testFunction4 from '../fluture-expressTestSubject.mjs';
import testFunction5 from './t2.js';
import data3 from './t3.js';

// SUCCESS: show with import from commonjs (show is always string so ===)
// console.log (show (resolve (Json (data1))), '\n', show (testFunction3))
// strictEqual (show (resolve (Json (data1))), show (testFunction3))
// SUCCESS: show with import from esm (show is always string so ===)
// console.log (show (resolve (Json (data1))), '\n', show (testFunction3))
// deepStrictEqual (show (resolve (Json (data1))), show (testFunction3))

// FAIL: comparing Future, import from commonjs -> not ===, failing getPrototypeOf
// console.log (resolve (Json (data1)), '\n', testFunction3)
// deepStrictEqual (resolve (Json (data1)), testFunction3)

const localResolve    = Object.getPrototypeOf (resolve (Json (data1))),
      esmResolve      = Object.getPrototypeOf (testFunction4),
      commonjsResolve = Object.getPrototypeOf (testFunction3)

console.log (localResolve, `localResolve: is === to esmResolve: ${localResolve === esmResolve}, is === to commonjsResolve: ${commonjsResolve === localResolve}`);
console.log (esmResolve, `esmResolve: is === to localResolve: ${esmResolve === localResolve}, is === to commonjsResolve: ${commonjsResolve === esmResolve}`);
console.log (commonjsResolve, `commonjsResolve: is === to localResolve: ${localResolve === commonjsResolve}, is === to esmResolve: ${commonjsResolve === esmResolve}`);

/* It comes down to this: The protypes are different because cjs and esm is different code. */

// Success: comparing Future, import from esm -> not ===, not getPrototypeOf, using `keyCheck` Object.keys
// Testing Future: Passing "Cheap keys test" and passing === for key 0, Passing "Cheap key test" for `Json`, passing array test for "body" and "head", not === for data1 @@values, $1 and $2 passes ===
// console.log (resolve (Json (data1)), '\n', testFunction4)
// deepStrictEqual (resolve (Json (data1)), testFunction4)
// Cheap key test
// let i = 0;
// for (; i < aKeys.length; i++) {
// 	if (!ObjectPrototypeHasOwnProperty(val2, aKeys[i])) {
// 		return false;
// 	}
// }

// console.log (testFunction5, '\n', Json (data1))
// deepStrictEqual (testFunction5, Json (data1))

// console.log (Object.getPrototypeOf (testFunction5) === Object.getPrototypeOf (Json (data1)))
// console.log (Object.getPrototypeOf (data1) === Object.getPrototypeOf (data1))

// console.log (Object.getPrototypeOf (data1) === Object.getPrototypeOf (data3))

// equivalence (resolve (Json (data1))) (testFunction3)
