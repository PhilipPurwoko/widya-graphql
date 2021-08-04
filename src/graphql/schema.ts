import { gql } from 'mercurius-codegen'

export default gql`
    type Course {
        c_id: String
        c_name: String
        c_description: String
        c_price: Int
    }
    type Query {
        fetchCourse: [Course]
        fetchSingleCourse(courseId: String!): Course
    }
`