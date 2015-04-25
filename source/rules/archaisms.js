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
];

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      var elementPath = path.concat(['content', index]);
      archasisms.forEach(function(archaism) {
        if (element.toLowerCase().indexOf(archaism) > -1) {
          annotations.push({
            message: 'replace the archaism "' + archaism + '"',
            path: elementPath
          });
        }
      });
    }
    return annotations;
  }, []);
};
