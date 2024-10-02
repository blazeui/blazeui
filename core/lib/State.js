import {Template} from 'meteor/templating'

/**
 * Hassle-free shared state between parent and children.
 * Helps to prevent "prop-drilling".
 * The parent needs to pass `context=balzeui_context` to the child
 * in `Template.contentBlock`, while
 * children need to use state from this context, instead of
 * creating a new ReactiveDict.
 * Children can then read/write to the state.
 */
export const State = {}

/**
 * You can use this to manually create and share context
 * but usually you just need the `blazeui_context` helper.
 */
State.createContext = () => function ({ instance } = {}) {
  const current = instance ?? Template.instance()
  return {
    root: current,
    state: current.state
  }
}

/**
 *
 */
State.useFromContext = () => ({ instance }) => {
  const parentData = Template.parentData()
  const currentData = Template.currentData()

  let state
  if (parentData?.context?.state) {
    state = parentData.context.state
  }

  if (currentData?.context?.state) {
    state = currentData.context.state
  }

  if (!state) {
    throw new Error(`${instance.view.name}: No context provided to resolve state.`)
  }

  instance.state = state
  return state
}


Template.registerHelper('blazeui_context', function () {
  const instance = Template.instance()
  const ctxFn = State.createContext()
  return ctxFn({ instance })
})
