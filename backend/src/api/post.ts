import { Request, Response } from "express-serve-static-core"
import { list, save, List } from "../post.js"
import type { Announcement, Comment } from "../post.js"
import { check } from "../user.js"

export function get(req: Request, res: Response) {
    res.json(list)
}

export function newAnnouncement(req: Request, res: Response) {
    try {
        const { username, password, content, title } = req.body
        if (check(username, password)) {
            if (!content) {
                res.status(400).json({ "success": false, "message": "Invalid announcement" })
                return
            } else {
                const announcement: Announcement = {
                    uuid: crypto.randomUUID(),
                    title: String(title),
                    content: String(content),
                    author: String(username),
                    timestamp: new Date().getTime()
                }
                list.announcements.push(announcement)
                save()
                res.json({ "success": true })
            }
        } else {
            res.status(401).json({ "success": false, "message": "Unauthorized" })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ "success": false, "message": "Internal Server Error" })
    }
}

export function editAnnouncement(req: Request, res: Response) {
    try {
        const { username, password, uuid, content, title } = req.body
        if (check(username, password)) {
            if (!uuid || !content || !title) {
                res.status(400).json({ "success": false, "message": "Invalid request" })
                return
            }
            const announcement = list.announcements.find(a => a.uuid === uuid)
            if (announcement) {
                announcement.content = String(content)
                announcement.title = String(title)
                announcement.timestamp = new Date().getTime()
                save()
                res.json({ "success": true })
            } else {
                res.status(404).json({ "success": false, "message": "Announcement not found" })
            }
        } else {
            res.status(401).json({ "success": false, "message": "Unauthorized" })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ "success": false, "message": "Internal Server Error" })
    }
}

export function deleteAnnouncement(req: Request, res: Response) {
    try {
        const { username, password, uuid } = req.body
        if (check(username, password)) {
            if (!uuid) {
                res.status(400).json({ "success": false, "message": "Invalid request" })
                return
            }
            const index = list.announcements.findIndex(a => a.uuid === uuid)
            if (index !== -1) {
                list.announcements.splice(index, 1)
                save()
                res.json({ "success": true })
            } else {
                res.status(404).json({ "success": false, "message": "Announcement not found" })
            }
        } else {
            res.status(401).json({ "success": false, "message": "Unauthorized" })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ "success": false, "message": "Internal Server Error" })
    }
}

export function newComment(req: Request, res: Response) {
    try {
        const { author, content } = req.body
        if (!content || !author) {
            res.status(400).json({ "success": false, "message": "Invalid comment" })
        } else {
            const comment: Comment = {
                uuid: crypto.randomUUID(),
                content: String(content),
                author: String(author),
                timestamp: new Date().getTime()
            }
            list.comments.push(comment)
            save()
            res.json({ "success": true })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ "success": false, "message": "Internal Server Error" })
    }
}

export function deleteComment(req: Request, res: Response) {
    try {
        const { username, password, uuid } = req.body
        if (check(username, password)) {
            if (!uuid) {
                res.status(400).json({ "success": false, "message": "Invalid request" })
                return
            }
            const commentIndex = list.comments.findIndex(c => c.uuid === uuid)
            if (commentIndex !== -1) {
                list.comments.splice(commentIndex, 1)
                save()
                res.json({ "success": true })
            } else {
                res.status(404).json({ "success": false, "message": "Comment not found" })
            }
        } else {
            res.status(401).json({ "success": false, "message": "Unauthorized" })
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({ "success": false, "message": "Internal Server Error" })
    }
}