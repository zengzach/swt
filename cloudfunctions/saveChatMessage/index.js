const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { threadId, role, content, messageId } = event

  if (!threadId || !role || !content) {
    return { success: false, error: '参数不完整' }
  }

  try {
    let resultMessageId = messageId

    if (messageId) {
      // 尝试更新已存在的消息
      const msgRes = await db.collection('chat_messages').doc(messageId).get()
      if (msgRes.data) {
        // 消息存在，更新 content
        await db.collection('chat_messages').doc(messageId).update({
          data: {
            content,
            timestamp: db.serverDate()
          }
        })
      } else {
        // 消息不存在（可能被删除），重新新增
        const addRes = await db.collection('chat_messages').add({
          data: {
            threadId,
            openid,
            role,
            content,
            timestamp: db.serverDate()
          }
        })
        resultMessageId = addRes._id
      }
    } else {
      // 新增消息
      const addRes = await db.collection('chat_messages').add({
        data: {
          threadId,
          openid,
          role,
          content,
          timestamp: db.serverDate()
        }
      })
      resultMessageId = addRes._id
    }

    // 更新线程的 updatedAt（只有新增消息时才增加 messageCount）
    const threadRes = await db.collection('chat_threads').doc(threadId).get()
    const currentCount = (threadRes.data && threadRes.data.messageCount) || 0

    const updateData = {
      updatedAt: db.serverDate()
    }

    // 如果是新增消息（非更新），增加 messageCount
    if (!messageId) {
      updateData.messageCount = currentCount + 1

      // 如果是第一条用户消息，更新标题
      if (role === 'user' && currentCount === 0) {
        updateData.title = content.substring(0, 20)
      }
    }

    await db.collection('chat_threads').doc(threadId).update({
      data: updateData
    })

    return { success: true, messageId: resultMessageId }
  } catch (err) {
    console.error('[saveChatMessage] 保存消息失败:', err)
    return { success: false, error: err.message }
  }
}
