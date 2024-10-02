import './Details.html'

/**
 * Provides a collapsible panel with a title (summary) and details.
 * Uses summary/details standard tags under the hood.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Details
 */

/**
 * @type object
 * @property main {true} the root component for details components
 */
export const Details = {
  name: 'Details',
  main: true,
  class: 'border rounded-md group'
}

/**
 * The details summary is the title that is always visible
 * @type object
 * @property variant {('default'|'outline')} supported default variants
 * @property size {('default'|'sm'|'lg'|'icon')} supported default sizes
 */
export const DetailsSummary = {
  name: 'DetailsSummary',
  class: 'cursor-pointer flex items-center whitespace-nowrap rounded-md group-open:rounded-t-md group-open:rounded-b-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-out group-open:mb-1',
  variants: {
    variant: {
      outline:
        "border-input bg-background hover:bg-accent hover:text-accent-foreground",
      default: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}

/**
 * The trigger can hold a custom element that animates when opening / closing
 * @type object
 */
export const DetailsTrigger = {
  name: 'DetailsTrigger',
  class: 'transition ease-in-out duration-200 rotate-90 group-open:-rotate-90'
}

/**
 * Contains the actual content that can be revealed/hidden on demand.
 * @type object
 */
export const DetailsContent = {
  name: 'DetailsContent',
  class: 'p-4 leading-normal text-normal overflow-hidden text-sm '
}
