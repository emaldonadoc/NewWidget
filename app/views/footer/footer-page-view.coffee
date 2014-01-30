View = require 'views/base/view'

module.exports = class FooterPageView extends View
  container: 'body'
  tagName: 'footer'
  template: require './templates/footer'
  autoAttach: true
