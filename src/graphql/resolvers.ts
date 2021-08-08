import db from '../util/database'
import { RowDataPacket } from 'mysql2/promise'
import { Course, RawCourse } from '../interface/course'

export default {
    Query: {
        /** Fetch all course data from mysql database */
        fetchCourse: async (): Promise<Course[]> => {
            const data = await db.query("SELECT course.c_id, course.c_name, course.c_description, course.c_price, group_concat(category.cat_name SEPARATOR ',') as category FROM widya.course LEFT OUTER JOIN course_has_category ON course.c_id = course_has_category.c_id LEFT OUTER JOIN category ON course_has_category.cat_id = category.cat_id GROUP BY c_id;") as RowDataPacket[][]
            const rawCourse = data[0] as RawCourse[]
            const courses = rawCourse.map<Course>((rawCourse: RawCourse) => {
                const course: Course = {
                    id: rawCourse.c_id,
                    name: rawCourse.c_name,
                    description: rawCourse.c_description,
                    price: rawCourse.c_price,
                    category: rawCourse.category.split(',')
                }
                return course
            })
            return courses
        },
        /** Returns single value of Course data  */
        fetchSingleCourse: async (_: unknown, { courseId }: { courseId: string }): Promise<Course> => {
            const data = await db.query(`SELECT course.c_id, course.c_name, course.c_description, course.c_price, group_concat(category.cat_name SEPARATOR ',') as category FROM widya.course LEFT OUTER JOIN course_has_category ON course.c_id = course_has_category.c_id LEFT OUTER JOIN category ON course_has_category.cat_id = category.cat_id WHERE course.c_id='${courseId}' GROUP BY c_id;`) as RowDataPacket[][]
            const rawCourse = data[0] as RawCourse[]
            const courses = rawCourse.map<Course>((rawCourse: RawCourse) => {
                const course: Course = {
                    id: rawCourse.c_id,
                    name: rawCourse.c_name,
                    description: rawCourse.c_description,
                    price: rawCourse.c_price,
                    category: rawCourse.category.split(',')
                }
                return course
            })
            return courses[0]
        },
    }
}