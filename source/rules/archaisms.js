var predicate = require('commonform-predicate');

var archasisms = [
  'hast',
  'hereof',
  'hereon',
  'hereupon',
  'know all men by these presents',
  'thee',
  'therein',
  'thereof',
  'thereupon',
  'thine',
  'thou',
  'to wit',
  'wherefore premises considered',
  'witnesseth'
].reduce(function(map, string) {
  map[string] = new RegExp('\\b' + string + '\\b');
  return map;
}, {});

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      var elementPath = path.concat(['content', index]);
      Object.keys(archasisms)
        .forEach(function(phrase) {
          var regularExpression = archasisms[phrase];
          if (regularExpression.test(element.toLowerCase())) {
            annotations.push({
              message: 'Replace the archaism "' + phrase + '".',
              path: elementPath
            });
          }
        });
    }
    return annotations;
  }, []);
};
