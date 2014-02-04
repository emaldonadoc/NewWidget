HomeController = require 'controllers/home-controller'
LoggedView = require 'views/logged/logged-view'
BitsModel = require 'models/bits/bits'

module.exports = class LoginController extends HomeController

  showLogin: ->
    @bits = new BitsModel
    @view = new  LoggedView {@bits}
    @bits.fetch().then @view.render




