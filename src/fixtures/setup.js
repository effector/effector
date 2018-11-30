import 'raf/polyfill'
import {configure} from 'enzyme'
import 'jsdom-global/register'
import Adapter from './ReactSixteenAdapter'

configure({
  adapter: new Adapter(),
})
