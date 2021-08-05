import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../util/config'
import knex, { Knex } from 'knex'

/**
 * Course type for a single course data
 * @c_id VARCHAR(36) NOT NULL PRIMARY KEY,
 * @c_name VARCHAR(45) NOT NULL,
 * @c_description VARCHAR(200) NOT NULL,
 * @c_price INT NOT NULL,
 */
interface Course {
    c_id: string
    c_name: string
    c_description: string
    c_price: number
}

const db: Knex = knex({
    client: 'mysql2',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME
    }
})

export default {
    Query: {
        /**
         * Fetch all course data from mysql database
         */
        fetchCourse: async (): Promise<Course[]> => {
            return await db('course').select('*')
        },
        /**
         * Returns single value of Course data
         */
        fetchSingleCourse: async (_: unknown, { courseId }: { courseId: string }): Promise<Course> => {
            return await db('course').select('*').where<Course[]>('c_id', courseId).then(courses => courses[0])
        }
    }
}