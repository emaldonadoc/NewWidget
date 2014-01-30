View = require 'views/base/view'

module.exports = class MainPageView extends View
  container: 'body'
  tagName: 'main'
  template: require './templates/main'
  autoAttach: true

