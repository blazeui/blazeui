import { ReactiveDict } from 'meteor/reactive-dict'
import './Checkbox.html'
import {dispatchEvent} from '../utils/dispatchEvent'

/**
 * A simple Checkbox component.
 * Usable within forms or as standalone.
 * @module
 * @see http://blazeui.meteorapp.com/components?c=Checkbox
 */

/**
 * @property checked {boolean} sets the initial checked state to given value
 */
export const Checkbox = {
  name: 'Checkbox',
  main: true,
  class: 'h-4 w-4 rounded border-input text-primary focus:ring-primary',
  state: ({ instance }) => {
    instance.state = new ReactiveDict({ checked: false })
    return instance.state
  },
  attributes ({ props, state, api }) {
    const Styles = api.styles()
    const { className, rest } = Styles.extract(Checkbox, props)
    const { checked } = state
    const { disabled } = rest
    delete rest.disabled

    return {
      type: "checkbox",
      'checked': checked ? '' : undefined,
      'aria-checked': !!checked,
      'data-disabled': disabled ? '' : undefined,
      class: Styles.merge(
        Checkbox.class,
        className
      ),
      ...rest
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
    const checked = instance.data?.checked
    if (typeof checked === 'boolean') {
      instance.state.set({ checked })
    }
  },
  events: {
    'click button' (event, instance) {
      if (!instance.data?.disabled) {
        const newValue = !instance.state.get('checked')
        instance.state.set('checked', newValue)
        if (instance.data?.onChange) {
          instance.data?.onChange(event, newValue)
        }
        dispatchEvent({
          name: 'change',
          target: event.target,
          bubbles: true,
          data: { value: newValue }
        })
      }
    }
  }
}