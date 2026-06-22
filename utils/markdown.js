/**
 * 轻量 Markdown → HTML 转换器
 * 专为微信小程序 mp-html 组件设计，支持常用 Markdown 语法
 * 带模块级缓存，相同内容不会重复转换
 */

const cache = new Map()
const MAX_CACHE_SIZE = 100

/**
 * 将 Markdown 文本转换为 HTML 字符串
 * 支持：标题、粗体、斜体、行内代码、代码块、有序/无序列表、
 *       引用、链接、删除线、表格、水平分割线、段落换行
 * @param {string} md - Markdown 原文
 * @returns {string} HTML 字符串
 */
export function markdownToHtml(md) {
	if (!md) return ''

	// 命中缓存直接返回
	if (cache.has(md)) return cache.get(md)

	let html = md

	// 1. 提取代码块（```...```），避免内容被后续规则破坏
	const codeBlocks = []
	html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (match, code) => {
		const idx = codeBlocks.length
		codeBlocks.push('<pre><code>' + escapeHtml(code.replace(/\n$/, '')) + '</code></pre>')
		return '\x00CODEBLOCK' + idx + '\x00'
	})

	// 2. 提取行内代码（`code`）
	const inlineCodes = []
	html = html.replace(/`([^`]+)`/g, (match, code) => {
		const idx = inlineCodes.length
		inlineCodes.push('<code>' + escapeHtml(code) + '</code>')
		return '\x00INLINECODE' + idx + '\x00'
	})

	// 3. 转义剩余 HTML 特殊字符
	html = escapeHtml(html)

	// 4. 标题（h4 → h3 → h2 → h1，避免长前缀被短前缀误匹配）
	html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>')
	html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>')
	html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>')
	html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>')

	// 5. 水平分割线
	html = html.replace(/^[-*_]{3,}\s*$/gm, '<hr/>')

	// 6. 引用块（> 转义后为 &gt;）
	html = html.replace(/^&gt;\s?(.+)$/gm, '<blockquote>$1</blockquote>')
	html = html.replace(/(<\/blockquote>)\n+(<blockquote>)/g, '$1$2')

	// 7. 表格（简单管道表格）
	html = convertTables(html)

	// 8. 无序列表
	html = convertList(html, /^[-*+]\s+(.+)$/gm, 'ul')
	// 9. 有序列表
	html = convertList(html, /^\d+\.\s+(.+)$/gm, 'ol')

	// 10. 粗体斜体（先三连再双连，避免误匹配）
	html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
	html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
	html = html.replace(/\*([^*\n]+?)\*/g, '<em>$1</em>')
	html = html.replace(/__(.+?)__/g, '<strong>$1</strong>')

	// 11. 删除线
	html = html.replace(/~~(.+?)~~/g, '<del>$1</del>')

	// 12. 链接 [text](url)
	html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

	// 13. 还原代码占位符
	codeBlocks.forEach(function (block, i) {
		html = html.replace('\x00CODEBLOCK' + i + '\x00', block)
	})
	inlineCodes.forEach(function (code, i) {
		html = html.replace('\x00INLINECODE' + i + '\x00', code)
	})

	// 14. 段落和换行处理
	html = html.split(/\n{2,}/).map(function (block) {
		block = block.trim()
		if (!block) return ''
		// 已是块级元素不再包裹
		if (/^<(h[1-6]|ul|ol|pre|blockquote|hr|table|div)/.test(block)) return block
		// 单行内换行转 <br/>
		return '<p>' + block.replace(/\n/g, '<br/>') + '</p>'
	}).join('\n')

	// 缓存管理
	if (cache.size >= MAX_CACHE_SIZE) cache.clear()
	cache.set(md, html)

	return html
}

/**
 * 转义 HTML 特殊字符
 */
function escapeHtml(text) {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
}

/**
 * 将连续的列表行转换为 <ul>/<ol> 结构
 */
function convertList(html, pattern, tag) {
	const lines = html.split('\n')
	const result = []
	let inList = false
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const match = pattern.exec(line)
		if (match) {
			if (!inList) {
				result.push('<' + tag + '>')
				inList = true
			}
			result.push('<li>' + match[1] + '</li>')
		} else {
			if (inList) {
				result.push('</' + tag + '>')
				inList = false
			}
			result.push(line)
		}
	}
	if (inList) result.push('</' + tag + '>')
	return result.join('\n')
}

/**
 * 转换简单管道表格
 * 格式：| a | b |\n|---|---|\n| 1 | 2 |
 */
function convertTables(html) {
	return html.replace(/((?:^\|.*\|\s*\n?)+)/gm, function (match) {
		const rows = match.trim().split('\n').map(function (r) { return r.trim() })
		if (rows.length < 2) return match
		// 第二行必须是分隔行
		if (!/^\|[\s\-:|]+\|$/.test(rows[1])) return match

		const header = rows[0].split('|').slice(1, -1).map(function (c) { return c.trim() })
		const body = rows.slice(2).map(function (r) {
			return r.split('|').slice(1, -1).map(function (c) { return c.trim() })
		})

		let table = '<table><thead><tr>'
		header.forEach(function (h) { table += '<th>' + h + '</th>' })
		table += '</tr></thead><tbody>'
		body.forEach(function (row) {
			table += '<tr>'
			row.forEach(function (c) { table += '<td>' + c + '</td>' })
			table += '</tr>'
		})
		table += '</tbody></table>'
		return table + '\n'
	})
}

export default markdownToHtml
