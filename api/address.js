import {
	request,
	toast
} from '@/utils/utils.js'

// 获取收货地址列表
export function getAddress(data) {
	return Promise.resolve(
		request({
			url: '/customerAddress/getAddressList',
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

// 设置默认地址
export function setDefult(data) {
	return Promise.resolve(
		request({
			url: '/customerAddress/setDefult',
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

// 获取地址详情
export function getAddressDetail(data) {
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

// 保存地址
export function saveAddress(data) {
	return Promise.resolve(
		request({
			url: '/customerAddress/saveAddress',
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

// 删除地址
export function delAddress(data) {
	return Promise.resolve(
		request({
			url: '/customerAddress/delAddress',
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
//获取区域树 queryAllRegionsTree
export function queryAllRegionsTree() {
	return Promise.resolve(
		request({
			url: '/region/queryAllRegionsTree'
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}
//获取区域树 queryAllRegionsTreeV2
export function queryAllRegionsTreeV2() {
	return Promise.resolve(
		request({
			url: '/region/queryAllRegionsTreeV2'
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}

// 获取地址
export function getCountryList() {
	return Promise.resolve(
		request({
			url: '/region/getAllCountry',
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
export function getRegionParentId(parentId) {
	return Promise.resolve(
		request({
			url: '/region/getRegionParentId',
			data: parentId,
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