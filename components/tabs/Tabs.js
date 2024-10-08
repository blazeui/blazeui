import { ReactiveDict } from 'meteor/reactive-dict'
import { Random } from 'meteor/random'
import './Tabs.html'

/**
 * Components to build tabs that users can switch between to reveal different content
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Tabs
 */

/**
 * Root component, providing shared state to its children.
 * Note that currently only orientation='horizontal' and dir='ltr' are
 * supported states.
 * @type object
 */
export const Tabs = {
  name: 'Tabs',
  main: true,
  class: '',
  state: ({ instance }) => {
    instance.state = new ReactiveDict({
      orientation: 'horizontal',
      dir: 'ltr',
      current: instance.data?.defaultValue ?? null,
      mode: instance.data?.mode ?? 'manual',
      uid: Random.id(6)
    })
    return instance.state
  },
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      'data-orientation': state.orientation,
      dir: state.dir,
      class: merge(Tabs.class, props.class)
    }
  }
}

/**
 * @typedef TabsState
 * @property [orientation='horizontal'] {('horizontal'|'vertical')}
 * @property [dir='ltr'] {('ltr'|'rtl')}
 * @property [current=null] {string}
 * @property [mode='manual'] {('manual'|'auto')} if 'auto', tabs can be switched via keyboard by simply focusing them,
 *   otherwise, tabs are siwtched by clicking or pressing Space when in focus.
 * @property uid {string} a random unique id for this instance to prefix id attriubutes
 */

/** @private */
const useFromContext = () => ({ instance, api }) => {
  const resolve = api.state().useFromContext()
  return resolve({ instance })
}

/**
 * Place the content for a given tab with the respective value.
 * @type object
 * @property value {string} the value that links this content to the tab with the exact same value
 */
export const TabsContent = {
  name: 'TabsContent',
  class: "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const { value, disabled, class: className, context, ...rest } = props
    const uid = state.uid
    const isSelected = value === state.current
    return {
      'data-state': isSelected ? 'active' : 'inactive',
      'data-orientation': state.orientation,
      role: 'tabpanel',
      'aria-labelledby': `${uid}-trigger-${value}`,
      hidden: !isSelected,
      id: `${uid}-content-${value}`,
      tabIndex: 0,
      class: merge(TabsContent.class, className),
      ...rest
    }
  }
}

/**
 * Wraps the multiple tabs into a horizontal list
 * @type object
 */
export const TabsList = {
  name: 'TabsList',
  class: 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const { class: className, context, ...rest } = props
    return {
      role: 'tablist',
      'aria-orientation': state.orientation,
      class: merge(TabsList.class, className),
      ...rest
    }
  },
  onRendered ({ instance }) {
    if (instance.state.get('current') === null) {
      const $triggers = instance.$('[role="tab"]')
      console.debug($triggers)
    }
  }
}

/**
 * Trigger for a tab is a styled button.
 * @type object
 * @property value {string} the value that links this trigger to the content with the exact same value
 * @property [disabled=false] {boolean} disables the button
 */
export const TabsTrigger = {
  name: 'TabsTrigger',
  class: "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const { value, disabled, class: className, context, ...rest } = props
    const uid = state.uid
    const isSelected = value === state.current
    return {
      type: 'button',
      role: 'tab',
      'aria-selected': isSelected,
      'aria-controls': `${uid}-content-${value}`,
      'data-state': isSelected ? 'active' : 'inactive',
      'data-disabled': disabled ? '' : undefined,
      'data-value': value,
      disabled: disabled,
      id: `${uid}-trigger-${value}`,
      class: merge(TabsTrigger.class, className),
      ...rest
    }
  },
  events: {
    'mousedown button' (e, t) {
      const disabled = t.state.get('disabled')
      const value = e.currentTarget.getAttribute('data-value')

      // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
      // but not when the control key is pressed (avoiding MacOS right click)
      if (!disabled && e.button === 0 && e.ctrlKey === false) {
        t.state.set({ current: value })
      }
      else {
        // prevent focus to avoid accidental activation
        e.preventDefault();
      }
    },
    'keydown button' (e, t) {
      const value = e.currentTarget.getAttribute('data-value')
      if ([' ', 'Enter'].includes(e.key)) t.state.set({ current: value })
    },
    'focus button' (e, t) {
      // handle "automatic" activation if necessary
      // ie. activate tab following focus
      const isAutomaticActivation = t.state.get('mode') !== 'manual';
      const value = e.currentTarget.getAttribute('data-value')
      const isSelected = t.state.get('current') === value
      const disabled = t.state.get('disabled')
      if (!isSelected && !disabled && isAutomaticActivation) {
        t.state.set({ current: value })
      }
    }
  }
}
