var predicate = require('commonform-predicate')

var archasisms = [
  'hast',
  'hath',
  'hereas',
  'hereby',
  'herein',
  'hereof',
  'hereon',
  'heretofore',
  'hereunder',
  'hereupon',
  'know all men by these presents',
  'thee',
  'thereas',
  'thereby',
  'therein',
  'thereof',
  'theretofore',
  'thereunder',
  'thereupon',
  'thine',
  'thou',
  'to wit',
  'whereas',
  'whereby',
  'wherefore premises considered',
  'whereforewhereunder',
  'wherein',
  'whereof',
  'witnesseth' ]
  .reduce(
    function(map, string) {
      map[string] = new RegExp('\\b' + string + '\\b')
      return map },
    {})

module.exports = function(form, path) {
  return form.content.reduce(
    function(annotations, element, index) {
      if (predicate.text(element)) {
        var elementPath = path.concat(['content', index])
        Object.keys(archasisms)
          .forEach(function(phrase) {
            var regularExpression = archasisms[phrase]
            if (regularExpression.test(element.toLowerCase())) {
              annotations.push({
                message: 'Replace the archaism "' + phrase + '".',
                path: elementPath }) } }) }
      return annotations },
    []) }
