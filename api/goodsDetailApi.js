import { request , toast } from '@/utils/utils.js'

// 商品详情
export function getGoodsDetail(data) {
	return Promise.resolve(
		request({
			url: '/goods/getGoodsDetail',
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
// 商品评价列表 /goods/getGoodsEvaluatePageList
export function goodsEvaluatePageList(data) {
	return Promise.resolve(
		request({
			url: '/goods/getGoodsEvaluatePageList',
			data: data,
			method:'POST'
		}).then(res => {
			if (res) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}
// 获取商品分组详情
export function getGoodsGroupDetail(data) {
	return Promise.resolve(
		request({
			url: '/goods/getGoodsGroupDetail',
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
// 添加购物车商品
export function AddCartGoods(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/addCartGoods',
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

//立即购买
export function settleBuyNow(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/settleBuyNow',
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

// 询价相关----------------------------------------------------------------------------------

// /goodsPriceSheet/getCustomerGoodsSheetList 获取客户询价列表
export function inquiryList(data){
	return Promise.resolve(
		request({
			url: '/goodsPriceSheet/getCustomerGoodsSheetList',
			data: data,
			method: 'POST'
		}).then((res) => {
			return res.data
		})
	)
}
// /goodsPriceSheet/getCustomerSheetDetail 获取客户询价详情
export function inquiryDetail(data){
	return Promise.resolve(
		request({
			url: '/goodsPriceSheet/getCustomerSheetDetail',
			data: data,
			method: 'GET'
		}).then((res) => {
			return res.data
		})
	)
}
// /goodsPriceSheet/getCustomerSheetCount 统计已回复客户询价数量
export function inquiryNum(){
	return Promise.resolve(
		request({
			url: '/goodsPriceSheet/getCustomerSheetCount',
			method: 'GET'
		}).then((res) => {
			return res.data
		})
	)
}
// /goodsPriceSheet/saveCustomerGoodsSheet 保存客户询价
export function saveInquiry(data){
	return Promise.resolve(
		request({
			url: '/goodsPriceSheet/saveCustomerGoodsSheet',
			data: data,
			method: 'POST'
		}).then((res) => {
			return res.data
		})
	)
}