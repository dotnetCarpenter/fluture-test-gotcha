import {resolve} from 'fluture'
import {equivalence} from 'fluture/test/assertions.js'
import {Json} from 'fluture-express'

import data1 from './fixture.js'
import data2 from './fixture.mjs'

import testFunction1 from './flutureTestSubject.js'
import testFunction2 from './flutureTestSubject.mjs'
import testFunction3 from './fluture-expressTestSubject.js'
import testFunction4 from './fluture-expressTestSubject.mjs'

describe ('Test Future equivalence between module formats', () => {

	it ('Future from commonjs and data from commonjs', () => {
		return equivalence (resolve (data1)) (testFunction1);
	});

	it ('Future from commonjs and data from esm', () => {
		return equivalence (resolve (data2)) (testFunction1);
	});

	it ('Future from esm and data from commonjs', () => {
		return equivalence (resolve (data1)) (testFunction2);
	});

	it ('Future from esm and data from esm', () => {
		return equivalence (resolve (data2)) (testFunction2);
	});

});

describe ('Test Future Express equivalence between module formats', () => {

	it ('FAIL: Future Json from commonjs and data from commonjs', () => {
		return equivalence (resolve (Json (data1))) (testFunction3);
	});

	it ('FAIL: Future Json from commonjs and data from esm', () => {
		return equivalence (resolve (Json (data2))) (testFunction3);
	});

	it ('Future Json from esm and data from commonjs', () => {
		return equivalence (resolve (Json (data1))) (testFunction4);
	});

	it ('Future Json from esm and data from esm', () => {
		return equivalence (resolve (Json (data2))) (testFunction4);
	});

});