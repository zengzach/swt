import {
	request,
	toast} from '@/utils/utils.js'


// 获取客户留言列表
export function getCustomerLeavePage(pageNum,data){
	return Promise.resolve(
		request({
			url: '/customerLeave/getCustomerLeavePage?pageNum='+pageNum,
			data: data,
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

// 编辑留言信息
export function saveCustomerLeave(editParamDto ){
	return Promise.resolve(
		request({
			url: '/customerLeave/saveCustomerLeave',
			data: editParamDto ,
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
//coa查询
export function coaDetail(data){
	return Promise.resolve(
		request({
			url: '/coa/getCoaDetail',
			data:data,
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