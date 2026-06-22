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

## 智能问答数据库操作优化（2026-06-21）
- **问题**：一次问答约 22 次数据库操作（4 次云函数调用），且草稿保存的竞态条件导致重复消息。
- **方案**：新建 `saveChatRound` 云函数，合并用户消息+AI消息+线程更新+消息计数为一次调用；移除流式过程中的草稿保存逻辑。
- **改动文件**：`cloudfunctions/saveChatRound/index.js`（新建）、`pages/index/index.vue`（移除草稿变量和保存逻辑，RUN_FINISHED 改用 saveChatRound）。
- **效果**：数据库操作从 ~22 次降至 ~7 次，云函数调用从 4 次降至 2 次（saveChatRound + saveChatLog 异步）。
- 旧云函数 `saveChatMessage`、`updateMsgCount` 前端已不再调用，保留在云端未删除。

## 云函数部署方式（重要）
- **微信云开发环境**（envId 格式 `cloud1-xxx`）不能用 `tcb fn deploy --force` 创建新函数，报 `CreateFunction runtime参数错误`。
- **已有函数更新代码**：用 `tcb fn code update <name> --env-id <envId> --dir ./cloudfunctions/<name>` 即可。
- **新建函数**：用 CloudBase MCP 工具 `manageFunctions`（action=createFunction, functionRootPath 指向 cloudfunctions 目录），支持 `Nodejs18.15` 等 runtime。
- 云开发环境：`cloud1-d1gdmvmst507ae4d9`（ap-shanghai）。

## 智能问答 Markdown 渲染（2026-06-22）
- **自写转换器** `utils/markdown.js`：不依赖第三方库，支持标题/粗体/斜体/代码块/列表/引用/链接/表格/删除线/水平线，带模块级缓存。
- **流式渲染策略**：AI 消息 `isStreaming=true` 时用 `<text>` 纯文本（避免每 token 解析 markdown 卡顿），流式完成后 `isStreaming=false` 切换为 `<mp-html>` 渲染。
- **mp-html** 已有（v2.4.2，easycom 自动引入，无需 import），通过 `tag-style` prop 控制标签样式。
- **回到最新按钮**：scroll-view `@scroll` 事件 + 懒加载视口高度计算距底距离，用户上滑时跳过流式自动滚动。
- 模板中 "111" 测试按钮用户要求保留。
