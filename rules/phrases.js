import * as predicate from 'commonform-predicate'
import replacements from 'wordy-words' with { type: 'json' }

const phrases = Object.keys(replacements)
  .reduce(function (map, key) {
    const longer = key
    const shorter = replacements[key]
    map[shorter] = {
      phrase: longer,
      re: new RegExp('\\b' + longer + '\\b')
    }
    return map
  }, {})

export default function (form, path) {
  return form.content.reduce(function (annotations, element, index) {
    if (predicate.text(element)) {
      const elementPath = path.concat(['content', index])
      Object.keys(phrases)
        .forEach(function (suggestion) {
          const object = phrases[suggestion]
          const regularExpression = object.re
          if (regularExpression.test(element.toLowerCase())) {
            annotations.push({
              message: (
                'Replace "' + object.phrase +
                '" with "' + suggestion + '".'
              ),
              path: elementPath
            })
          }
        })
    }
    return annotations
  }, [])
}
