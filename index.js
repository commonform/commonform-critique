import archaic from 'commonform-archaic'
import doubleplus from 'doubleplus-numbers'
import mscd from 'commonform-mscd'
import * as predicate from 'commonform-predicate'
import phrases from './rules/phrases.js'
import spaceAroundSlahes from './rules/space-around-slashes.js'

const rules = [phrases, spaceAroundSlahes]

function recurse (form, path, annotations) {
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
          const childForm = element.form
          const childPath = path.concat(['content', index, 'form'])
          return annotations.concat(
            recurse(childForm, childPath, [])
          )
        }
        return annotations
      }, []))
}

export default function (form) {
  return []
    .concat(archaic(form))
    .concat(mscd(form))
    .concat(doubleplus(form))
    .concat(
      recurse(form, [], [])
        .map(function (annotation) {
          if (!Object.hasOwn(annotation, 'level')) {
            annotation.level = 'info'
          }
          if (!Object.hasOwn(annotation, 'source')) {
            annotation.source = 'commonform-critique'
          }
          if (!Object.hasOwn(annotation, 'url')) {
            annotation.url = null
          }
          return annotation
        }))
}
