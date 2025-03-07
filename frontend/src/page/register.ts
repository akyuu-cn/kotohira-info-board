export const html = /* html */`
<div style="display: flex; justify-content: center; align-items: center;">
    <mdui-card style="width: 40rem;justify-content: center; align-items: center;padding: 2rem;">
        <div style="font-size: x-large;font-weight: bold;margin-bottom: 1rem;">注册</div>
        <mdui-text-field icon="account_circle" required id="dialog-login-input-endpoint" label="用户名"></mdui-text-field>
        <mdui-text-field style="margin-top: 1rem;" icon="lock" required id="dialog-login-input-token" label="密码" type="password"
            toggle-password></mdui-text-field>
        <mdui-text-field style="margin-top: 1rem;margin-bottom: 0.5rem;" icon="lock" required id="dialog-login-input-token"
            label="确认密码" type="password" toggle-password></mdui-text-field>
        <mdui-radio-group value="chinese" style="margin-top: 0.5rem;">
            <mdui-radio value="chinese">学生</mdui-radio>
            <mdui-radio value="english">教师</mdui-radio>
        </mdui-radio-group>
        <div style="display: flex;margin-top: 0.5rem;margin-bottom: 0.5rem;gap: 0.5rem;">
            <mdui-button id="back-button" variant="outlined" style="width: 8rem;" full-width>返回</mdui-button>
            <mdui-button id="register-button" style="flex-grow: 1;">注册</mdui-button>
        </div>

</div>
`

export function init() {
    document.querySelector('#back-button')!.addEventListener('click', () => {
        window.location.href = '/#/login'
        location.reload()
    })

    console.log("register init")
}