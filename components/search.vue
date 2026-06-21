<template>
	<view>
		<view>
			<view class="search" >
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png" mode=""></image>
				<input type="text" placeholder="请输入想要搜索的商品" @focus="gosearch" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {

			};
		},
		onLoad() {
		},
		methods: {
			gosearch(){
				uni.navigateTo({
					url:'/goodsLIst/search'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.search {
		display: flex;
		align-items: center;
		padding-left: 22upx;
		position: relative;
		image{
			width: 30upx;
			height: 30upx;
			position: absolute;
			// top: 37upx;
			right: 25upx;
		}
		input {
			width: 690upx;
			height: 60upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #B0B1B6;
			border: 1px solid #EEEEEE;
			border-radius: 30rpx;
			box-sizing: border-box;
			padding: 0 0 0 20rpx;
		}
	}
</style>
