import './Headline.html'

/**
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Headline
 */

/**
 * H1 component
 * @type object
 */
export const Headline1 = {
  name: 'Headline1',
  class: 'scroll-m-20 font-medium tracking-tight text-3xl ',
}

/**
 * H2 component
 * @type object
 */
export const Headline2 = {
  name: 'Headline2',
  class: 'font-heading scroll-m-20 text-2xl font-medium tracking-tight first:mt-0'
}

/**
 * H3 component
 * @type object
 */
export const Headline3 = {
  name: 'Headline3',
  class: 'font-heading scroll-m-20 text-xl font-medium tracking-tight first:mt-0'
}

/**
 * H4 component
 * @type object
 */
export const Headline4 = {
  name: 'Headline4',
  class: 'font-heading text-lg font-medium'
}

/**
 * H5 component
 * @type object
 */
export const Headline5 = {
  name: 'Headline5',
  class: 'font-heading text-base font-medium'
}

/**
 * H6 component
 * @type object
 */
export const Headline6 = {
  name: 'Headline6',
  class: 'font-heading text-sm font-medium'
}

/**
 * Headline base component, that dynamically renders
 * a headline, based on given level (1-6)
 * @type object
 * @property level {(1|2|3|4|5|6)} the size of the headline
 */
export const Headline = {
  name: 'Headline',
  main: true,
  helpers: {
    ctxTemplate () {
      const instance = Template.instance()
      const level = instance?.data?.level ?? 1
      return `Headline${level}`
    },
    ctxData () {
      return Template.instance().data
    }
  }
}
