import {Random} from 'meteor/random'
import {ReactiveDict} from 'meteor/reactive-dict'
import {Blaze} from 'meteor/blaze'
import {HTML} from 'meteor/htmljs'
import marked from 'marked'
import './Markdown.html'
import {
  Headline,
  Anchor,
  Code,
  Preformatted,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Checkbox,
  Label
} from 'meteor/blazeui:components'

/**
 * Uses the underlying Blaze tools to
 * retrieve the Markdown and render it into
 * raw html, which then is attached
 * to the dom, once rendered.
 *
 * Uses `marked` for parsing and rendering.
 * The component is very flexible in its configuration.
 * By default, it uses a custom BlazeUI Component
 * for most of the renderers.
 * This ensures the markdown renders the same
 * styles as the rest of your design system.
 *
 * Changing the component styles will therefore
 * affect the Markdown output as well.
 *
 * You can also override the renderers.
 *
 *
 * @module
 * @see https://blazeui.meteorapp.com/markdown
 */

/**
 * @type {object}
 * @property dependencies {function():Array} returns a list of all dependencies that are to be registered
 *   by BlazeUI.register in order to function properly
 * @property highlight  {function(code:string):object} replace with your custom highlight implementation
 * @property sanitize  {function(code:string):string} replace with your custom sanitizer implementation
 * @property config  {function(options:object):void} pass config options to `marked.use`
 * @property renderer  {object} contains renderer implementations for the given blocks/inline tokens
 */
export const Markdown = {
  name: 'Markdown',
  main: true,
  class: '',
  dependencies: () => [
    Markdown,
    Paragraph,
    Blockquote,
    UnorderedList,
    Headline,
    Anchor,
    Code,
    Preformatted,
    TableHeader,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    Checkbox,
    Label
  ],
  highlight: code => ({ transformed: false, code }),
  sanitize: code => {
    console.warn('Warning: no sanitizer registered, markdown may render malicious output!')
    return code
  },
  config: options => marked.use(options),
  state: ({ instance }) => {
    instance.state = new ReactiveDict({ uid: Random.id(8) })
    return instance.state
  },
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const { uid } = state
    return {
      'data-id': `markdown-${uid}`,
      class: merge(Markdown.class, props.class)
    }
  },
  onCreated: ({ instance }) => {
    instance.render = (input) => {
      const content = Blaze._toText(input, HTML.TEXTMODE.STRING)
      const parse = marked.parse(content)
      const pure = Markdown.sanitize(parse)
      const rendered = HTML.Raw(pure).value
      instance.state.set({ rendered })
    }

    instance.render(instance.view.templateContentBlock)

    instance.autorun(() => {
      const data = Template.currentData()
      data.source && instance.render(data.source)
    })
  },
  helpers: {
    rendered () {
      return Template.instance().state.get('rendered')
    }
  },
  renderer: {
    heading (options) {
      const { tokens, depth } = options
      const text = this.parser.parseInline(tokens)
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-')
      const anchor = Template.Anchor.constructView(() => text)
      const content = Blaze._TemplateWith({ href: `#${escapedText}` }, () => anchor)
      const classNames = ['first:mt-0 mb-2']
      if (depth > 1) {
        classNames.push('mt-6')
      }
      return toHtml(Template.Headline, content, { level: depth, class: classNames.join(' ') })
    },
    code (options) {
      const { text, lang } = options
      const multi = text.includes('\n')
      const processed = Markdown.highlight(text, lang)
      const code = Template.Code.constructView(function () {
        return processed.transformed
          ? Spacebars.makeRaw(processed.code)
          : processed.code
      })

      if (!multi) {
        return Blaze.toHTMLWithData(code, { class: 'my-2' })
      }

      return toHtml(Template.Preformatted, code, { class: 'my-2' })
    },
    codespan ({ text }) {
      return toHtml(Template.Code, text)
    },
    link (opions) {
      const { href, text, title } = opions
      return toHtml(Template.Anchor, text, { href, title })
    },
    table (options) {
      const { header, rows, align } = options
      const tHeader = Template.TableHeader.constructView(() => {
        return Template.TableRow.constructView(() => {
          return header.map((cell, index) => {
            const hCell = Template.TableHead.constructView(() => {
              return cell.text
            })

            let className = ''
            if (align[index]) {
              className = `text-${align[index]}`
            }

            return Blaze._TemplateWith({ class: className }, () => hCell)
          })
        })
      })
      const tBody = Template.TableBody.constructView(() => {
        return rows.map(row => Template.TableRow.constructView(() => {
          return row.map((cell, index) => {
            const bCell = Template.TableCell.constructView(() => {
              return cell.text
            })
            let className = ''
            if (align[index]) {
              className = `text-${align[index]}`
            }

            return Blaze._TemplateWith({ class: className }, () => bCell)
          })
        }))
      })
      return toHtml(Template.Table, [tHeader, tBody], { class: 'my-2' })
    },
    checkbox (options) {
      const { checked, text } = options
      const checkbox = Template.Checkbox.constructView()
      return toHtml(Template.Label, [Blaze._TemplateWith({ checked, class: 'me-2' }, () => checkbox), text])
    },
    blockquote (options) {
      const inline = Spacebars.makeRaw(this.parser.parse(options.tokens))
      return toHtml(Template.Blockquote, inline)
    },
    paragraph (options) {
      const inline = Spacebars.makeRaw(this.parser.parseInline(options.tokens))
      return toHtml(Template.Paragraph, inline)
    },
    list (options) {
      let inline = ''
      options.items.forEach(item => {
        inline += Markdown.renderer.listitem.call(this, item)
      })
      inline = Spacebars.makeRaw(inline)
      const classNames = []
      classNames.push(options.ordered
        ? 'list-decimal'
        : 'list-disc')

      return toHtml(Template.UnorderedList, inline, { class: classNames.join(' ') })
    },
    listitem (options) {
      const inline = options.task
        ? Markdown.renderer.checkbox.call(this, options)
        : this.parser.parse(options.tokens)
      return `<li>${inline}</li>`
    }
  }
}


marked.use({
  breaks: false,
  pedantic: false,
  gfm: true,
  renderer: Markdown.renderer
})

/**
 * Renders a given Template (for a given Component) into html.
 * @private
 * @param template {Blaze.Template}
 * @param content {any=} can be a scalar value, a Blaze.View etc.
 * @param data {object=} data (props) passed to the Template instance
 * @return {string} rendered html
 */
const toHtml = (template, content, data = {}) => {
  const view = template.constructView(content && (() => content))
  return Blaze.toHTMLWithData(view, data)
}

/**
 * Block-level paragraph.
 * @type {object}
 */
export const Paragraph = {
  name: 'Paragraph',
  class: ''
}

/**
 * Blockquote component.
 * @type {object}
 */
export const Blockquote = {
  name: 'Blockquote',
  class: 'p-2 border-l-2 text-foreground/80 my-2 border-primary'
}

/**
 * <ul> root element.
 * @type {object}
 */
export const UnorderedList = {
  name: 'UnorderedList',
  class: 'list-none my-2 list-outside ms-3'
}
