import * as env from '../src/util/config'
import resolvers from '../src/graphql/resolvers'

test('Environment Variables', () => {
    expect(env.DB_NAME).not.toEqual('')
    expect(env.DB_USER).not.toEqual('')
    expect(env.DB_PASSWORD).not.toEqual('')
})

test('GraphQL Resolver', () => {
    expect(resolvers.Query).toHaveProperty('fetchCourse')
    expect(resolvers.Query).toHaveProperty('fetchSingleCourse')
})