import './Input.html'

/**
 * A basic styled input component
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Label
 */

/**
 * @type object
 */
export const Input = {
  name: 'Input',
  attributes: {
    type: 'text'
  },
  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
}
