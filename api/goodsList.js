import { request , toast } from '@/utils/utils.js'

// 商品详情
export function queryGoodsListByParam(searchGoodsParamBo){
	return Promise.resolve(
		request({
			url: '/goods/queryGoodsListByParam',
			data: searchGoodsParamBo,
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

//获取列表
export function getGoodsSearchFilter(searchGoodsParamBo){
	return Promise.resolve(
		request({
			url: '/goods/getGoodsSearchFilter',
			data: searchGoodsParamBo,
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

