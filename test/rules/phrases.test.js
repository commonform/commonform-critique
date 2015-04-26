/* jshint mocha: true */
var expect = require('chai').expect;
var critique = require('../..');

describe('long-winded phrases', function() {
  it('are annotated', function() {
    expect(critique({content: ['in order to']}))
      .to.eql([{
        message: 'Replace "in order to" with "to".',
        path: ['content', 0],
        source: 'commonform-critique',
        url: null
      }]);
  });
});
