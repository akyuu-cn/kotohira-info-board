import log4js from "log4js";
import fs from "fs";
const logger = log4js.getLogger('post');
logger.level = 'TRACE';
export let list;
export function init() {
    const file = JSON.parse(fs.readFileSync('data/post/list.json', 'utf8'));
    list = file;
    logger.info('Post list initialized');
    logger.debug(list);
}
export function save() {
    fs.writeFileSync('data/post/list.json', JSON.stringify(list), 'utf8');
    logger.info('Post list saved');
}
