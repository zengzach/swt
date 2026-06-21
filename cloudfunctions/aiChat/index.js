const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

// 智能问答云函数 - 仅负责数据检索（快速返回）
exports.main = async (event, context) => {
  const { question } = event

  if (!question || !question.trim()) {
    return { products: [], factories: [], categories: [] }
  }

}



// const cloud = require('wx-server-sdk')
// cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// const db = cloud.database()

// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()
//   const openid = wxContext.OPENID
//   const {
//     botId,
//     threadId,
//     content,
//     messages = []  // 历史消息，用于上下文
//   } = event

//   if (!content) {
//     return { success: false, error: '缺少消息内容' }
//   }

//   try {
//     // 调用 AI Bot API
//     const result = await cloud.extend.AI.bot.sendMessage({
//       botId: botId || 'default',
//       msg: content,
//       openid: openid,
//       // 如果有线程 ID，可以传入以保持上下文
//       ...(threadId ? { sessionId: threadId } : {}),
//       // 传入历史消息以保持上下文
//       messages: messages.map(m => ({
//         role: m.role,
//         content: m.content
//       }))
//     })

//     console.log('[aiChat] AI 回复成功')

//     return {
//       success: true,
//       reply: result.reply || result.content || '',
//       messageId: result.messageId || ''
//     }
//   } catch (err) {
//     console.error('[aiChat] AI 调用失败:', err)
//     return {
//       success: false,
//       error: err.message,
//       errorCode: err.errCode || ''
//     }
//   }
// }
