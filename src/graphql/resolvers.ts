import db from '../util/database'
import { RowDataPacket } from 'mysql2/promise'
import { Course, RawCourse, Category, RawSection, Section, RawModule } from '../interface/course'

/** @returns All courses data from mysql database */
const fetchCourse = async (): Promise<Course[]> => {
    const fetchedCourse = await db.query('SELECT * FROM widya.course;') as RowDataPacket[][]
    const fetchedCategory = await db.query('SELECT course_id, category.name FROM widya.category JOIN course_has_category ON category.id=course_has_category.category_id;') as RowDataPacket[][]
    const fetchedSection = await db.query('SELECT * FROM widya.course_section;') as RowDataPacket[][]
    const fetchedModule = await db.query('SELECT course_section_id, name FROM widya.course_module;') as RowDataPacket[][]

    const rawCourse = fetchedCourse[0] as RawCourse[]
    const rawCategory = fetchedCategory[0] as Category[]
    const rawSection = fetchedSection[0] as RawSection[]
    const rawModule = fetchedModule[0] as RawModule[]

    return rawCourse.map<Course>((rawCourse: RawCourse) => {
        // Return a category that only belongs to sepecific course.
        const categories = rawCategory.reduce<string[]>((a: string[], o: Category) => (o.course_id == rawCourse.id && a.push(o.name), a), [])

        // Return a sections that only belongs to sepecific course.
        const sections = rawSection.reduce<RawSection[]>((a: RawSection[], o: RawSection) => (o.course_id == rawCourse.id && a.push(o), a), [])

        return <Course>{
            id: rawCourse.id,
            name: rawCourse.name,
            description: rawCourse.description,
            price: rawCourse.price,
            category: categories,
            sections: sections.map<Section>((section: RawSection) => {
                // Return a modules that only belongs to sepecific course section.
                const modules = rawModule.reduce<string[]>((a: string[], o: RawModule) => (o.course_section_id == section.id && a.push(o.name), a), [])
                return <Section>{
                    name: section.name,
                    description: section.description,
                    module: modules,
                }
            })
        }
    })
}

/**
 * 
 * @param _ Unknown, mercurius need first parameter
 * @param courseId Id of expected course
 * @returns Single value of course
*/
const fetchSingleCourse = async (_: unknown, { courseId }: { courseId: string }): Promise<Course | undefined> => {
    const courses = await fetchCourse()
    const course = courses.find((c: Course) => c.id == courseId)
    if (course == null) throw new Error('Not Found')
    return course
}

export default {
    Query: {
        fetchCourse: fetchCourse,
        fetchSingleCourse: fetchSingleCourse
    },
}