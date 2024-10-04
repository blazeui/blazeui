import { ReactiveVar } from 'meteor/reactive-var'
import { Template } from 'meteor/templating'
import { BlazeUI } from '../BlazeUI'
import { Styles } from './Styles'
import { isFunction, isBoolean } from '../utils/types'
import { isCompatibleAttribute } from '../utils/isCompatibleAttribute'

/**
 * Global attributes resolution handler.
 * Hooks into a Template instance's lifecycle using
 * `onCreated` to register a reactive var that holds all element attributes.
 * Hooks into `onDestroyed` to dispose automatically.
 * Usually you don't have to manage this on your own.
 * 
 * @namespace
 */
export const Attributes = {}

/**
 * Registers a global attributes-resolver function for a
 * given {UIComponent.name}.
 * @private
 * @type {Map<string, function>}
 */
const attributesResolverRegistry = new Map()

/**
 * Registers global property ignore lists.
 * @type {Map<any, any>}
 */
const attributesIgnoreLists = new Map()

/**
 * Stores the attributes object (a {ReactiveVar}) for a given Template instance object.
 * @type {WeakMap<Blaze.TemplateInstance, { attributes: ReactiveVar, state: ReactiveDict}>}
 * @private
 */
const instanceAttributesRegistry = new WeakMap()

/**
 * Wraps a Template lifecycle function
 * @private
 * @param lifecycleFn {function} one of the three major lifecycle functions of a Blaze.Template (`onCreated`, `onRendered`, `onDestroyed`).
 * @param stateFactory {function?} optional function that is called to create/attach a ReactiveDict as state for this instance 
 * @param onAfterCallback {function?} optional function to execute after the lifecycle function was called
 * @return {function():void}
 * @see https://www.blazejs.org/api/templates
 */
const onInstanceLifecycleFunction = ({ lifecycleFn, stateFactory, onAfterCallback }) => function () {
  const instance = this
  const state = instance.state ?? (typeof stateFactory === 'function'
    ? stateFactory({ instance, api: BlazeUI })
    : undefined)
  lifecycleFn?.call(this, { instance, state })
  onAfterCallback?.({ instance, state })
}

/**
 * Registers a given component for attribute resolving
 * @param component {UIComponent}
 */
Attributes.register = (component) => {
  const { name, attributes, state, onCreated, onDestroyed, onRendered, events, helpers } = component
  const resolver = isFunction(attributes)
    ? attributes
    : defaultAttributes(component)

  attributesResolverRegistry.set(name, resolver)

  const template = Template[name]
  template.onCreated(onInstanceLifecycleFunction({
    lifecycleFn: onCreated,
    onAfterCallback: Attributes.create,
    stateFactory: state
  }))
  template.onDestroyed(onInstanceLifecycleFunction({
    lifecycleFn: onDestroyed,
    onAfterCallback: Attributes.destroy
  }))

  if (onRendered) {
    template.onRendered(onInstanceLifecycleFunction({
      lifecycleFn: onRendered
    }))
  }
  if (events) {
    template.events(events)
  }
  if (helpers) {
    template.helpers(helpers)
  }
}

/**
 * Creates a new observer for attribute and state changes
 * for a given instance and updates attributes accordingly.
 * You usually don't need to run this manually,
 * because instances are automatically registered for this
 * method.
 * @param instance {Blaze.TemplateInstance}
 * @param state {ReactiveDict}
 */
Attributes.create = ({ instance, state }) => {
  const attributes = new ReactiveVar({})
  instanceAttributesRegistry.set(instance, { attributes, state })

  const { resolver, filter } = getResolverBy(instance)
  const stateFacade = state ?? { all: () => {} }
  instance.autorun(() => {
    const data = Template.currentData() ?? {}
    const cleanData = filter(data)
    const stateVars = stateFacade.all() ?? {}
    const resolvedAttributes = resolver({
      props: cleanData ?? {},
      state: stateVars ?? {},
      api: BlazeUI,
      instance
    })

    if (resolvedAttributes === null) {
      attributes.clear()
    }
    else if (typeof resolvedAttributes !== 'undefined') {
      attributes.set(resolvedAttributes)
    }
  })
}

