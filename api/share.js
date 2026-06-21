import {
		getIndexTitle,
	} from '@/api/indexApi'
export default {
	data() {
		return {
		   //这个share可以在每个页面的data中设置相应的转发内容
			share:{
				title:uni.setStorageSync('company'),
				path:'/pages/index/index',
			}
		}
	},
	onShareAppMessage(res) {
		
		// console.log(this.share.path +'?salesmanId='+uni.getStorageSync('salesmanId'))
		return {
			title: this.share.title,
			path: this.share.path +'?salesmanId='+uni.getStorageSync('salesmanId'),
			imageUrl: this.share.imageUrl,
			// desc: this.share.desc,
			// content: this.share.content,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			}
		}
	},
}