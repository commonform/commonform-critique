var archaic = require('commonform-archaic')
var doubleplus = require('doubleplus-numbers')
var has = require('has')
var mscd = require('commonform-mscd')
var predicate = require('commonform-predicate')

var rules = [
  require('./rules/phrases'),
  require('./rules/space-around-slashes')
]

var recurse = function (form, path, annotations) {
  return annotations
    // Annotations about `form`
    .concat(
      rules.reduce(function (annotations, rule) {
        return annotations.concat(rule(form, path))
      }, [])
    )
    // Annotations about children of `form`.
    .concat(
      form.content.reduce(function (annotations, element, index) {
        if (predicate.child(element)) {
          var childForm = element.form
          var childPath = path.concat(['content', index, 'form'])
          return annotations.concat(
            recurse(childForm, childPath, [])
          )
        }
        return annotations
      }, []))
}

module.exports = function (form) {
  return []
    .concat(archaic(form))
    .concat(mscd(form))
    .concat(doubleplus(form))
    .concat(
      recurse(form, [], [])
        .map(function (annotation) {
          if (!has(annotation, 'level')) {
            annotation.level = 'info'
          }
          if (!has(annotation, 'source')) {
            annotation.source = 'commonform-critique'
          }
          if (!has(annotation, 'url')) {
            annotation.url = null
          }
          return annotation
        }))
}
