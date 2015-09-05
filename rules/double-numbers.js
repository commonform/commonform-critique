var predicate = require('commonform-predicate')
var doubleNumbers = require('doubleplus-numbers')

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      var elementPath = path.concat([ 'content', index ])
      Object.keys(phrases)
        .forEach(function(suggestion) {
          var object = phrases[suggestion]
          var regularExpression = object.re
          if (regularExpression.test(element.toLowerCase())) {
            annotations.push(doubleNumbers(element))
          } } ) }
    return annotations
  }, []) }
