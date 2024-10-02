import { ReactiveDict } from 'meteor/reactive-dict'
import { check, Match } from 'meteor/check'

const MaybeOneOf = (...args) => Match.Maybe(Match.OneOf(...args))

/**
 * The interface of a BlazeUI component that is
 * related to a Blaze Template with the same name.
 *
 * You will not instantiate this at any time, however
 * BlazeUI will call its constructur, to ensure
 * the interface using check/match as its underlying implementation.
 *
 * Your component can, of course, contain any attitional properties
 * that are not defined in this interface.
 *
 * @interface
 * @typedef {object} UIComponent
 * @property {string} name - the name of the Template, must be strictly equal to the Template's name
 * @property {string} class - the (static) base classes of the component
 * @property {boolean=} main - if set to true, this component is considered a root component in higher order
 *   components and usually has no own style or attributes but may provide context and logic.
 *   This is a conventional flag and is not required at all.
 * @property {(function():ReactiveDict)=} state - optional state factory
 * @property {(object|function)=} attributes - Define which attributes are to be added to the DOM element
 * that called `{{blazeui_atts}}`
 *  - If you provide an object, you can define default attributes that always have to exist,
 *  for example `role="button"` or `type="submit"`. Can be overridden at runtime.
 *  - If you provide a function you can precisely control how attributes are resolved and attached to the component.
 *  Leave undefined if no variants and no default attributes are used.
 * @property {(object|function)=} variants -  a dictionary for variants and their respective values.
 *  see the npm package `class-variance-authority` for what this is and how this works.
 * @property {object=} defaultVariants - a dictionary to defined default values for the given variants
 * @property {function=} onCrated - optional Blaze Template lifecycle method
 * @property {function=} onRendered - optional Blaze Template lifecycle method
 * @property {function=} onDestroyed - optional Blaze Template lifecycle method
 * @property {(object|function)=} helpers - optional Blaze Template lifecycle method argument
 * @property {(object|function)=} events - optional Blaze Template lifecycle method argument
 * @see https://github.com/joe-bell/cva
 * @see https://www.blazejs.org/api/templates
 *
 * @namespace
 */
export class UIComponent {
  constructor (options) {
    check(options, Match.ObjectIncluding({
      name: String,
      class: Match.Maybe(String),
      state: Match.Maybe(Function),
      attributes: MaybeOneOf(Object, Function),
      variants: MaybeOneOf(Object, Function),
      defaultVariants: MaybeOneOf(Object, Function),
      onCreated: Match.Maybe(Function),
      onRendered: Match.Maybe(Function),
      onDestroyed: Match.Maybe(Function),
      helpers: MaybeOneOf(Object, Function),
      events: MaybeOneOf(Object, Function)
    }))

    this.name = options.name
    this.class = options.class
    this.state = options.state
    this.attributes = options.attributes
    this.variants = options.variants
    this.defaultVariants = options.defaultVariants
    this.onCreated = options.onCreated
    this.onRendered = options.onRendered
    this.onDestroyed = options.onDestroyed
    this.helpers = options.helpers
    this.events = options.events
  }
}