import {
	request,
	toast
} from '@/utils/utils.js'


/**
 * 添加购物车商品 /shoppingCart/addCartGoods
 */
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

/**
 * 获取购物车商品列表
 */
export function getCartGoodsList(data) {
	return Promise.resolve(
		request({
			url: '/shoppingCart/getCartGoodsList',
			data: data,
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
 * 勾选商品 
 */
export function choiceCartGoods(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/choiceCartGoods',
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
 * 取消勾选商品 
 */
export function unChoiceCartGoods(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/unChoiceCartGoods',
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
 * 修改购物车商品数量
 */
export function modifyCartGoods(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/modifyCartGoodsNum',
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
 * 删除商品
 */
export function removeGoods(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/removeCartGoods',
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
 * 结算勾选商品
 */
export function settleCheck(params){
	return Promise.resolve(
		request({
			url: '/shoppingCart/settleShoppingCart',
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