import './Label.html'

export const Label = {
  name: 'Label',
  class: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  events: {
    'mousedown' (event, t) {
      const target = event.target
      if (target.closest('button, input, select, textarea')) return;

      t.data?.onMouseDown?.(event);
      // prevent text selection when double clicking label
      if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
    }
  }
}
