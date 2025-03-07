export const html = /*html*/`
<div style="width: 100%;display: flex;flex-direction: column;gap: 1rem;">
    <mdui-card style="margin: 0 2rem;flex-grow: 1;padding: 1.5rem;">
        <div style="font-size: larger;font-weight: bold;margin-bottom: 0.5rem;">题目 1</div>
        <div style="margin-bottom: 0.5rem;">我是题干啦啦啦啦啦</div>
        <mdui-radio-group value="">
            <mdui-radio value="A">A</mdui-radio>
            <mdui-radio value="B">B</mdui-radio>
            <mdui-radio value="C">C</mdui-radio>
            <mdui-radio value="D">D</mdui-radio>
        </mdui-radio-group>
    </mdui-card>

    <mdui-card style="margin: 0 2rem;flex-grow: 1;padding: 1.5rem;">
        <div style="font-size: larger;font-weight: bold;margin-bottom: 0.5rem;">题目 2</div>
        <div style="margin-bottom: 0.5rem;">对对吗</div>
        <mdui-radio-group value="">
            <mdui-radio value="T">对的对的</mdui-radio>
            <mdui-radio value="F">哦哦不对的</mdui-radio>
        </mdui-radio-group>
    </mdui-card>

    <mdui-card style="margin: 0 2rem;flex-grow: 1;padding: 1.5rem;">
        <div style="font-size: larger;font-weight: bold;margin-bottom: 0.5rem;">题目 3</div>
        <div style="margin-bottom: 0.5rem;">你好，我是题目 3</div>
        <mdui-text-field label="答题区"></mdui-text-field>
    </mdui-card>

    <mdui-button full-width style="margin: 0 2rem;">提交</mdui-button>
</div>
`

export function init(id: string) {
    console.log("Homework page init", id)
}