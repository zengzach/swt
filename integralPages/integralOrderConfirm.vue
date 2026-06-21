	<template>
	<view style="height: 100vh;position:relative;">
		<view class="confirm_address" @click="toAddress"
			v-if="address.province && address.city&& address.area&& address.detailAddress">
			<image class="address_icon" v-if="address.isDefault"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/addressDefault.png" mode="widthFix">
			</image>
			<view class="address_msg">
				<view class="address_person">
					<view class="address_person_name">{{address.contact}}</view>
					<view class="address_person_phone">{{address.mobile}}</view>
				</view>
				<view class="address_address">{{address.province}} {{address.city}} {{address.area}}
					{{address.detailAddress}}
				</view>
			</view>
			<image class="address_more"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png" mode="widthFix">
			</image>
		</view>
		<view class="confirm_address" @click="toAddress" v-else>
			<text>添加收货地址</text>
			<image class="address_more"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png" mode="widthFix">
			</image>
		</view>

		<view class="confirm_Product">
			<view class="confirm_ProductContent">
				<view class="confirm_Title">
					兑换详情
				</view>
				<view class="confirm_TitleContent" v-for="item in goodsInfo" :key="item.goodsId">
					<image :src="item.goodsUrl" mode=""></image>
					<view class="" style="margin-left: 19upx;width: 467upx; ">
						<view class="orderInfoText">
							{{item.goodsTitle}}
						</view>
						<view class="product_price" style="align-items: center;">
							<view class="" style="display: flex;">
								<view class="">
									积分：
								</view>
								<view class="price" style="color: #FB681A;font-size: 36upx;" v-if="item.promotionStatus == 20">
									{{item.promotionPrice}}
								</view>
								<view class="price" style="color: #FB681A;font-size: 36upx;" v-else>
									{{item.price}}
								</view>
							</view>
							<view class="addCartNum">
								<!-- *{{item.num}} -->
								<uni-number-box v-model="integralNum" min='1' :max="maxNum<=0?'1':maxNum" @change='changeNum($event)' @blur="blur($event)"></uni-number-box>
							</view>
						</view>
					</view>
				</view>

				<view class="confirm_Total">
					<view class=""> </view>
					<view class="" v-if="item.promotionStatus == 20">
						合计积分：{{totalPrice}}
					</view>
					<view class="">
						合计积分：{{totalPrice}}
					</view>

				</view>
			</view>
		</view>

		<view class="confirm_Btn">
			<view class="confirm_BtnFlex">
				<view class="" style="font-size: 24upx;color: #FB681A;">
					合计：
				</view>
				<view class="" style="color: #FB681A;font-size: 40upx;">
					{{totalPrice}}
				</view>
				<view class="" style="font-size: 24upx;margin-left: 10upx;">
					积分
				</view>
			</view>
			<view class="confirm_RedBtn" @click="confirm_RedBtn" style="margin-right: 24upx;">
				确认兑换
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {integralOrderSettle,integralOrderLimitNum,integralOrderCreate} from '@/api/integral/integralOrder.js'
	import {
		getAddress
	} from '@/api/address.js'
	import {
		toast,
		getRouter,
		getUrl
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				address: {},
				goodsInfo: null,
				integralGoodsId: null,
				integralNum:null,
				integral: '',
				// integralNumber: 1,
				totalPrice: 0,
				isShow: false,
				accountId: '',
				addressId: '',
				userinfo: {},
				limitNum:'',		//限制兑换多少
				hasBoughtNum:'',		//已经兑换多少
				maxNum:null,
				numFlag:null
			}
		},
		onLoad(opt) {
			this.integralGoodsId = opt.integralId
			this.integralNum = opt.num
			this.accountId = opt.accountId
			this.addressId = opt.addressId
			if(opt.addressId){
				this.integralSettle()
			}else{
				this.getAddressList()
			}
			getUrl()
			getRouter()
			this.getAccountInfo()
		},
		methods: {
			// 获取地址列表
			getAddressList() {
				getAddress().then(res => {
					if(res.success){
						this.addressId = res.data[0].id
						this.integralSettle()
					}
				})
			},
			// 下单
			integralSettle(){
				integralOrderSettle({
					addressId:this.addressId,
					goodsId:this.integralGoodsId,
					num:this.integralNum
				}).then(res=>{
					this.address = res.data.customerAddress
					this.goodsInfo = res.data.stockGoodsList
					if(this.goodsInfo[0].promotionStatus == 20){
						this.totalPrice = res.data.stockGoodsList[0].num*res.data.stockGoodsList[0].promotionPrice
					}else{
						this.totalPrice = res.data.stockGoodsList[0].num*res.data.stockGoodsList[0].price
					}
					integralOrderLimitNum({
						accountAddressId:this.addressId,
						integralGoodsId:this.integralGoodsId,
						num:this.integralNum
					}).then(res2=>{
						if(res2.success){
							this.hasBoughtNum=res2.data.hasBoughtNum
							this.limitNum= res2.data.limitNum
							
							var num=res2.data.limitNum-res2.data.hasBoughtNum
							if(res2.data.limitNum==0){//不限制
								this.maxNum=this.goodsInfo[0].stock
							}else{//限制
								if(num<=this.goodsInfo[0].stock){
									this.maxNum=num
								}else{
									this.maxNum=this.goodsInfo[0].stock
								}
							}
							
						}
						
					})
				})
			},
			blur(e){
				// console.log(e.detail.value,"---------blur---------")
				if(this.maxNum==0){
					if(this.goodsInfo[0].promotionStatus == 20){
						this.totalPrice = 1 * this.goodsInfo[0].promotionPrice
					}else{
						this.totalPrice = 1 * this.goodsInfo[0].price
					}
				}else{
					if(e.detail.value <= 0){
						this.integralNum = 1
					}
					if(this.goodsInfo[0].promotionStatus == 20){
						this.totalPrice = this.integralNum * this.goodsInfo[0].promotionPrice
					}else{
						this.totalPrice = this.integralNum * this.goodsInfo[0].price
					}
				}
				
			},
			changeNum(e){
				// console.log(e,'-------change--------')
				if(this.maxNum==0){
					if(this.goodsInfo[0].promotionStatus == 20){
						this.totalPrice = 1 * this.goodsInfo[0].promotionPrice
					}else{
						this.totalPrice = 1 * this.goodsInfo[0].price
					}				
				}else{
					if(e<=0){
						this.integralNum = 1
					}else if(e>=this.maxNum){
						this.integralNum = this.maxNum
					}else{
						this.integralNum = e
					}
					if(this.goodsInfo[0].promotionStatus == 20){
						this.totalPrice = this.integralNum * this.goodsInfo[0].promotionPrice
					}else{
						this.totalPrice = this.integralNum * this.goodsInfo[0].price
					}
				}
			},
			toAddress() {
				if (this.accountId == '') {
					this.accountId = uni.getStorageSync('customerAccountId')
				}
				uni.navigateTo({
					url: '/personalPage/address/addressList?integralGoods=integralGoods'+'&integralId='+this.integralGoodsId+'&integralNum='+this.integralNum
				})
			},
			// 获取账号信息
			getAccountInfo(){
				getLoginAccount().then(res=>{
					if(res.success){
						this.userinfo=res.data
					}
				})
			},
			// 确认兑换 按钮
			confirm_RedBtn() {
				if(this.userinfo.integral>=this.totalPrice){
					if(this.limitNum == 0){//不限制
						integralOrderCreate({
							accountAddressId:this.addressId,//地址id
							integralGoodsId:this.integralGoodsId,//商品id
							num:this.integralNum,//商品数量
						}).then(res=>{
							if(res.success){
								uni.redirectTo({
									url:'/integralPages/integralSubmitOrder?integralId='+this.integralGoodsId+'&integralNum='+this.integralNum+'&addressId='+this.addressId+'&orderCode='+res.data.orderCode
								})
							}
						})
					}else if(this.hasBoughtNum+this.integralNum*1<=this.limitNum){
						integralOrderCreate({
							accountAddressId:this.addressId,//地址id
							integralGoodsId:this.integralGoodsId,//商品id
							num:this.integralNum,//商品数量
						}).then(res=>{
							if(res.success){
								uni.redirectTo({
									url:'/integralPages/integralSubmitOrder?integralId='+this.integralGoodsId+'&integralNum='+this.integralNum+'&addressId='+this.addressId+'&orderCode='+res.data.orderCode
								})
							}
						})
					}else{
						toast({
							title:'超出该商品的允许兑换数。'
						})
					}
				}else{
					toast({
						title:'积分不足'
					})
				}
				
			},

		}
	}
