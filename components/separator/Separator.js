import './Separator.html'

/**
 * A thin separator line
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Separator
 */

/**
 * @type object
 * @property [orientation='horizontal'] {('horizontal'|'vertical')} orientation of the separator
 * @property [decorative=] {boolean} optional semantic prop to indicate whether the separator is decorative (true) or
 *   actually separating content (false/undefined; default)
 */
export const Separator = {
  name: 'Separator',
  main: true,
  class: 'shrink-0 bg-border',
  attributes ({ props, api }) {
    const { class: className, orientation = 'horizontal', decorative, ...rest } = props
    const Styles = api.styles()
    const ariaOrientation = orientation === 'vertical'
      ? orientation
      : undefined;
    const semanticProps = decorative
      ? { role: 'none' }
      : { 'aria-orientation': ariaOrientation, role: 'separator' };
    return {
      'data-orientation': orientation,
      ...semanticProps,
      ...rest,
      class: Styles.merge(
        Separator.class,
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className)
    }
  }
}
