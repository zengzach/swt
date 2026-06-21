import { request ,toast} from '@/utils/utils.js'

// /integral/hasSignIn 是否签到
export function hasSignIn(){
	return Promise.resolve(
		request({
			url: '/integral/hasSignIn',
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
// /integral/dailySignIn 每日签到
export function dailySignIn(){
	return Promise.resolve(
		request({
			url: '/integral/dailySignIn',
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
// /integral/getIntegralLogType 积分记录类型
export function integralLogType(){
	return Promise.resolve(
		request({
			url: '/integral/getIntegralLogType',
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
// /integral/getIntegralLogPage 积分记录列表
export function integralLogPage(pageNum,data){
	return Promise.resolve(
		request({
			url: '/integral/getIntegralLogPage?pageNum='+pageNum,
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