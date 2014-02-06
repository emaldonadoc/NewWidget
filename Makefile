test:
	@./node_modules/.bin/mocha test/*.js 

test-coffee:
	@./node_modules/.bin/mocha test/*.coffee --compilers coffee:coffee-script/register

.PHONY: test-coffee test
