var predicate = require('commonform-predicate');

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      if (element.indexOf(' /') > -1) {
        annotations.push({
          message: 'remove the space before the slash',
          path: path.concat(['content', index])
        });
      }
      if (element.indexOf('/ ') > -1) {
        annotations.push({
          message: 'remove the space after the slash',
          path: path.concat(['content', index])
        });
      }
    }
    return annotations;
  }, []);
};
