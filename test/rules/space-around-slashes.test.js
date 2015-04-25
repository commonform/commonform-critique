/* jshint mocha: true */
var expect = require('chai').expect;
var critique = require('../..');

describe('spaces around slashes', function() {
  it('are not permitted before', function() {
    expect(critique({content: ['this /that']}))
      .to.eql([{
        source: 'commonform-critique',
        message: 'remove the space before the slash',
        object: 'this /that',
        path: ['content', 0]
      }]);
  });

  it('are not permitted after', function() {
    expect(critique({content: ['this/ that']}))
      .to.eql([{
        source: 'commonform-critique',
        message: 'remove the space after the slash',
        object: 'this/ that',
        path: ['content', 0]
      }]);
  });

  it('checks nested forms', function() {
    expect(critique({content: [{form: {content: ['this / that']}}]}))
    .to.eql([
      {
        source: 'commonform-critique',
        message: 'remove the space before the slash',
        object: 'this / that',
        path: ['content', 0, 'form', 'content', 0]
      },
      {
        source: 'commonform-critique',
        message: 'remove the space after the slash',
        object: 'this / that',
        path: ['content', 0, 'form', 'content', 0]
      }
    ]);
  });
});
