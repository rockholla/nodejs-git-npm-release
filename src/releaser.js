import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'

class Releaser {

  constructor() {
    this.projectPath = process.env.CWD || __dirname
    if (!fs.existsSync(path.resolve(this.projectPath, 'package.json'))) {
      throw new Error(`${this.projectPath} does not contain a package.json file.
        This probably means you need to be executing git-npm-release
        from the root of your project`)
    }
    this.packageJson  = require(path.resolve(this.projectPath, 'package.json'))
  }

  release () {
    return inquirer.prompt({
      type: 'list',
      name: 'releaseType',
      choices: ['Major', 'Minor', 'Patch'],
      message: 'What type of release is this?'
    }).then((response) => {
      let version = this.packageJson.version.split('.')
      switch (response.releaseType) {
        case 'Major':
          version[0]++
          break
        case 'Minor':
          version[1]++
          break
        case 'Patch':
          version[2]++
          break
        default:
          throw new Error(`Invalid release type ${response.releaseType}`)
      }
      this.packageJson.version = version.join('.')
      fs.writeFileSync(path.resolve(this.projectPath, 'package.json'), JSON.stringify(this.packageJson, null, 2))
    })
  }

}

export default Releaser
