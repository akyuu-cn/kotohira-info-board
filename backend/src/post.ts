import log4js from "log4js"
import fs from "fs"

const logger = log4js.getLogger('post')
logger.level = 'TRACE'

export let list: List

export interface List {
    announcements: Announcement[],
    comments: Comment[]
}

export interface Announcement {
    uuid: string,
    title: string,
    content: string,
    author: string,
    timestamp: number
}

export interface Comment {
    uuid: string,
    content: string,
    author: string,
    timestamp: number
}

export function init() {
    const file = JSON.parse(fs.readFileSync('data/post/list.json', 'utf8'))
    list = file
    logger.info('Post list initialized')
    logger.debug(list)
}

export function save() {
    fs.writeFileSync('data/post/list.json', JSON.stringify(list), 'utf8')
    logger.info('Post list saved')
}
