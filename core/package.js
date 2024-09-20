/* eslint-env meteor */
Package.describe({
  name: 'blazeui:core',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '🔥 Basic UI components for Meteor-Blaze 🔥',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:jankapunkt/blazeui.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: '../README.md'
});

Package.onUse(function (api) {
  api.versionsFrom(['2.8.0', '3.0']);
  api.use([
    'ecmascript',
    'templating',
    'reactive-dict'
  ], 'client')

  api.mainModule('BlazeUI.js', 'client');
});

Package.onTest(function (api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jkuester:blazeui');
  api.mainModule('blazeui-tests.js');
});
