<template>
	<view class="">
		<view class="header_text"
			:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
			<view style="margin-left:20upx;">

				<uni-icons type="back" size="20" color="#67696d" @click="back" />
			</view>
			<view class="title">
				确认订单
			</view>
		</view>
		<view class="" v-if="address.id">
			<view class="confirm_address" @click="toAddress">
				<view v-if="address.isDefault" class="address_icon"></view>
				<view class="address_msg">
					<view class="address_person">
						<view class="address_person_name">{{address.contact}}</view>
						<view class="address_person_phone">{{address.mobile}}</view>
					</view>
					<view class="address_address">{{address.province==undefined?'':address.province}}
						{{address.city==undefined?'':address.city}}{{address.area==undefined?'':address.area}}{{address.detailAddress==undefined?'':address.detailAddress}}
					</view>
				</view>
				<image class="address_more"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png"
					mode="widthFix">
				</image>
			</view>
		</view>
		<view class="confirm_address" @click="toAddress" v-else>
			<text>添加收货地址</text>
			<image class="address_more"
				src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png" mode="widthFix">
			</image>
		</view>
		<view class="confirm_Goods">
			<view class="" style="height: 30upx;">

			</view>
			<view class="confirm_GoodsDetail">
				<view class="sampleGoods" v-for="item in goodsDto" :key="item.goodsId">
					<image v-if="item.goodsUrl" :src="item.goodsUrl" mode=""></image>
					<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
						mode=""></image>
					<view class="sampleDetail">
						<view class="sampleTitle">
							{{item.goodsTitle}}
						</view>
						<view class="sampleClass">
							品牌：{{item.brandName}} 规格：{{item.specification}}
						</view>
						<view class="sampleMoney">
							<view class="price">
								<span>￥</span> {{item.price}}
								<view class="price1" v-if="goodsType == 20"
									:style="[{color:color},{background:background1}]">
									赠品
								</view>
							</view>
							
							<view class="num">
								*{{item.num}}
							</view>
						</view>
					</view>
				</view>
				<view class="company">
					<view class="sampleOrderTitle">
						单位名称/课题组/实验室号
					</view>
					<input class="companyName" type="text" v-model="companyName" placeholder="请填写单位名称/课题组/实验室号"
						:disabled='isDisable' maxlength="120" />
				</view>
				<view class="sampleOrderRemark">
					<view class="sampleOrderTitle">
						订单备注
					</view>
					<textarea v-model="orderRemark" class="input"
						:placeholder="goodsType == 20 ?'(选填)请填写赠品领取备注（0/200)' : '(选填)请填写样品申请备注（0/200)'"
						maxlength="200" auto-height />
				</view>
				<view class="sampleOrderWarning">
					<image style="width: 30upx;height: 30upx"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/warning2.png" mode=""></image>
					<view class="sampleOrderResult">
						提交 <span v-if="goodsType == 20">赠品订单</span><span v-else>样品申请</span>后，工作人员会在3个工作日内审核您的
						申请，您可以在【我的】-【订单】查询进度与结果
					</view>
				</view>
			</view>
		</view>
		<view class="confirm_Btns" :style="{ background: background }" @click="confirmOrder">
			<span v-if="goodsType == 20">0元免费领取</span><span v-else>提交订单</span>
		</view>
	</view>
</template>

