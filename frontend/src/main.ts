import * as topbar from "./topbar"

import * as pageIndex from "./page/index"
import * as pageDashboard from "./page/dashboard"
import * as pageLogin from "./page/login"
import * as pageRegister from "./page/register"
import * as page404 from "./page/404"
import * as pageLesson from "./page/lesson"
import * as pageHomework from "./page/homework"

import 'mdui/mdui.css'
import 'mdui'

import { setTheme } from 'mdui'
import { Theme } from 'mdui/internal/theme'

import './style.css'


// 

// 深色模式初始化
const isDark = (localStorage.getItem("theme") || "light") as Theme
setTheme(isDark)
if (isDark === "dark") {
  document.documentElement.classList.add("mdui-theme-dark")
}

// 返回键监听
window.addEventListener('popstate', () => {
  document.location.reload()
})

document.querySelector<HTMLDivElement>("#top-bar")!.outerHTML = topbar.html
topbar.init()

const elementApp = document.querySelector<HTMLDivElement>('#app')!

const location = window.location.hash.slice(1)

if (location === "") {
  elementApp.outerHTML = pageIndex.html
  pageIndex.init()
} else if (location === "/dashboard") {
  elementApp.outerHTML = pageDashboard.html
  pageDashboard.init()
} else if (location === "/login") {
  elementApp.outerHTML = pageLogin.html
  pageLogin.init()
} else if (location === "/register") {
  elementApp.outerHTML = pageRegister.html
  pageRegister.init()
} else if (location.match(/^\/lesson\/\d+$/)) {
  const lessonId = location.match(/^\/lesson\/\d+$/)![0].split('/')[2]
  elementApp.outerHTML = pageLesson.html
  pageLesson.init(lessonId)
} else if( location.match(/^\/homework\/\d+$/)){
  const homeworkId = location.match(/^\/homework\/\d+$/)![0].split('/')[2]
  elementApp.outerHTML = pageHomework.html
  pageHomework.init(homeworkId)
}else {
  elementApp.outerHTML = page404.html
}