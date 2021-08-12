export interface RawCourse {
    id: string
    name: string
    description: string
    price: number
}

export interface Course {
    id: string
    name: string
    price: number
    description: string
    category: string[]
    sections: Section[]
}

export interface Category {
    course_id: string
    name: string
}

export interface RawSection {
    id: string
    course_id: string
    name: string
    description: string | null
}

export interface Section {
    id: string
    name: string
    description: string | null
    module: string[]
}

export interface RawModule {
    course_section_id: string
    name: string
}