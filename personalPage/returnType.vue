<template>
	<view class="">
		<view class="returnType">
			<view class="returnFlex">
				<view class="" style="margin-top: 50upx;margin-left: 44upx;">
					申请类型
				</view>
				<view class="" style="margin-left: 40upx;margin-top: 50upx">
					{{orderParam.refundType==10?'我要退款（无需退货）':orderParam.refundType==20?'我要退货退款':''}}
				</view>
			</view>
			<view class="returnReason" style="margin-left: 44upx;">
				<view class="">
					申请原因
				</view>
				<picker @change="bindPickerChange($event)" :range-key="'description'" :range="arr">
					<view class="uni-input" :style="{color:(text=='请选择' ? '#999999' : '')}"
						style="margin-left: 40upx;width:450upx;">
						{{text}}
					</view>
				</picker>
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/arrowRight.png" mode="">
				</image>
			</view>
		</view>
		<view style="margin-top: 20upx;width: 100%;background: #FFFFFF;border-radius: 30upx;" v-for="(item,index) in goodsArr" :key="index">
			<view class="returnTypeGoods">
				<view class="checkAll" @click="checkedAllItem(item)"
					:style="(item.num > 0  || item.outNum > 0)?'':'pointer-events: none'">
					<view class="allGoodsChoose" :style="{'border-color':(item.isChecked ? '#333' : '#999999')}">
						<icon v-if="item.isChecked" type="success_no_circle" size="15" color="#333" />
					</view>
				</view>
				<view class="">
					<image :src="item.imgUrl" mode=""></image>
				</view>
				<view class="returnTypeTitle">
					<view class="GoodsTitle">
						{{item.goodsTitle}}
					</view>
					<view class="returnTypeBrand">
						品牌：{{item.brandName}} 规格：{{item.specification?item.specification:'暂无规格'}}
					</view>
					<view class="returnNum">
						<view class="" style="width:200upx">
							￥<span v-if="item.promotionPrice !==0 ">{{item.promotionPrice}}</span>
							<span v-else >{{item.price}}</span>
						</view>

					</view>

				</view>

			</view>
			<view
				style="width: 600upx ;margin:0 auto;display: flex;justify-content: space-between;padding: 20upx 20upx;border-bottom: 1upx solid #EAEAEA;">
				<view style="margin-top: 10upx;color: #202021;font-size: 28upx;">
					已发
				</view>
				<uni-number-box @change="changBuyNum1($event,item)" :value="item.outNum" @blur="blur1($event,item)"
					:min="0" :max='item.outNums'>
				</uni-number-box>
			</view>
			<view
				style="width: 600upx ;margin:0 auto;display: flex;justify-content: space-between;padding: 20upx 20upx;">
				<view style="margin-top: 10upx;color: #202021;font-size: 28upx;">
					未发
				</view>
				<uni-number-box @change="changBuyNum2($event,item)" :value="item.num" @blur="blur2($event,item)"
					:min="0" :max='item.nums'>
				</uni-number-box>
			</view>
		</view>
		<view class="returnRemark">
			<view class="returnRemarkLength">
				<view class="">
					备注
				</view>
				<view class="">
					{{orderParam.remark.length?orderParam.remark.length: 0}}/200
				</view>
			</view>
			<view class="returnRemarkTextarea">
				<textarea maxlength='200' v-model="orderParam.remark"
					style="width:100%;overflow:hidden;white-space: nowrap;text-overflow: ellipsis;"
					placeholder-style="font-size: 28upx;font-family: PingFang SC;font-weight: 400;color: #B0B1B6;"
					placeholder="您可以在此写下补充内容，便于工作人员更快处理。" />
			</view>
		</view>
		<view class="returnBottom">
			<view class="" style="display: flex;justify-content: space-between;">
				<view class="checkAll" @click="checkedAll">
					<view class="allGoodsChoose" :style="{'border-color':(isCheckedAll ? '#333' : '#999999')}">
						<icon v-if="isCheckedAll" type="success_no_circle" size="12" color="#333" />
					</view>
					<view class="returnAll">全选</view>
				</view>

				<view class="returnBtn">
					<view class="returnPrice">
						共退款：￥<span>{{moeny}}</span>
					</view>
					<view class="returnBtnOrder"  :style="{background:background}" @click="returnClick">
						提交申请
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script src="https://cdnjs.cloudflare.com/ajax/libs/decimal.js/10.3.1/decimal.min.js"></script>
<script>
	import "@/static/LHT/returnOrderDetail.css"
	import {Decimal} from 'decimal.js'
	import {
		getRefundReasonEnum,
		orderRefundDetail,	
		refundApply,
		getOrderRefundDetail,
		getReturnAmount
	} from '@/api/orderListApi.js'
	import {
		toast
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				arr: [],
				text: '请选择',
				oderStatus: '',
				orderParam: {
					orderCode: '',
					orderGoodsParams: [],
					refundCode: '',
					refundType: '',
					remark: '',
					refundReason: ''
				},
				param: {
					orderCode: '',
					pageType:''
				},
				goodsArr: [],
				isCheckedAll: false,
				moeny: 0,
				returnAmount:0,
				orderAmount:0,
				refundId: null,
				orderRefundId: '',
				background:''
			}
		},
		onLoad(opt) {
			this.oderStatus = opt.type
			this.orderParam.orderCode = opt.orderCode
			this.orderParam.refundType = opt.type
			this.param.orderCode = opt.orderCode
			this.param.pageType = opt.pageType
			this.getReasonEnum()
			this.RefundDetail()
			if (opt.refundCode) {
				this.orderParam.refundCode = opt.refundCode
				this.orderRefundId = opt.orderRefundId
				this.getOrderRefundDetail()
			}
			this.style = uni.getStorageSync('style')
			this.color = this.style.logincheckbox
			this.background = this.style.cartbtn
		},
		methods: {
			blur1(e, item) {
				if (e.detail.value == "") {
					e.detail.value = item.outNums
				}
			},
			blur2(e, item) {
				if (e.detail.value == "") {
					e.detail.value = item.nums
				}
			},
			getReasonEnum() {
				getRefundReasonEnum(this.oderStatus).then(res => {
					this.arr = res.data
				})
			},
			bindPickerChange(e) {
				this.text = this.arr[e.target.value].description
				this.orderParam.refundReason = this.arr[e.target.value].description
			},
			getOrderRefundDetail() {
				var data = {
					orderRefundId: this.orderRefundId
				}
				getOrderRefundDetail(data).then(res => {
					if(res.success){
						this.orderParam.remark = res.data.remark
						this.text = res.data.refundReason
						this.orderParam.refundReason = res.data.refundReason
					}
					
				})
			},
			changBuyNum1(e, item) {
				item.outNum = e
				if (e) {

				} else {
					item.isChecked = false
					this.isCheckedAll = false
				}
				this.imputedPrice()
			},
			changBuyNum2(e, item) {
				item.num = e
				if (e) {

				} else {
					item.isChecked = false
					this.isCheckedAll = false
				}
				this.imputedPrice()
			},
			// 退货详情
			RefundDetail() {
				orderRefundDetail(this.param).then(res => {
					if(res.success){
						if (res.data.orderItemBasicsDto.length) {
							res.data.orderItemBasicsDto.forEach(item => {
								item.isChecked = false
								item.outNums = item.outNum
								item.nums = item.num
							})
						}
						this.orderAmount = res.data.orderAmount
						this.goodsArr = res.data.orderItemBasicsDto
						var data={
							orderId:res.data.id
						}
						getReturnAmount(data).then(res2=>{
							if(res2.success){
								this.returnAmount = res2.data
							}
						})
						
					}
				})
			},
			checkedAllItem(item) {
				item.isChecked = !item.isChecked
				if (this.goodsArr.every(obj => obj.isChecked)) {
					this.isCheckedAll = this.goodsArr.every(obj => obj.isChecked)
				} else {
					this.isCheckedAll = this.goodsArr.every(obj => obj.isChecked)
				}
				this.imputedPrice()
			},
			checkedAll() {
				this.isCheckedAll = !this.isCheckedAll
				if (this.isCheckedAll) {
					this.goodsArr.forEach(item => {
						item.isChecked = true
					})
				} else {
					this.goodsArr.forEach(item => {
						item.isChecked = false
					})
				}
				this.imputedPrice()
			},
			imputedPrice() {
				var money = new Decimal(0)
				var price = new Decimal(0)
				this.goodsArr.forEach(item => {
					if (item.isChecked) {
						var returnNums = item.num + item.outNum
						var num = new Decimal(returnNums)
						if(item.promotionPrice !== 0 ){
							price = new Decimal(item.promotionPrice)
						}else{
							price = new Decimal(item.price)
						}
						const d2 = Decimal(price).mul(num).toNumber()
						money = money.add(d2)
					}
				})
				//总金额		orderAmount
				//已退金额	returnAmount
				const x = new Decimal(this.orderAmount);
				const y1 = new Decimal(this.returnAmount);
				const y2 = new Decimal(money);
				const z = Decimal(this.orderAmount).minus(y1).minus(y2).toFixed(2);
				if(z <= 0){
					const z1 = Decimal(this.orderAmount).minus(y1).toFixed(2);
					this.moeny = z1
				}else{
					this.moeny = money
				}
			},
			returnClick() {
				this.orderParam.orderGoodsParams=[]
				if (this.orderParam.remark == '') {
					toast({
						title: '请填写售后备注'
					})
				} else if (this.orderParam.refundReason == '') {
					toast({
						title: '请选择售后原因'
					})
				} else if (this.moeny == 0) {
					toast({
						title: '请添加退款商品'
					})
				} else {
					let that = this
					uni.showModal({
						title: '提交申请',
						content: '确定提交售后申请吗？',
						success: function(res) {
							if (res.confirm) {
								that.goodsArr.forEach(item => {
									if (item.isChecked && (item.outNum > 0 || item.num > 0)) {
										// item.num = item.outNum + item.num
										if (item.num || item.outNum) {
											that.orderParam.orderGoodsParams.push(item)
										}
									}
								})
								if (that.orderParam.orderGoodsParams.length) {
									refundApply(that.orderParam).then(res => {
										if (res.success) {
											that.refundId = res.data.orderId
											uni.redirectTo({
												url: '/personalPage/returnOrderDetail?refundId=' +
													that.refundId
											})
										}
										that.orderParam.orderGoodsParams = []
									})
								} else {
									toast({
										title: '商品数量不能为空'
									})
								}

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			
			
			
			
		}
	}
</script>

<style scoped lang="less">
	.returnType {
		width: 100%;
		height: 209upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-top: 20upx;

		.returnFlex {
			display: flex;
			margin-bottom: 20upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
		}

		.returnReason {
			display: flex;
			align-items: center;
			margin-top: 15upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;

			image {
				width: 30upx;
				height: 30upx;
			}

			.uni-input {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
			}
		}
	}

	.returnTypeGoods:last-child {
		padding-bottom: 30upx;
	}

	.returnTypeGoods {

		display: flex;
		padding: 30upx 0 0 0;

		image {
			width: 244upx;
			height: 244upx;
			border-radius: 10upx;
		}

		.returnTypeTitle {
			width: 379upx;
			margin-top: 20upx;
			margin-left: 20upx;

			.GoodsTitle {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.returnTypeBrand {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #9FA0A5;
				margin-top: 20upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}

		.checkAll {
			display: flex;
			align-items: center;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-left: 30upx;
			margin-top: 30upx;

			.allGoodsChoose {
				width: 20upx;
				height: 20upx;
				border-radius: 32upx;
				border: 2upx solid #999999;
				margin-right: 16upx;
				padding: 6upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.returnNum {
			display: flex;
			margin-top: 50upx;

			span {
				color: #FF5000;
				font-size: 36upx;
				font-weight: Bold;
				font-family: PingFang SC;
			}
		}


	}

	.returnRemark {
		width: 100%;
		// height: 348upx;
		background: #FFFFFF;
		border-radius: 30upx;
		margin-top: 20upx;
		padding-bottom: 30upx;
		margin-bottom: 110upx;

		.returnRemarkLength {
			width: 690upx;
			display: flex;
			justify-content: space-between;
			margin: 0upx auto;
			padding-top: 40upx;
		}

		.returnRemarkTextarea {
			width: 690upx;
			// height: 250upx;
			background: #F8F8F8;
			border-radius: 10upx;
			margin: 20upx auto 20upx;
			box-sizing: border-box;
			padding-left: 30upx;
			padding-right: 30upx;
			padding-top: 29upx;
			padding-bottom: 30upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
		}
	}

	.returnBottom {
		width: 100%;
		height: 98upx;
		background: #FFFFFF;
		box-shadow: 0upx 6upx 21upx 6upx rgba(238, 238, 238, 0.66);
		position: fixed;
		bottom: 0;
		z-index: 999999;

		.returnBtn {
			display: flex;
			align-items: center;
			padding-right: 40upx;
		}

		.checkAll {
			display: flex;
			font-size: 22upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			margin-left: 30upx;
			margin-top: 30upx;
			align-items: center;

			.allGoodsChoose {
				width: 20upx;
				height: 20upx;
				border-radius: 32upx;
				border: 2upx solid #999999;
				margin-right: 16upx;
				padding: 6upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}

		}

		.returnAll {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			z-index: 9999;
		}

		.returnPrice {
			// width: 260upx;
			margin-left: 20upx;
			margin-top: 24upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			z-index: 9999;

			span {
				color: #FF5000;
				font-family: PingFang SC;
				font-weight: bold;
				font-size: 36upx;
			}
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
