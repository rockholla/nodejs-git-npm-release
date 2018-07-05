module.exports = () => {
  const rcp       = require('recursive-copy')
  const shell     = require('shelljs')
  const settings  = require('./settings')
  return rcp(settings.directories.template, settings.directories.install).then(() => {
    shell.exec('npm install --production', { cwd: settings.directories.install, silent: true })
    shell.exec('git init', { cwd: settings.directories.install, silent: true })
  })
}
