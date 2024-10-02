import './Table.html'

export const Table = {
  name: 'Table',
  main: true,
  class: 'w-full caption-bottom text-sm'
}

export const TableHeader = {
  name: 'TableHeader',
  class: '[&_tr]:border-b'
}

export const TableBody = {
  name: 'TableBody',
  class: '[&_tr:last-child]:border-0'
}

export const TableFooter = {
  name: 'TableFooter',
  class: 'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0'
}

export const TableRow = {
  name: 'TableRow',
  class: 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted'
}

export const TableCell = {
  name: 'TableCell',
  class : 'p-4 align-middle [&:has([role=checkbox])]:pr-0'
}

export const TableHead = {
  name: 'TableHead',
  class: 'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0'
}

export const TableCaption = {
  name: 'TableCaption',
  class: 'mt-4 text-sm text-muted-foreground'
}
