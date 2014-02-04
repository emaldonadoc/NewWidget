require 'lib/view-helper' # Just load the view helpers, no return value

module.exports = class View extends Chaplin.View
  # Auto-save `template` option passed to any view as `@template`.
  optionNames: Chaplin.View::optionNames.concat ['template']

  # Precompiled templates function initializer.
  getTemplateFunction: ->
    template = @template

    if typeof template is 'string'
      # Compile the template string to a function and save it
      # on the prototype. This is a workaround since an instance
      # shouldn’t change its prototype normally.
      templateFunc = Handlebars.compile template
      @constructor::template = templateFunc
    else
      templateFunc = template

    templateFunc
