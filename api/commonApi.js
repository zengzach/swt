import {
	request,
	toast
} from '@/utils/utils.js'

// 国家
export function getAllCountry(data) {
	return Promise.resolve(
		request({
			url: '/region/getAllCountry',
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
// 省
export function getAllProvinces(data) {
	return Promise.resolve(
		request({
			url: '/region/getAllProvinces',
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
// 市
export function getRegionParentId(data) {
	return Promise.resolve(
		request({
			url: '/region/getRegionParentId',
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
// 区
export function getarea(data) {
	return Promise.resolve(
		request({
			url: '/region/queryAllRegionsTree',
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

// 获取小程序图标
export function getAppIcon(data) {
	return Promise.resolve(
		request({
			url: '/appIcon/getAppIcon',
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

// 获取限时折扣正常商品
export function getActivityGoods(data) {
	return Promise.resolve(
		request({
			url: '/activity/goods',
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

// /appIcon/getShareIcon 获取小程序分享icon
export function shareIcon(data) {
	return Promise.resolve(
		request({
			url: '/appIcon/getShareIcon',
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
// /wechat/getPosterImage getPosterImage 海报
export function posterImage(data) {
	return Promise.resolve(
		request({
			url: '/wechat/getPosterImage',
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
// /wechat/getIsShowShareButton 是否显示分享图标
export function showShareButton(data) {
	return Promise.resolve(
		request({
			url: '/wechat/getIsShowShareButton',
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

// /wechat/getPosterInfo getPosterInfo 海报信息
export function posterInfo(data) {
	return Promise.resolve(
		request({
			url: '/wechat/getPosterInfo',
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
// /coupon/getCouponDetail 获取优惠券详情
export function couponDetail(data) {
	return Promise.resolve(
		request({
			url: '/coupon/getCouponDetail',
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


