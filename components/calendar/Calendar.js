import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

import './Calendar.html'

export const Calendar = {
  name: 'Calendar',
  class: '',
  attributes ({ props, state, api }) {
    const  { merge } = api.styles()
    return {
      class: merge(Calendar.class, props.class),
      'data-role': 'dp-root'
    }
  },
  onRendered: ({ instance, state }) => {
    const parentEl = instance.$('[data-role="dp-root"]').get(0)
    instance.dp = new AirDatepicker(parentEl, {
      inline: true,
      visible: true
    })
  }
}
