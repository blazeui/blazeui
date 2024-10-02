import './Popover.html'

/**
 * @private
 * This is yet to be implemented.
 */

export const Popover = {
  name: 'Popover',
  class: '',
  state: ({ instance }) => {
    instance.state = new ReactiveDict({
      defaultVisible: false,
      mode: instance.data?.mode ?? 'manual'
    })
  },
  attributes({ props, state, api }) {
    return {
      popover: state.mode
    }
  },
  onRendered: ({ instance, state }) => {
    instance.autorun(() => {
      const visible = state.get('visible')
    })
  }
}
