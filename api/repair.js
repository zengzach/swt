import {
	request,
	toast
} from '@/utils/utils.js'
// 获取第一部分信息
export function InstrumentRepair(){
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
// 保存信息
export function saveRepair(params){
	return Promise.resolve(
		request({
			url: '/repairs/save',
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
// 获取保修单类型
export function RepairListType(){
	return Promise.resolve(
		request({
			url: '/repairs/status/enum',
			method:'get'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// 获取保修单列表
export function repairList(params){
	return Promise.resolve(
		request({
			url: '/repairs/list',
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
// 获取报修详情
export function repairDetails(data){
	return Promise.resolve(
		request({
			url: '/repairs/info',
			data:data,
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
// 撤回
// 获取报修详情
export function revocation(params){
	return Promise.resolve(
		request({
			url: '/repairs/cancel?repairsId='+ params,
			data:params,
			method:'post'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}