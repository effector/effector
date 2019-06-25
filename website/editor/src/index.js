//@flow

import ReactDOM from 'react-dom'

import './dynamic'
import './graphite/dynamic'
import './flow/dynamic'
import './logs/dynamic'
import './settings/dynamic'
import view from './view'

const domNode = document.getElementById('try-wrapper')
domNode && ReactDOM.render(view, domNode)
