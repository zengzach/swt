import { request ,toast} from '@/utils/utils.js'

export function getIndexTitle(){
	return Promise.resolve(
		request({
			url: '/orgnum/selectByOrgNum',
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

export function getIndexBannerList(){
	return Promise.resolve(
		request({
			url: '/index/getIndexBannerList',
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

export function getIndexCategoryList(){
	return Promise.resolve(
		request({
			url: '/index/getIndexCategoryList',
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
export function getGoodsRecommendType(){
	return Promise.resolve(
		request({
			url: '/index/getGoodsRecommendType',	
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

export function getGoodsRecommendItemDetail(RecommendItemParam){
	return Promise.resolve(
		request({
			url: '/index/getGoodsRecommendItemDetail',	
			data:RecommendItemParam,
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

export function getFunctionAreaList(){
	return Promise.resolve(
		request({
			url: '/functionArea/getFunctionAreaList',	
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

export function getDetailByOrgNum(){
	return Promise.resolve(
		request({
			url: '/orgNumInit/getDetailByOrgNum',	
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

export function getExclusiveServiceStaffInfo(){
	return Promise.resolve(
		request({
			url: '/customerAccount/getExclusiveServiceStaffInfo',	
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
// /index/getIndexBrandList   获取首页品牌集合
export function indexBrandList(){
	return Promise.resolve(
		request({
			url: '/index/getIndexBrandList',	
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
// /index/getBrandSortList    获取品牌按字母排序集合
export function brandSortList(){
	return Promise.resolve(
		request({
			url: '/index/getBrandSortList',	
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

export function toBeConfirmed(){
	return Promise.resolve(
		request({
			url: '/order/toBeConfirmed',	
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
// 获取访客数
export function getPersonNumber(code){
	return Promise.resolve(
		request({
			// url: '/customerAccount/visitor?code=' + code,	
			url: '/customerAccount/visitor',	
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
//获取开屏广告
export function advertiseImg(){
	return Promise.resolve(
		request({
			url: '/index/getAdvBannerList',	
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

//首页广告
export function getIndexWindowBannerList(){
	return Promise.resolve(
		request({
			url: '/index/getIndexWindowBannerList',	
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

//是否展示大banner图
export function DetailByOrgNum(){
	return Promise.resolve(
		request({
			url: '/orgNumInit/getDetailByOrgNum',	
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


//样式详情
export function getStyleById(){
	return Promise.resolve(
		request({
			url: '/orgNumStyle/getStyleById',	
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
// 优惠券相关接口---------------------------------------------------------------
// /coupon/getCouponIndexList 获取首页优惠券列表
export function couponIndexList() {
	return Promise.resolve(
		request({
			url: '/coupon/getCouponIndexList',
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
// /coupon/receiveCoupon 领取优惠券
export function receiveCoupon(data) {
	return Promise.resolve(
		request({
			url: '/coupon/receiveCoupon',
			data:data
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

// 获取优惠券礼包
export function getAppGiftPack(){
	return Promise.resolve(
		request({
			url: '/giftPack/appGiftPack',
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

// 获取客户专属服务人员信息
export function serviceInfo(){
	return Promise.resolve(
		request({
			url: '/customerAccount/getExclusiveServiceStaffInfo',
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
