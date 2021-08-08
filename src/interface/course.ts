export interface RawCourse {
    c_id: string
    c_name: string
    c_description: string
    c_price: number
    category: string
}

export interface Course {
    id: string
    name: string
    price: number
    description: string
    category: string[]
}