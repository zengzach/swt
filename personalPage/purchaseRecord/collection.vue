<template>
	<!-- <view class="cartList"> -->
		<collection-and-buy type="1" :background="background" :color="color" :imageURL="imageURL"  :background1="background1" ref='collectionAndBuy'/>
	<!-- </view> -->
</template>

<script>
import collectionAndBuy from '../components/collectionAndBuy.vue'
import {
		toast,
		getRouter,
		refresh
	} from '@/utils/utils.js'
export default {
	components:{collectionAndBuy},
	data() {
		return {
			flag:false,
			style:{},
			color:"",
			background:'',
			background1:'',
			imageURL:''
		}
	},
	onReachBottom() {
		// console.log("收藏夹--------触底加载")
		this.$refs.collectionAndBuy.getReachBottom()
	},
	onPullDownRefresh() {
		setTimeout(()=>{
			 uni.stopPullDownRefresh()
		},1000)
	},
	onLoad(){
		this.style = uni.getStorageSync('style')
		this.color = this.style.goodsListcolor
		this.background = this.style.cartbtn
		this.background1 = this.style.orderrgb
		this.imageURL = this.style.orderlistnolist
		this.getDataMsg()
	},
	onShow() {
		var token=uni.getStorageSync('token')
		if(token){
			this.flag=true
		}else{
			this.flag=false
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		refresh(this.getDataMsg)
	},
	methods: {
		// 下拉刷新
		getDataMsg() {								
			this.$refs.collectionAndBuy.getCollectionGoodsList()
			
			this.$refs.collectionAndBuy.getScreen()
			getRouter();
			
		},
	}
}
</script>
<style>
	page{
		background-color: #f4f4f4;
	}
</style>
<style lang="scss">
	::v-deep .uni-numbox{
		height: 50upx !important;
		line-height: 50upx !important;
		width: 200upx !important;
		.uni-numbox__minus{
			width: 50upx !important;
			height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}
		.uni-numbox__value.data-v-dd94a2a8 {
		    width: 100upx !important;
		    height: 50upx !important;
			line-height: 50upx !important;
			font-size: 24upx !important;
			background-color: #f8f8f8 !important;
			border-style: none !important;
		}
		 .uni-numbox__plus.data-v-dd94a2a8 {
		    width: 50upx !important;
		    height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}
	}
</style>
