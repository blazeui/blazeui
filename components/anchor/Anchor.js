import './Anchor.html'

/**
 * A lightweight link anchor that renders a hash (#) character on hover.
 * Use this for document-internal links.
 * @module
 * @see http://blazeui.meteorapp.com/components?c=Anchor
 */

/**

 * @property href {string} anchor value, such as `#foo`
 */
export const Anchor = {
  name: 'Anchor',
  main: true,
  class: 'no-underline hover:underline hover:decoration-2 hover:after:ml-1 after:!no-underline hover:after:content-[\'#\'] hover:after:text-muted-foreground',
  attributes: {
    href: ''
  }
}
