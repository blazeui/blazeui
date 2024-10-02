import { ReactiveVar } from 'meteor/reactive-var'
import { Template } from 'meteor/templating'
import { BlazeUI } from '../BlazeUI'
import { Styles } from './Styles'
import { isFunction } from '../utils/types'
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
 * @type {Map<string, function>}
 */
const attributesResolverRegistry = new Map()

/**
 * Stores the attributes object (a {ReactiveVar}) for a given Template instance object.
 * @type {WeakMap<Blaze.TemplateInstance, { attributes: ReactiveVar, state: ReactiveDict}>}
 * @private
 */
const instanceAttributesRegistry = new WeakMap()

/**
 * Wraps a Template lifecycle function
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

  const { resolver } = getResolverBy(instance)
  const stateFacade = state ?? { all: () => {} }
  instance.autorun(() => {
    const data = Template.currentData() ?? {}
    const stateVars = stateFacade.all() ?? {}
    const resolvedAttributes = resolver({
      props: data ?? {},
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
 * Cleanup fn to be run when the instance is destroyed.
 * You usually don't need to run this manually,
 * because instances are automatically registered for this
 * method.
 * @param instance {Blaze.TemplateInstance}
 */
Attributes.destroy = ({ instance }) => {
  instanceAttributesRegistry.delete(instance)
}

const getResolverBy = (instance) => {
  const name = instance?.view?.name?.replace('Template.', '')
  if (!name) throw new Error(`Instance has no name: ${instance}`)

  const resolver = attributesResolverRegistry.get(name)
  if (!resolver) throw new Error(`Attributes resolver not registered for: ${name}`)

  return { name, resolver }
}

export const defaultAttributes = (ctx) => {
  return ctx.variants
    ? variantAttributes(ctx)
    : plainAttributes(ctx)
}

/**
 * Components without variants have a simple, plain class structure.
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
