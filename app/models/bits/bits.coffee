#Model = require "../base/model"
# Base model.
module.exports = class Bits extends Chaplin.Model
  initialize: ->
    super
    @bits = 1000

  parse: (response) ->
    console.log ['reponse in bits coffee ', response]
    response