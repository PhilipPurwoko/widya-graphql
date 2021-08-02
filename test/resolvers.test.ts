import resolvers from "../src/graphql/resolvers"

test('GraphQL Resolver', () => {
    expect(resolvers.Query.hello()).toEqual('Hello World')
})