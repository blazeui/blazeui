import {Template} from 'meteor/templating'

export const State = {}

State.createContext = () => function ({ instance } = {}) {
  const current = instance ?? Template.instance()
  return {
    root: current,
    state: current.state
  }
}

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
