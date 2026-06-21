<template>
	<view class="">
		<view class="returnText">
			请选择售后类型
		</view>
		<view class="returnBtn" @click="goReturnType(orderArr[0].code)">
			<img src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/returnImg.png" alt="">
			<view class="returnGoods">
				<view class="returnGoodsTitle">
					{{orderArr[0].code==10?'我要退款（无需退货）':''}}
				</view>
				<view class="" style="margin-top: 5upx;">
					未收到货，或申请不退货直接退款
				</view>
			</view>
			<view class="returnRight">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/arrowRight.png" mode=""></image>
			</view>
		</view>
		<view class="returnBtn" style="margin-top: 20upx;" @click="goReturnType(orderArr[1].code)">
			<img src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/returnImg1.png" alt="">
			<view class="returnGoods">
				<view class="returnGoodsTitle">
					{{orderArr[1].code==20?'我要退货退款':''}}
				</view>
				<view class="" style="margin-top: 5upx;">
					已收到货，申请寄回货物并退款
				</view>
			</view>
			<view class="returnRight">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/arrowRight.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import{getOrderRefundTypeEnum} from '@/api/orderListApi.js'
	export default {
		data() {
			return {
				orderCode:'',
				orderArr:[],
				pageType:'',
			}
		},
		onLoad(opt) {
			this.orderCode=opt.orderCode
			this.pageType=opt.pageType
			this.getRefundTypeEnum()
		},
		methods: {
			goReturnType(type){
				uni.redirectTo({
					url:'/personalPage/returnType?type='+type+'&orderCode='+this.orderCode+'&pageType='+this.pageType
				})
			},
			getRefundTypeEnum(){
				getOrderRefundTypeEnum().then(res=>{
					this.orderArr=res.data
				})
			}
		}
	}	
</script>

<style scoped lang="less">
	.returnText {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		text-align: left;
		width: calc(100% - 94upx);
		margin: 50upx auto 0;
	}

	.returnBtn {
		width: calc(100% - 60upx);
		height: 176upx;
		margin: 40upx auto 0;
		display: flex;
		background-color: #fff;
		border-radius: 15upx;
		align-items: center;
		image {
			width: 60upx;
			height: 60upx;
			margin-right: 30upx;
			margin-left: 40upx;
			// margin-top: 58upx;
		}

		.returnGoods {
			width: 420upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #929396;
			// margin-right: 50upx;
			.returnGoodsTitle{
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
			}
		}
		.returnRight{
			image{
				width: 27upx;
				height: 27upx;
				margin-left: 80upx;
			}
		}
	}
</style>
