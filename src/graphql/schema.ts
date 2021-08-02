import { gql } from 'mercurius-codegen'

export default gql`
    type Query {
        fetchCourse(courseId: String!): String
    }
`