import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import './Calendar.html'

/**
 * @private
 * This is yet to be implemented.
 */

export const Calendar = {
  name: 'Calendar',
  class: '',
  attributes ({ props, state, api }) {
    const  { merge } = api.styles()
    return {
      class: merge(Calendar.class, props.class),
      'data-role': 'adp-root'
    }
  },
  onRendered: ({ instance, state }) => {
    const parentEl = instance.$('[data-role="adp-root"]').get(0)
    instance.dp = new AirDatepicker(parentEl, {
      inline: true,
      visible: true
    })
  }
}
