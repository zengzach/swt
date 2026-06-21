const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

const db = cloud.database()

// 默认快捷问题（数据库无数据时使用，并自动写入数据库便于后续管理）
const DEFAULT_QUICK_QUESTIONS = {
  'agent-tengxunyunz-2eiueb23fdc573': [
    { text: '卡片', query: '卡片' },
    { text: '宜昌市共和景晨创业中心项目占地多少', query: '宜昌市共和景晨创业中心项目占地多少？' },
    { text: '当前接龙活动', query: '当前有哪些接龙活动？' },
    { text: '产品价格查询', query: '产品价格怎么查询？' }
  ]
}

// 数据清洗：过滤非对象/缺字段的问题项，兼容控制台误录入的字符串
function sanitizeQuestions(raw) {
  if (!Array.isArray(raw)) return []
  return raw.filter(q => q && typeof q === 'object' && !Array.isArray(q) && q.text && q.query)
}

exports.main = async (event, context) => {
  const botId = event.botId || 'agent-tengxunyunz-2eiueb23fdc573'

  try {
    // 查询该 botId 对应的快捷问题
    const res = await db.collection('quick_questions').where({ botId }).get()

    if (res.data && res.data.length > 0) {
      // 数据库已有数据，返回 questions 字段（清洗后）
      const doc = res.data[0]
      const questions = sanitizeQuestions(doc.questions)
      return { success: true, botId, questions }
    }

    // 数据库无数据，取默认值并写入数据库（便于后续在控制台管理）
    const defaultQuestions = DEFAULT_QUICK_QUESTIONS[botId] || []
    try {
      await db.collection('quick_questions').add({
        data: {
          botId,
          questions: defaultQuestions,
          createdAt: db.serverDate(),
          updatedAt: db.serverDate()
        }
      })
    } catch (initErr) {
      // 集合可能不存在，忽略写入错误，仍返回默认数据
      console.warn('[getQuickQuestions] 写入默认数据失败（集合可能未创建）:', initErr.message)
    }

    return { success: true, botId, questions: defaultQuestions }
  } catch (err) {
    console.error('[getQuickQuestions] 获取快捷问题失败:', err)
    // 出错时返回默认值兜底，保证前端可用
    const defaultQuestions = DEFAULT_QUICK_QUESTIONS[botId] || []
    return { success: false, botId, questions: defaultQuestions, error: err.message }
  }
}
