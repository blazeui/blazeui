import './Card.html'

/**
 * Components to build different types of cards.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Card
 */

/**
 * @type object
 */
export const Card = {
  name: 'Card',
  main: true,
  class: 'rounded-lg border bg-card text-card-foreground shadow-sm'
}

/**
 * @type object
 */
export const CardHeader = {
  name: 'CardHeader',
  class: 'flex flex-col space-y-1.5 p-6'
}

/**
 * @type object
 */
export const CardTitle = {
  name: 'CardTitle',
  class: 'text-2xl font-semibold leading-none tracking-tight'
}

/**
 * @type object
 */
export const CardDescription = {
  name: 'CardDescription',
  class: 'text-sm text-muted-foreground'
}

/**
 * @type object
 */
export const CardContent = {
  name: 'CardContent',
  class: 'p-6 pt-0'
}

/**
 * @type object
 */
export const CardFooter = {
  name: 'CardFooter',
  class: 'flex items-center p-6 pt-0'
}
