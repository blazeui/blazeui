# Meteor BlazeUI Markdown

This package allows to render given Markdown using BlazeUI components.
The result is an output that is 100% compatible to your TailwindCSS theme.

You can try it out in the [live demo](https://blazeui.meteorapp.com/markdown).

## Installation and usage

First, you need to add this package, 
then you need to install the npm dependencies `marked` and a DOM sanitizer of your choice
(tested with `dompurify`):

```shell
$ meteor add blazeui:markdown
$ meteor npm install --save marked dompurify
```

Once they're installed you need to register the respective components
and transformers:

```js
import { BlazeUI } from 'meteor/blazeui:core'
import { Markdown } from 'meteor/blazeui:markdown'
import DOMPurify from 'dompurify'

// register all dependencies as BlazeUI components,
// if not already done
BlazeUI.register(...Markdown.dependencies())

Markdown.sanitize = code => DOMPurify.sanitize(code)
```

> Note that you are not forced to use DOMPurify but any sanitation library that suits your needs.

Finally you can render Markdown either by passing the source as attribute (reactive) 
or as contentblock (non-reactive).

### Render from attribute (reactive)

Consider the following tag:

```handlebars
{{> Markdown source=mdSource}}
```

For this to reactively render markdown, you need a reactive data source and pass the markdown
to it:

```js
Template.myTemplate.onCreated(function () {
  const instance = this
  instance.md = new ReactiveVar(`# Fetching Markdown...`)
})

Template.myTemplate.onRendered(function () {
  const instance = this
  
  // fetches a Markdown file from a given location and sets it as 
  // reactive source for our markdown renderer
  fetch('https://raw.githubusercontent.com/blazeui/blazeui/refs/heads/main/core/README.md')
    .then(response => instance.md.set(response.text()))
    .catch(e => instance.md.set(`# Error fetching from source
${e.message}
${e.stack}
`))
})

Template.myTemplate.helpers({
  mdSource () {
    return Template.instance().md.get()
  }
})
```

### Render as content block (non-reactive)

You can also write your entire content Blog-style using the Markdown in contentblock:

```handlebars
{{#Markdown}}
# Markdown

BlazeUI provides a full-scale Markdown rendering component, which you can install via
`meteor add blazeui:markdown`.
It's different from other Markdown renderers in the way, that it uses BlazeUI components
to render tokens, instead of plain HTML. As a result, your Markdown-rendered output looks exactly the same
as if you'd manually write markup using BlazeUI components.

> In fact, this entire section is written using this Markdown component.
{{/Markdown}}
```

This enables to write new content blazingly fast.

## Advanced topics

While this library comes with great defaults, it is very flexible
to suit more specific needs.

### Add code highlighting

By default, no code highlight is applied to your code segments.
However, you can register a highlighter that does the job.
Let's take a look at an example that uses Prims JS:

```js
import 'path/to/prism'
import 'path/to/prism.css'

Markdown.highlight = (code, lang) => {
  const isSupported = lang && Prism.languages[lang]
  return {
    transformed: isSupported,
    code: isSupported
      ? Prism.highlight(code, Prism.languages[lang], lang)
      : code
  }
}
```

The return value of the highlighter always has to be

```js
{
  transformed: Boolean, 
  code: String
}
```

### Customize Markdown behaviour

Under the hood this package uses `marked` as Markdown engine.
The current default settings are

| attribute                   | value              |
|-----------------------------|--------------------|
| breaks                      | false              |
| pedantic                    | false              |
| gfm                         | true               |
| renderer|  Markdown.renderer |

You can change / update these configs by passing respective MarkedJS options
to `Markdown.config`.


#### Override internal

You can also override rendering output (destructive) to use raw HTML:

```js
const renderLink = function (options) {
  const { href, text, title } = opions
  return `<a href="${href}" target="_blank" title="${title}">${text}</a>`
}

Markdown.render.link = renderLink
```

The change will only apply, if you update this via `Markdown.config({ renderer: Markdown.renderer })`.


#### Override via external

A non-destructive override would be instead:

```js
Markdown.config({
  renderer: {
    link: renderLink
  }
})
```

This config could then be reset via `Markdown.config({ renderer: Markdown.renderer })`.

## License

This package is MIT licensed, see [LICENSE file](./LICENSE).
