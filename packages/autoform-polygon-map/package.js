Package.describe({
  name: 'yhyuan:autoform-polygon-map',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Edit a Polygon with leaflet and autform',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'templating',
    'reactive-var',
    'aldeed:autoform',
    'mrt:leaflet'
  ], 'client');

  api.addFiles([
    'lib/client/autoform-polygon-map.html',
    'lib/client/autoform-polygon-map.css',
    'lib/client/autoform-polygon-map.js'
  ], 'client');  
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('yhyuan:autoform-polygon-map');
  api.addFiles('autoform-polygon-map-tests.js');
});
