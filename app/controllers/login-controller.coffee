HomeController = require 'controllers/home-controller'
LoggedView = require 'views/logged/logged-view'
BitsModel = require 'models/bits/bits'

module.exports = class LoginController extends HomeController
  
  showLogin: ->
    @baits = new BitsModel
    console.log ['bits', @baits]
    @view = new  LoggedView({model: @baits})
    @view.render
  