/**
 * Registers a list of props to filter out, before passing them
 * on to the resolver function.
 * This is esepcially useful, if you use tools that inject
 * data on a global level into templates.
 * @param name {string|null} name of the component, needs to be registered. Set to null for global filter.
 * @param fn {function|null} function to filter props by name, array filter callback: `name => Boolean`
 * @example
 * // ignore all attributes from FlowRouter
 * BlazeUI.attributes().filter({ name: null, fn: n => n !== 'params' && n !== 'queryParams' })
 */
Attributes.filter = ({ name, fn }) => {
  const key = name === null ? '__global__' : name
  const del = fn === null

  if (del) {
    attributesIgnoreLists.delete(key)
  }
  else {
    attributesIgnoreLists.set(key, fn)
  }
  console.debug(attributesIgnoreLists)
}

/**
 * Cleanup fn to be run when the instance is destroyed.
 * You usually don't need to run this manually,
 * because instances are automatically registered for this
 * method.
 * @param instance {Blaze.TemplateInstance}
 */
Attributes.destroy = ({ instance }) => {
  instanceAttributesRegistry.delete(instance)
}

/**
 * Finds the registered attributes resolver function by a given template
 * @private
 * @param instance {Blaze.TemplateInstance}
 * @return {{resolver: Function, name: *}}
 */
const getResolverBy = (instance) => {
  const name = instance?.view?.name?.replace('Template.', '')
  if (!name) throw new Error(`Instance has no name: ${instance}`)

  const resolver = attributesResolverRegistry.get(name)
  if (!resolver) throw new Error(`Attributes resolver not registered for: ${name}`)

  const globalFilter = attributesIgnoreLists.get('__global__') ?? (() => {})
  const localFilter = attributesIgnoreLists.get(name) ?? (() => {})

  // filter ruleset is hierarchichal:
  // Component-scoped (local) has highest prio
  // Then global filters
  // If none exist, props are allowed by default
  const byRules = name => {
    const localValue = localFilter(name)
    if (isBoolean(localValue)) { return localValue }
    const globalValue = globalFilter(name)
    if (isBoolean(globalValue)) { return globalValue }
    return true
  }
  const filter = props => {
    if (!props) return props
    const copy = {}
    Object.keys(props).filter(byRules).forEach(key => {
      copy[key] = props[key]
    })
    return copy
  }
  return { name, resolver, filter }
}


/**
 * @private
 * @param ctx
 * @return {{(Object): Object, (Object): Object}}
 */
export const defaultAttributes = (ctx) => {
  return ctx.variants
    ? variantAttributes(ctx)
    : plainAttributes(ctx)
}

/**
 * Components without variants have a simple, plain class structure.
 * @private
 * @param ctx {UIComponent}
 * @return {function(object):object}
 */
const plainAttributes = ctx => ({ props: { class: className, ...rest } }) => ({
  ...ctx.attributes,
  class: Styles.merge(ctx.class, className),
  ...compatibleAttributes(rest)
})

/**
 * Components with variants need to be aware, that
 * variants can be dynamically added or changed.
 * @private
 * @param ctx {UIComponent}
 * @return {function(object):object}
 */
const variantAttributes = ctx => ({ props }) => {
  const { options, className, rest } = Styles.extract(ctx, props)
  return {
    ...ctx.attributes,
    class: Styles.get({ ctx, options, classNames: [className] }),
    ...compatibleAttributes(rest)
  }
}

/**
 * Creates a copy of an object with properties, compatible
 * with a DOM elements' attributes.
 * Non-mutating.
 * @private
 * @param obj {object}
 * @return {object}
 */
export const compatibleAttributes = obj => {
  const tmp = {}
  Object.entries(obj).forEach(([key, value]) => {
    if (!isCompatibleAttribute(key, value)) return
    tmp[key] = String(value)
  })
  return tmp
}

/**
 * The implementation of the global `blazeui_atts` helper.
 * @function
 * @private
 * @return {object|undefined}
 */
export const blazeUIAtts = function () {
  const instance = Template.instance()
  const current = instanceAttributesRegistry.get(instance)
  if (current?.attributes) {
    return current?.attributes.get()
  }
}

/** @private */
Template.registerHelper('blazeui_atts', blazeUIAtts)
