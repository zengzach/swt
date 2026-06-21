import { request ,toast} from '@/utils/utils.js'

// /integral/index/getIndexBannerList 获取首页banner图片集合
export function integralIndexBannerList(){
	return Promise.resolve(
		request({
			url: '/integral/index/getIndexBannerList',
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
// /integral/index/getIntegralCategoryTree 获取积分商城分类结构
export function integralCategoryTree(){
	return Promise.resolve(
		request({
			url: '/integral/index/getIntegralCategoryTree',
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
// /integral/index/getBrandPage 获取首页的积分品牌列表
export function integralBrandList(data){
	return Promise.resolve(
		request({
			url: '/integral/index/getBrandPage',
			data:data,
			method:'POST',
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// /integral/index/getIntegralBrandList 获取积分商城品牌集合
export function integralBrandSortList(){
	return Promise.resolve(
		request({
			url: '/integral/index/getIntegralBrandList?toInitials=true',
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
// 新品推荐  /integral/index/getNewArrivalsGoods
export function integralArrivalsGoods(){
	return Promise.resolve(
		request({
			url: '/integral/index/getNewArrivalsGoods',
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
// 精选好物  /integral/index/getSelectGoodThingSGoods
export function integralGoodThingSGoods(){
	return Promise.resolve(
		request({
			url: '/integral/index/getSelectGoodThingSGoods',
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
// /integralGoodsRank/getIntegralGoodsRankingDetail 获取积分商品排行榜详情
export function integralRankList(data){
	return Promise.resolve(
		request({
			url: '/integralGoodsRank/getIntegralGoodsRankingDetail',
			data:data,
			method:'POST',
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
