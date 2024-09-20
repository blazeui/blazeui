import { isFunction, isObject } from '../utils/types'

const { twMerge } = require('tailwind-merge')
const { clsx } = require('clsx')
const { cva } = require('class-variance-authority')

/**
 * Styles resolver system for BlazeUI.
 */
export const Styles = {}

/**
 * Generates proper classnames. Considers truthy, omits falsy values, merges all together.
 * @param inputs {...string}
 * @return {string}
 */
export const cn = function cn (...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Stores styles resolver for a given component
 * @private
 * @type {Map<string, function>}
 */
const registry = new Map()

/**
 * Re-/create a new style resolver for a given component.
 * @param component {UIComponent}
 */
Styles.create = (component) => {
  const { class: defaultClasses, variants, defaultVariants } = component
  if (!variants || !defaultVariants) {
    return
  }
  const variantAuthority = cva(defaultClasses, { variants, defaultVariants })
  registry.set(component.name, variantAuthority)
}

/**
 * Merges classnames, using cn tailwind-merge and clsx
 */
Styles.merge = cn

/**
 * Resolves classnames for the given Component context.
 * @param ctx {Component}
 * @param options
 * @param classNames
 * @return {*}
 */
Styles.get = ({ ctx, options, classNames }) => {
  if (!ctx) {
    return cn(...classNames)
  }
  // TODO add caching/memoization here to prevent constant recompute of
  //  merged styles while args may have not changed.
  //  This occurs a lot, when parents re-render.
  const variantAuthority = registry.get(ctx.name)
  return cn(variantAuthority(options), ...classNames)
}

/**
 * Extract attachable styles for a given component.
 * @param component {UIComponent}
 * @param data
 * @return {{rest: {}, options: {}, className}}
 */
Styles.extract = (component, data) => {
  const copy = { ...data }
  const { class: className } = copy
  const options = {}
  const rest = {}
  delete copy.class
  Object.entries(copy).forEach(([key, value]) => {
    if (isFunction(value) || !isObject(component.variants)) return

    const target = key in component.variants
      ? options
      : rest
    target[key] = value
  })
  return { className, options, rest }
}

/**
 * Transforms a styles object into a styles-string
 * @param obj
 * @return {string}
 */
Styles.flatten = (obj) => {
  let out = ''
  Object.entries(obj).forEach(([key, value]) => {
    out += `${key}: ${value};`
  })
  return out
}