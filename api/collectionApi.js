import { request , toast } from '@/utils/utils.js'

// 获取收藏商品分页信息 /collection/getCollectionGoodsPage
export function getCollectionGoodsPage(pageNum,data) {
	return Promise.resolve(
		request({
			url: '/collection/getCollectionGoodsList?pageNum='+pageNum,
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

//	筛选接口 /collection/getCollectionSearchCount
export function getCollectionSearchCount(data) {
	return Promise.resolve(
		request({
			url: '/collection/getCollectionSearchFilter',
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

// 取消收藏 /collection/delCollectionGoods
export function delCollectionGoods(data) {
	return Promise.resolve(
		request({
			url: '/collection/delCollectionGoods',
			data: data,
			loding_hide:true,
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

// 收藏商品 /collection/collectionGoods
export function collectionGoods(data) {
	return Promise.resolve(
		request({
			url: '/collection/collectionGoods',
			data: data,
			loding_hide:true,
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