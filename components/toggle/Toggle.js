import { ReactiveDict } from 'meteor/reactive-dict'
import { BlazeUI } from 'meteor/blazeui:core'
import './Toggle.html'

export const toggleVariants = {
  class: "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-10 px-3",
      sm: "h-9 px-2.5",
      lg: "h-11 px-5"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}

export const Toggle = {
  name: 'Toggle',
  state: () => new ReactiveDict({ pressed: false, value: null }),
  ...toggleVariants,
  attributes ({ props, state, api }) {
    const Styles = api.styles()
    const { options, className, rest } = Styles.extract(Toggle, props)
    const { pressed } = state
    const { disabled } = rest
    delete rest.disabled

    if (state.variant) {
      options.variant = state.variant
    }

    return {
      type: "button",
      role: 'toggle',
      'aria-pressed': !!pressed,
      'data-state': pressed ? 'on' : 'off',
      'data-disabled': disabled ? '' : undefined,
      class: Styles.get({
        ctx: Toggle,
        options,
        classNames: [className]
      }),
      ...rest
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
    const value = instance.data?.value
    const pressed = instance.data?.defaultPressed

    if (BlazeUI.isBoolean(pressed)) {
      instance.state.set({ pressed })
    }

    // in order to get control over the toggle
    // from a toggle group in single-mode
    // it needs to be state-manageable from the parent
    instance.autorun(() => {
      const parent = Template.parentData()
      if (!parent) return

      const { current, variant } = parent
      const pressed = current && current === value
      instance.state.set({ pressed, variant })
    })
  },
  helpers: {
    isPressed () {
      return Template.instance().state.get('pressed')
    }
  },
  events: {
    'click button' (event, instance) {
      if (!instance.data?.disabled) {
        const value = instance.state.get('value')
        const newValue = !instance.state.get('pressed')
        instance.state.set('pressed', newValue)
        const payload = {
          pressed: newValue,
          value
        }

        if (instance.data?.onPressChange) {
          instance.data?.onPressChange(event, payload)
        }
        event.currentTarget.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          detail: payload
        }))
      }
    }
  }
}
