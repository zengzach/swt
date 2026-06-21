import { request, toast } from '@/utils/utils.js'

// 获取所有外部品牌
export function externalBrand(data) {
	return Promise.resolve(
		request({
			url: '/externalGoods/getAllExternalBrand',
			data: data,
		}).then(res => {
			return res.data
		})
	)
}
// 获取所有外部产品系列
export function externalCategory(data) {
	return Promise.resolve(
		request({
			url: '/externalGoods/getExternalGoodsCategory',
			data: data,
		}).then(res => {
			return res.data
		})
	)
}
// 获取所有外部产品型号
export function externalModelNum(data) {
	return Promise.resolve(
		request({
			url: '/externalGoods/getExternalGoodsModelNum',
			data: data,
		}).then(res => {
			return res.data
		})
	)
}

// 根据参数获取产品对照信息
export function externalGoods(pageNum,data) {
	return Promise.resolve(
		request({
			url: '/externalGoods/searchExternalCompareGoods?pageNum='+pageNum,
			data: data,
			method:'POST'
		}).then(res => {
			return res.data
		})
	)
}
// 保存询价
export function saveExternalInquiry(data) {
	return Promise.resolve(
		request({
			url: '/exGoodsSheet/saveExGoodsSheet',
			data: data,
			method:'POST'
		}).then(res => {
			return res.data
		})
	)
}
