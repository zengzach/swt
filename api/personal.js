import { request ,toast} from '@/utils/utils.js'

export function getCustomerAccountInfo(){
	return Promise.resolve(
		request({
			url: '/customerAccount/getCustomerAccountInfo',	
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

export function selectBankList(params){
	return Promise.resolve(
		request({
			url: '/bank/selectBankList',
			data: params,
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

//编辑账户信息    修改用户头像
export function modifyAccountBaseInfo(paramDto){
	return Promise.resolve(
		request({
			url: '/customerAccount/modifyAccountBaseInfo',
			data: paramDto,
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
// /order/getOrderCount 获取订单统计数
export function orderCount(){
	return Promise.resolve(
		request({
			url: '/order/getOrderCount',	
			method:'GET',
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}


	
