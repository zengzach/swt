<template>
	<view class="address_div">
		<view class="address_list" v-if="addressList.length">
			<uni-swipe-action class="cart_pro_list">
				<uni-swipe-action-item :right-options="options" v-for="(item,index) in addressList"
					@click="bindClick(item.id)" :key='index' class="cart_list_item">
					<view class="address_item">
						<view class="address_item_click" @click="changeOrderAddress('编辑',item)">
							<view style="padding: 0 20upx;margin-top: 37upx;">
								<view v-if="item.isDefault" class="address_item_icon" :style="{background: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
								<checkbox v-if="!item.isDefault" :color='color' :checked="item.checkedAddress"
									style=" padding: 0 10upx;transform:scale(0.65);" />
							</view>
							<view class="address_item_msg" :style="{'width':( item.isDefault )}">
								<view class="address_item_person">
									<view class="address_person_name">{{item.contact}}</view>
									<view class="address_person_phone">{{item.mobile}}</view>
								</view>
								<view class="address_item_address">{{item.province}} {{item.city}} {{item.area}}
									{{item.detailAddress}}
								</view>
							</view>
						</view>
						<image class="address_item_edit"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/edit_address.png"
							mode="widthFix" @click="toAddAddress('编辑',item)">
						</image>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<view class="add_address_area"  v-if="addressList.length < 10">
				<view class="add_address_btn"   style="z-index: 9999;" @click="toAddAddress('新增','')"
					:style="{'background':(addressList.length == 10 ? '' : background),color:(addressList.length == 10 ? '' : '')}">
					新增地址({{addressList.length}} /10)</view>
			</view>
		</view>
		<view class="noList" v-else>
			<view class="no_content">
				<view class="nolist" :style="{background: 'url(' + imageURL1 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
				<view class="content_one">暂无收货地址</view>
				<view class="content_two">不要捉迷藏了，赶快创建一个吧！</view>
				<view class="content_three" :style="{ background: background }" @click="toAddAddress('新增','')">新建地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "@/static/LHT/addressList.css";
	import {
		getAddress,
		delAddress
	} from '@/api/address.js'
	import {
		toast,
		getRouter,
		refresh
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				flag: false,
				isDefault: true,
				addressList: [],
				options: [{
					text: '删除',
					style: {
						width: '1000upx',
						height: '96upx',
						backgroundColor: '#F34129',
					}
				}],
				fromPage: null,
				accountId: null,
				warehouseId: '',
				goodsId: '',
				sample: '',
				fromData: {},
				optFrom: {},
				routerUrl: '',
				activityId: '',
				goodsIds: [],
				wareHouseId: [],
				carPage: '',
				num: '',
				integral: '',
				integralGoodsId: '',
				integralNum: '',
				style:{},
				color:'',
				background:'',
				imageURL:'',
				imageURL1:'',
				goodsType:'',
				orderType:'',
				description:null,
				couponId:null,
				oldCouponId:null,
				couponPrice:null,
				companyName:'',
				checkedIndex:0,
				checkCart:null,
				Flage: null,
				wxFlage:null,
			}
		},
		onLoad(opt) {
			// console.log(opt,"地址列表页面")
			if(opt.checkCart){
				this.checkCart = opt.checkCart
			}
			this.Flage = uni.getStorageSync('Flage')
			this.wxFlage = uni.getStorageSync('wxFlage')
			this.checkedIndex = opt.checkedIndex
			if(opt.companyName){
				this.companyName = opt.companyName
			}
			this.couponId = opt.couponId
			this.oldCouponId = opt.oldCouponId
			this.couponPrice = opt.couponPrice
			this.description = opt.description
			
			this.style = uni.getStorageSync('style')
			this.color = this.style.goodsListcolor
			this.background = this.style.cartbtn
			this.imageURL = this.style.addressdefault
			this.imageURL1 = this.style.nolist
			this.isSample = opt.isSample
			if (opt.integralGoods) {
				this.integral = opt.integralGoods
				this.goodsIds.length = 2
			}
			if (opt.goodsType) {
				this.goodsType = opt.goodsType
			}
			this.integralGoodsId = opt.integralId
			this.integralNum = opt.integralNum
			if (opt.goodsIds) {
				this.goodsIds = JSON.parse(opt.goodsIds)
			}
			if (opt.wareHouseIds) {
				this.wareHouseId = JSON.parse(opt.wareHouseIds)
			}
			if (opt.sample) {
				this.sample = opt.sample
			}
			if (opt.activityId) {
				this.activityId = opt.activityId
			}
			this.fromPage = opt.fromPage
			this.goodsId = opt.goodsId
			this.warehouseId = opt.warehouseId
			this.accountId = opt.accountId
			this.carPage = opt.carPage
			// console.log(this.carPage,'this.carPage1')
			if (opt.accountId) {
				this.accountId = opt.accountId
			}
			if (opt.num) {
				this.num = opt.num
			}
			this.routerUrl = opt.routerUrl
			this.fromData = {
				fromPage: opt.fromPage,
				warehouseId: opt.warehouseId,
				accountId: opt.accountId,
				goodsId: opt.goodsId,
				sample: opt.sample
			}
			uni.setStorageSync('fromData', this.fromData)
			if (opt.fromData) {
				this.optFrom = JSON.parse(opt.fromData)
			}
		},
		onShow() {
			this.address()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.address()
			getRouter();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 新增/编辑地址
			toAddAddress(type, item) {
				if (this.sample) {
					if(this.goodsType == 20){
						this.orderType = 4
					}
					// console.log('新增/编辑地址1');
					uni.redirectTo({
						url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
							'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
							'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum+'&goodsType=' + this.goodsType
							+ '&orderType=' + this.orderType+'&description=' + this.description+'&couponId='+this.couponId
							+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+
							'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart
							+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				} else if (this.num) {
					// console.log('新增/编辑地址2');
					uni.redirectTo({
						url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
							'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
							'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum+'&num=' + this.num
							+'&description=' + this.description+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice
							+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
							+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				} else if (this.carPage == 1) {
					// console.log('新增/编辑地址3');
					uni.redirectTo({
						url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
							'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
							'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum+ '&carPage=' + this.carPage
							+'&description=' + this.description+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice
							+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
							+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				} else if (this.integral) {
					// console.log('新增/编辑地址4');
					uni.redirectTo({
						url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
							'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
							'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum+'&integral='+this.integral
							+'&description=' + this.description+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice
							+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
							+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})		
					
					
				} else {
					// console.log('新增/编辑地址5');
					uni.redirectTo({
						url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
							'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
							'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum
							+'&description=' + this.description+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice
							+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
							+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				}
			},
			// 获取地址列表
			address() {
				getAddress().then(res => {
					var resData = res.data
					resData.forEach((item) => {
						item.checkedAddress = false
					})
					this.addressList = resData
				})
			},
			// 选择订单所需地址
			changeOrderAddress(type, item) {
				if (this.goodsIds.length) {
					item.checkedAddress = !item.checkedAddress
					// if(this.goodsType == 20){
					// 	this.orderType = 4
					// }
					if (this.sample) {
						if(this.goodsType == 20){
							this.orderType = 4
						}
						// console.log('选择订单地址1');
						uni.redirectTo({
							url: '/goodsDetail/samplePage/applySample?goodsIds=' + JSON.stringify(this.goodsIds) +
								'&wareHouseIds=' + JSON.stringify(this.wareHouseId) + '&addressId=' + item.id
								 + '&isSample=' + this.isSample +
								'&goodsType=' + this.goodsType+ '&orderType=' + this.orderType
						})
					} else if (this.num) {
						// console.log('选择订单地址2');
						uni.redirectTo({
							url: '/personalPage/orderPages/confirmOrder?goodsId=' + this.goodsIds + '&addressId=' + item.id +
								'&orderType=1' + '&num=' + this.num + '&wareHouseIds=' + JSON.stringify(this.wareHouseId) +
								'&goodsIds=' + JSON.stringify(this.goodsIds) + '&wareHouseId=' + JSON.stringify(this.wareHouseId) 
								+ '&goodsList=1'+'&description=' + this.description+'&couponId='+this.couponId
								+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+
								'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
						})
					} else if (this.carPage == 1) {
						// console.log('选择订单地址3');
						uni.redirectTo({
							url: '/personalPage/orderPages/confirmOrder?goodsId=' + this.goodsIds + '&addressId=' + item.id +
								'&orderType=1' + '&wareHouseIds=' + JSON.stringify(this.wareHouseId) +
								'&goodsIds=' + JSON.stringify(this.goodsIds) + '&wareHouseId=' + JSON.stringify(this.wareHouseId) +
								'&cartPage=true' + '&toOrderList=1'+'&description=' + this.description+'&couponId='+this.couponId
								+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId
								+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
						})
					}
					else if (this.integral) {
						// console.log('选择订单地址4');
						uni.redirectTo({
							url: '/integralPages/integralOrderConfirm?addressId=' + item.id 
								+ '&integralId=' + this.integralGoodsId + '&num=' + this.integralNum
						})
					} else {
						// console.log('选择订单地址5');
						uni.redirectTo({
							url: './addAddress?goodsId=' + this.goodsId + '&warehouseId=' + this.warehouseId +
								'&type=' + type + '&addressId=' + item.id + '&goodsIds=' + JSON.stringify(this.goodsIds) +
								'&wareHouseId=' + JSON.stringify(this.wareHouseId) + '&sample=' + this.sample +
								'&integralId=' + this.integralGoodsId + '&integralNum=' + this.integralNum +
								'&carPage=' + this.carPage+'&num=' + this.num+'&integral='+this.integral
								+'&description=' + this.description+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice
								+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
								+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
						})
					}
				}

			},
			//滑动删除
			bindClick(id) {
				let _this = this
				delAddress({
					customerAddressId: id
				}).then(res => {
					if (res.success) {
						_this.address()
						toast({
							title: '删除地址成功'
						})
					} else {
						toast({
							title: res.msg
						})
					}
				})
			},
		}
	}
</script>

<style>
</style>

<style scoped lang="scss">
	.address_div {
		position: relative;
		padding-bottom: 90upx;

		.noList {
			position: absolute;
			width: 750upx;
			height: 100vh;
			background: #fff;
			text-align: center;

			.no_content {
				.content_one {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-top: 35upx;
				}

				.content_two {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #929396;
					margin-top: 22upx;
				}
			}
		}

		.address_list {
			margin: 22upx 0 130upx;

			.address_item {
				width: calc(100% - 74upx);
				// height: 122upx;
				padding: 65upx 51upx 34upx 23upx;
				background-color: #FFFFFF;
				border-bottom: 2px solid #f8f8f8;
				display: flex;
				align-items: center;
				position: relative;
				margin-bottom: 20upx;

				.address_item_click {
					display: flex;
				}


				.goodsChoose {
					width: 18upx;
					height: 18upx;
					border-radius: 32upx;
					border: 2upx solid #999999;
					margin-right: 40upx;
					padding: 6upx;
					display: flex;
					justify-content: center;
					align-items: center;
					background: #E1251B;
				}

				.address_item_msg {
					.address_item_person {
						display: flex;
						align-items: center;
						margin-bottom: 10upx;

						.address_person_name {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							line-height: 34upx;
							margin-right: 16upx;
						}

						.address_person_phone {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #929396;
							line-height: 34upx;
						}

						.address_person_dan {
							padding: 0 14upx;
							height: 30upx;
							background: linear-gradient(90deg, #FFEBEA, #FFD0CD);
							border-radius: 15upx 15upx 15upx 0px;
							margin-left: 20upx;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #E1251B;
							line-height: 30upx;
						}


					}

					.address_item_address {
						width: 504upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						line-height: 40upx;
					}
				}

				.address_item_edit {
					margin-left: 15upx;
					margin-right: 5upx;
					width: 34upx;
					height: 34upx;
				}

				.default_address_tips {
					width: 118upx;
					height: 36upx;
					background: #FF9045;
					border-radius: 0px 0px 0px 10upx;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 36upx;
					text-align: center;
					position: absolute;
					top: 0;
					right: -2upx;
				}
			}
		}

		.add_address_area {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: content-box;
			width: calc(100% - 48upx);
			height: 90upx;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			padding-left: 24upx;
			padding-right: 24upx;
			box-shadow: 0upx 1upx 0upx 0upx #EEEEEE;
		}
	}
</style>
