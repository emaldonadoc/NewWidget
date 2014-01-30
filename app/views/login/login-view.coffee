View = require 'views/base/view'

module.exports = class LoginPageView extends View
  container: 'body'
  tagName: 'login'
  template: require './templates/login'
  autoAttach: true

  initialize:(params) ->
   super
   alert 'do ' + params.texto



