import './Alert.html'

/**
 * Provides components to construct various Alerts.
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Alert
 */

/**
 * A simple alert panel to inform users about things.
 * Provides a destructive variant.
 * @property variant {('default'|'destructive')} supported default variants
 */
export const Alert = {
  name: 'Alert',
  main: true,
  attributes: {
    role: 'alert'
  },
  class: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}

/**
 * USe to display a styled title for your Alert
 */
export const AlertTitle = {
  name: 'AlertTitle',
  class: 'mb-1 font-semibold leading-none tracking-tight'
}

/**
 * Use to to display a description for your Alert
 */
export const AlertDescription = {
  name: 'AlertDescription',
  class: 'text-sm [&_p]:leading-relaxed'
}
