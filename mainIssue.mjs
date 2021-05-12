import {strictEqual,deepStrictEqual} from 'assert'
import {resolve} from 'fluture'
import {Json} from 'fluture-express'
import {equivalence} from 'fluture/test/assertions.js'

import {commonjsResolve,commonjsJson} from './mainIssue.js'
import {esmResolve,esmJson} from './esmResolve.mjs'

const data = {foo: 'bar'}

const localResolvePrototype    = Object.getPrototypeOf (resolve (data)),
      esmResolvePrototype      = Object.getPrototypeOf (esmResolve (data)),
      commonjsResolvePrototype = Object.getPrototypeOf (commonjsResolve (data))

console.log (localResolvePrototype, `localResolvePrototype: is === to commonjsResolvePrototype: ${localResolvePrototype === commonjsResolvePrototype}, is === to esmResolvePrototype: ${localResolvePrototype === esmResolvePrototype}`)
console.log (esmResolvePrototype, `esmResolvePrototype: is === to commonjsResolvePrototype: ${commonjsResolvePrototype === esmResolvePrototype}`)
console.log (commonjsResolvePrototype, `commonjsResolvePrototype: is === to esmResolvePrototype: ${commonjsResolvePrototype === esmResolvePrototype}`)

// Failure
// tryCatch (() => strictEqual (esmResolve (data), resolve (data)))
// Success
// tryCatch (() => deepStrictEqual (esmResolve (data), resolve (data)))

// Failure
// tryCatch (() => strictEqual (commonjsResolve (data), resolve (data)))
// tryCatch (() => deepStrictEqual (commonjsResolve (data), resolve (data)))

// Success
// tryCatch (equivalence (esmResolve (data)) (resolve (data)))
// Success because deepStrictEqual is on `data` and not Future
// tryCatch (equivalence (commonjsResolve (data)) (resolve (data)))
// Success because isFuture check is recursive so that deepStrictEqual is on `data` and not Future
// tryCatch (equivalence (commonjsResolve (commonjsResolve (data))) (resolve (resolve (data))))


const localJsonPrototype    = Object.getPrototypeOf (Json (data)),
      esmJsonPrototype      = Object.getPrototypeOf (esmJson (data)),
      commonjsJsonPrototype = Object.getPrototypeOf (commonjsJson (data))

console.log (localJsonPrototype, `localJsonPrototype: is === to commonjsJsonPrototype: ${localJsonPrototype === commonjsJsonPrototype}, is === to esmJsonPrototype: ${localJsonPrototype === esmJsonPrototype}`)
console.log (esmJsonPrototype, `esmJsonPrototype: is === to commonjsJsonPrototype: ${commonjsJsonPrototype === esmJsonPrototype}`)
console.log (commonjsJsonPrototype, `commonjsJsonPrototype: is === to esmJsonPrototype: ${commonjsJsonPrototype === esmJsonPrototype}`)


// Success because instances of esmJson and Json has same prototype
tryCatch (equivalence (commonjsResolve (esmJson (data))) (resolve (Json (data))))

// Failure because equivalence only works for Futures, anything else is never equal
// tryCatch (equivalence (commonjsJson (data)) (esmJson (data)))
// Failure because instances of commonjsJson and Json does not have same prototype
// tryCatch (equivalence (esmResolve (commonjsJson (data))) (resolve (Json (data))))
// Failure because instances of commonjsJson and esmJson does not have same prototype
tryCatch (equivalence (commonjsResolve (commonjsJson (data))) (resolve (esmJson (data))))


function tryCatch (f) {
	if (f instanceof Promise) {
		f.catch (console.error)
	} else {
		try { f () }
		catch (error) {
			console.error (error)
		}
	}
}