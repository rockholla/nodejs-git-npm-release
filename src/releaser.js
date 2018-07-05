import path from 'path'
import fs from 'fs'
import inquirer from 'inquirer'
import shell from 'shelljs'

class Releaser {

  constructor(projectPath = null) {
    this.projectPath = projectPath || path.resolve('.')
    if (!fs.existsSync(path.resolve(this.projectPath, 'package.json'))) {
      throw new Error(`${this.projectPath} does not contain a package.json file.
        This probably means you need to be executing git-npm-release
        from the root of your project`)
    }
    if (shell.exec('git status', { cwd: this.projectPath }).indexOf('nothing to commit') === -1) {
      throw new Error(`${this.projectPath} looks as though it contains unstaged
        commits. Please commit before running a release.`)
    }
    try {
      shell.exec('npm whoami', { cwd: this.projectPath })
    } catch (error) {
      throw new Error(`Looks like you might not be logged in via npm CLI: ${error.message || error}`)
    }
    this.packageJson  = require(path.resolve(this.projectPath, 'package.json'))
  }

  release (permission = 'public') {
    if (permission !== 'public' && permission !== 'restricted') {
      throw new Error(`permission ${permission} passed to the release script is invalid, must be one of: public, restricted`)
    }
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
      shell.exec('git add .', { cwd: this.projectPath })
      shell.exec(`git commit -m "updating package.json to ${this.packageJson.version} via git-npm-release"`)
      let currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { cwd: this.projectPath }).trim()
      if (currentBranch !== 'master') {
        shell.exec(`git checkout master && git merge ${currentBranch}`, { cwd: this.projectPath })
      }
      shell.exec(`git tag -a ${version} -m "Tagging version ${version} via git-npm-release"`, { cwd: this.projectPath })
      shell.exec('git push --all origin', { cwd: this.projectPath })
      shell.exec('git push --tags origin', { cwd: this.projectPath })
      shell.exec(`npm publish --access ${permission}`, { cwd: this.projectPath })
    })
  }

}

export default Releaser
