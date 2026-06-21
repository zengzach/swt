import { request ,toast} from '@/utils/utils.js'

export function getIndexCategoryTree(){
	return Promise.resolve(
		request({
			url: '/category/getIndexCategoryTree',
			method:'GET',
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

export function queryCategory(data){
	return Promise.resolve(
		request({
			url: '/category/queryCategory?paramId='+data ,
			method:'GET',
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

export function queryGoodsListByParam(data){
	return Promise.resolve(
		request({
			url: '/goods/queryGoodsListByParam' ,
			method:'POST',
			data:data
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
