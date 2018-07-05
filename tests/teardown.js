module.exports = () => {
  const rimraf    = require('rimraf')
  const settings  = require('./settings')
  return new Promise((resolve, reject) => {
    return rimraf(settings.directories.install, (error) => {
      if (error) return reject(error)
      return resolve()
    })
  })
}
