var predicate = require('commonform-predicate')
var replacements = require('wordy-words')

var phrases = Object.keys(replacements)
  .reduce(
    function(map, key) {
      var longer = key
      var shorter = replacements[key]
      map[shorter] = {
        phrase: longer,
        re: new RegExp('\\b' + longer + '\\b') }
      return map },
    { })

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      var elementPath = path.concat([ 'content', index ])
      Object.keys(phrases)
        .forEach(function(suggestion) {
          var object = phrases[suggestion]
          var regularExpression = object.re
          if (regularExpression.test(element.toLowerCase())) {
            annotations.push({
              message: (
                'Replace "' + object.phrase +
                '" with "' + suggestion + '".' ),
              path: elementPath }) } }) }
    return annotations
  }, []) }
