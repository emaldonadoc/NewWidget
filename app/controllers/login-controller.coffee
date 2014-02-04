HomeController = require 'controllers/home-controller'
LoggedView = require 'views/logged/logged-view'
BitsModel = require 'models/bits/bits'

module.exports = class LoginController extends HomeController


  showLogin: ->
    @bitsModel = new BitsModel
    @view = new  LoggedView (model: @bitsModel)



