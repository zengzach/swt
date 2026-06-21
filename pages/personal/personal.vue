<template>
	<view class="personal_content">
		<view class="personal_background" :style="{background: 'url(' + imageURL1 + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}">
			<view class="personal_tittle">
				<!-- <img class="personal_tittle_one" v-show="!isLogin"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/touxiang-new.png"> -->
			</view>
			<view class="personal_one">
				<view class="personal_one_left">
					<!-- 微信登录 -->
					<button class="btns" :style="'border: 1px solid ' + color" open-type="chooseAvatar" @chooseavatar="onChooseAvatarWeChat" v-if="unionId!= null">
						<view class="personal_header_img">
							<image class="personal_img" :src="avatarUrlWeChat"></image>
						</view>
					</button>
					<!-- 账号登录 -->
					<button class="btns" open-type="chooseAvatar" @chooseavatar="onChooseAvatar" v-else>
						<view class="personal_header_img">
							<image class="personal_img" :src="avatarUrl"></image>
						</view>
					</button>
					<view class="personal_header_msg">
						<view class="personal_name" v-if="unionId==null">{{userName}}</view>
						<input class="personal_name" @change="getNickName" v-else type="nickname" v-model="userName"
							placeholder="请输入昵称" />
						<view class="personal_mobile_msg" v-if="tel">
							手机号：{{tel}}
						</view>
					</view>
				</view>
				<view class="personal_one_right" :style="{ background: background }" @click="goSet">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/setup.png" mode="widthFix">
					</image>
					<view class="setup">设置</view>
				</view>
			</view>
			<view class="personal_two">
				<view class="personal_two_items" @click="toDiscount">
					<view class="personal_two_count">{{couponCount?couponCount:0}}</view>
					<view class="personal_two_name">优惠券</view>
				</view>
				<view class="personal_two_items" @click="toPurchase">
					<view class="personal_two_count">{{buyNum}}</view>
					<view class="personal_two_name">已购买</view>
				</view>
				<view class="personal_two_items" @click="toCollection">
					<view class="personal_two_count">{{collectionNum}}</view>
					<view class="personal_two_name">收藏夹</view>
				</view>
				<view class="personal_two_items" @click="toCartList">
					<view class="personal_two_count">{{length}}</view>
					<view class="personal_two_name">购物车</view>
				</view>
			</view>
		</view>
		<view class="personal_three">
			<!--  @click="goOrderAll" -->
			<view class="personal_three_titleArea">
				<view class="personal_three_title">我的订单</view>
				<view class="personal_order_more">
					<view class="personal_more_title" @click="goOrderAll">查看全部 ></view>

				</view>
			</view>
			<view class="personal_order_list">
				<view class="personal_order_items" @click="toOrderList('待审核',10)">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/toconfirm.png"></image>
					<view class="personal_order_name">待审核</view>
					<view class="example-body" v-if="waitAuditNum">
						<uni-badge class="uni-badge-left-margin" :text="waitAuditNum" />
					</view>
				</view>
				<view class="personal_order_items" @click="toOrderList('待发货',10)">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/tosend.png" mode="widthFix">
					</image>
					<view class="personal_order_name">待发货</view>
					<view class="example-body" v-if="waitDeliverNum">
						<uni-badge class="uni-badge-left-margin" :text="waitDeliverNum" />
					</view>
				</view>
				<view class="personal_order_items" @click="toOrderList('待支付',10)">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/topay.png" mode="widthFix">
					</image>
					<view class="personal_order_name">待支付</view>
					<view class="example-body" v-if="waitPayNum">
						<uni-badge class="uni-badge-left-margin" :text="waitPayNum" />
					</view>
				</view>
				<!-- <view class="personal_order_items" @click="toOrderList('待开票',10)">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/tobill.png" mode="widthFix">
					</image>
					<view class="personal_order_name">待开票</view>
				</view> -->
				<view class="personal_order_items" @click="toOrderList('待评价',false)">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/tobill.png" mode="widthFix">
					</image>
					<view class="personal_order_name">待评价</view>
					<view class="example-body" v-if="waitEvaluateNum">
						<uni-badge class="uni-badge-left-margin" :text="waitEvaluateNum" />
					</view>
				</view>

				<view class="personal_order_items" @click="toOrderList('售后','')">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/aftersale.png"
						mode="widthFix"></image>
					<view class="personal_order_name">售后</view>
					<view class="example-body" v-if="afterSaleNum">
						<uni-badge class="uni-badge-left-margin" :text="afterSaleNum" />
					</view>
				</view>
			</view>
		</view>
		<view class="personal_four">
			<view class="personal_four_titleArea">
				<view class="personal_four_title">我的服务</view>
			</view>
			
			<view class="personal_four_content">
				<!-- <view class="personal_four_account" @click="goMyGift">
					<view class='cont'>
						<view class=".image7"></view>
						<text class="personal_four_accountName">我的赠品</text>
					</view>	
					<view style="width: 160upx;display: flex;justify-content: space-between;">
						<view style="color: #B0B1B6;font-size:24upx;margin-top: 6upx;float: right;">{{unclaimedGoodsGift?unclaimedGoodsGift:0}}件未领取</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right" style="margin-top: 10upx;">
						</image>
					</view>
				</view> -->
				<view class="personal_four_account" @click="goInquiry">
					<view class='cont'>
						<view class=".image7"></view>
						<text class="personal_four_accountName">我的询价</text>
					</view>
					<view style="width: 160upx;display: flex;justify-content: space-between;">
						<view style="color: #B0B1B6;font-size:24upx;margin-top: 6upx;float: right;">已报价*{{inquiryNum}}</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right" style="margin-top: 10upx;">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="goFromAccount">
					<view class='cont'>
						<view class=".image"></view>
						<text class="personal_four_accountName">汇款账号</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="toAddressList">
					<view class='cont'>
						<view class=".image2"></view>
						<text class="personal_four_accountName">收货地址</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="toInvoice">
					<view class='cont'>
						<view class=".image3"></view>
						<text class="personal_four_accountName">发票信息</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="goMyRepair" v-if='["jz2206","skyx"].includes(orgNum)'>
					<view class='cont'>
						<view class=".image0"></view>
						<text class="personal_four_accountName">我的报修</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="showCustomerService">
					<view class='cont'>
						<view class=".image4"></view>
						<text class="personal_four_accountName">联系客服</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
				<view class="personal_four_account" @click="goHelpCenter">
					<view class='cont'>
						<view class=".image5"></view>
						<text class="personal_four_accountName">帮助中心</text>
					</view>
					<view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/personalBack.png"
							class="right">
						</image>
					</view>
				</view>
			</view>
			<!-- 打电话弹窗 -->
			<view class="call" v-if="telmark">
				<view class="mark">
					<view class="image6"></view>
					<!-- <image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/customerService-phone.png"
						mode=""></image> -->
					<view class="tel_name">{{exclusive.customerServiceName}}</view>
					<view class="tel_number" :style="{ color: color }">{{exclusive.customerServiceMobile}}</view>
					<view class="tel">
						<view @click="cancel">取消</view>
						<view class="callNow" :style="{ color: color }" @click="call(exclusive.customerServiceMobile)">立即拨打</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar :selectedIndex = "4" :index = "4" > </tab-bar>
	</view>
