import db from '../util/database'
import { RowDataPacket } from 'mysql2/promise'
import { Course, RawCourse, Category, RawSection, Section, RawModule } from '../interface/course'

const filterById = (id: string, categories: Category[]): string[] => {
    return categories.reduce<string[]>((a: string[], o: Category) => (o.course_id == id && a.push(o.name), a), [])
}

const filterSectionById = (id: string, sections: RawSection[]): RawSection[] => {
    return sections.reduce<RawSection[]>((a: RawSection[], o: RawSection) => (o.course_id == id && a.push(o), a), [])
}

const filterModuleById = (id: string, modules: RawModule[]): string[] => {
    return modules.reduce<string[]>((a: string[], o: RawModule) => (o.course_section_id == id && a.push(o.name), a), [])
}

/** Fetch all course data from mysql database */
const fetchCourse = async (): Promise<Course[]> => {
    const fetchedCourse = await db.query('SELECT * FROM widya.course;') as RowDataPacket[][]
    const fetchedCategory = await db.query('SELECT course_id, category.name FROM widya.category JOIN course_has_category ON category.id=course_has_category.category_id;') as RowDataPacket[][]
    const fetchedSection = await db.query('SELECT * FROM widya.course_section;') as RowDataPacket[][]
    const fetchedModule = await db.query('SELECT course_section_id, name FROM widya.course_module;') as RowDataPacket[][]

    const rawCourse = fetchedCourse[0] as RawCourse[]
    const rawCategory = fetchedCategory[0] as Category[]
    const rawSection = fetchedSection[0] as RawSection[]
    const rawModule = fetchedModule[0] as RawModule[]

    const courses = rawCourse.map<Course>((rawCourse: RawCourse) => {
        const sections = filterSectionById(rawCourse.id, rawSection)
        const course: Course = {
            id: rawCourse.id,
            name: rawCourse.name,
            description: rawCourse.description,
            price: rawCourse.price,
            category: filterById(rawCourse.id, rawCategory),
            sections: sections.map<Section>((section: RawSection) => <Section>{
                name: section.name,
                description: section.description,
                module: filterModuleById(section.id, rawModule)
            })
        }
        return course
    })
    return courses
}

/** Returns single value of Course data  */
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