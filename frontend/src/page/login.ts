import { snackbar } from "mdui"

export const html = /* html */`
<div style="display: flex; justify-content: center; align-items: center;margin-top: 1rem;">
    <mdui-card style="width: 40rem;justify-content: center; align-items: center;padding: 2rem;">
        <div style="font-size: x-large;font-weight: bold;margin-bottom:1rem;">登录</div>
\        <mdui-text-field icon="account_circle" required id="login-input-username" label="用户名" style="margin-bottom: 0.5rem;"></mdui-text-field>
        <mdui-text-field style="margin-top: 1rem;" icon="lock" required id="login-input-password" label="密码" type="password"
            toggle-password></mdui-text-field>
        <div style="display: flex;margin-top: 1.5rem;margin-bottom: 0.5rem;gap: 0.5rem;">
            <mdui-button id="login-button" style="flex-grow: 1;">登录</mdui-button>
        </div>
    </mdui-card>

</div>
`

export function init() {
    const loginButton = document.getElementById('login-button')!
    const loginInputUsername = document.getElementById('login-input-username') as HTMLInputElement
    const loginInputPassword = document.getElementById('login-input-password') as HTMLInputElement

    loginButton.addEventListener('click', () => {
        fetch('/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginInputUsername.value,
                password: loginInputPassword.value
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                snackbar({
                    message: '登录成功，正在跳转...'
                })

                localStorage.setItem('username', loginInputUsername.value)
                localStorage.setItem('password', loginInputPassword.value)

                setTimeout(() => {
                    location.href = '/'
                }, 1000)
            } else {
                snackbar({
                    message: '用户名或密码错误'
                })
            }
        })

    })


    console.log('login init')
}