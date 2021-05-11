import {resolve} from 'fluture';
import {equivalence} from 'fluture/test/assertions.js';
import {Json} from 'fluture-express';

import data1 from './fixture.js';

import testFunction3 from './fluture-expressTestSubject.js';

describe ('Show that jasmine will suppress error messages from equivalence', () => {

	it ('FAIL: Future Json from commonjs and data from commonjs', () => {
		const actual = equivalence (resolve (Json (data1))) (testFunction3);
		return expectAsync(actual).toBeResolved();
	});

	it ('FAIL: Future Json from commonjs and data from commonjs', async () => {
		const actual = equivalence (resolve (Json (data1))) (testFunction3);
		await expectAsync(actual).toBeResolved();
	});

});

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
