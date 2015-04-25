/* jshint mocha: true */
var expect = require('chai').expect;
var critique = require('../..');

describe('archaisms', function() {
  it('are annotated', function() {
    expect(critique({content: ['to wit']}))
      .to.eql([{
        message: 'Replace the archaism "to wit".',
        path: ['content', 0],
        source: 'commonform-critique',
        url: null
      }]);
  });

  it('can appear as substrings', function() {
    expect(critique({content: ['to witness']}))
      .to.eql([]);
  });
});
