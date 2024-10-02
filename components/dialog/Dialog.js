import { Random } from 'meteor/random'
import { ReactiveDict } from 'meteor/reactive-dict'
import './Dialog.html'

/**
 * Dialog components to build animated modal-like dialogs.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Dialog
 */

/**
 * @typedef DialogState
 * @property open {boolean} mounting state
 * @property visible {boolean} visibility state
 * @property static {boolean} whether clicking backdrop hides dialog (false) or not (true)
 * @property scroll {boolean} whether content can be scrolled
 * @property uid {string} a random unique id for this instance to prefix id attriubutes
 */

/**
 * The root component for dialogs.
 * Provides shared state.
 *
 * @type object
 * @property static {boolean} sets default state.static to the given value
 * @property scroll {boolean} sets default state.scroll to the given value
 */
export const Dialog = {
  name: 'Dialog',
  main: true,
  /**
   * @static
   * @function
   * @return {ReactiveDict}
   */
  state: () => new ReactiveDict({
    open: false,
    visible: false,
    static: false,
    scroll: false,
    uid: Random.id(6)
  }),
  onCreated: ({ instance, state }) => {
    instance.state = state

    const initialStatic = instance.data?.static
    if (typeof initialStatic === 'boolean') {
      instance.state.set({ static: initialStatic })
    }

    const initialScroll = instance.data?.scroll
    if (typeof initialScroll === 'boolean') {
      instance.state.set({ scroll: initialScroll })
    }

    instance.autorun(() => {
      const open = instance.state.get('open')
      if (open) {
        document.body.style.overflowY = 'hidden'
      }
      else {
        document.body.style.overflowY = 'scroll'
      }
    })
  }
}

/** @private */
const useFromContext = () => ({ instance, api }) => {
  const resolve = api.state().useFromContext()
  return resolve({ instance })
}

const onOpen = () => function () { return Template.instance().state.get('open') }

/**
 * Provide any child element that has `type="button"` to trigger the dialog.
 * @type object
 */
export const DialogTrigger = {
  name: 'DialogTrigger',
  class: '',
  state: useFromContext(),
  events: {
    'click [type="button"], click button' (e, t) {
      t.state.set({ open: true, visible: true })
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * Place the dialog content in here.
 * If `Dialog` is scrollable, then overflowing content will be scrollable, otherwise clipped.
 * @type object
 */
export const DialogContent = {
  name: 'DialogContent',
  class: 'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const scrollable = state.scroll && 'max-h-full overflow-y-scroll'
    return {
      role: 'dialog',
      'data-state': state.visible ? 'open' : 'closed',
      'aria-describedby': `${state.uid}-description`,
      'aria-labelledby': `${state.uid}-title`,
      style: 'pointer-events: auto;',
      class: merge(DialogContent.class, scrollable, props.class)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  },
  helpers: {
    open: onOpen()
  },
  events: {
    'animationend div' (e, t) {
      if (!t.state.get('visible')) {
        // ensure this will not "flicker"
        e.currentTarget.style.display = 'none'

        if (t.state.get('open')) {
          t.state.set('open', false)
        }
      }
    }
  }
}

/**
 * An optional styled header for the dialog.
 * @type object
 */
export const DialogHeader = {
  name: 'DialogHeader',
  class: 'flex flex-col space-y-1.5 text-center sm:text-left',
  state: useFromContext(),
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled footer for the dialog.
 * @type object
 */
export const DialogFooter = {
  name: 'DialogFooter',
  class: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  state: useFromContext(),
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled title for the dialog.
 * @type object
 */
export const DialogTitle = {
  name: 'DialogTitle',
  class: 'text-lg font-semibold leading-none tracking-tight',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      id: `${state.uid}-title`,
      class: merge(DialogTitle.class, props.class),
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled description section for the dialog.
 * @type object
 */
export const DialogDescription = {
  name: 'DialogDescription',
  class: 'text-sm text-muted-foreground',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      id: `${state.uid}-description`,
      class: merge(DialogDescription.class, props.class),
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * Dialog close button, which can be used as inline-child or auto-placed top-right.
 * Pass a child element with `role="button"` to trigger closing.
 * @type object
 * @property asChild {boolean=}
 */
export const DialogClose = {
  name: 'DialogClose',
  class: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const clickable = 'cursor-pointer'
    return {
      type: 'button',
      class: merge(!props.asChild && DialogClose.class, clickable, props.class),
    }
  },
  state: useFromContext(),
  events: {
    'click [type="button"], click button' (e, t) {
      t.state.set('visible', false)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * The backdrop/overlay in the background.
 * If state.static is not true, then clicking the overlay will close the dialog.
 * @type object
 */
export const DialogOverlay = {
  name: 'DialogOverlay',
  class: 'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-1000',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      role: 'dialog-overlay',
      'data-state': state.visible ? 'open' : 'closed',
      'data-aria-hidden': !state.visible,
      'aria-hidden': !state.visible,
      style: 'pointer-events: auto;',
      class: merge(DialogOverlay.class, props.class)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  },
  helpers: {
    open: onOpen()
  },
  events: {
    'click [role="dialog-overlay"]' (e, t) {
      if (!t.state.get('static')) {
        t.state.set('visible', false)
      }
    },
    'animationend div' (e, t) {
      if (!t.state.get('visible')) {
        // ensure this will not "flicker"
        e.currentTarget.style.display = 'none'
      }
    }
  }
}
