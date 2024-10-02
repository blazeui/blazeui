/* eslint-env meteor */
Package.describe({
  name: 'blazeui:components',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom(['2.8.0', '3.0']);
  api.use([
    'ecmascript',
    'templating',
    'blazeui:core'
  ], 'client');
  api.mainModule('components.js', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('blazeui:components');
  api.mainModule('components-tests.js');
});
