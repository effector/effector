//@flow

import * as React from 'react'

import {App} from '../app/component/App'
import {injectData} from '../app/store/event'
import {hydrate} from 'react-dom'

injectData(window.__DATA__)

//$off
hydrate(<App />, document.getElementById('root'))
