View = require 'views/base/view'
Routes = require 'routes'

module.exports = class HeaderPageView extends View
  container: 'body'
  autoRender:true
  tagName: 'header'
  template: require './templates/header'
  autoAttach: true

