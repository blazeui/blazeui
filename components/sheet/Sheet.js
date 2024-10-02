import { Random } from 'meteor/random'
import { ReactiveDict } from 'meteor/reactive-dict'
import './Sheet.html'

/**
 * Components to build Sheets. These are sidebar-like dialogs that
 * can be placed on the four sides of the screen (left, right, top, bottom).
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Sheet
 */

/**
 * @typedef SheetState
 * @property open {boolean} mounting state
 * @property visible {boolean} visibility state
 * @property static {boolean} whether clicking backdrop hides dialog (false) or not (true)
 * @property scroll {boolean} whether content can be scrolled
 * @property uid {string} a random unique id for this instance to prefix id attriubutes
 */

/**
 * The root component, provides state to it's children.
 * @type object
 */
export const Sheet = {
  name: 'Sheet',
  main: true,
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
  },
  onRendered: ({ instance, state }) => {
    const trigger = instance.data?.trigger
    if (trigger) {
      const target = document.querySelector(trigger)
      if (target) {
        target.addEventListener('click', () => {
          state.set({ open: true, visible: true })
        })
      }
    }
  }
}

/** @private */
const useFromContext = () => ({ instance, api }) => {
  const resolve = api.state().useFromContext()
  return resolve({ instance })
}

/** @private */
const onOpen = () => function () {
  return Template.instance().state.get('open')
}

/**
 * The trigger component. Place any element with `type="button"` inside
 * which triggers the sheet on click.
 * @type object
 */
export const SheetTrigger = {
  name: 'SheetTrigger',
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
 * The sheet content area. Pleace your content here.
 * @type object
 * @property [side=right] {('left'|'right'|'top'|'bottom')} the default variants to place the sheet on the screen
 */
export const SheetContent = {
  name: 'SheetContent',
  class: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
      bottom:
        "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
      left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
      right:
        "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  },
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { get, extract } = api.styles()
    const { className, options, ...rest } = extract(SheetContent, props)
    const scrollable = state.scroll && 'max-h-full overflow-y-scroll'
    return {
      role: 'sheet',
      'data-state': state.visible ? 'open' : 'closed',
      'aria-describedby': `${state.uid}-description`,
      'aria-labelledby': `${state.uid}-title`,
      style: 'pointer-events: auto;',
      class: get({
        ctx: SheetContent,
        options, scrollable,
        classNames: [scrollable, className]
      })
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
 * An optional styles header
 * @type object
 */
export const SheetHeader = {
  name: 'SheetHeader',
  class: 'flex flex-col space-y-2 text-center sm:text-left',
  state: useFromContext(),
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled footer
 * @type object
 */
export const SheetFooter = {
  name: 'SheetFooter',
  class: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
  state: useFromContext(),
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled title
 * @type object
 */
export const SheetTitle = {
  name: 'SheetTitle',
  class: 'text-lg font-semibold text-foreground',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      id: `${state.uid}-title`,
      class: merge(SheetTitle.class, props.class)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

/**
 * An optional styled description
 * @type object
 */
export const SheetDescription = {
  name: 'SheetDescription',
  class: 'text-sm text-muted-foreground',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      id: `${state.uid}-description`,
      class: merge(SheetDescription.class, props.class)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  }
}

export const SheetClose = {
  name: 'SheetClose',
  class: 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const clickable = 'cursor-pointer'
    return {
      type: 'button',
      class: merge(!props.asChild && SheetClose.class, clickable, props.class)
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

export const SheetOverlay = {
  name: 'SheetOverlay',
  class: 'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-1000',
  state: useFromContext(),
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    return {
      role: 'sheet-overlay',
      'data-state': state.visible ? 'open' : 'closed',
      'data-aria-hidden': !state.visible,
      'aria-hidden': !state.visible,
      style: 'pointer-events: auto;',
      class: merge(SheetOverlay.class, props.class)
    }
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  },
  helpers: {
    open: onOpen()
  },
  events: {
    'click [role="sheet-overlay"]' (e, t) {
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