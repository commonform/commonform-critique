var predicate = require('commonform-predicate');
var name = require('../package.json').name;

var rules = [
  require('./rules/archaisms'),
  require('./rules/space-around-slashes')
];

var recurse = function(form, path, annotations) {
  return annotations

    // Annotations about `form`
    .concat(rules.reduce(function(annotations, rule) {
      return annotations.concat(rule(form, path));
    }, []))

    // Annotations about children of `form`.
    .concat(form.content.reduce(function(annotations, element, index) {
      if (predicate.child(element)) {
        var childForm = element.form;
        var childPath = path.concat(['content', index, 'form']);
        return annotations.concat(recurse(childForm, childPath, []));
      } else {
        return annotations;
      }
    }, []));
};

module.exports = function(form) {
  return recurse(form, [], [])
    .map(function(annotation) {
      annotation.source = name;
      /* istanbul ignore else */
      if (!annotation.hasOwnProperty('url')) {
        annotation.url = null;
      }
      return annotation;
    });
};

module.exports.version = '0.5.0';
