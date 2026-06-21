<template>
	<view class="coaList">
		<view class="coa_content">
			<view class="coa_background">COA查询与下载</view>
			<view class="coa_search">
				<view class="search_item">
					<p>产品编号</p>
					<input type="text" placeholder="请输入产品编号"
						placeholder-style="font-size: 26rpx;color:#C7C7C7" v-model="artNo">
				</view>
				<view class="search_item" style="margin-top: 20px;">
					<p>产品批号</p>
					<input type="text" placeholder="请输入产品批号" v-model="batchNum"
						placeholder-style="font-size: 26rpx;color:#C7C7C7">
				</view>
				<view class="search_item">
					<button @click="toCOADetail">下载</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {coaDetail} from '@/api/leaveWords.js'
	export default {
		data() {
			return {
				artNo:'',
				batchNum:'',
				pdfUrl:'',
			};
		},
		onLoad() {},
		methods: {
			toCOADetail() {
				if(!this.artNo){
					wx.showToast({
						title: '请输入产品编号',
						icon: 'none',
						duration: 3000
					})
					return
				}
				if(!this.batchNum){
					wx.showToast({
						title: '请输入产品批号',
						icon: 'none',
						duration: 3000
					})
					return
				}
				coaDetail({artNo:this.artNo,batchNum:this.batchNum}).then(res=>{
					if(res.data){
						// bc1005 202310270005
						// console.log(res.data.fileUrl.split("/"),"66666666666666666666666")
						var arr=res.data.fileUrl.split("/")
						var url=res.data.fileUrl.split("/")[arr.length-1].split(".")[0]
						// console.log(url,"url-------------------")
						wx.downloadFile({
							url: res.data.fileUrl,
							success: function(res) {
								// console.log(res,"============")
								wx.openDocument({
									filePath: res.tempFilePath,
									showMenu: true,
									fileType: 'pdf',
									success: function(res2) {
										// console.log(res2,"------------")
										// wx.showToast({
										// 	title: '下载成功！',
										// 	icon: 'none'
										// })
									}
								})
							}
						})
					}else{
						wx.showToast({
							title: '下载文档不存在',
							icon: 'none'
						})
					}
				})
				
			},
			
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>
<style scoped lang="less">
	.coaList {
		width: 750upx;
		overflow: hidden;

		.coa_content {
			width: 750upx;

			.coa_background {
				width: 750upx;
				height: 240upx;
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 240rpx;
				background: url("https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/pc/coa_weixin_background.png") no-repeat;
				background-size: 100% 100%;
				text-indent: 30upx;
			}

			.coa_search {
				width: 690upx;
				margin: 20upx auto 0;

				.search_item {
					p {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

					input {
						width: 630rpx;
						height: 80rpx;
						background: #FFFFFF;
						outline: none;
						border: none;
						border: 1px solid #E2E2E2;
						border-radius: 40rpx;
						text-indent: 0upx;
						margin-top: 20upx;
						padding:0 30upx;
					}

					button {
						width: 690rpx;
						height: 80rpx;
						background: #E1251B;
						border-radius: 40rpx;
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 80rpx;
						text-align: center;
						margin-top: 80upx;
					}
				}
			}
		}
	}
</style>