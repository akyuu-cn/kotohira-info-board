import { confirm, Dialog, snackbar } from "mdui"
import { updateAdminElements } from "../auth"


export const html = /*html*/`
<div style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
    <mdui-card style="width: 80dvh;height: auto; padding: 2rem;">
        <div style="font-size: larger;font-weight: bold;">
            欢迎来到 Kotohira 掲示板！
        </div>
        <div style="margin-top: 1rem;">
            这里是 Kotohira 琴平屋的外站兼揭示版，用于发布各类信息以及通知。为防止失联，建议加入收藏夹。
        </div>
        <div style="margin-top: 0.5rem;">
            同时，这里也是一个公共的讨论空间，欢迎大家参与。
        </div>
    </mdui-card>
</div>

<div class="admin-actions" style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
    <mdui-card id="new-announcement" style="width: 80dvh;height: auto; padding: 2rem;" clickable>
        <div style="display: flex;align-items: center;">
            <mdui-icon name="add" style="margin-right: 0.5rem;"></mdui-icon>
            <div style="font-size: larger;font-weight: bold;">发布新公告</div>
        </div>
    </mdui-card>
</div>

<div id="announcements"></div>

<div style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
    <mdui-card style="width: 80dvh;height: auto; padding: 2rem;">
        <div style="display: flex;align-items: center;">
            <mdui-icon name="chat" style="margin-right: 0.5rem;"></mdui-icon>
            <div style="font-size: larger;font-weight: bold;">公共留言板</div>
        </div>
        <div style="display: flex;flex-direction: column;margin-top: 1rem;gap: 1rem;">
            <mdui-text-field id="new-comment-author" label="昵称"></mdui-text-field>
            <mdui-text-field id="new-comment-content" rows="3" label="内容"></mdui-text-field>
            <mdui-button id="new-comment-submit">提交</mdui-button>
        </div>
    </mdui-card>
</div>

<div id="comments"></div>
`

