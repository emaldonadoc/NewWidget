View = require 'views/base/view'

module.exports = class LoginPageView extends View
  container: '.mainHeader .wrapper'
  className: 'login'
  autoRender: true
  template: require './templates/login'
  autoAttach: true
  events:
    'click .btn.btnTopNav': 'clickLogin'

  initialize: ->
   super

  clickLogin: (e) ->
    e.preventDefault
    $('.mainHeader .wrapper .login').hide()
    Chaplin.utils.redirectTo controller:'login', action: 'showLogin'









