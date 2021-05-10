import {resolve} from 'fluture';
import {Json} from 'fluture-express'

import data from './fixture.mjs';

export default resolve (Json (data));