import { request ,toast} from '@/utils/utils.js'

// /goods/integral/getGoodsDetailById 获取积分商品详细
export function integralGoodsDetail(data){
	return Promise.resolve(
		request({
			url: '/goods/integral/getGoodsDetailById',
			method:'GET',
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
