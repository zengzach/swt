<template>
	<view class="coaDetail">
		<!-- v-if="iOS" -->
		<web-view :src="src"></web-view>
		<view class="bottom_tab">
			<button>下载</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://img1.bioyx.cn/test/coa/skyx/bc1005-202310270005.pdf',	// PDF地址
				iOS:true
			};
		},
		onLoad(e) {
			var src = this.src;
			// 判断操作系统
			uni.getSystemInfo({
				success: (res) => {
					console.log(res,"getSystemInfo------------------")
					if (res.system.includes('iOS')) {
						this.iOS = true;
						// iOS 可直接查看
						this.src = src;
					} else {
						this.iOS = false;
						// Android 需要下载后再打开
						uni.downloadFile({
							url: src,
							success: (res) => {
								const path = res.tempFilePath;
								uni.openDocument({
									filePath: path,
									showMenu: true,
									fileType: 'pdf',
									success: (res) => {
										console.log(res,"openDocument===================")
										uni.navigateBack({
											delta: 1
										});
									},
									fail: (err) => {
										uni.showToast({
											title: '打开文件失败',
											icon: 'none',
											duration: 2000
										});
									}
								});
							},
							fail: (err) => {
								console.log(err,"-----------err----------");
								uni.showToast({
									title: '下载文件失败',
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				}
			});
		},
		methods: {
		}
	}
</script>
<style scoped lang="less">
	.coaDetail{
		width: 750upx;
		overflow: hidden;
		.bottom_tab{
			width: 690upx;
			height: 100upx;
			background: #FFFFFF;
			box-shadow: 0rpx 6rpx 21rpx 6rpx rgba(238,238,238,0.65);
			padding: 0 30upx;
			position: fixed;
			bottom: 0;
			left: 0;
			button{
				width: 180rpx;
				height: 70rpx;
				background: #E1251B;
				border-radius: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 70rpx;
				text-align: center;
				margin-top: 15upx;
				float: right;
			}
		}
	}
	
</style>