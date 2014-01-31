Controller = require 'controllers/base/controller'
HeaderPageView = require 'views/header/header-page-view'
MainPageView = require 'views/main/main-page-view'
FooterPageView = require 'views/footer/footer-page-view'
LoginView = require 'views/login/login-view'

module.exports = class HomeController extends Chaplin.Controller

  beforeAction: ->
    @reuse 'header', HeaderPageView
    @reuse 'main', MainPageView
    @reuse 'footer', FooterPageView
    @reuse 'login', LoginView

  before: ->
    console.log 'before'









