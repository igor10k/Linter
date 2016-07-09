var helpers = require('../helpers')

module.exports = function (filepath, callback) {
  if (!filepath.match(/\.jsx?$/)) {
    return callback()
  }

  helpers.findAndExec('eslint', ['-f', 'json'], filepath, function (err, result) {
    if (err) {
      return callback(err)
    }

    if (!result || !result.data.length) {
      return callback()
    }

    var hints = result.data[0].messages
    hints = hints.map(function (hint) {
      return {
        message: hint.message,
        code: helpers.escapeTags(hint.source),
        line: hint.line,
        column: hint.column,
        rule: hint.ruleId
      }
    })

    callback(null, {
      name: 'ESLint' + (result.isGlobal ? ' (global)' : ''),
      hints: hints
    })
  })
}
