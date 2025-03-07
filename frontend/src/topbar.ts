import { setTheme } from 'mdui/functions/setTheme.js'


export const html = /*html*/`
<mdui-top-app-bar scroll-behavior="elevate">
    <mdui-icon name="auto_stories--outlined" style="font-size: 42px;margin-left: 0.5rem;"></mdui-icon>
    <mdui-top-app-bar-title id="topbar-title" style="font-weight:900;margin-left: 0.5rem;font-family: serif; cursor: pointer;">马铃薯云学习平台</mdui-top-app-bar-title>
    <div style="flex-grow: 1"></div>
    <mdui-tooltip content="切换深色 / 浅色">
        <mdui-button-icon id="btn-dark-mode" icon="dark_mode"></mdui-button-icon>
    </mdui-tooltip>
    <div style="flex-grow: 1"></div>
    <mdui-tooltip content="个人中心">
        <mdui-button-icon id="btn-dashboard" icon="account_circle"></mdui-button-icon>
    </mdui-tooltip>
    <div style="flex-grow: 1"></div>
    <mdui-tooltip content="登录">
        <mdui-button-icon id="btn-login" icon="login"></mdui-button-icon>
    </mdui-tooltip>
    </mdui-top-app
-bar>
`

export function init() {

    const topbarTitle = document.querySelector("#topbar-title")!
    const btnDarkMode = document.querySelector("#btn-dark-mode")!
    const btnDashboard = document.querySelector("#btn-dashboard")!
    const btnLogin = document.querySelector("#btn-login")!

    topbarTitle.addEventListener("click", () => {
        document.location.href = "/"
    })

    btnDashboard.addEventListener("click", () => {
        document.location.href = "/#/dashboard"
        document.location.reload()
    })

    btnLogin.addEventListener("click", () => {
        document.location.href = "/#/login"
        document.location.reload()
    })


    btnDarkMode.addEventListener("click", () => {
        const isDark = localStorage.getItem("theme") === "dark"
        if (isDark) {
            setTheme("light")
            btnDarkMode.setAttribute("icon", "dark_mode")
            localStorage.setItem("theme", "light")
        } else {
            setTheme("dark")
            btnDarkMode.setAttribute("icon", "light_mode")
            localStorage.setItem("theme", "dark")
        }
        console.log("Dark mode clicked")
    })

    console.log("Topbar initialized")
}