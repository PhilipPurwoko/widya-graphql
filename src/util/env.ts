import { config } from 'dotenv'
config()

export const DB_HOST: string = process.env.DB_HOST ?? 'localhost'
export const DB_PORT: number = parseInt(<string>process.env.DB_PORT, 10) ?? 3306
export const PORT: number = parseInt(<string>process.env.PORT, 10) ?? 3000
export const DB_USER: string = process.env.DB_USER ?? ''
export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? ''
export const DB_NAME: string = process.env.DB_NAME ?? ''