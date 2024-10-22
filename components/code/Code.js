import './Code.html'

/**
 * Components to render formatted code segments.
 * Used either inline or as block.
 * @module
 */

/**
 * Use for block-level formatting of code or any other
 * whitespace-preserving texts.
 * @type object
 */
export const Preformatted = {
  name: 'Preformatted',
  class: 'whitespace-pre bg-muted text-foreground/80 p-2'
}

/**
 * Inline formatted code.
 * @type object
 */
export const Code = {
  name: 'Code',
  class: 'font-mono bg-muted text-foreground/80'
}
