# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match '', controller: 'login', action: 'showLogin'

