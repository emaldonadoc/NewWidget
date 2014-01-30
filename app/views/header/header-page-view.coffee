View = require 'views/base/view'

module.exports = class HeaderPageView extends View
  container: 'body'
  tagName: 'header'
  template: require './templates/header'
  autoAttach: true
