import { ReactiveDict } from 'meteor/reactive-dict'
import { check, Match } from 'meteor/check'

const MaybeOneOf = (...args) => Match.Maybe(Match.OneOf(...args))

/**
 * The description object of a UIComponent that is
 * related to a Blaze Template with the same name.
 *
 * @typedef {object} Component
 * @property {string} name - the name of the Template, must be strictly equal to the Template's name
 * @property {string} class - the (static) base classes of the component
 * @property {function():ReactiveDict} state - optional state factory
 * @property {object|function|undefined} attributes - define default attributes that always have to exist,
 *  for example role="button" or type="submit". Can be overridden at runtime. If you provide a function you
 *  can precisely control how attributes are resolved and attached to the component.
 *  Leave undefined if no variants and no default attributes are used.
 * @property {object|function|undefined} variants -  a dictionary for variants and their respective values.
 *  see the npm package `class-variant-authority` for what this is and how this works.
 * @property {object|undefined} defaultVariants - a dictionary to defined default values for the given variants
 * @property {function|undefined} onCrated - optional Blaze Template lifecycle method
 * @property {function|undefined} onRendered - optional Blaze Template lifecycle method
 * @property {function|undefined} onDestroyed - optional Blaze Template lifecycle method
 * @property {object|function|undefined} helpers - optional Blaze Template lifecycle method argument
 * @property {object|function|undefined} events - optional Blaze Template lifecycle method argument
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