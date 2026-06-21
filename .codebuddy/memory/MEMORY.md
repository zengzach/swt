# 项目长期记忆 (front-m-site-swt)

## 技术栈
- uni-app 微信小程序项目，主包页面在 `pages/`，分包：personalPage, loginPages, integralPages, goodsDetail, goodsLIst。
- 主包页面：index, cart, prodcutClass, integral, personal。

## uni-app 模板传参经验（重要）
uni-app 编译微信小程序时，模板中**直接给事件传字符串参数**（如 `@tap="fn('xxx')"`）会经过编译器处理，真机/某些版本下可能取不到值或报 `xxx is not defined`。
**可靠方案**：用 `data-*` 属性 + `e.currentTarget.dataset.*` 取值，事件不传参。
- 示例：`<view data-q="卡片" @tap="onQuickQuestion">` + `onQuickQuestion(e){ const q = e.currentTarget.dataset.q }`
- 已用此方式修复：`onChatLinkTap`（data-idx）、`onQuickQuestion`（data-q）。

## 主包体积（2026-06-17 状态）
主包 2163KB 超过 2048KB 限制。主因：`common/vendor.js`~2.0M（含 moment 全 locale、crypto-js、decimal.js）、`components/`~1.0M、`uni_modules/`~1.1M、`static/iconfont/iconfont.css` 254KB。
优化计划（待执行）：moment→dayjs、精简 iconfont.css、删除废弃组件（moveVerify/addressWindow/couponListWindow/tabNav）、移除未使用的 uview-ui 依赖。

## 微信小程序 scroll-view 滚动经验（重要）
- `scroll-into-view` 相同值不触发滚动，流式回复场景（idx 固定）必须改用 `scroll-top` + 数值递增。
- `scroll-top` 设大数（99999）可滚到底部，但相同值不触发，需递增或值切换（`val === 99999 ? 99998 : 99999`）。
- 流式高频 delta 场景应关闭 `scroll-with-animation`，否则卡顿。
- scroll-view 是原生组件自管滚动，CSS `overflow-y: auto` 会冲突，不要加。
- 已在 pages/index/index.vue 智能问答对话框应用此方案。
