const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()
const _ = db.command

// 更新当前用户的问答次数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID || ''

  if (!openid) {
    return { success: false, message: '未获取到 openid' }
  }

  try {
    // 先查询是否已有记录
    const existRes = await db.collection('msg_count')
      .where({ _openid: openid })
      .limit(1)
      .get()

    if (existRes.data && existRes.data.length > 0) {
      // 已存在，count +1
      const docId = existRes.data[0]._id
      const newCount = (existRes.data[0].count || 0) + 1
      await db.collection('msg_count').doc(docId).update({
        data: {
          count: _.inc(1),
          updateTime: db.serverDate()
        }
      })
      return { success: true, count: newCount, isNew: false }
    } else {
      // 不存在，新增记录
      const addRes = await db.collection('msg_count').add({
        data: {
          _openid: openid,
          count: 1,
          createTime: db.serverDate(),
          updateTime: db.serverDate()
        }
      })
      return { success: true, count: 1, isNew: true, id: addRes._id }
    }
  } catch (err) {
    console.error('updateMsgCount error:', err)
    return { success: false, message: err.message || String(err) }
  }
}
