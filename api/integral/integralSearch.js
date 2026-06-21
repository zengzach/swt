import { request ,toast} from '@/utils/utils.js'

// /integral/index/getSearchRecord  获取客户搜索记录
export function integralSearchList(){
	return Promise.resolve(
		request({
			url: '/integral/index/getSearchRecord',
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
// /integral/index/emptySearchRecord  清空客户搜索记录
export function integralEmptySearchList(){
	return Promise.resolve(
		request({
			url: '/integral/index/emptySearchRecord',
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
// /goods/integral/getGoodsSearchFilter 获取筛选列表
export function integralSearchFilter(data){
	return Promise.resolve(
		request({
			url: '/goods/integral/getGoodsSearchFilter',
			method:'POST',
			data:data,
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

