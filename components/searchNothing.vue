<template>
	<view class='productList'>
		<view class="nothing">
			<view class="image1" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
			<view class="nothing_proposal">
				<text>没有找到你想要的商品</text>
				<text>换个搜索词试试</text>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/LHT/searchNothing.css'
export default {
	data() {
		return {}
	},
	props:{searchName:null,
	imageURL:''
	},
	created(){},
	methods: {}
}
</script>

<style scoped lang="scss">
.productList{
	width: 100%;
	height: 77.5vh;
	background-color: #fff;
	position:relative;
	top:220upx;
	.nothing{
		width: 574upx;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center; 
		justify-content: center;
		
		image{
			width: 96upx;
			height: 95upx;
		}
		.nothing_proposal{
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #B0B1B6;
			line-height: 43upx;
			margin-top: 33upx;
		}
		
	}
}
</style>