<script>
	import {
		getAddress,
		getAddressDetail
	} from '@/api/address.js'
	import {
		toast,
		getRouter,
		getUrl
	} from '@/utils/utils.js'
	import {
		settleCheckSample,
		settleShopping,
		sampleOrder,
		createGift
	} from '@/api/confirmOrder.js'
	export default {
		data() {
			return {
				address: [],
				sampleDto: {

				},
				goodsIds: '',
				wareHouseIds: [],
				goodsId: [],
				goodsDto: {},
				orderRemark: '',
				companyName: '',
				modalShow: true,
				content: '样品申请成功',
				orderAmount: '',
				orderCode: '',
				payType: '',
				addressId: '',
				isStork: '',
				isRepetition: '',
				style: {},
				background: '',
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				iSsampleList: null,
				isSample: '',
				isDisable: null,
				goodsType: null,
				color: '',
				background1: '',
				orderType: null
			}
		},
		onLoad(opt) {
			this.style = uni.getStorageSync('style')
			this.background = this.style.cartbtn
			this.color = this.style.loginbtn
			this.background1 = this.style.goodsListaa
			// console.log(opt,"样品")
			// console.log(opt, "apply")
			this.orderType = opt.orderType
			// console.log(this.orderType, "apply1")
			this.goodsIds = JSON.parse(opt.goodsIds)
			this.wareHouseId = JSON.parse(opt.wareHouseIds)
			this.addressId = opt.addressId
			this.fromShoopToSmaple = opt.fromShoopToSmaple
			this.sampleList = opt.sampleList
			this.isSample = opt.isSample
			this.goodsType = opt.goodsType
			// console.log(this.goodsType, 'this.goodsType')
			if (opt.addressId) {
				this.addressDetail()
			} else {
				this.getCusAddress()
			}
			this.settleCheckGoods()
			this.getHeight();

		},
		methods: {
			// 返回
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取头部相关信息
			getHeight() {

				//  获取状态栏信息
				let stateHeight = 0; //  接收状态栏高度
				const navHeight = wx.getMenuButtonBoundingClientRect().height; //  获取胶囊高度
				let top = 0;
				wx.getSystemInfo({
					success(res) {
						stateHeight = res.statusBarHeight;
					},
				});
				top = wx.getMenuButtonBoundingClientRect().top - stateHeight; //  获取top值
				this.menuButtonInfo = navHeight
				this.statusBarHeight = stateHeight + top
			},
			confirmOrder() {
				// console.log(this.companyName, 'pppppppppp')
				if (this.isRepetition == 0  || this.orderType == 4) {
					var data = {
						accountAddressId: this.address.id,
						orderGoodsParams: this.goodsDto,
						orderSource: null,
						remark: this.orderRemark,
						enterpriseName: this.companyName,
						warehouseId: this.wareHouseId[0],
						orderType: this.orderType
					}
					if (this.companyName == null || this.companyName == '') {
						toast({
							title: '请填写公司名称'
						})
					} else {
						if (this.isStork == 0) {
							if (this.goodsType == 20) {
								createGift(data).then(res => {
									if (res.code == '0') {
										this.orderAmount = res.data.orderAmount
										this.orderCode = res.data.orderCode
										this.payType = res.data.payType
										toast({
											title: '赠品申请成功'
										})
										uni.redirectTo({
											url: '/personalPage/orderPage?orderStatus=' + '10' + '&name=' +
												"待审核"
										})


									}
								})
							} else {
								sampleOrder(data).then(res => {
									if (res.code == '0') {
										this.orderAmount = res.data.orderAmount
										this.orderCode = res.data.orderCode
										this.payType = res.data.payType
										toast({
											title: '样品申请成功'
										})
										uni.redirectTo({
											url: '/personalPage/orderPage?orderStatus=' + '10' + '&name=' +
												"待审核"
										})


									}
								})
							}
						} else {
							toast({
								title: '暂无样品库存'
							})
						}
					}

				} else {
					toast({
						title: '已申请样品'
					})
				}

			},
			addressDetail() {
				getAddressDetail({
					customerAddressId: this.addressId
				}).then(res => {
					this.address = res.data
				})
			},
			getCusAddress() {
				getAddress().then(res => {
					res.data.forEach(item => {
						if (item.isDefault) {
							this.address = item
						}
					})

				})
			},
			settleCheckGoods() {
				var data = {
					orderType: this.orderType,
					goodsIds: this.goodsIds,
					wareHouseId: this.wareHouseId,
				}
				if(this.goodsType == 20){
					settleShopping(data).then(res => {
						this.goodsDto = res.data.stockGoodsList
						// this.address = res.data.customerAddress
						this.isStork = res.data.isStork
						this.isRepetition = res.data.isRepetition
						this.companyName = res.data.enterpriseName
						if (this.companyName == null || this.companyName == '') {
							this.isDisable = false
						} else {
							this.isDisable = true
						}
					})
				}else{
				settleCheckSample(data).then(res => {
					this.goodsDto = res.data.stockGoodsList
					// this.address = res.data.customerAddress
					this.isStork = res.data.isStork
					this.isRepetition = res.data.isRepetition
					this.companyName = res.data.enterpriseName
					if (this.companyName == null || this.companyName == '') {
						this.isDisable = false
					} else {
						this.isDisable = true
					}
				})	
				}		
			},
			confirmModal() {
				// this.show = false;
				// console.log(this.orderCode,this.payType,this.orderAmount)

			},
			toAddress() {
				uni.redirectTo({
					url: '/personalPage/address/addressList?goodsIds=' + JSON.stringify(this.goodsIds) +
						'&wareHouseIds=' + JSON.stringify(this.wareHouseId) + '&sample=1' + "&isSample=1" +
						"&goodsType=" + this.goodsType + "&orderType=" + this.orderType
				})
			},

		}
	}
