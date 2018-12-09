//@flow

import * as React from 'react'
import {hydrate} from 'react-dom'

import {App} from '../app'
import {injectData} from '../app/store/event'

injectData(window.__DATA__)

//$off
hydrate(<App />, document.getElementById('root'))
