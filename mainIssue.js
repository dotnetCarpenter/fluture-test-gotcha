'use strict'

const {resolve} = require ('fluture')
const {Json} = require ('fluture-express')

module.exports = {
	commonjsResolve: resolve,
	commonjsJson: Json
}
