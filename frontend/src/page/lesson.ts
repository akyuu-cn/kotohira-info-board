export const html = /* html */`
<div style="display: flex;">
  <mdui-list style="width: 15rem;position: fixed;height: 100%;">
    <mdui-list-item active id="tab-1-btn">1 马铃薯的种植绪论</mdui-list-item>
    <mdui-list-item id="tab-2-btn">2 马铃薯的营养价值</mdui-list-item>
    <mdui-list-item id="tab-3-btn">3 马铃薯的营养成分</mdui-list-item>
    <mdui-list-item id="tab-4-btn">4 马铃薯的营养保健</mdui-list-item>
    <mdui-list-item id="tab-5-btn">5 马铃薯的食用方法</mdui-list-item>
    <mdui-list-item id="tab-6-btn">6 马铃薯的养殖技术</mdui-list-item>
    <mdui-list-item id="tab-7-btn">7 马铃薯的病理生理</mdui-list-item>
    <div style="position: fixed;bottom: 0.5rem;width: 15rem;">
      <hr style="opacity: 0.25;">
      <mdui-list-item id="tab-chat-btn">教师交流
        <mdui-icon slot="icon" name="hub"></mdui-icon>
      </mdui-list-item>
    </div>
  </mdui-list>

  <div id="tab-1" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-2" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-3" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-4" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-5" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-6" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-7" hidden style="margin-left: 15rem;flex-grow: 1;">
    你好 我是土豆
  </div>

  <div id="tab-chat" hidden style="margin-left: 15rem;flex-grow: 1;height: 90vh;">
    <div style="padding: 1rem;display: flex;flex-direction: column;gap: 1rem;height: 90vh;">
      <mdui-card style="width: 100%;padding: 2rem;height: 90vh;display: flex;flex-direction: column;gap: 1rem;">

        <div>
          <div style="opacity: 0.5;font-size: small;margin-bottom: 0.5rem;">2025-01-01 12:00:00</div>
          <div style="display: flex;align-items: center;gap: 1rem;">
            <mdui-avatar icon="school"></mdui-avatar>
            <div>在暑假结束前完成土豆种植的作业喵</div>
          </div>
        </div>

        <div>
          <div style="opacity: 0.5;font-size: small;margin-bottom: 0.5rem;">2025-01-01 12:00:00</div>
          <div style="display: flex;align-items: center;gap: 1rem;">
            <mdui-avatar icon="person"></mdui-avatar>
            <div>收到喵</div>
          </div>
        </div>

        <div style="margin-top: auto;display: flex;gap: 1rem;align-items: center;">
          <mdui-text-field label="消息"></mdui-text-field>
          <mdui-button-icon variant="filled" icon="send"></mdui-button-icon>
        </div>

      </mdui-card>
    </div>
  </div>

  <style>
    .grid-container {
      display: grid;
      padding: 2rem;
      gap: 1rem;
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }

  </style>

</div>
`

export function init(id: string) {
  const tabs = [1, 2, 3, 4, 5, 6, 7, "chat"].map(tabId => ({
    tab: document.getElementById(`tab-${tabId}`)!,
    btn: document.getElementById(`tab-${tabId}-btn`)!
  }))

  tabs.forEach(({ btn }, index) => {
    btn.addEventListener('click', () => {
      switchTab(index + 1)
    })
  })

  function switchTab(tab: number) {
    tabs.forEach(({ tab, btn }) => {
      tab.setAttribute("hidden", "true")
      btn.removeAttribute("active")
    })

    const selectedTab = tabs[tab - 1]
    if (selectedTab) {
      selectedTab.tab.removeAttribute("hidden")
      selectedTab.btn.setAttribute("active", "true")
    } else {
      console.error(`Invalid tab number: ${tab}`)
    }
  }
  console.log(id)
}