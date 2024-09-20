import './AspectRatio.html'
import { BlazeUI } from 'meteor/blazeui:core'

const Styles = BlazeUI.styles()

export const AspectRatio = {
  name: 'AspectRatio',
  class: 'w-full relative',
  attributes ({ props, api }) {
    const Styles = api.styles()
    const { class: className, ratio = '1/1', ...rest } = props
    const [w, h] = ratio.replace(/\s+/g, '').split('/')
    const numRatio = Number(w) / Number(h)
    const paddingBottom = 100 / numRatio
    return {
      class: Styles.merge(AspectRatio.class, className),
      style: `padding-bottom: ${paddingBottom}%`,
      'data-aspect-ratio-wrapper': '',
      ...rest
    }
  }
}