var predicate = require('commonform-predicate')

var archaisms = require('american-legal-archaisms')
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
        Object.keys(archaisms)
          .forEach(function(phrase) {
            var regularExpression = archaisms[phrase]
            if (regularExpression.test(element.toLowerCase())) {
              annotations.push({
                message: 'Replace the archaism "' + phrase + '".',
                path: elementPath }) } }) }
      return annotations },
    []) }
