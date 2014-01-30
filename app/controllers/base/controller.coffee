HeaderPageView = require 'views/header/header-page-view'

module.exports = class Controller extends Chaplin.Controller
  # Reusabilities persist stuff between controllers.
  # You may also persist models etc.
  beforeAction: ->
#    @reuse 'site', HeaderPageView
