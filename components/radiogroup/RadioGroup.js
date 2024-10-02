import './RadioGroup.html'

/**
 * @private
 * This is yet to be implemented.
 */

export const RadioGroup = {
  name: 'RadioGroup',
  class: 'grid gap-2',
  attributes({ props, state, api }) {
    const { class:className, disabled, ...rest } = props
    const { merge } = api.styles()
    return {
      role: 'radiogroup',
      'data-disabled': disabled,
      'aria-disabled': disabled,
      disabled: disabled ? '' : undefined,
      class: merge(RadioGroup.class, className),
      ...rest
    }
  }
}

export const RadioGroupItem = {
  name: 'RadioGroupItem',
  class: ''
}
