import * as fs from 'fs'
import * as path from 'path'

test('View files are exist', () => {
    fs.readdir(path.join(__dirname, '../src', 'view'), (_err: NodeJS.ErrnoException, files: string[]) => {
        expect(files.sort()).toEqual([
            'index.ejs',
            '404.ejs',
            '500.ejs'
        ].sort())
    })
})