assert = require('assert')
asyncPrime = require('../public/index').asyncPrime
nextPrime = require('../public/index').nextPrime

describe 'nextPrime', ->
    before ->
        console.log 'nextPrime'

    it 'nextPrime bla bla bla', ->
        assert.equal 11,nextPrime 7
        
describe 'asyncPrime', ->
    it 'asyncPrime should return the next primer number ',(done) ->
        asyncPrime 11,(n) ->
            assert.equal 13,n,'bad number'
            done()
