<div class="center">

![blazeui logo](./blazeui_wide.svg)

# BlazeUI - Tailwind components for Meteor Blaze
🔥 UI components for Meteor-Blaze and TailwindCSS 🔥


[core docs](./docs/api/core) | [components docs](./docs/api/components)

</div>

## About

This project is partially inspired by shacdn, radix-ui and headless ui and brings
a set of opinionated, yet flexibly changeable UI components on the table.

- 🔥 awesome UI components out of the box
- 🔥 simple to get started
- 🔥 supports variants; allows for custom variants
- 🔥 performant reactive attribute compilation
- 🔥 register your own components
- 🔥 builtin light/dark theme support

> BlazeUI is not related to https://www.blazeui.com/

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Getting started](#getting-started)
  - [1. Add the package:](#1-add-the-package)
  - [2. Install tailwind and a few other little helpers:](#2-install-tailwind-and-a-few-other-little-helpers)
  - [3. Create config files](#3-create-config-files)
  - [4. Import the library in your client code](#4-import-the-library-in-your-client-code)
  - [5. Import the theme CSS](#5-import-the-theme-css)
- [Usage](#usage)
  - [Define custom variants](#define-custom-variants)
  - [Register custom components](#register-custom-components)
    - [1. Create a template](#1-create-a-template)
- [Customizations](#customizations)
  - [Create custom components](#create-custom-components)
  - [Override components' default classes](#override-components-default-classes)
  - [Share state between components](#share-state-between-components)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<small>generated with [DocToc](https://github.com/thlorenz/doctoc)</small>

## Getting started

### 1. Add the package:

```shellhttps://www.blazeui.com/
$ meteor add blazeui:components
```

### 2. Install tailwind and a few other little helpers:

```shell
$ meteor npm install --save \
    tailwindcss \
    autoprefixer \
    postcss \
    postcss-load-config \
    class-variance-authority \
    tailwindcss-animate \
    clsx \
    tailwind-merge \
    @blazeui/theme-milkyway
```

This looks like a lot, so let's see what these packages are for:

- tailwindcss - the tailwind library
- autoprefixer - required to 
- postcss - required to drop non-necessary css
- postcss-load-config - required to load config from tailwind config
- class-variance-authority - resolve variations of component styles
- tailwindcss-animate - more animation tools for tailwind
- clsx - assign classes with truthy/falsy values
- tailwind-merge - deduplicate class names for components
- @blazeui/theme-milkyway - the default blazeui theme

### 3. Create config files

You need to provide a `tailwind.config.js` config file for your project.

As a staring point, you can use the config from the Milkyway theme:

<details>
<summary>Expand to view the `tailwind.config.js`</summary>

```js
const { fontFamily } = require("tailwindcss/defaultTheme")
const milkyway = require("@blazeui/theme-milkyway")

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...milkyway,
  content: [
    "./imports/ui/**/*.{js,jsx,ts,tsx,html}",
    './client/*.{js,html}',
    '.meteor/local/build/programs/web*/**/*.js',
    './node_modules/@fortawesome/fontawesome-free/css/all.css',
  ]
}
```

</details>


Next, you need a `postcss.config.js` config file. You can use this as a starter:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  excludedMeteorPackages: []
}
```

### 4. Import the library in your client code

For static import of all components, use:

```js
import 'meteor/blazeui:components/all'
```

this will instantly make all components available but
also increases the bundle size.

If you need to be careful about bundle size, you may use
the dynamic import way:

```js
const { BlazeUI } = await import('meteor/jkuester:blazeui/core/BlazeUI.js')
const { Badge } = await import('meteor/jkuester:blazeui/components/badge/Badge.js')

BlazeUI.register(Badge)
```

### 5. Import the theme CSS

BlazeUI provides a default theme, which you can
import in `client/main.js` via

```js
import '@blazeui/theme-milkyway/milkyway.css'
```

This theme is zero config and looks great out of the box.

You also can also override the root variables
To do so, open your `client/main.css` (or .scss) file and provide
the root variables for the variants of the components:

<details>
<summary>Expand to view the main css file</summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222.2 47.4% 11.2%;

        --muted: 210 40% 96.1%;
        --muted-foreground: 215.4 16.3% 46.9%;

        --popover: 0 0% 100%;
        --popover-foreground: 222.2 47.4% 11.2%;

        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%;

        --card: 0 0% 100%;
        --card-foreground: 222.2 47.4% 11.2%;

        --primary: 222.2 47.4% 11.2%;
        --primary-foreground: 210 40% 98%;

        --secondary: 210 40% 96.1%;
        --secondary-foreground: 222.2 47.4% 11.2%;

        --accent: 210 40% 96.1%;
        --accent-foreground: 222.2 47.4% 11.2%;

        --destructive: 0 100% 50%;
        --destructive-foreground: 210 40% 98%;

        --ring: 215 20.2% 65.1%;

        --radius: 0.5rem;
    }

    .dark {
        --background: 224 71% 4%;
        --foreground: 213 31% 91%;

        --muted: 223 47% 11%;
        --muted-foreground: 215.4 16.3% 56.9%;

        --accent: 216 34% 17%;
        --accent-foreground: 210 40% 98%;

        --popover: 224 71% 4%;
        --popover-foreground: 215 20.2% 65.1%;

        --border: 216 34% 17%;
        --input: 216 34% 17%;

        --card: 224 71% 4%;
        --card-foreground: 213 31% 91%;

        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 1.2%;

        --secondary: 222.2 47.4% 11.2%;
        --secondary-foreground: 210 40% 98%;

        --destructive: 0 63% 31%;
        --destructive-foreground: 210 40% 98%;

        --ring: 216 34% 17%;

        --radius: 0.5rem;
    }
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        @apply bg-background text-foreground;
        font-feature-settings: "rlig" 1, "calt" 1;
        font-family: Arial, Helvetica, sans-serif;
    }
}
```

</details>

## Usage

Assuming your components are available you can use them by their respective names.
Every component allows for a content block:

```handlebars
{{#Badge id="main" class="rounded-none"}}
 I'm a default badge
{{/Badge}}

{{#Badge id="badge-1" data-foo="bar"}}
    I'm a badge with custom attributes
{{/Badge}}

{{#Badge size="xl"}}
    I'm a badge with a custom variant!
{{/Badge}}
```

Fore more examples and recipes, view https://blazeui.meteorapp.com/components

## Customizations

BlazeUI is flexible at its core, enabling you fine-grained customization. 

### Define custom variants

The library comes with default variants for the components.
If that's not enough, you can easily extend variants:

```js
import { BlazeUI, Badge } from 'meteor/jkuester:blazeui/static'

BlazeUI.variants({
  ctx: Badge,
  type: 'size',
  values: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg p-2",
    xl: "text-xl p-3",
  },
  default: 'xs'
})
```

You can use this function also to change the `default` for an
existing variant or extend/override the variant itself.

### Create custom components

First, you need to have a template defined for your component:

```handlebars
<template name="Hello">
    <div {{blazeui_atts}}>
        {{> Template.contentBlock active=active}}
    </div>
</template>
```

In your js, you can then register it like this:

```js
import { ReactiveDict } from 'meteor/reactive-dict'
import { BlazeUI } from 'meteor/blazeui:core'
import './Hello.html'

const Hello = {
  /**
   * Required, must exactly match the name of the Template!
   */
  name: 'Hello',

  /**
   * Optional, the base class that is always applied.
   * Can be overridden.
   */
  class: 'p-1 bg-primary text-primary-foreground transition-all ease-in-out',

  /**
   * Optional, a RactiveDict that can be used to manage internal
   * state. You can also use a custom reactive data source as long
   * as implements the methods of ReactiveDict (get, set, all etc.).
   */
  state: new ReactiveDict({ active: false }),

  /**
   * Optional function if you need to resolve attributes for the component
   * with awareness of the state.
   * Reactive: This method gets called, when props or state change.
   *
   * @param props {object} the object, returned by {Template.currentData()}
   * @param state {object|undefined} present, when {state} is defined on the component.
   * @param api {BlazeUI} the BlazeUI top-level api is always passed down to components.
   * @return {{role: string, class: string}}
   */
  attributes ({ props, state, api }) {
    const { class:className, ...rest } = props
    const { merge } = api.styles()
    const { active } = state

    return  {
      role: 'button',
      class: merge(
        Hello.class,
        active ? 'text-4xl' : 'text-xs',
        className
      ),
      ...rest
    }
  },
  /**
   * This is passed to the Template's `onCreated` method.
   * Note, that state is only passed, when being defined on this
   * component.
   * @param state {object?}
   */
  onCreated ({ state }) {
    const instance = this
    instance.state = state
  },
  helpers: {
    active() {
      return Template.instance().state.get('active')
    }
  },
  events: {
    'click div' (e, t) {
      // this results in 'attributes' being called right after
      t.state.set('active', !t.state.get('active'))
    }
  }
}

BlazeUI.register(Hello)
```

### Override components' default classes

You can change any component's default styles by simply overriding its `class` property
or its variants.

### Share state between components

BlazeUI is designed to relieve you from the burden of implementing state-sharing
between components and their children.

Sometimes you can simply forward the state as props of the child, but
this quickly results in so-called "prop-drilling", where a re prop
is passed down multiple levels of children.

Instead you can use a context that parents share with their children.

The parent simply needs to use the `blazeui_contetx` helper to provide
it to all children:

```handlebars
<template name="MyComponent">
  <div {{blazeui_atts}}>
   {{> Template.contentBlock context=(blazeui_context "MyComponent")}}
  </div>
</template>

<template name="MyComponenTrigger">
  <button {{blazeui_atts}}>
    {{> Template.contentBlock}}
  </button>
</template>
```

A child component can use this shared state via the `api`
parameter in the `state` function:

```js
export const MyComponent = {
  name: 'MyComponent',
  class: 'p-4 border rounded-md',
  state: ({ instance }) => {
    // attach state to the instance
    // so the blazeui_context helper
    // will pick it up.
    // convention: it must be named "state"
    // and exist as property of the instance
    instance.state = new ReactiveDict({
      active: false
    })
    return instance.state
  },
  attributes ({ props, state, api }) {
    const { merge } = api.styles()
    const active = state.get('active')
    return {
      data-active: active, // this also updates when children change the state
      class: merge(MyComponent.class, props.class)
    }
  }
}

export const MyComponentTrigger = {
  name: 'MyComponentTrigger',
  class: 'border bg-primary rounded-md font-semibold text-primary-foreground',
  state: ({ instance, api }) => {
    // this will automatically pick up the state from the parent
    // no matter which level of depth this child is curently located.
    const { useFromContext  } = api.state()
    return useFromContext({ instance, key: 'MyComponentContext' })
  },
  events: {
    'click button' (e, t) {
      // toggle active
      t.state.set({ active: !t.state.get('active') })
    }
  }
}
```



## License

MIT, see [license file](./LICENSE)
