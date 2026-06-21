import { request ,toast} from '@/utils/utils.js'

// /integral/order/settle 确认订单页面
export function integralOrderSettle(data){
	return Promise.resolve(
		request({
			url: '/integral/order/settle',
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
// /integral/order/settle 确认订单页面
export function integralOrderLimitNum(data){
	return Promise.resolve(
		request({
			url: '/integral/order/getLimitNum',
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
// /integral/order/create 小程序下单
export function integralOrderCreate(data){
	return Promise.resolve(
		request({
			url: '/integral/order/create',
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