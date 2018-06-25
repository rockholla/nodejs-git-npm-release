import Releaser from '../lib/releaser'

describe('releaser', () => {

  it('releaser throws an error when run from non-project directory', () => {
    expect(() => {
      new Releaser()
    }).toThrow(/.*does not contain a package.*/)
  })

})
