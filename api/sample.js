import {
	request,
	toast
} from '@/utils/utils.js'


export function samplePage(data) {
	return Promise.resolve(
		request({
			url: '/goods/sample/page',
			method:'POST',
			data: data,
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
