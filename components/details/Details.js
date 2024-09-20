import './Details.html'

export const Details = {
  name: 'Details',
  class: 'border rounded-md group'
}

export const DetailsSummary = {
  name: 'DetailsSummary',
  class: 'cursor-pointer flex items-center whitespace-nowrap rounded-md group-open:rounded-t-md group-open:rounded-b-none text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200 ease-out group-open:mb-1',
  variants: {
    variant: {
      outline:
        "border-input bg-background hover:bg-accent hover:text-accent-foreground",
      default: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
}

export const DetailsTrigger = {
  name: 'DetailsTrigger',
  class: 'transition ease-in-out duration-200 rotate-90 group-open:-rotate-90'
}

export const DetailsContent = {
  name: 'DetailsContent',
  class: 'p-4 leading-normal text-normal overflow-hidden text-sm '
}
