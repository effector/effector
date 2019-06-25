// @flow

import {flowToggle, flowToggleChange} from './domain'

flowToggle.on(flowToggleChange, (_, e) => e.currentTarget.checked)
