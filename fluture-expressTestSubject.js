'use strict'

const {resolve} = require ('fluture');
const {Json} = require ('fluture-express');

const data = require ('./fixture.js');

module.exports = resolve (Json (data));