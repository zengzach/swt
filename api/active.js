import {
	request,
	toast
} from '@/utils/utils.js'


// 获取专题活动详情
export function getSpecialActivityDetail(pageNum,id){
	return Promise.resolve(
		request({
			url: '/siteSpecialActivity/getSpecialActivityDetail?pageNum='+pageNum+'&specialActivityId='+id,
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