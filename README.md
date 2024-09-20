
![blazeui logo](./blazeui_wide.svg)

# BlazeUI - Tailwind components for Meteor Blaze
🔥 UI components for Meteor-Blaze and TailwindCSS 🔥

## About

This project is partially inspired by shacdn, radix-ui and headless ui and brings
a set of opinionated, yet flexibly changeable UI components on the table.

- 🔥 awesome UI components out of the box
- 🔥 simple to get started
- 🔥 supports variants; allows for custom variants
- 🔥 performant reactive attribute compilation
- 🔥 register your own components
- 🔥 builtin light/dark theme support



## Getting started

### 1. Add the package:

```shell
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

You need to have a `tailwind.config.js` config file for your project.
You can copy the below code as a starting point:

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

### 5. Finally, provide CSS root variables

First, import the theme's config, for example in `client/main.js`:

```js
import '@blazeui/theme-milkyway/milkyway.css'
```

This theme is zero config and looks great out of the box.

You also can use your own theme colors.
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
Every component allows for a content block!

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

### Register custom components

With BlazeUI you can easily create your own components.
In fact, every of the provided core components are
actually build using the same method.

#### 1. Create a template

First of all, there needs to be a template that Blaze can
create:

```handlebars
<template name="Loading">
    <div {{atts}}>
        {{> Template.contentBlock}}
    </div>
</template>
```

Then you need to define the Template's functionality:

```js
import { BlazeUI } from 'meteor/jkuester:blazeui/static'
import './Loading.html'

export const Loading = {
  name: 'Loading', // needs to be the exact template name!
  
  attributes: { // optional
    // this is a hypotehtical default attribute of the component
    role: 'loading'
  },
  class: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  variants: {   // optional
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    }
  },
  defaultVariants: {  // optional
    variant: "default"
  }
}
```

Now you can use it in your template like so:

```handlebars
<template name="myTemplate">
  {{#unless loadComplete}}
      {{#Loading}}
          ...Loading
      {{/Loading}}
  {{/unless}}
</template>
```

## Customizations

BlazeUI is flexible at its core, enabling you fine-grained customization. 

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

## License

MIT, see [license file](./LICENSE)
