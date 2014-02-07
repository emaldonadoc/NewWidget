global.backbone = require('../bower_components/backbone/backbone')
global.Chaplin =  require('../bower_components/chaplin/chaplin')
global.Handlebars = require('../node_modules/handlebars/lib/handlebars')
require('../bower_components/chaplin/chaplin').model
require('../bower_components/chaplin/chaplin').utils
require('../bower_components/chaplin/chaplin').utils.beget
#require('../app/lib/view-helper')
require('../app/views/base/view')
LoggedView = require('../app/views/logged/logged-view')
BitsModel = require('../app/models/bits/bits')

describe 'Logged view', ->
     @model = new BitsModel({baits:'100'})
     before ->
         @profile = new LoggedView(model:@model)

     after ->
         @profile = null

     it 'should exist', ->
         expect @profile.to.be.ok

