module.exports = (() => {
  const path = require('path')
  return {
    directories: {
      template: path.resolve(__dirname, '.project-template'),
      install: path.resolve(__dirname, '.project'),
    },
  }
})()
