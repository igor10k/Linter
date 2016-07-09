var helpers = require('../helpers')

module.exports = function (filepath, callback) {
  if (!filepath.match(/\.jsx?$/)) {
    return callback()
  }

  helpers.findAndExec('jscs', ['-r', 'json'], filepath, function (err, result) {
    if (err) {
      return callback(err)
    }

    if (!result) {
      return callback()
    }

    var hints = result.data[Object.keys(result.data)[0]]

    if (!hints) {
      return callback()
    }

    hints = hints.map(function (hint) {
      var matches = hint.message.match(/(\w+): ([\s\S]+)/)

      return {
        message: matches ? matches[2] : hint.message,
        code: '',
        line: hint.line,
        column: hint.column,
        rule: matches ? matches[1] : ''
      }
    })

    callback(null, {
      name: 'JSCS' + (result.isGlobal ? ' (global)' : ''),
      hints: hints
    })
  })
}
