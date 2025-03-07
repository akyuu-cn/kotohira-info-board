import fs from 'fs'
import log4js from 'log4js'

const logger = log4js.getLogger('user')
logger.level = "TRACE"

interface User {
    username: string
    password: string
}

export let list: User[] = []

export function init() {
    const file = JSON.parse(fs.readFileSync('data/user/list.json', 'utf8'))
    list = file
    logger.info('User list initialized')
    logger.debug(list)
}

export function check(username: any, password: any) {
    const user = list.find(u => u.username === username && u.password === password)
    return user
}