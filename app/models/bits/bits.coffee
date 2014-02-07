module.exports = class Bits extends Chaplin.Model
  initialize: ->
    super
    @set({baits:"100a"})

  parse: (response) ->
    console.log ['reponse in bits coffee ', response]
    response
