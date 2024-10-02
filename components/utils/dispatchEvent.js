/**
 * @module utils
 */

/**
 * Simple wrapper to easily dispatch custom events with data.
 * @function
 * @param target {EventTarget} element on which behalf the event will be dispatched
 * @param name {string} name of the event
 * @param data {object} any data that is to be passed with the event
 * @param bubbles {boolean}
 * @param cancelable {boolean}
 * @param composed {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
export const dispatchEvent = ({ target, name, data, bubbles, cancelable, composed }) => {
  setTimeout(() => {
    target.dispatchEvent( new CustomEvent(name, {
      bubbles,
      cancelable,
      composed,
      detail: data
    }))
  }, 0)
}
