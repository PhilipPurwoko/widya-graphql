import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } from '../util/config'
import knex, { Knex } from 'knex'

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
        fetchCourse: async (): Promise<Course[]> => {
            return await db('course').select('*')
        },
        fetchSingleCourse: async (_: unknown, { courseId }: { courseId: string }): Promise<Course> => {
            return await db('course').select('*').where<Course[]>('c_id', courseId).then(courses => courses[0])
        }
    }
}