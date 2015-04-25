/* jshint mocha: true */
var expect = require('chai').expect;
var critique = require('../..');

describe('archaisms', function() {
  it('are not permitted', function() {
    expect(critique({content: ['to wit']}))
      .to.eql([{
        message: 'replace the archaism "to wit"',
        path: ['content', 0],
        source: 'commonform-critique',
        url: null
      }]);
  });
});
