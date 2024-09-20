import { Styles } from './lib/Styles'
import { Attributes } from './lib/Attributes'
import { Theme } from './lib/Theme'
import { State } from './lib/State'
import { UIComponent } from './lib/UIComponent'
import * as types from './utils/types'
import { toObject } from './utils/toObject'

/**
 * Register and extend Tailwind-based UI Components in Blaze.
 */
export const BlazeUI = {}

/**
 * Registers one or many new {Component} definitions.
 * @param values {object[]}
 */
BlazeUI.register = (...values) => values.map(register)

/**
 * @private
 * @param ctx
 * @return UIComponent
 */
const register = ctx => {
  const component = new UIComponent(ctx)
  Attributes.register(component)
  Styles.create(component)
  return component
}

/**
 * Add/update variants of a given Component context
 * @param ctx {Component}
 * @param type {string}
 * @param values {object|undefined}
 * @param defaultValue {string|undefined}
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

BlazeUI.attributes = () => Attributes
BlazeUI.styles = () => Styles
BlazeUI.theme = () => Theme
BlazeUI.state = () => State

Object.assign(BlazeUI, types, { toObject })
