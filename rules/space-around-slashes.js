var predicate = require('commonform-predicate')

module.exports = function (form, path) {
  return form.content.reduce(
    function (annotations, element, index) {
      if (predicate.text(element)) {
        if (element.indexOf(' /') > -1) {
          annotations.push({
            message: 'Remove the space before "/".',
            path: path.concat(['content', index]) })
        }
        if (element.indexOf('/ ') > -1) {
          annotations.push({
            message: 'Remove the space after "/".',
            path: path.concat(['content', index]) })
        }
      }
      return annotations
    },
    [])
}
