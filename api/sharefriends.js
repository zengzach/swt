export default {
	data() {
		return {
		   //这个share可以在每个页面的data中设置相应的转发内容
			share:{
				title:uni.setStorageSync('company'),
				path:'/pages/index/index?salesmanId='+uni.getStorageSync('salesmanId'),
			}
		}
	},
	onShareTimeline(res) {
		let query = {pid: uni.getStorageSync('user_id')}
		query = JSON.stringify(query)
		// console.log("分享链接",this.share.path)
		// console.log('分享人ID',query)
		return {
			title: this.share.title,
			path: this.share.path,
			query: query,
			// imageUrl: this.share.imageUrl,
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

	}
}