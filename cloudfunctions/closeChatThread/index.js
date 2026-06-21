const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID
  const { threadId } = event

  if (!threadId) {
    return { success: false, error: '缺少 threadId' }
  }

  try {
    await db.collection('chat_threads').doc(threadId).update({
      data: {
        status: 'closed',
        updatedAt: db.serverDate()
      }
    })
    return { success: true }
  } catch (err) {
    console.error('[closeChatThread] 关闭线程失败:', err)
    return { success: false, error: err.message }
  }
}
