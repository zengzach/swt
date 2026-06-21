<template>
	<view style="position: relative;" @click="goSearch">
		<input class="uni-input" style="background:#FFF" disabled   @input="onKeyInput" placeholder="搜索商品"
			v-model="value" />
			<view class="searchIcon" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
		<view class="searchBtn" :style="{ background: background }">
			<text>搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "hederSearch",
		props: {
				background:'',
				imageURL:''
		},
		data() {
			return {
				value: '',
				border:'2upx solid #EAEAEA',
			};
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url:'/goodsLIst/search'
				})
			}
		}
	}
</script>
<style scoped lang="less">
	@import url('@/static/LHT/headerSearch.css');
	
	.uni-input {
		width: 710upx;
		height: 60upx;
		border-radius: 30upx;
		border:2upx solid #E8E8E8; 
		position: relative;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #B0B1B6;
		margin: 30upx auto 0;
		padding: 0upx 0upx 0 75upx;
		box-sizing: border-box;
	}
</style>


