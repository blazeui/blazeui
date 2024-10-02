/**
 * @module
 */

/**
 * Converts an arbitrary instance into a plain object
 * that can be persisted.
 * Common use is to make Error instances
 * storable in ReactiveDict etc.
 * @function
 * @param any {any}
 * @return {object}
 */
export const toObject = any => {
  const out = {}
  const props = Object.getOwnPropertyNames(any)
  props.forEach(name => {
    out[name] = props[name]
  })
  return out
}
