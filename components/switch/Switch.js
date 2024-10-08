import { ReactiveDict } from 'meteor/reactive-dict'
import { dispatchEvent } from '../utils/dispatchEvent'
import './Switch.html'

/**
 * A boolean switch, representing a dichotome state.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Switch
 */

/**
 * Change event. Relates to the underlying button element.
 * @event change
 * @type {CustomEvent}
 * @property {{value: boolean}} detail - the transported data
 */


/**
 * Internal state is `checked:boolean`.
 * @property [checked=] {boolean} defines if the switch is checked by default.
 * @fires change on toggle
 */
export const Switch = {
  name: 'Switch',
  main: true,
  class: 'group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 data-[checked]:bg-primary',
  state: () => new ReactiveDict({
    checked: false
  }),
  attributes ({ props, state, api }) {
    const Styles = api.styles()
    const { className, rest } = Styles.extract(Switch, props)
    const { checked } = state
    const { disabled } = rest
    delete rest.disabled

    return {
      type: "button",
      role: "switch",
      'data-checked': !!checked,
      'aria-checked': !!checked,
      'data-disabled': disabled ? '' : undefined,
      class: Styles.merge(Switch.class, className),
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

