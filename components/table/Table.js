import './Table.html'

/**
 * Build html tables with these components
 * @module
 * @see https://blazeui.meteorapp.com/components?c=Table
 */

/** @type object */
export const Table = {
  name: 'Table',
  main: true,
  class: 'w-full caption-bottom text-sm'
}

/** @type object */
export const TableHeader = {
  name: 'TableHeader',
  class: '[&_tr]:border-b'
}

/** @type object */
export const TableBody = {
  name: 'TableBody',
  class: '[&_tr:last-child]:border-0'
}

/** @type object */
export const TableFooter = {
  name: 'TableFooter',
  class: 'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0'
}

/** @type object */
export const TableRow = {
  name: 'TableRow',
  class: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
}

/** @type object */
export const TableCell = {
  name: 'TableCell',
  class : 'p-4 align-middle [&:has([role=checkbox])]:pr-0'
}

/** @type object */
export const TableHead = {
  name: 'TableHead',
  class: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0'
}

/** @type object */
export const TableCaption = {
  name: 'TableCaption',
  class: 'mt-4 text-sm text-muted-foreground'
}
