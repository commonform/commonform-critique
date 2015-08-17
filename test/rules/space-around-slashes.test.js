/* jshint mocha: true */
var expect = require('chai').expect
var critique = require('../..')

describe('spaces around slashes', function() {
  it('are not permitted before', function() {
    expect(critique({ content: [ 'this /that' ] }))
      .to.eql([ {
        message: 'Remove the space before "/".',
        path: ['content', 0],
        source: 'commonform-critique',
        url: null } ]) })

  it('are not permitted after', function() {
    expect(critique({ content: [ 'this/ that' ] }))
      .to.eql([ {
        message: 'Remove the space after "/".',
        path: ['content', 0],
        source: 'commonform-critique',
        url: null } ]) })

  it('checks nested forms', function() {
    expect(critique({ content: [
      { form: {
        content: [ 'this / that' ] } } ] }))
    .to.eql([
      { message: 'Remove the space before "/".',
        path: [ 'content', 0, 'form', 'content', 0 ],
        source: 'commonform-critique',
        url: null },
      { message: 'Remove the space after "/".',
        path: [ 'content', 0, 'form', 'content', 0 ],
        source: 'commonform-critique',
        url: null } ]) }) })
