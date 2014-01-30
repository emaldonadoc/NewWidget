exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^(bower_components|vendor)/

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app\/styles\/app|vendor)/

    templates:
      joinTo: 'javascripts/app.js'