export function init() {
    const elementAnnouncements = document.getElementById("announcements")!
    const elementComments = document.getElementById("comments")!
    const newAnnouncementDialog = document.getElementById("new-announcement-dialog") as Dialog
    const editAnnouncementDialog = document.getElementById("edit-announcement-dialog") as Dialog

    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")

    let postData: any

    function renderPost() {
        fetch("/api/v1/post").then(res => res.json()).then(data => {
            console.log(data)

            postData = data

            data.announcements.sort((a: any, b: any) => b.timestamp - a.timestamp)
            data.comments.sort((a: any, b: any) => b.timestamp - a.timestamp)

            let _ = ""
            data.announcements.forEach((announcement: any) => {
                const timeStr = new Date(announcement.timestamp).toLocaleString()
                _ += /*html*/`
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
        <mdui-card style="width: 80dvh;height: auto; padding: 2rem;">
            <div style="display: flex;align-items: center;">
                <mdui-icon name="campaign" style="margin-right: 0.5rem;"></mdui-icon>
                <div style="font-size: larger;font-weight: bold;">${announcement.title}</div>
            </div>
            <div style="margin-top: 1rem;">
                ${announcement.content.replace(/\n/g, "<br>")}
            </div>
            <div style="opacity: 0.5;font-size: smaller;margin-top: 1rem;">${announcement.author} · ${timeStr}</div>
            <div class="admin-actions" style="position: absolute;bottom: 1rem;right: 1rem;">
                <div style="display: flex;align-items: center;margin-top: 1rem;">
                    <mdui-button-icon class="delete-announcement" uuid="${announcement.uuid}" icon="delete"></mdui-button-icon>
                    <mdui-button-icon class="edit-announcement" uuid="${announcement.uuid}" icon="edit"></mdui-button-icon>
                </div>
            </div>
        </mdui-card>
    </div>
                `
            })
            elementAnnouncements.innerHTML = _

            _ = ""
            data.comments.forEach((comment: any) => {
                const timeStr = new Date(comment.timestamp).toLocaleString()
                _ += /*html*/`
    <div style="display: flex;justify-content: center;align-items: center;margin-top: 1rem;">
        <mdui-card style="width: 80dvh;height: auto; padding: 2rem;">
            <div>
                ${comment.content.replace(/\n/g, "<br>")}
            </div>
            <div style="opacity: 0.5;font-size: smaller;margin-top: 1rem;">${comment.author} · ${timeStr}</div>
            <div class="admin-actions" style="position: absolute;bottom: 1rem;right: 1rem;">
                <div style="display: flex;align-items: center;margin-top: 1rem;">
                    <mdui-button-icon class="delete-comment" uuid="${comment.uuid}" icon="delete"></mdui-button-icon>
                </div>
            </div>
        </mdui-card>
    </div>
                `
            })
            elementComments.innerHTML = _

            updateAdminElements()

            document.querySelectorAll(".delete-comment").forEach(button => {
                button.addEventListener("click", () => {
                    confirm({
                        headline: "确定要删除这条评论吗？",
                        description: "删除后将无法恢复。",
                        confirmText: "删除",
                        cancelText: "取消",
                        onConfirm: () => {
                            const uuid = button.getAttribute("uuid")!
                            fetch("/api/v1/deleteComment", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    username,
                                    password,
                                    uuid
                                })
                            }).then(res => res.json()).then(data => {
                                if (data.success) {
                                    snackbar({ "message": "删除成功" })
                                    renderPost()
                                } else {
                                    snackbar({ "message": "删除失败" })
                                }
                            })
                        },
                        onCancel: () => { },
                    })

                })
            })

            document.querySelectorAll(".delete-announcement").forEach(button => {
                button.addEventListener("click", () => {
                    confirm({
                        headline: "确定要删除这条公告吗？",
                        description: "删除后将无法恢复。",
                        confirmText: "删除",
                        cancelText: "取消",
                        onConfirm: () => {
                            const uuid = button.getAttribute("uuid")!
                            fetch("/api/v1/deleteAnnouncement", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    username,
                                    password,
                                    uuid
                                })
                            }).then(res => res.json()).then(data => {
                                if (data.success) {
                                    snackbar({ "message": "删除成功" })
                                    renderPost()
                                } else {
                                    snackbar({ "message": "删除失败" })
                                }
                            })
                        },
                        onCancel: () => { },
                    })
                })
            })

            document.querySelectorAll(".edit-announcement").forEach(button => {
                button.addEventListener("click", () => {
                    const uuid = button.getAttribute("uuid")!
                    const title = postData.announcements.find((announcement: any) => announcement.uuid === uuid)!.title
                    const content = postData.announcements.find((announcement: any) => announcement.uuid === uuid)!.content;
                    (document.getElementById("edit-announcement-title") as HTMLInputElement).value = title;
                    (document.getElementById("edit-announcement-content") as HTMLTextAreaElement).value = content
                    editAnnouncementDialog.open = true
                    editAnnouncementDialog.setAttribute("uuid", uuid)
                })
            })
        })
    }

    renderPost()

    document.getElementById("new-announcement")!.addEventListener("click", () => {

        newAnnouncementDialog.open = true
    })

    document.getElementById("new-announcement-submit")!.addEventListener("click", () => {
        const title = (document.getElementById("new-announcement-title")! as HTMLInputElement).value
        const content = (document.getElementById("new-announcement-content")! as HTMLInputElement).value
        fetch("/api/v1/newAnnouncement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                title,
                content
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                (document.getElementById("new-announcement-title")! as HTMLInputElement).value = "";
                (document.getElementById("new-announcement-content")! as HTMLInputElement).value = ""
                snackbar({ "message": "发布成功" })
                renderPost()
                newAnnouncementDialog.open = false
            } else {
                snackbar({ "message": "发布失败" })
            }
        })
    })

    document.getElementById("edit-announcement-submit")!.addEventListener("click", () => {
        const uuid = editAnnouncementDialog.getAttribute("uuid")!
        const title = (document.getElementById("edit-announcement-title")! as HTMLInputElement).value
        const content = (document.getElementById("edit-announcement-content")! as HTMLTextAreaElement).value
        fetch("/api/v1/editAnnouncement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password,
                uuid,
                title,
                content
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                snackbar({ "message": "修改成功" })
                renderPost()
                editAnnouncementDialog.open = false
            } else {
                snackbar({ "message": "修改失败" })
            }
        })
    })

    document.getElementById("new-comment-submit")!.addEventListener("click", () => {
        const author = (document.getElementById("new-comment-author")! as HTMLInputElement).value
        const content = (document.getElementById("new-comment-content")! as HTMLTextAreaElement).value
        fetch("/api/v1/newComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author,
                content
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                (document.getElementById("new-comment-author")! as HTMLInputElement).value = "";
                (document.getElementById("new-comment-content")! as HTMLTextAreaElement).value = ""
                snackbar({ "message": "发布成功" })
                renderPost()
            } else {
                snackbar({ "message": "发布失败" })
            }
        })
    })



    console.log("Welcome to Kotohira Info Board!")
}