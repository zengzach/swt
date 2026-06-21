import {
	request,
	toast
} from '@/utils/utils.js'

/**
 * 获取账号信息--个人中心
 */
export function getAccount(data) {
	return Promise.resolve(
		request({
			url: '/customerAccount/getCustomerAccountInfo',
			data: data,
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
 * 发送验证码
 */
export function sendSms(data) {
	return Promise.resolve(
		request({
			url: '/passport/sendSms',
			data: data,
			method:'POST'
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
 * 校验验证码
 */
export function SmsVerifyCode(data) {
	return Promise.resolve(
		request({
			url: '/passport/validateSmsVerifyCode',
			data: data,
			method:'POST'
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
 * 修改密码
 */
export function changePassword(data) {
	return Promise.resolve(
		request({
			url: '/passport/modifyPassword',
			data: data,
			method:'POST'
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
 * 修改手机号
 */
export function changeTel(data) {
	return Promise.resolve(
		request({
			url: '/customerAccount/modifyAccountMobile',
			data: data,
			method:'POST'
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