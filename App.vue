<script>
	import {
		getStyleById
	} from '@/api/indexApi'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			uni.removeStorageSync('selectedIndex'); // 清除缓存
			uni.hideTabBar()
			
		},
		onShow: function() {
			this.getStyleByIdList()
			// console.log('App Show')
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function(res) {
				// 请求完新版本信息的回调
				console.log(res.hasUpdate);
			});
			updateManager.onUpdateReady(function(res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					showCancel: true,
					success(res) {
						if (res.confirm) {
							// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});

			});

			updateManager.onUpdateFailed(function(res) {
				// 新的版本下载失败
				console.log('download error')
				uni.showModal({
					title: '提示',
					content: '新版小程序下载失败\n请自行退出程序，手动卸载本程序，再运行',
					confirmText: "知道了"
				});
			});


		},
		onHide: function() {
			// console.log('App Hide')
		},
		
		methods: {
			getStyleByIdList() {
				// var id = 1
				 getStyleById().then(res => {
						uni.setStorageSync('style', res.data);
				})
			},
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		width: 100%;
		background-color: #f6f6f6;
	}
	
</style>
<style>

</style>