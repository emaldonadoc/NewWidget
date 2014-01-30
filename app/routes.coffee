# Application routes.
module.exports = (match) ->
  match '', 'home#index'
  match 'home#login', controller: 'login', action: 'showLogin'