</template>

<script>
	import '@/static/LHT/personal.css'
	import {
		getLoginAccount,
		getCollectionCategoryCount,
		getExclusiveServiceStaffInfo,
		personalCount,
		getCustmoerGoodsGift,
		getUnGiftData
	} from '@/api/personalApi.js'
	import {
		getCartGoodsList
	} from '@/api/cartApi.js'
	import {
		getDetailByOrgNum
	} from '@/api/indexApi'
	import {
		modifyAccountBaseInfo,
		orderCount
	} from '@/api/personal.js'
	import {
		weChatUploadHeadImg
	} from '@/api/passport.js'
	import {
		toast,
		getRouter,
		isLogin,
		refresh,
		weChat_upload_file,
		getOrgNum
	} from '@/utils/utils.js'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import { inquiryNum } from '@/api/goodsDetailApi.js'
	export default {
		components: {
		 tabBar
		},
		data() {
			return {
				couponCount:'',
				isLogin: isLogin(),
				userName: '',
				mobile: '',
				tel: '',
				haveWait: false,
				length: 0,
				affiliatedCompany: null,
				customerServiceMobile: null,
				customerServiceName: null,
				salesmanMobile: null,
				salesmanName: null,
				buyNum: '',
				collectionNum: '',
				exclusive: {},
				telmark: false,
				globalData: {},
				cartList: '',
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				avatarUrlWeChat: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				imgList: [],
				imgListWeChat: [],
				unionId: '',
				oldName: '',
				changeFlag:false,
				orgNum:getOrgNum(),
				style:{},
				color:'',
				imageURL1:'',
				background:'',
				unclaimedGoodsGift:'',
				waitAuditNum:'',
				waitDeliverNum:'',
				waitPayNum:'',
				waitEvaluateNum:'',
				afterSaleNum:'',
				inquiryNum:0,
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.personalcolor
			this.background = this.style.cartbtn
			this.imageURL1 = this.style.personalbackground
			this.getDataMsg()
			this.getCartListData()
			// this.getGiftListData()
			// this.getUnGiftData()
		},
		onShow() {
			getRouter()
			var token = uni.getStorageSync('token')
			if (token) {
				this.getAccountMessage();
			} else {
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			}
			this.getOrderCount()
			this.getExclusiveList();
			uni.hideTabBar({
			  animation: false
			})
			if (typeof this.getTabBar === 'function' &&
				this.getTabBar()) {
				this.getTabBar().setData({
					selectedIndex: 1
				})
			}
			this.getInquiryNum()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.getAccountMessage();
				this.getByOrgNum();
				this.getHeight();
				getRouter();
				this.getInquiryNum()
			},
			getInquiryNum(){
				inquiryNum().then(res=>{
					if(res.success){
						this.inquiryNum = res.data
					}
				})
			},
			getOrderCount(){
				orderCount().then(res=>{
					if(res.success){
						// console.log(res,"=============")
						this.waitAuditNum = res.data.waitAuditNum
						this.waitDeliverNum = res.data.waitDeliverNum
						this.waitPayNum = res.data.waitPayNum
						this.waitEvaluateNum = res.data.waitEvaluateNum
						this.afterSaleNum = res.data.afterSaleNum
					}
				})
			},
			//分享个人
			onShareAppMessage() {
				return {
					title: '个人中心',
					path: '/pages/personal/personal' 	
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title:'个人中心',	
					path: '/pages/personal/personal'
				}
			},
			// 更换昵称
			getNickName(e) {
				if (e.detail.value == '' || e.detail.value == null) {
					this.userName = this.oldName;
					// var data = {
					// 	nickName: this.oldName
					// }
					// modifyAccountBaseInfo(data).then(res => {})
				} else if (e.detail.value.length > 10) {
					toast({
						title: '昵称不能超过10位'
					})
					this.userName = this.userName.substr(0, 10);
				} else {
					var data = {
						nickName: e.detail.value
					}
					modifyAccountBaseInfo(data).then(res => {
						this.oldName = data.nickName;
					})
				}
			},
			// 更换头像		微信登录
			onChooseAvatarWeChat(e) {
				// console.log(e,"------------")
				this.avatarUrlWeChat = e.detail.avatarUrl
				this.imgListWeChat.push(e.detail.avatarUrl)
				var token = uni.getStorageSync('token')
				var url = e.detail.avatarUrl;
				weChat_upload_file(token, url).then(res => {
					if (res.success) {
						toast({
							title: '头像修改成功'
						})
					} else {
						this.avatarUrlWeChat = uni.getStorageSync('headImg')
					}

				})
			},
			// 更换头像		账号登录
			onChooseAvatar(e) {
				this.avatarUrl = e.detail.avatarUrl
				this.imgList.push(e.detail.avatarUrl)
				var token = uni.getStorageSync('token')
				var url = e.detail.avatarUrl;
				weChat_upload_file(token, url).then(res => {
					if (res.success) {
						toast({
							title: '头像修改成功'
						})
					} else {
						this.avatarUrl = uni.getStorageSync('headImg')
					}
			
				})
			},
			//获取用户信息
			getAccountMessage() {
				// var that = this
				getLoginAccount().then(res => {
					if (res.data.unionId) {
						this.userName = res.data.nickName
					} else {
						this.userName = res.data.loginName
					}
					this.unionId = res.data.unionId
					this.oldName = res.data.nickName
					this.avatarUrl = res.data.headImg
					this.avatarUrlWeChat = res.data.headImg
					if(res.data.headImg==null){
						this.avatarUrl='https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
					}
					if(res.data.headImg==null){
						this.avatarUrlWeChat='https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
					}
					uni.setStorageSync('headImg', res.data.headImg)
					this.mobile = res.data.mobile
					let number = this.mobile; //获取到手机号码字段
					let mphone = number.substring(0, 3) + '****' + number.substring(7);
					this.tel = mphone
				})
				var data1 = {
					type: 1,
				};
				var data2 = {
					type: 2,
				};
				getCollectionCategoryCount(data1).then(res => {
						this.collectionNum = res.data.list.length
					}),
				getCollectionCategoryCount(data2).then(res => {
					this.buyNum = res.data.list.length
				})
				this.getExclusiveList();
				this.getPersonalCount()
			},
			// 获取购物车数量
			getCartListData() {
				this.length = 0
				getCartGoodsList().then(res => {
					res.data.shoppingCartWarehouseStockList.forEach(item => {
						this.length += item.shoppingCartStockList.length
					})
				})
			},
			// 获取未领取赠品列表
			getGiftListData() {
				getCustmoerGoodsGift().then(res => {
					// console.log(res.data,'12312')
				})
			},
			// 获取未领取赠品数量
			getUnGiftData() {
				getUnGiftData().then(res => {
					this.unclaimedGoodsGift = res.data
				})
			},
			getByOrgNum() {
				getExclusiveServiceStaffInfo().then(res => {
					if (res.success) {
						if (res.data.customerServiceMobile && res.data.customerServiceName) {
							this.exclusive.customerServiceMobile = res.data.customerServiceMobile
							this.exclusive.customerServiceName = res.data.customerServiceName
						} else {
							getDetailByOrgNum().then(res1 => {
								if (res1.success) {
									if (res1.data.customerServiceMobile != '') {
										this.exclusive.customerServiceMobile = res1.data
											.customerServiceMobile
										this.exclusive.customerServiceName = '客服电话'
									} else {
										uni.showToast({
											title: '暂无客服电话',
											icon: 'none',
											duration: 2000
										});
									}
								}
							})
						}
					} else {
						getDetailByOrgNum().then(res1 => {
							if (res1.success) {
								if (res1.data.customerServiceMobile != "") {
									this.exclusive.customerServiceMobile = res1.data.customerServiceMobile
									this.exclusive.customerServiceName = '客服电话'
								} else {
									uni.showToast({
										title: '暂无客服电话',
										icon: 'none',
										duration: 2000
									});
								}
							}

						})
					}
				})

			},
			// 获取客服
			getExclusiveList() {
				var token = uni.getStorageSync('token')
				if (token) {
					getExclusiveServiceStaffInfo().then(res => {
						this.exclusive = res.data
						uni.setStorageSync('salesmanId', res.data.salesmanId)
					})
				}
			},
			// 联系客服
			showCustomerService() {
				this.getByOrgNum()
				if (this.exclusive.customerServiceMobile == null || this.exclusive.customerServiceMobile == '') {
					uni.showToast({
						title: '暂无客服电话',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.telmark = true;
				}
			},
			cancel() {
				this.telmark = false
			},
			// 打电话
			call: function(e) {
				wx.makePhoneCall({
					phoneNumber: '' + e,
					success() {},
					fail() {}
				})

			},
			getHeight() {
				let menuButtonObject = wx.getMenuButtonBoundingClientRect(); //  获取胶囊高度
				let navTop = 0
				let navHeight = 0
				uni.getSystemInfo({
					success: res => {
						let statusBarHeight = res.statusBarHeight
						navTop = menuButtonObject.top //胶囊按钮与顶部的距离
						navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top -
							statusBarHeight) * 2;
						this.globalData.navHeight = navHeight;
						this.globalData.navTop = navTop;
						this.globalData.windowHeight = res.windowHeight;
					},
				})
			},
			// 发票
			toInvoice() {
				uni.navigateTo({
					url: '/personalPage/invoice'
				})
			},
			// 报修
			goMyRepair(){
				uni.navigateTo({
					url: '/personalPage/repair/myRepair'
				})
			},
			toOrderList(name, orderStatus) {
				uni.navigateTo({
					url: '/personalPage/orderPage?orderStatus=' + orderStatus + '&name=' + name
				})
			},
			// 去收货地址页面
			toAddressList() {
				uni.navigateTo({
					url: '/personalPage/address/addressList?carPage=1'
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/loginPages/login'
				})
			},
			// 售后
			toReturn() {
				uni.navigateTo({
					url: ''
				})
			},
			toCartList() {
				uni.switchTab({
					url: '/cart/cart'
				});
			},
			goSet() {
				uni.navigateTo({
					url: '/personalPage/information'
				})
			},
			// 汇款账号
			goFromAccount() {
				uni.navigateTo({
					url: '/personalPage/fromAccount'
				})
			},
			// 优惠券
			toDiscount(){
				uni.navigateTo({
					url: '/goodsDetail/discountList'
				})
			},
			// 优惠券数量
			getPersonalCount(){
				personalCount().then(res=>{
					if(res.success){
						this.couponCount=res.data.couponAmount
					}
				})
			},
			// 已购买
			toPurchase() {
				uni.navigateTo({
					url: '/personalPage/purchaseRecord/purchaseRecord'
				})
			},
			// 收藏夹
			toCollection() {
				uni.navigateTo({
					url: '/personalPage/purchaseRecord/collection'
				})
			},
			// 查看全部订单
			goOrderAll() {
				uni.navigateTo({
					url: '/personalPage/orderPage'
				})
			},
			goMyGift() {
				uni.navigateTo({
					url: '/personalPage/myGift'
				})
			},
			goInquiry(){
				uni.navigateTo({
					url: '/goodsDetail/inquiryPage/inquiryList'
				})
			},
			//帮助中心
			goHelpCenter() {
				uni.navigateTo({
					url: '/personalPage/helpCenter'
				})
			}
		}
	}
</script>

<style scoped lang="scss">

	.background {
		min-height: 100%;
	}

	.personal_content {
		width: calc(100% - 70upx);
		padding-left: 47upx;
		padding-right: 23upx;
		height: 100%;
		overflow: hidden;

		.personal_background {
			.personal_tittle {
				width: 750upx;
				height: 120upx;

				.personal_tittle_one {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #FFFFFF;
					line-height: 21px;
					text-align: center;
					width: 120upx;
					height: 120upx;
					margin-top: 38upx;
					margin-left: 305upx;
				}
			}




			.personal_one {
				width: calc(100% - 48upx);
				display: flex;
				justify-content: space-between;
				margin-top: 80upx;

				.personal_one_left {
					display: flex;
					align-items: center;
					.btns{
						background:none;
						width: 112upx;
						height: 112upx;
						border-radius: 50%;
						border: var(--index-border);
						overflow: hidden;
						margin-left: 30upx;
						margin-top: -52upx;
						
						.personal_header_img {
							width: 114upx;
							height: 114upx;
							border-radius: 50%;
							overflow: hidden;
							margin-left: -30upx;
							margin-top: -4upx;
						
							.personal_img {
								width: 114upx;
								height: 114upx;
								border-radius: 50%;
								z-index:99999;
							}
						}
					}
					

					.personal_header_msg {
						width: 220px;
						height: 48upx;
						text-align: left;
						margin-left: 26upx;
						margin-top: -52upx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;


						.personal_name {
							height: 48upx;
							font-size: 36upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #202021;
						}

						.personal_mobile_msg {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #202021;
							margin-top: 15upx;
						}
					}
				}
			}

			.personal_one_right {

				image {
					width: 28upx;
					height: 28upx;
					margin-left: 20upx;
				}


				.setup {
					display: flex;
					width: 48upx;
					height: 23upx;
					margin-left: 5upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FEFEFE;
					line-height: 18upx;
					justify-content: center;
					align-items: center;
				}
			}


			.personal_two {
				width: 100%;
				margin: 50upx 0;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.personal_two_items {
					text-align: center;

					.personal_two_count {
						font-size: 36upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						line-height: 18upx;
					}

					.personal_two_name {
						margin-top: 19upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #929396;
						line-height: 18px;
					}
				}
			}
		}

		.personal_three {
			width: calc(100% - 60upx);
			min-height: 238upx;
			padding: 0 20upx;
			position: relative;
			top: 28upx;
			background-color: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 22upx;
			margin-top: -332upx;

			.personal_three_titleArea {
				width: 100%;
				// border-bottom: 1upx solid #EEEEEE;
				display: flex;
				justify-content: space-between;
				align-items: baseline;

				.personal_three_title {
					padding: 29upx 1upx 1upx 24upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #34393D;
				}

				.personal_order_more {
					font-size: 24upx;
					font-family: PingFang SC;
					// font-weight: bold;
					color: #B0B1B6;
					display: flex;
					align-items: center;

					image {
						width: 30upx;
						height: 30upx;
					}
				}
			}

			.personal_order_list {
				padding: 0 10upx;
				width: 100%;
				display: flex;
				margin-top: 31upx;
				justify-content: space-between;
				align-items: center;

				.personal_order_items {
					width: 110upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					position:relative;

					image {
						width: 50upx;
						height: 50upx;
						margin-bottom: 8upx;
					}

					.personal_order_name {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
					.example-body {
						flex-direction: row;
						justify-content: flex-start;
						position:absolute;
						right: 0;
						top: -10upx;
					}
					.uni-badge-left-margin {
						// margin-left: 10px;
					}
				}
			}
		}

		.personal_four {
			width: calc(100% - 60upx);
			// height: 609upx;
			padding: 0 20upx;
			background: #FFFFFF;
			border-radius: 10upx;
			margin-bottom: 22upx;
			position: relative;
			top: 30upx;

			.personal_four_titleArea {
				width: 100%;
				padding-top: 1upx;
				margin-left: 20upx;

				.personal_four_title {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #34393D;
					margin-top: 29upx;
					line-height: 18upx;
				}
			}

			.personal_four_content {
				margin-top: 52upx;

				.personal_four_account {
					width: 100%;
					margin-top: 31upx;
					display: flex;
					justify-content: space-between;
					// align-items: center;
					border-bottom: 1upx solid #EEEEEE;

					.cont {
						width: 200upx;
						display: flex;
						justify-content: space-between;

					}

					.personal_four_accountName {
						display: inline-block;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						margin-left: 20upx;
						// margin-top: -100upx;
						margin-bottom: 30upx;
						// justify-content: center;
						// align-items: center;
						// padding-top: 1upx;
					}

					.right {
						width: 26upx;
						height: 26upx;
						margin-bottom: 5upx;
					}
				}
			}

			.personal_four_account1 {
				width: 100%;
				margin-top: 31upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				// border-bottom: 1upx solid #EEEEEE;

				image {
					margin-left: 20upx;
					margin-bottom: -10upx;
					width: 46upx;
					height: 46upx;
				}

				.personal_four_accountName {
					display: inline-block;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 32upx;
					margin-bottom: 33upx;
					//     justify-content: center;

					// align-items: center;
					// padding-top: 1upx;
				}

				.right {
					width: 26upx;
					height: 26upx;
					margin-bottom: 5upx;
				}
			}
		}

		// 弹窗样式
		.call {
			width: 100vw;
			height: 100vh;
			background-color: rgba($color: #000000, $alpha: 0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;

			.mark {
				width: 556upx;
				height: 395upx;
				background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/customerService-background.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;

				.tel_name {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					margin-top: 30upx;
				}


				.tel {
					width: 556upx;
					height: 106upx;
					border-top: 1px solid #EEEEEE;
					display: flex;
					justify-content: space-between;
					margin-top: 40upx;

					view {
						width: 277upx;
						height: 106upx;
						text-align: center;
						line-height: 106upx;
					}

					view:nth-child(1) {
						width: 277upx;
						height: 106upx;
						border-right: 1px solid #EEEEEE;
						text-align: center;
						line-height: 106upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}

				}

			}
		}

	}
</style>
