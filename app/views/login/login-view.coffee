View = require 'views/base/view'

module.exports = class LoginPageView extends View
  container: '.mainHeader .wrapper'
  id: 'login'
  autoRender: true
  template: require './templates/login'
  autoAttach: true

  initialize: ->
   super
   @delegate 'click', '.btn.btnTopNav', @clickLogin

  clickLogin: ->
    console.log 'click Login'






