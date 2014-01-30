View = require 'views/base/view'
Routes = require 'routes'

module.exports = class HeaderPageView extends View
  container: 'body'
  tagName: 'header'
  template: require './templates/header'
  autoAttach: true

  initialize: ->
#    super
    @delegate 'click', '.btn.btnTopNav', @clickLogin

  clickLogin: ->
    params = 'foo'
    console.log 'CLICK ON LOGIN!!'
    Chaplin.utils.redirectTo controller: 'login', action: 'showLogin' , params: params

