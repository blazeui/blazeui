import { isFunction, isObject } from './types'

/**
 * @module
 */

/**
 * Returns true, if a given key-value pair
 * qualifies for being added to DOM elements as their
 * attribute.
 * @function
 * @param key {string}
 * @param value {any}
 * @returns {boolean}
 */
export const isCompatibleAttribute = (key, value) =>
  !isFunction(value) &&
  !isObject(value) ||
  key !== 'context'