</script>
<style>
	@import url('@/static/LHT/applySample.css');
</style>

<style lang="less" scoped>
	.header_text {

		width: 100%;
		display: flex;
		background-color: #FFFFFF;

		.title {
			width: 100%;
			margin-left: 275upx;
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			// font-weight: bold;
			color: #212121;
		}
	}

	.confirm_address {
		position: sticky;
		top: 20upx;
		// margin-left: 24upx;
		margin: 0 auto;
		// margin-bottom: 38upx;
		width: calc(100% - 60upx);
		padding: 39upx 29upx;
		box-sizing: border-box;
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
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: #202021;
					line-height: 34upx;
					margin-right: 22upx;
					margin-left: 11upx;
				}

				.address_person_phone {
					font-size: 28upx;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					line-height: 34upx;
					color: #929396;
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
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
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

	.confirm_Goods {
		width: calc(100% - 60upx);
		// height: 601upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin: 40upx auto 0;
		padding-bottom: 40upx;

		.confirm_GoodsDetail {
			width: calc(100% - 60upx);
			margin: 0upx auto 0;

			.sampleGoods {
				display: flex;
				justify-content: space-between;

				image {
					width: 170upx;
					height: 170upx;
				}

				.sampleDetail {
					width: calc(100% - 191upx);
					margin-top: 15upx;

					.sampleTitle {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						overflow: hidden;
						text-overflow: ellipsis;
						;
						white-space: nowrap;
					}

					.sampleClass {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-top: 20upx;
					}

					.sampleMoney {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 34upx;

						span {
							font-size: 28upx;

							color: #FF5000;
						}

						.price {
							font-size: 36upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF5000;
							margin-left: -20upx;
						}

						.price1 {
							display: inline-block;
							border-radius: 35upx;
							font-size: 24upx;
							margin-left: 20upx;
							// margin: 20upx 34upx;
							padding: 5upx 14upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: normal;
							color: #FF5000;
						}

						.num {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
				}
			}
			
			.company {
				margin-top: 31upx;
				// display:flex;
				// justify-content:space-between;

				.sampleOrderTitle {
					// width:380upx;
					// background: #FFD0CD;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					// white-space: nowrap; //（不换行）
					// text-overflow: ellipsis; //(省略号）
					// overflow: hidden; //（多余部分隐藏）
				}

				.companyName {
					// width: 300upx;
					font-size: 28upx;
					background: #ffffff;
					border-radius: 10upx;
					text-align:right;
					margin-top: 5upx;
				}

			}

			.sampleOrderRemark {
				margin-top: 31upx;

				.sampleOrderTitle {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-bottom: 22upx;
				}

				.input {
					width: 100%;
					min-height: 200upx;
					background: #F6F6F6;
					border-radius: 10upx;
				}

			}


			.sampleOrderWarning {
				display: flex;
				margin-top: 22upx;

				image {
					margin: 0 15upx 0 4upx;
				}

				.sampleOrderResult {
					width: 570upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
				}
			}
		}
	}


	::v-deep .u-input {
		overflow: hidden;
		border-radius: 10px;
		background: #F6F6F6;
	}
</style>