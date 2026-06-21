const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

// 最大加载历史轮数（1轮 = 1问1答 = 2条消息）
const MAX_ROUNDS = 10
const MAX_MESSAGES = MAX_ROUNDS * 2

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { botId } = event

  try {
    // 1. 查找用户活跃线程
    const threadRes = await db.collection('chat_threads')
      .where({
        openid,
        status: 'active'
      })
      .orderBy('updatedAt', 'desc')
      .limit(1)
      .get()

    let threadId = ''

    if (threadRes.data && threadRes.data.length > 0) {
      // 有活跃线程，复用
      threadId = threadRes.data[0]._id
    } else {
      // 无活跃线程，创建新线程
      threadId = 'thread_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
      await db.collection('chat_threads').add({
        data: {
          _id: threadId,
          openid,
          botId: botId || '',
          status: 'active',
          title: '',
          messageCount: 0,
          createdAt: db.serverDate(),
          updatedAt: db.serverDate()
        }
      })
      return { threadId, messages: [] }
    }

    // 2. 加载最近消息（截断策略：只取最近 MAX_MESSAGES 条）
    const msgRes = await db.collection('chat_messages')
      .where({ threadId })
      .orderBy('timestamp', 'desc')
      .limit(MAX_MESSAGES)
      .get()

    // 反转回时间升序
    const messages = msgRes.data.reverse().map(m => ({
      role: m.role,
      content: m.content,
      timestamp: m.timestamp
    }))

    return { threadId, messages }
  } catch (err) {
    console.error('[getChatThread] 获取对话线程失败:', err)
    // 失败时返回新线程 ID，不阻塞用户
    const fallbackId = 'thread_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8)
    return { threadId: fallbackId, messages: [] }
  }
}
