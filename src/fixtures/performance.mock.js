// import 'raf/polyfill'
// import {configure} from 'enzyme'
// import 'jsdom-global/register'
// import Adapter from './ReactSixteenAdapter'

// configure({
//  adapter: new Adapter(),
// })

window.performance.mark = jest.fn()
window.performance.measure = jest.fn()
window.performance.clearMeasures = jest.fn()
window.performance.clearMarks = jest.fn()
