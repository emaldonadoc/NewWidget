Routes = require 'routes'
Controller = require 'controllers/base/controller'

module.exports = class HomeController extends Controller

  index: ->
    console.log 'do foo'
