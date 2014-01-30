LoginPageView = require 'views/login/login-view'

module.exports = class LoginController extends Chaplin.Controller

  showLogin:(params) ->
    console.log ['enroute in LOGIN', params]
    @view = new LoginPageView(params)
    Chaplin.utils.redirectTo controller: 'home', action: 'beforeAction'