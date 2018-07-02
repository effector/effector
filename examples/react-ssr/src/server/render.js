//@flow

import * as React from 'react'
import {renderToString} from 'react-dom/server'
import {App} from '../app/component/App'
import {html} from './html'

export const render = () => {
 const str = renderToString(<App />)
 const result = html(str)
 return result
}
