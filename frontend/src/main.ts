import * as topbar from "./topbar"

import * as pageIndex from "./page/index"
import * as pageLogin from "./page/login"
import * as page404 from "./page/404"

import 'mdui/mdui.css'
import 'mdui'

import { setTheme } from 'mdui'
import { Theme } from 'mdui/internal/theme'

import './style.css'

import * as auth from './auth'


// 

// 深色模式初始化
const isDark = (localStorage.getItem("theme")) as Theme
if (isDark) {
  setTheme(isDark)
  if (isDark === "dark") {
    document.documentElement.classList.add("mdui-theme-dark")
  }
} else {
  setTheme("auto")
}

// 返回键监听
window.addEventListener('popstate', () => {
  document.location.reload()
})

document.querySelector<HTMLDivElement>("#top-bar")!.outerHTML = topbar.html
topbar.init()
await auth.init()

const elementApp = document.querySelector<HTMLDivElement>('#app')!

const location = window.location.hash.slice(1)

if (location === "") {
  elementApp.outerHTML = pageIndex.html
  pageIndex.init()
} else if (location === "/login") {
  elementApp.outerHTML = pageLogin.html
  pageLogin.init()
} else {
  elementApp.outerHTML = page404.html
}

