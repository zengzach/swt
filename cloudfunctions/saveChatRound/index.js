const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

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

    // 合并 updateMsgCount 逻辑：更新当前用户的问答次数
    if (openid) {
      try {
        const countRes = await db.collection('msg_count')
          .where({ _openid: openid })
          .limit(1)
          .get()
        if (countRes.data && countRes.data.length > 0) {
          await db.collection('msg_count').doc(countRes.data[0]._id).update({
            data: {
              count: _.inc(1),
              updateTime: db.serverDate()
            }
          })
        } else {
          await db.collection('msg_count').add({
            data: {
              _openid: openid,
              count: 1,
              createTime: db.serverDate(),
              updateTime: db.serverDate()
            }
          })
        }
      } catch (countErr) {
        console.error('[saveChatRound] 更新消息计数失败:', countErr)
      }
    }

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
