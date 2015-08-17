var predicate = require('commonform-predicate');

var phrases = [
  ['in advance of', 'before'],
  ['in opposition to', 'against'],
  ['in order to', 'to'],
  ['in preference to', 'over'],
  ['in spite of', 'despite'],
  ['in the event of', 'if']
].reduce(function(map, pair) {
  var longer = pair[0];
  var shorter = pair[1];
  map[shorter] = {
    phrase: longer,
    re: new RegExp('\\b' + longer + '\\b')
  };
  return map;
}, {});

module.exports = function(form, path) {
  return form.content.reduce(function(annotations, element, index) {
    if (predicate.text(element)) {
      var elementPath = path.concat(['content', index]);
      Object.keys(phrases)
        .forEach(function(suggestion) {
          var object = phrases[suggestion];
          var regularExpression = object.re;
          if (regularExpression.test(element.toLowerCase())) {
            annotations.push({
              message: (
                'Replace "' + object.phrase +
                '" with "' + suggestion + '".'
              ),
              path: elementPath
            });
          }
        });
    }
    return annotations;
  }, []);
};
