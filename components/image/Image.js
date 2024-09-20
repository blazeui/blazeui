import { ReactiveDict } from 'meteor/reactive-dict'
import './Image.html'

export const Image = {
  name: 'Image',
  class: '',
  state: () => new ReactiveDict(),
  attributes ({ props, state, api, instance }) {
    const { merge } = api.styles()
    const { src, ...rest } = props
    const attributes = { ...rest }

    if (!state.loaded) {
      attributes.onerror = (e) => {
        instance.state.set({ error: e ? api.toObject(e) : true })
      }
    }

    attributes.class = merge(Image.class, props.class)

    // make src the last prop, because
    // some browsers need others attributes
    // (such as loaded='lazy')
    // being processed BEFORE this one
    attributes.src = src
    return attributes
  },
  onCreated: function ({ instance, state }) {
    instance.state = state
  },
  onRendered: function ({ instance }) {
    const $img = instance.$('img')
    const image = $img.get(0)
    image.onload = () => {
      const loaded = image.complete && image.naturalWidth !== 0
      instance.state.set({ loaded })
    }
  }
}
