import {
	request,
	toast
} from '@/utils/utils.js'

/**
 * 获取客户信息
 */
export function getCustomerInfo(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/getCustomerInfo',
			data: data,
		}).then(res => {
			// console.log("获取成功", res)
			if (res.data.success) {
				return res.data
			} else {
				// console.log("获取失败", res.data)
				toast({
					title: res.data.msg
				})
			}
		})
	)
}

// 获取收货地址列表
export function getAddress(data) {
	return Promise.resolve(
		request({
			url: '/customerAddress/getAddressDetail',
			data:data
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}
/**
 * /customerInfo/getLoginAccount 获取账号信息--登录
 */
export function getLoginAccount(data) {
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
 * /customerInfo/getAccount  获取账号信息--个人中心
 */
export function getAccount(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/getAccount',
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
 * 修改账号基本信息 /customerInfo/checkMobileIsExist
 */
export function checkMobileIsExist(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/checkMobileIsExist',
			data: data,
		}).then(res => {
			// console.log("获取成功", res)
			if (res.data.success) {
				return res.data
			} else {
				// console.log("获取失败", res.data)
				toast({
					title: res.data.msg
				})
			}
		})
	)
}

/**
 * 获取账号信息 /customerInfo/getCustomerAccount
 */
export function getCustomerAccount(data) {
	return Promise.resolve(
		request({
			url: '/customerAccount/getCustomerAccountInfo',
			data: data,
		}).then(res => {
			// console.log("获取成功", res)
			if (res.data.success) {
				return res.data
			} else {
				// console.log("获取失败", res.data)
				toast({
					title: res.data.msg
				})
			}
		})
	)
}

/**
 * 获取收藏分类统计 /collection/getCollectionCategoryCount
 */
export function getCollectionCategoryCount(data) {
	return Promise.resolve(
		request({
			url: '/collection/getCollectionGoodsList',
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
 * 获取客户开票信息 /customerInfo/getCustomerInvoice
 */
export function getCustomerInvoice(data) {
	return Promise.resolve(
		request({
			url: '/customerInvoice/getInvoiceInfo',
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
 * 获取发票类型 /customerInfo/getInvoiceTypes
 */
export function getInvoiceTypes(data) {
	return Promise.resolve(
		request({
			url: '/customerInvoice/getInvoiceTypeList',
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
 * 获取客户专属服务人员信息 /customerInfo/getExclusiveServiceStaffInfo
 */
export function getExclusiveServiceStaffInfo(data) {
	return Promise.resolve(
		request({
			url: '/customerAccount/getExclusiveServiceStaffInfo',
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
 * 检验账号密码 /customerInfo/checkAccountPassword
 */
export function checkAccountPassword(params){
	return Promise.resolve(
		request({
			url: '/customerInfo/checkAccountPassword',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * 修改账号基本信息 /customerInfo/modifyAccountBaseInfo
 */
export function modifyAccountBaseInfo(params){
	return Promise.resolve(
		request({
			url: '/customerInfo/modifyAccountBaseInfo',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * /customerInfo/modifyLoginName 修改登录名
 */
export function modifyLoginName(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/modifyLoginName',
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
 * 修改账号基本信息 /customerInfo/modifyMobile
 */
export function changeMobile(params){
	return Promise.resolve(
		request({
			url: '/customerAccount/modifyAccountMobile',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * 修改账号密码 /customerInfo/modifyPassword
 */
export function changePassword(params){
	return Promise.resolve(
		request({
			url: '/passport/modifyPassword',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * 保存发票信息 /customerInfo/saveInvoice
 */
export function saveInvoice(params){
	return Promise.resolve(
		request({
			url: '/customerInvoice/saveInvoiceInfo',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
			}
		})
	)
}

/**
 * /customerInfo/saveInvoiceAddress 保存发票地址
 */
export function saveInvoiceAddress(params){
	return Promise.resolve(
		request({
			url: '/customerInfo/saveInvoiceAddress',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * /customerInfo/getReceiptBank 获取收款行账号信息
 */
export function getReceiptBank(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/getReceiptBank',
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
 * /customerInfo/getFullAccountInfo 获取全账号信息
 */
export function getFullAccountInfo(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/getFullAccountInfo',
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
 * /customerInfo/getAccountList 获取子账号列表
 */
export function getAccountList(data) {
	return Promise.resolve(
		request({
			url: '/customerInfo/getAccountList',
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
 * /customerInfo/saveAccount 保存子账号信息
 */
export function saveAccount(params){
	return Promise.resolve(
		request({
			url: '/customerInfo/saveAccount',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * /customerInfo/modifyEnterprise 修改账号基本信息
 */
export function modifyEnterprise(params){
	return Promise.resolve(
		request({
			url: '/customerInfo/modifyEnterprise',
			data: params,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

//   /passport/logout  退出登录
export function Logout() {
	return Promise.resolve(
		request({
			url: '/passport/logout',
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
// 优惠券相关-----------------------------------------------------------------------
// /customerAccount/getPersonalCount 获取个人中心统计数量 如 待使用卡券数
export function personalCount() {
	return Promise.resolve(
		request({
			url: '/customerAccount/getPersonalCount',
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
// /customerCoupon/getCustomerCouponStatusEnums 获取客户优惠券状态
export function customerCouponStatusEnums() {
	return Promise.resolve(
		request({
			url: '/customerCoupon/getCustomerCouponStatusEnums',
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

// /customerCoupon/getCustomerCouponList 获取客户优惠券列表
export function customerCouponList(data) {
	return Promise.resolve(
		request({
			url: '/customerCoupon/getCustomerCouponList',
			data:data
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


// 获取未领取赠品列表
export function getCustmoerGoodsGift(data) {
	return Promise.resolve(
		request({
			url: '/giftPack/custmoerGoodsGift',
			data:data
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}

// 获取未领取赠品数量
export function getUnGiftData(data) {
	return Promise.resolve(
		request({
			url: '/giftPack/unclaimedGoodsGift',
			data:data
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}

