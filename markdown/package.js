/* eslint-env meteor */
Package.describe({
  name: 'blazeui:markdown',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'A full scale Markdown renderer for BlazeUI',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:jankapunkt/blazeui.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.8.0', '3.0'])
  api.use([
    'ecmascript',
    'templating@1.4.4',
    'reactive-dict',
    'random',
    'blazeui:components@1.1.0'
  ], 'client')
  api.mainModule('markdown.js', 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('blazeui:markdown')
  api.mainModule('markdown-tests.js')
})
