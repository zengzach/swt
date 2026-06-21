import { request ,toast} from '@/utils/utils.js'

// /category/integral/getIndexCategoryTree  获取首页分类结构
export function ingergalCategoryTree(){
	return Promise.resolve(
		request({
			url: '/category/integral/getIndexCategoryTree',
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

// /goods/integral/getGoodsBaseByParams 获取商品详情
export function ingergalCategoryTreeGoodsList(pageNum,data){
	return Promise.resolve(
		request({
			url: '/goods/integral/getGoodsBaseByParams?pageNum='+pageNum,
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