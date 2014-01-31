HomeController = require 'controllers/home-controller'
LoginPageView = require 'views/login/login-view'

module.exports = class LoginController extends HomeController

  showLogin: ->

    @reuse 'login', LoginPageView
