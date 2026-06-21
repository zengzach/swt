import {
	request,
	toast
} from '@/utils/utils.js'
/**
 * 获取文章分类列表
 */
export function getList() {
	return Promise.resolve(
		request({
			url: '/article/getArticleCategoryList',
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}


/**
 * 获取文章列表
 */
export function getArticleList(data) {
	return Promise.resolve(
		request({
			url: '/article/getArticleList',
			data: data,
			method: 'POST'
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}


/**
 * 获取文章详情 
 */
export function getArticleDetail(data) {
	return Promise.resolve(
		request({
			url: '/article/getArticleDetail',
			data: data
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}

// 登陆协议文档
export function Agreement() {
	return Promise.resolve(
		request({
			url: '/article/getLoginAgreement'
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}

// 隐私政策
export function PrivacyPolicy() {
	return Promise.resolve(
		request({
			url: '/article/getPrivacyPolicy'
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}
