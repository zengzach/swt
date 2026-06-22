const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

// 保存一轮完整对话（用户消息 + AI消息 + 线程更新 + 消息计数），减少数据库操作
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { threadId, userContent, aiContent } = event

  if (!threadId || !userContent || !aiContent) {
    return { success: false, error: '参数不完整' }
  }

  try {
    // 并行：新增用户消息 + 新增AI消息 + 读取线程信息
    const [userMsgRes, aiMsgRes, threadRes] = await Promise.all([
      db.collection('chat_messages').add({
        data: {
          threadId,
          openid,
          role: 'user',
          content: userContent,
          timestamp: db.serverDate()
        }
      }),
      db.collection('chat_messages').add({
        data: {
          threadId,
          openid,
          role: 'assistant',
          content: aiContent,
          timestamp: db.serverDate()
        }
      }),
      db.collection('chat_threads').doc(threadId).get()
    ])

    // 更新线程（只写一次：updatedAt + messageCount+2 + 首条消息设标题）
    const currentCount = (threadRes.data && threadRes.data.messageCount) || 0
    const updateData = {
      updatedAt: db.serverDate(),
      messageCount: currentCount + 2
    }
    if (currentCount === 0) {
      updateData.title = userContent.substring(0, 20)
    }
    await db.collection('chat_threads').doc(threadId).update({ data: updateData })

    return {
      success: true,
      userMessageId: userMsgRes._id,
      aiMessageId: aiMsgRes._id
    }
  } catch (err) {
    console.error('[saveChatRound] 保存对话失败:', err)
    return { success: false, error: err.message }
  }
}
