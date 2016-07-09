var childProcess = require('child_process')
var fs = require('fs')
var path = require('path')

var entitiesMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
}

exports.escapeTags = function (str) {
  return str.replace(/[&<>]/g, function (entity) {
    return entitiesMap[entity]
  })
}

var findExecutable = function (name, dir, callback) {
  var findNext = function (name, dir) {
    var execPath = path.join(dir, 'node_modules', '.bin', name)

    fs.stat(execPath, function (err) {
      if (err) {
        var nextDir = path.normalize(path.join(dir, '..'))
        if (dir === nextDir) {
          return callback()
        }
        return findNext(name, nextDir)
      }

      callback(execPath)
    })
  }

  findNext(name, dir)
}

exports.findAndExec = function (command, args, filepath, callback) {
  findExecutable(command, path.dirname(filepath), function (localCommand) {
    childProcess.execFile((localCommand || command), args.concat(filepath), {
      cwd: path.dirname(filepath)
    }, function (err, stderr, stdout) {
      if (err) {
        // command not found
        if (err.code === 127) {
          return callback(err)
        }
      }
      var data = stderr || stdout

      if (!data) {
        return callback()
      }

      var parsedData
      try {
        parsedData = JSON.parse(data)
      } catch (e) {
        return callback(new Error(data))
      }

      callback(null, {
        isGlobal: !localCommand,
        data: parsedData
      })
    })
  })
}
