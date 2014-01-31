View = require 'views/base/view'
Routes = require 'routes'

module.exports = class HeaderPageView extends View
  container: 'body'
  autoRender:true
  tagName: 'header'
  template: require './templates/header'
  autoAttach: true

  initialize: ->
    super
    @delegate 'click', '.btn.btnTopNav', @clickLogin

  clickLogin: ->
    Chaplin.utils.redirectTo controller: 'login', action: 'showLogin'

