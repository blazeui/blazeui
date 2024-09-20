import { ReactiveDict } from 'meteor/reactive-dict'
import { BlazeUI } from 'meteor/blazeui:core'
import './Hello.html'

const Hello = {
  /**
   * Required, must exactly match the name of the Template!
   */
  name: 'Hello',

  /**
   * Optional, the base class that is always applied.
   * Can be overridden.
   */
  class: 'p-1 bg-primary text-primary-foreground transition-all ease-in-out',

  /**
   * Optional, a RactiveDict that can be used to manage internal
   * state. You can also use a custom reactive data source as long
   * as implements the methods of ReactiveDict (get, set, all etc.).
   */
  state: new ReactiveDict({ active: false }),

  /**
   * Optional function if you need to resolve attributes for the component
   * with awareness of the state.
   * Reactive: This method gets called, when props or state change.
   *
   * @param props {object} the object, returned by {Template.currentData()}
   * @param state {object|undefined} present, when {state} is defined on the component.
   * @param api {BlazeUI} the BlazeUI top-level api is always passed down to components.
   * @return {{role: string, class: string}}
   */
  attributes ({ props, state, api }) {
    const { class:className, ...rest } = props
    const { merge } = api.styles()
    const { active } = state

    return  {
      role: 'button',
      class: merge(
        Hello.class,
        active ? 'text-4xl' : 'text-xs',
        className
      ),
      ...rest
    }
  },
  /**
   * This is passed to the Template's `onCreated` method.
   * Note, that state is only passed, when being defined on this
   * component.
   * @param state {object?}
   */
  onCreated ({ state }) {
    const instance = this
    instance.state = state
  },
  helpers: {
    active() {
      return Template.instance().state.get('active')
    }
  },
  events: {
    'click div' (e, t) {
      // this results in 'attributes' being called right after
      t.state.set('active', !t.state.get('active'))
    }
  }
}

BlazeUI.register(Hello)