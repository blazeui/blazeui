import './Alert.html'

export const Alert = {
  name: 'Alert',
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

export const AlertTitle = {
  name: 'AlertTitle',
  class: 'mb-1 font-semibold leading-none tracking-tight'
}

export const AlertDescription = {
  name: 'AlertDescription',
  class: 'text-sm [&_p]:leading-relaxed'
}
