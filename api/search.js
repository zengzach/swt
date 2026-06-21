import { request , toast } from '@/utils/utils.js'

export function getCustomerHistorySearchRecord(){
	return Promise.resolve(
		request({
			url: '/searchRecord/getCustomerHistorySearchRecord',	
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

export function emptyCustomerHistorySearchRecord(data){
	return Promise.resolve(
		request({
			url: '/searchRecord/emptyCustomerHistorySearchRecord',	
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

export function getSearchKeyWord(){
	return Promise.resolve(
		request({
			url: '/index/getRecommendKeyWord',	
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



//获取搜索栏关键词
export function getSearch(){
	return Promise.resolve(
		request({
			url: '/index/getSearchKeyWord',	
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

//店铺装修
export function getDiy(diyId){
	return Promise.resolve(
		request({
			url: '/diy/home/page?diyId='+diyId,	
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