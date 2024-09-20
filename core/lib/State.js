export const State = {}

State.createContext = () => function () {
  const instance = Template.instance()
  return {
    root: instance,
    state: instance.state
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
