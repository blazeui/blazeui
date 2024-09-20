import { BlazeUI } from 'meteor/blazeui:core'
import * as Components from './components'

// this registers all components immediately
BlazeUI.register(...Object.values(Components))
