import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { BlazeUI } from 'meteor/blazeui:core'
import './Header.html'

const Theme = BlazeUI.theme()

Template.Header.onCreated(async function () {
  const instance = this
  instance.theme = new ReactiveVar()
  const theme = Theme.storage() ?? Theme.system()
  if (theme) {
    instance.theme.set(theme)
    Theme.update(theme)
  }
})

Template.Header.helpers({
  isDark () {
    return Template.instance().theme.get() === 'dark'
  }
})

Template.Header.events({
  'change #theme-toggle' (event) {
    const value = event.originalEvent.detail.pressed ? 'dark' : 'light'
    Theme.update(value)
  }
})