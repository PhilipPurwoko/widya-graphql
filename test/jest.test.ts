import * as env from '../src/util/env'

test('Environment Variables', () => {
    expect(env.DB_NAME).not.toEqual('')
    expect(env.DB_USER).not.toEqual('')
    expect(env.DB_PASSWORD).not.toEqual('')
})