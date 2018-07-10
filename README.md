# @rockholla/git-npm-release

A helper around packaging and pushing an npm and git release for a project

| Branch    | Status                                                                                                                                               |
| --------  | ---------------------------------------------------------------------------------------------------------------------------------------------------  |
| `develop` | [![Build Status](https://travis-ci.org/rockholla/nodejs-git-npm-release.svg?branch=develop)](https://travis-ci.org/rockholla/nodejs-git-npm-release) |
| `master`  | [![Build Status](https://travis-ci.org/rockholla/nodejs-git-npm-release.svg?branch=master)](https://travis-ci.org/rockholla/nodejs-git-npm-release)  |

## Usage

```
npm install --save-dev @rockholla/git-npm-release
```

When you're done developing everything for a release on your project and have it all committed:

```
./node_modules/.bin/git-npm-release [public|restricted (default = public)]
```

The command will do the following:

1. Ensure that no changes are unstaged in your project
2. Ask you whether this is a **major**, **minor**, or **patch** release so that `package.json` can be updated accordingly. You can also just opt to use whatever version is currently in `package.json`
3. Run an `npm install` to update the lock file. Create a git commit after updating the `package.json` (and lock file) version
4. If you're on a branch other than `master` (e.g. using git-flow and on `develop`), it will merge your branch into the `master` branch
5. Create a tag based on your `package.json` version
6. Push all updated branches and tags
7. Finally, run `npm publish`

You might also consider making an npm script to call the git-npm-release command:

```
"scripts": {
  "release": "git-npm-release [public|restricted]"
}
```
