import { ReactiveDict } from 'meteor/reactive-dict'
import './ToggleGroup.html'

export const ToggleGroup = {
  name: 'ToggleGroup',
  class: 'flex items-center justify-center gap-1',
  state: () => new ReactiveDict({
    type: 'multiple',
    current: null
  }),
  attributes: {
    role: 'toggle-group'
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
    const type = instance.data?.type

    if (typeof type === 'string') {
      instance.state.set({ type })
    }
  },
  helpers: {
    props () {
      const instance = Template.instance()
      const data = instance.data ?? {}
      const type = instance.state.get('type')
      const variant = data.variant
      const size = data.size
      const props = {
        variant,
        size,
        type
      }

      if (type === 'single') {
        props.current = instance.state.get('current')
      }

      return props
    }
  },
  events: {
    'change [role="toggle-group"]' (e, t) {
      const { value } = e.target
      if (!value) {
        return
      }

      const type = t.state.get('type')

      if (type === 'single') {
        const current = t.state.get('current')
        t.state.set('current', current === value ? null : value)
      }

      if (type === 'multiple') {
        const current = new Set(t.state.get('current') ?? [])
        if (current.has(value)) {
          current.delete(value)
        }
        else {
          current.add(value)
        }
        t.state.set('current', [...current])
      }

      e.currentTarget.dispatchEvent(new CustomEvent('change', {
        bubbles: true,
        detail: { type, selected: t.state.get('current') }
      }))
    }
  }
}
