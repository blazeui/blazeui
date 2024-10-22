import './Anchor.html'

/**
 * A lightweight link anchor that renders a hash (#) character on hover, if the href starts with a #.
 * @module
 * @see http://blazeui.meteorapp.com/components?c=Anchor
 */

/**
 * @property href {string} anchor value, such as `#foo`
 */
export const Anchor = {
  name: 'Anchor',
  main: true,
  class: 'no-underline hover:underline hover:decoration-2 hover:after:ml-1 after:!no-underline',
  attributes ({ props, api }) {
    const { merge } = api.styles()
    const local = props.href.startsWith('#')
    return {
      href: props.href,
      class: merge(
        Anchor.class,
        local && 'hover:after:content-[\'#\'] hover:after:text-muted'
      )
    }
  }
}
