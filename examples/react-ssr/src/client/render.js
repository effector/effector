//@flow

import * as React from 'react'

import {App} from '../app/component/App'
import {addTodo} from '../app/store/event'
import {hydrate} from 'react-dom'

//$off
hydrate(<App />, document.getElementById('root'))
