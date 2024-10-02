import './AspectRatio.html'

/**
 * A simple wrapper for images and other visual elements
 * that enforces the given aspect ratio.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=AspectRatio
 * */

/**
 * @type object
 * @property [ratio='1/1'] {string} the ratio in the form `width/height`, default is `1/1`.
 */
export const AspectRatio = {
  name: 'AspectRatio',
  main: true,
  class: 'w-full relative',
  attributes ({ props, api }) {
    const Styles = api.styles()
    const { class: className, ratio = '1/1', ...rest } = props
    const [w, h] = ratio.replace(/\s+/g, '').split('/')
    const numRatio = Number(w) / Number(h)
    const paddingBottom = 100 / numRatio
    return {
      class: Styles.merge(AspectRatio.class, className),
      style: `padding-bottom: ${paddingBottom}%`,
      'data-aspect-ratio-wrapper': '',
      ...rest
    }
  }
}