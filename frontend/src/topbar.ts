import { setTheme } from 'mdui/functions/setTheme.js'


export const html = /*html*/`
<mdui-top-app-bar scroll-behavior="elevate">
    <!-- <mdui-icon name="auto_stories--outlined" style="font-size: 42px;margin-left: 0.5rem;"></mdui-icon> -->
    <img src="/logo.webp" style="height: 42px; margin-left: 0.5rem;">
    <mdui-top-app-bar-title id="topbar-title" style="font-weight:900;margin-left: 0.5rem;font-family: serif; cursor: pointer;">Kotohira
        掲示板</mdui-top-app-bar-title>

    <mdui-tooltip content="Github 仓库">
        <mdui-button-icon id="btn-github" style="margin-right: 0.5rem;">
            <svg style="width: 24px; height: 24px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
        </mdui-button-icon>
    </mdui-tooltip>

    <mdui-tooltip content="切换深色 / 浅色">
        <mdui-button-icon id="btn-dark-mode" icon="dark_mode" style="margin-right: 0.5rem;"></mdui-button-icon>
    </mdui-tooltip>

    <mdui-tooltip content="登录">
        <mdui-button-icon id="btn-login" icon="login"></mdui-button-icon>
    </mdui-tooltip>

    <mdui-tooltip content="登出">
        <mdui-button-icon id="btn-logout" icon="logout"></mdui-button-icon>
    </mdui-tooltip>

</mdui-top-app-bar>
`

export function init() {

    const topbarTitle = document.querySelector("#topbar-title")!
    const btnDarkMode = document.querySelector("#btn-dark-mode")!
    const btnGithub = document.querySelector("#btn-github")!
    const btnLogin = document.querySelector("#btn-login")!
    const btnLogout = document.querySelector("#btn-logout")!

    topbarTitle.addEventListener("click", () => {
        document.location.href = "/"
    })

    btnGithub.addEventListener("click", () => {
        document.location.href = "https://github.com/akyuu-cn/kotohira-info-board"
    })

    btnLogin.addEventListener("click", () => {
        document.location.href = "/#/login"
        document.location.reload()
    })

    btnLogout.addEventListener("click", () => {
        localStorage.removeItem("username")
        localStorage.removeItem("password")
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