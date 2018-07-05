import Releaser from '../lib/releaser'
import path from 'path'
import settings from './settings'
import shell from 'shelljs'

describe('releaser', () => {

  it('releaser throws an error when run from non-project directory', () => {
    const projectPath = path.resolve(__dirname, settings.directories.install, '..')
    expect(() => {
      new Releaser(projectPath)
    }).toThrow(/.*does not contain a package.*/)
  })

  it('releaser throws an error when git status returns unstaged commits', () => {
    const projectPath = path.resolve(__dirname, settings.directories.install)
    expect(() => {
      new Releaser(projectPath)
    }).toThrow(/.*Please commit*/)
  })

  it('releaser constructor should succeed when projectPath contains a package.json file', () => {
    const projectPath = path.resolve(__dirname, settings.directories.install)
    shell.exec('git add .', { cwd: projectPath })
    shell.exec('git commit -m "test commit"', { cwd: projectPath })
    const releaser = new Releaser(projectPath)
    expect(releaser).toHaveProperty('release')
  })

  it('releaser.release should throw an error with an invalid permission type', () => {
    const projectPath = path.resolve(__dirname, settings.directories.install)
    shell.exec('git add .', { cwd: projectPath })
    shell.exec('git commit -m "test commit"', { cwd: projectPath })
    const releaser = new Releaser(projectPath)
    expect(() => {
      releaser.release('invalid-permission')
    }).toThrow(/.*is invalid*/)
  })

  // TODO: test the actual release process

})
