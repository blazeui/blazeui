import './Progress.html'

/**
 * Animated progress bar with variants
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Progress
 */

/**
 * @type object
 * @property value {number} a number >= 0 and <= 100, indicating the progress in percent
 * @property variant {('default'|'secondary'|'destructive')} the default supported variants
 */
export const Progress = {
  name: 'Progress',
  main: true,
  class: 'relative h-4 w-full overflow-hidden rounded-full bg-accent',
  attributes: {
    role: 'progressbar',
    'data-max': '100'
  }
}

/**
 * Only internally used
 * @private
 */
export const ProgressIndicator = {
  name: 'ProgressIndicator',
  class: 'h-full w-full flex-1 transition-all',
  variants: {
    variant: {
      default: "bg-primary",
      destructive: "bg-destructive",
      secondary: 'bg-secondary',
    }
  },
  defaultVariants: {
    variant: "default"
  },
  attributes ({ props, api }) {
    const Styles = api.styles()
    const { className, options, ...rest } = Styles.extract(ProgressIndicator,props)
    const value = props.value
    return {
      'data-max': '100',
      class: Styles.get({
        ctx: ProgressIndicator,
        options,
        classNames: [className]
      }),
      style: `transform: translateX(-${100 - (value || 0)}%)`
      // ...rest
    }
  }
}
