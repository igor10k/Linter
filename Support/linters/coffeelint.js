var helpers = require('../helpers')

module.exports = function (filepath, callback) {
  if (filepath.indexOf('.coffee') === -1) {
    return callback()
  }

  helpers.findAndExec('coffeelint', ['-q', '--reporter=raw'], filepath, function (err, result) {
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
      var message, code, column = 0

      if (hint.line) {
        message = hint.message + '<br>' + hint.context
        code = hint.line
      } else {
        code = hint.message
      }

      return {
        message: message || '',
        code: code,
        line: hint.lineNumber,
        column: column,
        rule: hint.rule
      }
    })

    callback(null, {
      name: 'Coffeelint' + (result.isGlobal ? ' (global)' : ''),
      hints: hints
    })
  })
}
