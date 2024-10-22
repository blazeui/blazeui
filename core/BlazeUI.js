import { Styles } from './lib/Styles'
import { Attributes } from './lib/Attributes'
import { Theme } from './lib/Theme'
import { State } from './lib/State'
import { UIComponent } from './lib/UIComponent'
import * as types from './utils/types'
import { toObject } from './utils/toObject'

/**
 * A UI component system for Meteor-Blaze and TailwindCSS.
 * Register and extend Tailwind-based UI Components in Blaze.
 *
 * This object can also be accessed inside methods, such as
 * `attributes`, where it is passed as `api` parameter.
 *
 * @example
 * &lt;template name="Hoverable"&gt;
 *   &lt;div {{blazeui_atts}}&gt;
 *     {{&gt; Template.contentBlock}}
 *   &lt;/div&gt;
 * &lt;/template&gt;
 *
 *
 * @example
 * import { BlazeUI } from 'meteor/blazeui:core'
 * import './Hoverable.html'
 *
 * BlazeUI.register({
 *   name: 'Hoverable',
 *   class: 'bg-transparent hover:bg-primary text-foreground hover:text-primary-foreground'
 * })
 *
 * @namespace
 */
export const BlazeUI = {}

/**
 * Registers one or many new {Component} definitions.
 * @param values {UIComponent[]}
 */
BlazeUI.register = (...values) => values.map(register)

/**
 * @private
 * @param ctx {UIComponent}
 * @return {UIComponent}
 */
const register = (ctx) => {
  const component = new UIComponent(ctx)
  Attributes.register(component)
  Styles.create(component)
  return component
}

/**
 * Add/update variants of a given UIComponent context.
 * @param ctx {UIComponent}
 * @param type {string}
 * @param values {object=}
 * @param defaultValue {string=}
 */
BlazeUI.variants = ({ ctx, type, values, default: defaultValue }) => {
  if (values && ctx.variants) {
    // add a new category to existing variant
    if (type in ctx.variants) {
      const target = ctx.variants[type]
      Object.assign(target, values)
      Styles.create(ctx)
    }
    // add a whole new variant category
    else {
      ctx.variants[type] = values
    }
  }

  // optionally set the default for the given variant
  if (defaultValue) {
    ctx.defaultVariants[type] = defaultValue
  }
}

/**
 * Returns the global Attributes resolver implementation
 * @return {Attributes}
 */
BlazeUI.attributes = () => Attributes

/**
 * Returns the global Styles resolver implementation
 * @return {Styles}
 */
BlazeUI.styles = () => Styles

/**
 * Returns the global Theme resolver implementation
 * @return {Theme}
 */
BlazeUI.theme = () => Theme

/**
 * Returns the global shared-State resolver implementation
 * @return {State}
 */
BlazeUI.state = () => State

Object.assign(BlazeUI, types, { toObject })
