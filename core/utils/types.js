/**
 * @module
 */

/**
 * Simple check to determine if something is a function.
 * Does not cover if function is sync or async.
 * @function
 * @param f {any}
 * @return {boolean}
 */
export const isFunction = f => typeof f === 'function'

/**
 * @function
 * @param o
 * @return {boolean}
 */
export const isObject = o => typeof o === 'object'

/**
 * @function
 * @param b
 * @return {boolean}
 */
export const isBoolean = b => typeof b === 'boolean'
