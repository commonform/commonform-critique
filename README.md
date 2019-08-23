```javascript
var critique = require('commonform-critique')
var assert = require('assert')

assert.deepStrictEqual(
  critique({ content: ['to wit'] })[0],
  [
    {
      message: 'The phrase "to wit" is archaic.',
      level: 'info',
      path: ['content', 0],
      source: 'commonform-archaic',
      url: null
    }
  ][0]
)

assert.deepStrictEqual(
  critique({ content: ['to witness'] }),
  []
)

assert.deepStrictEqual(
  critique({ content: ['in order to'] }),
  [
    {
      message: 'Replace "in order to" with "to".',
      level: 'info',
      path: ['content', 0],
      source: 'commonform-critique',
      url: null
    }
  ]
)

assert.deepStrictEqual(
  critique({ content: ['this /that'] }),
  [
    {
      message: 'Remove the space before "/".',
      level: 'info',
      path: ['content', 0],
      source: 'commonform-critique',
      url: null
    }
  ]
)

assert.deepStrictEqual(
  critique({ content: ['this/ that'] }),
  [
    {
      message: 'Remove the space after "/".',
      level: 'info',
      path: ['content', 0],
      source: 'commonform-critique',
      url: null
    }
  ]
)

assert.deepStrictEqual(
  critique({ content: [{ form: { content: ['this / that'] } }] }),
  [
    {
      message: 'Remove the space before "/".',
      level: 'info',
      path: ['content', 0, 'form', 'content', 0],
      source: 'commonform-critique',
      url: null
    },
    {
      message: 'Remove the space after "/".',
      level: 'info',
      path: ['content', 0, 'form', 'content', 0],
      source: 'commonform-critique',
      url: null
    }
  ]
)

assert.deepStrictEqual(
  critique({ content: ['Give me two (2) of those and four (4) of the other one.'] }),
  [
    {
      message: '"two (2)" repeats a written number and numeral, which is redundant and error-prone',
      level: 'info',
      path: ['content', 0],
      source: 'doubleplus-numbers',
      url: null
    },
    {
      message: '"four (4)" repeats a written number and numeral, which is redundant and error-prone',
      level: 'info',
      path: ['content', 0],
      source: 'doubleplus-numbers',
      url: null
    }
  ]
)

assert.deepStrictEqual(
  critique({ content: ['Do not use any silly words whatsoever.'] }),
  [
    {
      message: (
        'The phrase "whatsoever" should as a general matter be absent from your contracts.' +
        ' See MSCD appendix 2, pages 454-455.'
      ),
      level: 'info',
      path: ['content', 0],
      source: 'commonform-mscd',
      url: null
    }
  ]
)
```
