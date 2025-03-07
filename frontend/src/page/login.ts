export const html = /* html */`
<div style="display: flex; justify-content: center; align-items: center;">
    <mdui-card style="width: 40rem;justify-content: center; align-items: center;padding: 2rem;">
        <div style="font-size: x-large;font-weight: bold;">登录</div>
        <div id="login-text" style="opacity: 0.8;margin-bottom: 1rem;"></div>
        <mdui-text-field icon="account_circle" required id="login-input-endpoint" label="用户名" style="margin-bottom: 0.5rem;"></mdui-text-field>
        <mdui-text-field style="margin-top: 1rem;" icon="lock" required id="login-input-token" label="密码" type="password"
            toggle-password></mdui-text-field>
        <div style="display: flex;margin-top: 1.5rem;margin-bottom: 0.5rem;gap: 0.5rem;">
            <mdui-button id="register-button" variant="outlined" style="width: 8rem;" full-width>注册</mdui-button>
            <mdui-button id="login-button" style="flex-grow: 1;">登录</mdui-button>
        </div>
    </mdui-card>

</div>
`

export function init() {
    document.querySelector('#register-button')!.addEventListener('click', () => {
        window.location.href = '/#/register'
        location.reload()
    })

    console.log('login init')
}