</script>

<style lang="scss">
	.confirm_address {
		margin: 24upx 24upx 23upx;
		width: calc(100% - 106upx);
		height: auto;
		padding: 39upx 29upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		text {
			font-size: 26upx;
			color: #333333;
		}

		.address_icon {
			width: 67upx;
			height: 66upx;
			position: absolute;
			top: 0;
			left: 0;
		}

		.address_msg {
			width: 588upx;

			text {
				color: #333333;
			}

			.address_person {
				margin-bottom: 9upx;
				width: 100%;
				display: flex;
				align-items: center;

				.address_person_name {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 34upx;
					margin-right: 22upx;
					margin-left: 11upx;
				}

				.address_person_phone {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 34upx;
					color: #999999;
				}

				.address_person_dan {
					background: linear-gradient(90deg, #FFEBEA, #FFD0CD);
					border-radius: 15px 15px 15px 0px;
					margin-left: 20upx;
					line-height: 34upx;

					text {
						height: 30upx;
						padding: 0upx 26upx 10upx;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 40upx;
					}
				}
			}

			.address_address {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 36upx;
				margin-left: 11upx;
			}
		}

		.address_more {
			width: 30upx;
			height: 30upx;
			margin-left: 27upx;
		}
	}

	.confirm_Product {
		width: 702upx;
		margin: 23upx auto 0;
		background-color: #FFFFFF;

		.confirm_ProductContent {
			width: 642upx;
			margin: 0 auto;

			.confirm_TitleContent {
				display: flex;
				margin-top: 30upx;

				image {
					width: 150upx;
					height: 150upx;
				}

				.orderInfoText {
					width: 467upx;
					height: 68upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 34upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}

				.product_price {
					width: 467upx;
					margin-top: 38upx;
					display: flex;
					justify-content: space-between;
					align-items: baseline;

					.price {
						display: flex;
						align-items: baseline;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #333333;

						view {
							font-size: 30upx;
						}
					}

					.original_price {
						font-size: 20upx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						text-decoration: line-through;
						color: #999999;
						margin-left: 10upx;
					}
				}
			}

			.confirm_Title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				padding-top: 29upx;
				padding-bottom: 25upx;
				border-bottom: 1upx solid #EEEEEE;
			}

			.confirm_Total {
				margin-top: 20upx;
				width: 642upx;
				display: flex;
				border-top: 1upx solid #EEEEEE;
				justify-content: space-between;
				align-items: center;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				padding-top: 25upx;
				padding-bottom: 25upx;
			}
		}
	}

	.confirm_Btn {
		width: 100%;
		height: 98upx;
		position: fixed;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFFFFF;

		.confirm_BtnFlex {
			display: flex;
			align-items: center;
			margin-left: 24upx;
		}

		.confirm_RedBtn {
			width: 179upx;
			height: 70upx;
			background: linear-gradient(126deg, #FF8D13, #FE7E30);
			border-radius: 35upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			text-align: center;
			line-height: 70upx;
		}
	}
</style>

<style lang="scss">
	::v-deep .uni-numbox {
		height: 50upx !important;
		line-height: 50upx !important;
		width: 200upx !important;

		.uni-numbox__minus {
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
