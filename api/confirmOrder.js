import {
	request,
	toast
} from '@/utils/utils.js'


/**
 * 获取结算商品的信息
 */
export function settleCheck(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/settleShoppingCart',
			data:params,
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
 * 获取样品的信息
 */
export function settleCheckSample(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/sample/settleShopping',
			data:params,
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

// 获取赠品信息
export function settleShopping(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/gift/settleShopping',
			data:params,
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

// 提交订单
export function order(params){
	return Promise.resolve(
		request({
			url: '/order/create',
			data:params,
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
// 样品---提交订单
export function sampleOrder(params){
	return Promise.resolve(
		request({
			url: '/order/create/sample',
			data:params,
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

// 赠品---提交订单
export function createGift(params){
	return Promise.resolve(
		request({
			url: '/order/create/gift',
			data:params,
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

//立即下单
export function buyNow(orderParam){
	return Promise.resolve(
		request({
			url: '/order/buyNow',
			data:orderParam ,
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
// 微信支付相关-----------------------------------------------------------------------
export function wxGetOpenId(code){
	return Promise.resolve(
		request({
			url: '/wechat/wxGetOpenId?code='+code,
			method:'GET'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
export function wxJsPay(data){
	return Promise.resolve(
		request({
			url: '/wechat/wxJsPay',
			data:data ,
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
export function wxPayment(data){
	return Promise.resolve(
		request({
			url: '/order/now/payment',
			data:data ,
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