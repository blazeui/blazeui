import './Separator.html'

export const Separator = {
  name: 'Separator',
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
