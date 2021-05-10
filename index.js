const {resolve} = require ('fluture')
const {equivalence} = require ('fluture/test/assertions.js')
const {Json} = require ('fluture-express')

const data1 = require ('./fixture.js')
const data2 = require ('./fixture.mjs')

const testFunction1 = require ('./flutureTestSubject.js')
const testFunction2 = require ('./flutureTestSubject.mjs')
const testFunction3 = require ('./fluture-expressTestSubject.js')
const testFunction4 = require ('./fluture-expressTestSubject.mjs')

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
