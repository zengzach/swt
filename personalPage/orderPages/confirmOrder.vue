<template>
	<view class="confirm_div">
		<view class="header_text"
			:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
			<view style="margin-left:20upx;">
				<uni-icons type="back" size="20" color="#67696d" @click="back" />
			</view>
			<view class="title">
				确认订单
			</view>
		</view>
		<view class="" v-if="address!=null">
			<view class="confirm_address" @click="toAddress">
				<view v-if="address.isDefault" class="address_icon" :style="{backgroundImage: 'url(' + imageURL1 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}"></view>
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
		<view class="confirm_product_list">
			<view class="confirm_product_item" v-for="(item,index) in orderList" :key='index'>
				<view class="confirm_product_msg">
					<image v-if="item.goodsUrl" :src="item.goodsUrl"></image>
					<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
						mode="widthFix"></image>
					<view class="pro_item_msg">
						<h3>{{item.goodsTitle}}</h3>
						<view class="pro_item_bottom">
							<view class="pro_bottom_price">
								<text v-if="item.promotionStatus == 20">￥{{item.promotionPrice}}</text>
								<text v-else>{{item.price}}</text>
							</view>
							<view class="pro_bottom_price1" v-if="item.promotionStatus == 20">
								<text>￥{{item.price}}</text>
							</view>
							<text class="packing_content_num">*{{item.num}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="confirm_settlement">
			<view class="confirm_settlement_one">
				<view class="confirm_text">商品金额</view>
				<text
					style="font-size: 26upx;font-family: PingFang SC;font-weight: 500;color: #929396;margin-left: -250upx;margin-top:5upx;">共{{orderListLength}}件商品</text>
				<view class="amount">￥<text>{{orderMsg.originalSettleAmount}}</text></view>
			</view>
			<view class="confirm_settlement_one">
				<view class="confirm_text">运费</view>
				<view class="freight">￥<text>{{orderMsg.carriage}}</text></view>
			</view>
			<view class="confirm_settlement_one" v-if="useCouponList.length" @click="openDiscountPopup">
				<view class="confirm_text">优惠券</view>
				<view class="freight">
					<text class="freight_text" :style="couponPrice?'color:#EE281E':'color:#232323'">{{couponPrice?couponPrice:'可使用优惠券'}}</text>
					<uni-icons class="freight_icon" type="arrowright" size="14" :color="couponPrice?'#EE281E':'#666666'" />
				</view>
			</view>
			<view class="confirm_settlement_one" v-else>
				<view class="confirm_text">优惠券</view>
				<view class="freight">
					<text style="color:#232323;font-weight: 400;">无可用优惠券</text>
				</view>
			</view>
			<view class="confirm_settlement_one">
				<view class="confirm_text">合计</view>
				<view class="freight">￥<text>{{orderMsg.goodsSettleAmount}}</text></view>
			</view>
			<view class="confirm_settlement_two" style="padding-bottom: 14upx;">
				<view class="confirm_text"> 单位名称/课题组/实验室号 </view>
				<textarea class="uni-input" :disabled="iscompanyName" v-model="companyName" placeholder="请输入单位名称/课题组/实验室号"
					placeholder-style="font-weight:400;" />
			</view>
			<view class="confirm_settlement_two">
				<view class="confirm_text">留言</view>
				<!-- adjust-position=false -->
				<textarea class="uni-input" v-model="orderRemark" placeholder="请输入本商品的备注内容"
					placeholder-style="font-weight:400;" />
			</view>
		</view>
		<view class="confirm_select">
			<view class="confirm_select_item">
				<view class="confirm_item_title" style="color: #202021;font-size: 30upx;">
					开票类型
				</view>
				<view class="confirm_item_msg" @click="goBirthPlaceSelec"
					v-if="orderMsg.invoiceCode == ''||orderMsg.invoiceCode == null" style="padding-left: 20upx;">
					请选择
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
						class="right">
					</image>
				</view>
				<view class="confirm_item_title" style="color: #202021;font-size: 30upx;" @click="goBirthPlaceSelec"
					v-if="orderMsg.invoiceCode !== null">{{description!='undefined'&&description!=null ? description:'请选择'}}
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
						class="right">
					</image>
				</view>
			</view>
		</view>
		<view class="confirm_select" style="padding: 30upx 24upx 30upx 24upx;">
			<view class="wxPayFlex">
				<view class="wxPaySamllFlex">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/Flage.png" mode=""></image>
					<view style="color: #202021;font-size: 30upx;padding-right:20upx;">线下支付</view>
					<image @click="showPay" style="width: 30upx;height: 30upx;" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/%EF%BC%9F.png" mode=""></image>
				</view>
				<view class="checkAll" @click="checked">
					<view class="allGoodsChoose"
						:style="{'border-color':(Flage ? backgrounds : '#999999'),
						'background':(Flage ? backgrounds : ''),
						'border':(Flage ? 'none' : '2upx solid #999999')}">
						<icon v-if="Flage" type="success_no_circle" size="12" color="#fff" />
					</view>
				</view>
			</view>
			<view class="wxPayFlex" v-if="openWxPay==1" @click="wxchecked">
				<view class="wxPaySamllFlex">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/wxFlage.png" mode=""></image>
					<view style="color: #202021;font-size: 30upx;">微信支付</view>
				</view>
				<view class="checkAll">
					<view class="allGoodsChoose"
						:style="{'border-color':(wxFlage ? backgrounds : '#999999'),
						'background':(wxFlage ? backgrounds : ''),
						'border':(wxFlage ? 'none' : '2upx solid #999999')}">
						<icon v-if="wxFlage" type="success_no_circle" size="12" color="#fff" />
					</view>
				</view>
			</view>
		</view>
		<!-- 展示不全 -->
		<view class="" style="height: 180upx;"></view>
		<view class="confirm_bottom">
			<view class="confirm_bottom_one">
				<view class="confirm_price" ref="price">
					<text
						style="font-size: 24upx;font-family: PingFang SC;font-weight: 500;color: #999999;margin-right: 15upx;">共{{orderListLength}}件商品</text>
					合计：<text>￥<text class="price">{{orderMsg.goodsSettleAmount}}</text></text>
				</view>
			</view>
			<view class="confirm_btn" :style="{ background: backgrounds }" @click="toPlaceOrder">提交订单</view>
		</view>
		<uni-popup class="discountPopups" ref="discountPopup" type="bottom">
			<view class="popup">
				<view class="popup_text">优惠券</view>
				<!-- 优惠券列表 -->
				<scroll-view v-if="useCouponList.length" class="discountsList" scroll-y="true" show-scrollbar="false">
					<view class="discountsItem" v-for="(item,index) in useCouponList" :key="index" @click="checkSelect(item,index)">
						<view class="price" v-if="item.couponType==1">
							￥<text>{{item.discountAmount}}</text>
							<view class="price_left">满{{item.conditionPrice}}可用</view>
						</view>
						<view class="price" v-if="item.couponType==2">
							<text>{{item.discountRate*10}}</text>折
							<view class="price_left">满{{item.conditionPrice}}可用</view>
						</view>
						<view class="price_center">
							<view class="discountsDetail_one">{{item.couponType==1?'满减券':'折扣券'}}</view>
							<view class="discountsDetail_two" v-if="item.useType==1">全部商品可用</view>
							<view class="discountsDetail_two" v-if="item.useType==2">指定商品可用</view>
							<view class="discountsDetail_two" v-if="item.useType==3">指定商品不可用</view>
							<view class="discountsDetail_three">{{item.startTime}}-{{item.endTime}}</view>
						</view>
						<view class="price_right">
							<radio color="#FE762D" value="" :checked="index==checkedIndex?true:false" style="transform:scale(0.7)"/>
						</view>
					</view>
				</scroll-view>
				<view class="noList" v-else>
					<view class="cont">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/noDiscountList.png" mode=""></image>
						<view>暂无可用的优惠券</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 支付方式弹窗 -->
		<uni-popup class="pay_popup" ref="payPopup" :mask-click="true">
			<view class="payPopup">
				<view class="payTitle">
					<view>线下支付</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="closePayPopup"></image>
				</view>
				<view class="payMsg">
					选择线下支付请按照汇款账号线下转账，确保您的转账金额与订单金额一致。
				</view>
				<view class="payBtn" :style="[{ background:  backgrounds }]" @click="closePayPopup">确定</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { settleBuyNow } from '@/api/goodsDetailApi.js'
	import { wxGetOpenId, wxJsPay } from '@/api/confirmOrder.js'
	import { settleCheck, order, buyNow, wxPayment } from '@/api/confirmOrder.js'
	import moment from 'moment';
	import { getAddress } from '@/api/address.js'
	import { getStyleById } from '@/api/indexApi'
	import { toast, getRouter, getUrl } from '@/utils/utils.js'
	export default {
		data() {
			return {
				isClick: 0,
				checkedIndex:0,
				// bgd1:"url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_greybg.png')",
				// bgd2:"url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_greybg_grey.png')",
				useCouponList:[],
				isUseCoupon:false,
				couponId:null,
				couponPrice:'',
				oldCouponId:null,
				companyName:'',
				iscompanyName:false,
				index:1,
				orderRemark: '',
				flag: false,
				goodsIds: [],
				wareHouseId: [],
				orderList: {},
				orderListLength:'',
				orderMsg: null,
				address: [],
				orderAmount: '',
				orderCode: '',
				payType: '',
				orderType: '',
				price: '',
				params: {
					goodsId: '',
					num: '',
					addressId: '',
				},
				accountAddressId: '',
				pageType: '',
				goodList: [],
				style: {},
				background: '',
				imageURL1: '',
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				toOrderList: '', //判断是从购物车过来的
				goodsList: '', //判断是从goodsList过来的
				description: null, //开票类型
				openWxPay:null,
				styles:{},
				backgrounds: '',
				color: '',
				checkCart:null,
				Flage: null,
				wxFlage:null,
			}
		},
		onLoad(opt) {
			// console.log(opt,"确认订单页面")
			this.style = uni.getStorageSync('style')
			if(opt.checkCart){
				this.checkCart = opt.checkCart
			}
			if(opt.couponId){
				this.couponId = opt.couponId
				this.couponPrice = opt.couponPrice
			}
			if(opt.oldCouponId){
				this.oldCouponId=opt.oldCouponId
				this.couponId=opt.oldCouponId
				this.isUseCoupon = true
				this.checkedIndex=opt.checkedIndex
			}else{
				this.isUseCoupon = false
			}
			if(opt.companyName){
				this.companyName = opt.companyName
			}
			this.description = opt.description
			this.background = this.style.cartbtn
			this.imageURL1 = this.style.confirmdefault
			this.price = opt.price
			this.addressId = opt.addressId
			this.orderType = opt.orderType
			this.pageType = opt.cartPage
			this.toOrderList = opt.toOrderList
			this.goodsList = opt.goodsList
			if (this.pageType) {
				this.wareHouseId = JSON.parse(opt.wareHouseIds)
				this.goodsIds = JSON.parse(opt.goodsIds)
				this.getDetail()
			} else {
				this.params.goodsId = opt.goodsId
				this.goodsIds.push(opt.goodsId)
				this.wareHouseId.push(opt.wareHouseIds)
				this.params.num = opt.num
				this.params.addressId = opt.addressId
				this.getsettleBuyNow()
			}
			this.Flage = JSON.parse(opt.Flage)
			this.wxFlage = JSON.parse(opt.wxFlage)

		},
		onShow() {
			getUrl()
			getRouter()
			this.getHeight()
			this.getStyleByIdList()
			if (this.pageType) {
				this.getDetail()
			}
			var token = uni.getStorageSync('token')
			if (token) {
				this.isLogin = true
				this.flag = true
			} else {
				this.flag = false
				this.isLogin = false
			}
		},
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			getStyleByIdList() {
				// var id = 1
				getStyleById().then(res => {
					this.styles = res.data
					this.color = res.data.loginbtn
					this.backgrounds = res.data.addressadd
					this.background = res.data.goodsListaa
					// console.log(this.styles,'styles')
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
			// 返回
			back() {
				if (this.toOrderList == 1) {
					uni.navigateBack({
						delta: 1
					})
				} else if (this.goodsList == 1) {
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.redirectTo({
						url: "/goodsDetail/goodsDetail?goodsId=" + this.goodsIds + "&type=1"
					})
				}

			},
			// 选择发票类型
			goBirthPlaceSelec() {
				uni.redirectTo({
					url: '/personalPage/orderPages/birthPlaceSelec?goodsIds=' + JSON.stringify(this.goodsIds) +
						'&wareHouseIds=' + JSON.stringify(this.wareHouseId)+'&couponId='+this.couponId+
						'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId
						+'&checkedIndex=' +this.checkedIndexif+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
				})
			},
			getDetail() {
				this.oldCouponId= this.couponId
				if(this.couponId){
					var data = {
						goodsIds: this.goodsIds,
						wareHouseIds: this.wareHouseId,
						addressId: this.addressId,
						orderType: this.orderType,
						customerCouponId: this.couponId,
						isUseCoupon:this.isUseCoupon
					}
				}else{
					var data = {
						goodsIds: this.goodsIds,
						wareHouseIds: this.wareHouseId,
						addressId: this.addressId,
						orderType: this.orderType,
						isUseCoupon:this.isUseCoupon
					}
				}
				settleCheck(data).then(res => {
					this.orderMsg = res.data
					this.orderList = res.data.stockGoodsList
					this.orderListLength = res.data.stockGoodsList.length
					this.address = res.data.customerAddress
					this.openWxPay = res.data.openWxPay
					if(this.companyName){
						this.iscompanyName=true
					}else{
						this.companyName=res.data.enterpriseName
					}
					// console.log(this.iscompanyName,"-----settleCheck--------")
					if(res.data.useCouponList){
						if(!this.couponPrice){
							if(this.isUseCoupon==false){
								this.checkedIndex = null
								this.couponId = null
								this.couponPrice = ''
							}else{
								this.checkedIndex = 0
								this.couponId =res.data.useCouponList[0].customerCouponId
								this.couponPrice ='-￥' + res.data.useCouponList[0].discountAmount +"元"
							}
							
						}
						res.data.useCouponList.forEach(item => {
							item.startTime = moment(item.startTime).format('YYYY.MM.DD HH:mm:ss')
							item.endTime = moment(item.endTime).format('YYYY.MM.DD HH:mm:ss')
						})
					}
					this.useCouponList = res.data.useCouponList
				})
			},
			// 打开优惠券弹窗
			openDiscountPopup() {
				this.$refs.discountPopup.open('bottom')
			},
			// 选择优惠券
			checkSelect(item,index){
				if(this.oldCouponId == item.customerCouponId){
					this.checkedIndex = null
					this.couponId = null
					this.couponPrice = ''
					this.isUseCoupon = false
					if (this.pageType) {
						this.getDetail()
						this.$refs.discountPopup.close()
					} else {
						this.getsettleBuyNow()
						this.$refs.discountPopup.close()
					}
				}else{
					this.checkedIndex = index
					this.isUseCoupon = true
					var code = item.customerCouponId
					this.useCouponList.forEach(item=>{
						if(code==item.customerCouponId){
							this.couponId = item.customerCouponId
						}
					})
					this.couponPrice = '-￥' + item.discountAmount + '元'
					if (this.pageType) {
						this.getDetail()
						this.$refs.discountPopup.close()
					} else {
						this.getsettleBuyNow()
						this.$refs.discountPopup.close()
					}
				}
				
				
			},
			//打开线下支付说明
			showPay() {
				this.$refs.payPopup.open('bottom')
			},
			closePayPopup() {
				this.$refs.payPopup.close()
			},
			// 选择支付方式
			checked() {
				uni.setStorageSync('Flage',true)
				uni.setStorageSync('wxFlage',false)
				this.Flage = uni.getStorageSync('Flage')
				this.wxFlage = uni.getStorageSync('wxFlage')
			},
			wxchecked(){
				uni.setStorageSync('Flage',false)
				uni.setStorageSync('wxFlage',true)
				this.Flage = uni.getStorageSync('Flage')
				this.wxFlage = uni.getStorageSync('wxFlage')
			},
			// 提交订单
			toPlaceOrder() {
				var goodList = []
				this.orderList.forEach(item => {
					goodList.push({
						goodsId: item.goodsId,
						num: item.num,
					})
				})
				this.orderMsg.enterpriseName = this.companyName
				// if (this.description == undefined) {
				// 	toast({
				// 		title: '请选择开票类型'
				// 	})
				// 	return
				// }
				if (this.address) {
					if(this.orderMsg.enterpriseName){
						if(this.Flage||this.wxFlage){
							if (this.pageType) {
								if(this.couponId){
									var params = {
										accountAddressId: this.address.id, //地址id
										orderGoodsParams: goodList, //订单商品信息
										orderSource: null, //订单来源
										remark: this.orderRemark, //备注
										warehouseId: this.wareHouseId[0],
										enterpriseName:this.orderMsg.enterpriseName,
										orderType: this.orderType,
										customerCouponId: this.couponId,
										checkCart:this.checkCart
									}
								}else{
									var params = {
										accountAddressId: this.address.id, //地址id
										orderGoodsParams: goodList, //订单商品信息
										orderSource: null, //订单来源
										remark: this.orderRemark, //备注
										warehouseId: this.wareHouseId[0],
										enterpriseName:this.orderMsg.enterpriseName,
										orderType: this.orderType,
										checkCart:this.checkCart
									}
								}
								if (this.wxFlage){
									wxPayment(params).then(res => {
										this.orderAmount = res.data.orderAmount
										this.orderCode = res.data.orderCode
										this.payType = res.data.payType
										if (res.success) {
											wx.login({
												success: (loginRes) => {
													wxGetOpenId(loginRes.code).then(openIdRes => {
														if (openIdRes.data) {
															var data = {
																openid: openIdRes.data,
																orderCode: this.orderCode
															}
															wxJsPay(data).then(ress => {
																if (ress.data) {
																	var that = this
																	wx.requestPayment({
																		timeStamp: ress.data.timeStamp,
																		nonceStr: ress.data.nonceStr,
																		package: ress.data.package,
																		signType: 'RSA',
																		paySign: ress.data.paySign,
																		success(ress) {
																			uni.removeStorageSync('Flage')
																			uni.removeStorageSync('wxFlage')
																			// console.log("------111")
																			uni.redirectTo({
																				url: '/personalPage/orderDetail?orderCode=' + that.orderCode
																			})
																		},
																		fail(ress) {
																			// console.log("------222")
																			uni.redirectTo({
																				url: '/personalPage/orderDetail?orderCode=' + that.orderCode
																			})
																		},
																		complete(ress) {
																			// console.log("------333")
																			uni.redirectTo({
																				url: '/personalPage/orderDetail?orderCode=' + that.orderCode
																			})
																		}
																	})
																}
															})
														}
													})
												}
											})
										}
									})
								}else{
									order(params).then(res => {
										this.orderAmount = res.data.orderAmount
										this.orderCode = res.data.orderCode
										this.payType = res.data.payType
										if (res.success) {
											toast({
												title: '订单创建成功'
											})
											uni.removeStorageSync('Flage')
											uni.removeStorageSync('wxFlage')
											uni.navigateTo({
												url: '/personalPage/orderPages/placeOrder?orderAmount=' + this.orderAmount + '&orderCode=' +
													this.orderCode + '&payType=' + this.payType
											})
										}
									})
								}
							}else{
								this.getbuyNow()
							}
						} else {
							toast({
								title: '请选择支付方式'
							})
						}
					}else{
						toast({
							title: '请填写公司名称'
						})
					}
				} else {
					toast({
						title: '请添加收货地址'
					})
				}

			},
			// 去收货地址
			toAddress() {
				if (this.cartPage) {
					uni.redirectTo({
						url: '/personalPage/address/addressList?goodsIds=' + JSON.stringify(this.goodsIds) +
							'&wareHouseIds=' + JSON.stringify(this.wareHouseId)+ '&description=' + this.description
							+'&couponId='+this.couponId+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName
							+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart
							+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				} else {
					uni.redirectTo({
						url: '/personalPage/address/addressList?goodsIds=' + JSON.stringify(this.goodsIds) +
							'&num=' + this.params.num + '&carPage=1' + '&wareHouseIds=' + JSON.stringify(this
							.wareHouseId)+ '&description=' + this.description+'&couponId='+this.couponId
							+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName
							+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart
							+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
					})
				}

			},
			getsettleBuyNow() {
				this.oldCouponId = this.couponId
				if(this.couponId){
					var data={
						goodsId: this.params.goodsId,
						num: this.params.num,
						addressId: this.params.addressId,
						customerCouponId:this.couponId,
						isUseCoupon:this.isUseCoupon
					}
				}else{
					var data={
						goodsId: this.params.goodsId,
						num: this.params.num,
						addressId: this.params.addressId,
						isUseCoupon:this.isUseCoupon
					}
				}
				this.goodList=[]
				settleBuyNow(data).then(res => {
					if (res.success) {
						this.orderMsg = res.data
						this.orderList = res.data.stockGoodsList
						this.orderListLength = res.data.stockGoodsList.length
						this.address = res.data.customerAddress
						this.accountAddressId = res.data.customerAddress.id
						this.openWxPay = res.data.openWxPay
						if(this.companyName){
							this.iscompanyName=true
						}else{
							this.companyName=res.data.enterpriseName
						}
						// console.log(this.iscompanyName,"-----settleBuyNow--------")
						if(this.orderList){
							this.orderList.forEach(item => {
								this.warehouseId = item.warehouseId
								this.goodList.push({
									goodsId: item.goodsId,
									num: item.num,
								})
							})
						}
						if(res.data.useCouponList){
							if(!this.couponPrice){
								if(this.isUseCoupon==false){
									this.checkedIndex = null
									this.couponId = null
									this.couponPrice = ''
								}else{
									this.checkedIndex = 0
									this.couponId =res.data.useCouponList[0].customerCouponId
									this.couponPrice ='-￥' + res.data.useCouponList[0].discountAmount +"元"
								}
							}
							res.data.useCouponList.forEach(item => {
								item.startTime = moment(item.startTime).format('YYYY.MM.DD HH:mm:ss')
								item.endTime = moment(item.endTime).format('YYYY.MM.DD HH:mm:ss')
								item.isChecked = false
							})
						}
						this.useCouponList = res.data.useCouponList
					}
				})
			},
			getbuyNow() {
				var goodList = []
				this.orderList.forEach(item => {
					goodList.push({
						goodsId: item.goodsId,
						num: item.num,
					})
				})
				if(this.couponId){
					var orderParams = {
						orderGoodsParams: goodList,
						goodsId: this.params.goodsId,
						accountAddressId: this.accountAddressId,
						warehouseId: this.warehouseId,
						remark: this.orderRemark,
						enterpriseName:this.orderMsg.enterpriseName,
						customerCouponId: this.couponId,
						checkCart:this.checkCart
					}
				}else{
					var orderParams = {
						orderGoodsParams: goodList,
						goodsId: this.params.goodsId,
						accountAddressId: this.accountAddressId,
						warehouseId: this.warehouseId,
						enterpriseName:this.orderMsg.enterpriseName,
						remark: this.orderRemark,
						checkCart:this.checkCart
					}
				}
				if (this.wxFlage){
					wxPayment(orderParams).then(res => {
						this.orderAmount = res.data.orderAmount
						this.orderCode = res.data.orderCode
						this.payType = res.data.payType
						if (res.success) {
							wx.login({
								success: (loginRes) => {
									wxGetOpenId(loginRes.code).then(openIdRes => {
										if (openIdRes.data) {
											var data = {
												openid: openIdRes.data,
												orderCode: this.orderCode
											}
											wxJsPay(data).then(ress => {
												if (ress.data) {
													var that = this
													wx.requestPayment({
														timeStamp: ress.data.timeStamp,
														nonceStr: ress.data.nonceStr,
														package: ress.data.package,
														signType: 'RSA',
														paySign: ress.data.paySign,
														success(ress) {
															uni.removeStorageSync('Flage')
															uni.removeStorageSync('wxFlage')
															// console.log("------111")
															uni.redirectTo({
																url: '/personalPage/orderDetail?orderCode=' + that.orderCode
															})
														},
														fail(ress) {
															// console.log("------222")
															uni.redirectTo({
																url: '/personalPage/orderDetail?orderCode=' + that.orderCode
															})
														},
														complete(ress) {
															// console.log("------333")
															uni.redirectTo({
																url: '/personalPage/orderDetail?orderCode=' + that.orderCode
															})
														}
													})
												}
											})
										}
									})
								}
							})
						}
					})
				}else{
					buyNow(orderParams).then(res => {
						this.orderAmount = res.data.orderAmount
						this.orderCode = res.data.orderCode
						this.payType = res.data.payType
						if (res.success) {
							toast({
								title: '订单创建成功'
							})
							uni.removeStorageSync('Flage')
							uni.removeStorageSync('wxFlage')
							uni.navigateTo({
								url: '/personalPage/orderPages/placeOrder?orderAmount=' + this.orderAmount + '&orderCode=' + this
									.orderCode + '&payType=' + this.payType
							})
						}
					})
				}
				
			},
			
		}
	}
</script>

<style scoped lang="scss">
	@import url('@/static/LHT/confirm.css');
	
	.confirm_div {
		background: #eee;
		// height: 100vh;
		overflow: auto;

		.header_text {
			position: fixed;
			z-index: 999;
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
			top: 180upx;
			margin-left: 24upx;
			margin-bottom: 38upx;
			width: calc(100% - 106upx);
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

		.confirm_product_list {
			margin: 0 24upx 29upx;
			width: calc(100% - 96upx);
			padding: 14upx 24upx 13upx;
			background-color: #FFFFFF;
			margin-bottom: 22upx;
			border-radius: 15upx;
			margin-top: 200upx;

			.confirm_product_cang {
				width: 100%;
				display: flex;

				image {
					width: 36upx;
					height: 36upx;
					border-radius: 5upx;
					margin-right: 15upx;
				}

				.confirm_product_cang_text {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 34upx;
				}

				.confirm_product_cang_time {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					line-height: 34upx;
					margin-left: 11upx;
				}
			}

			.confirm_product_item {
				width: 100%;
				border-bottom: 1upx solid #EEEEEE;

				.confirm_product_msg {
					padding: 29upx 0 10upx 0;
					display: flex;
					align-items: center;
					box-sizing: border-box;

					image {
						width: 168upx;
						height: 168upx;
						border-radius: 15upx;
						margin-right: 19upx;
					}

					.pro_item_msg {
						width: calc(100% - 175upx);

						h3 {
							width: 100%;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							margin-bottom: 20upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.pro_item_bottom {
							display: flex;
							justify-content: space-between;
							align-items: baseline;

							.pro_bottom_price {
								display: flex;
								align-items: baseline;
								// .now_price {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #FF5000;

								text {
									font-size: 36upx;
									font-weight: bold;
								}
							}

							.pro_bottom_price1 {
								display: flex;
								// align-items: baseline;
								width: 300upx;
								margin-left: 10upx;
								margin-top: 5upx;
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: Medium;
								color: #9FA0A5;

								text {
									text-decoration: line-through;
									font-size: 30upx;
								}
							}
						}

						.packing_content_num {
							margin-left: 72upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							margin-top: 5upx;
						}


					}
				}

				.confirm_product_remarks {
					width: 100%;
					display: flex;
					align-items: center;
					margin-bottom: 29upx;

					.confirm_remarks_title {
						width: 150upx;
						text-align: right;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}

					.uni-input {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-left: 23upx;
					}
				}
			}

			.confirm_product_item:last-child {
				border-bottom: 0upx;
			}
		}

		.confirm_settlement {
			width: calc(100% - 98upx);
			padding: 18upx 24upx 18upx 26upx;
			background-color: #FFFFFF;
			margin: 0 24upx 22upx;
			border-radius: 15upx;

			.confirm_settlement_one {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				position: relative;

				.confirm_text {
					width:140upx;
					// background: #b3ffb2;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}

				.uni-input {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					text-align:right;
					position: absolute;
					right: 0;
					text-overflow: ellipsis;
				}
				.uni-input:focus{
					font-weight: 400;
				}

				view:last-child {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					line-height: 70upx;
				}

				.amount {
					font-size: 20upx;

					text {
						font-size: 30upx;
					}
				}

				.freight {
					font-size: 20upx;
					display: flex;
					justify-content: space-between;

					text {
						font-size: 28upx;
					}
					.freight_text{
						
					}

					.freight_icon {
						padding-left: 20upx;
					}
				}

			}
			.confirm_settlement_two {
				width: 100%;
				height: 80upx;
				position: relative;
				// overflow: hidden;
				.confirm_text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}
			
				.uni-input {
					height:40upx;
					font-size: 28upx;
					line-height: 40upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					text-align:right;
					position: absolute;
					top:50upx;
					right: 0;
				}
				.uni-input:focus{
					font-weight: 400;
				}
			}
		}

		.confirm_select {
			width: calc(100% - 96upx);
			// height: 40upx;
			padding: 40upx 24upx 40upx 24upx;
			background-color: #FFFFFF;
			margin: 0 24upx 20upx;
			border-radius: 15upx;

			.confirm_select_item {
				height: 30upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-bottom: 25upx;

				.confirm_item_msg {
					image {
						width: 18upx;
						height: 18upx;
						margin-left: 8upx;
					}

					.right {
						width: 26upx;
						height: 26upx;
					}

				}

				.confirm_item_title {
					image {
						width: 18upx;
						height: 18upx;
						margin-left: 10upx;
					}

					.right {
						width: 26upx;
						height: 26upx;

					}

				}
			}

			.confirm_select_item:last-child {
				margin-bottom: 0;
			}
			.wxPayFlex {
				height:60upx;
				display: flex;
				justify-content: space-between;
				
				
			
				.wxPaySamllFlex {
					display: flex;
					align-items: center;
			
					image {
						width: 48upx;
						height: 48upx;
					}
			
					view {
						margin-left: 25upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
				}
				.wxPaySamllFlex:last-child {
					margin-top: 20upx;
				}
			
				.checkAll {
					display: flex;
					align-items: center;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
			
					.allGoodsChoose {
						width: 20upx;
						height: 20upx;
						border-radius: 32upx;
						border: 1upx solid #999999;
						margin-right: 16upx;
						padding: 8upx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			
			}
		}

		.confirm_bottom {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: content-box;
			width: calc(100% - 30upx);
			height: 96upx;
			background: #FFFFFF;
			box-shadow: 0px 1upx 0px 0px #EEEEEE;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			position: fixed;
			bottom: 0;
			padding-right: 30upx;

			// z-index:999;
			.confirm_bottom_one {
				display: flex;
				align-items: baseline;
				justify-content: flex-end;

				.confirm_num {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-right: 16upx;
				}

				.confirm_price {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #202021;
					margin-right: 28upx;

					text {
						font-weight: bold;
						font-size: 24upx;
						color: #FF5000;
					}

					.price {
						font-weight: bold;
						font-size: 36upx;
						color: #FF5000;
					}
				}
			}


		}

		.discountPopups {
			width: 750upx;
			height: 600upx;
			.popup{
				width: 750upx;
				height: 820upx;
				background: #fff;
				
				.popup_text{
					height:120upx;
					line-height:120upx;
					text-align:center;
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
				}
				
				.discountsList {
					width: 100%;
					height: 600rpx;
					padding:0 30upx 20upx 30upx;
					white-space: nowrap;
				}
				.discountsItem {
					width:690upx;
					height: 180rpx;
					background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_greybg.png');
					background-size:100% 100%;
					margin-top:20upx;
					display:flex;
					justify-content:space-between;
					
					.price{
						width:185upx;
						color: #FFFFFF;
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: bold;
						text-align: center;
						
						text {
							color: #FFFFFF;
							font-size: 50rpx;
							font-family: PingFang SC;
							font-weight: 800;
							line-height: 160upx;
						}
						
						.price_left {
							font-size: 18rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							margin-top: -45upx;
						}
					}
					.price_center{
						width:400upx;
						text-align: left;
						padding-left:25upx;
						.discountsDetail_one{
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #666666;
							margin-top:36upx;
						}
						.discountsDetail_two{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							margin-top:10upx;
						}
						.discountsDetail_three{
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							margin-top:10upx;
						}
					}
					.price_right{
						width:60upx;
						
						radio{
							margin-top:70upx;
							margin-left:5upx;
						}
						
					}
				}
				
				.noList{
					width:100%;
					// background:#ffffff;
					position:relative;
					top:20upx;
					.cont{
						width:270upx;
						position:absolute;
						top:120upx;
						left:235upx;
						text-align:center;
						image{
							width:100upx;
							height:100upx;
						}
						view{
							font-size: 26rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #929396;
							line-height: 30rpx;
						}
					}
				}
			}
		}
	
		.pay_popup {
			.payPopup {
				width: 100%;
				height: 360upx;
				background-color: #FFFFFF;
				border-radius: 15upx 15upx 0 0;
				position: relative;
		
				.payTitle {
					width: 100%;
					padding: 39upx 0;
					text-align: center;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
		
					image {
						width: 30upx;
						height: 30upx;
						position: absolute;
						top: 40upx;
						right: 21upx;
					}
				}
		
				.payMsg {
					width: calc(100% - 48upx);
					padding: 0 24upx;
					align-items: center;
					margin: 29upx 0 0;
					color:#232323;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
				}
		
				.payBtn {
					width: 702upx;
					height: 70upx;
					// background: linear-gradient(90deg, #E1251B, #F33E34);
					border-radius: 35upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					line-height: 70upx;
					text-align: center;
					margin: 49upx auto 61upx;
				}
			}
		}
	}
</style>