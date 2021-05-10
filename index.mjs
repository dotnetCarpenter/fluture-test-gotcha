// import assert from 'assert'

import {resolve} from 'fluture'
import {equivalence} from 'fluture/test/assertions.js'
import {Json} from 'fluture-express'

import data1 from './fixture.js'
import data2 from './fixture.mjs'

import testFunction1 from './flutureTestSubject.js'
import testFunction2 from './flutureTestSubject.mjs'
import testFunction3 from './fluture-expressTestSubject.js'
import testFunction4 from './fluture-expressTestSubject.mjs'

const errorHandler = error => console.error (error)

equivalence (resolve (data1)) (testFunction1)
	.catch (errorHandler);

equivalence (resolve (data2)) (testFunction1)
.catch (errorHandler);

equivalence (resolve (data1)) (testFunction2)
	.catch (errorHandler);

equivalence (resolve (data2)) (testFunction2)
	.catch (errorHandler);

// FAIL: Future Json from commonjs and data from commonjs
equivalence (resolve (Json (data1))) (testFunction3)
	.catch (errorHandler);

// FAIL: Future Json from commonjs and data from esm
equivalence (resolve (Json (data2))) (testFunction3)
	.catch (errorHandler);

equivalence (resolve (Json (data1))) (testFunction4)
	.catch (errorHandler);

equivalence (resolve (Json (data2))) (testFunction4)
	.catch (errorHandler);
