<template>
	<view class='productDetail'>
		<view class="detail_content">
			<view class="page-section-spacing">
				<image class="back" @click="back"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png" />
				<swiper class="swiper" autoplay="false" :interval="interval" :duration="duration">
					<swiper-item v-for="item in goodsInfo.pictureUrls" :key="item">
						<view class="swiper-item">
							<image :src="item" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
				<view v-if="goodsInfo.promotionStatus == 20 || goodsInfo.promotionStatus == 10" class="discount" >
					<view class="product_one_price">
						<view class="price_two">积分:{{goodsInfo.integralSpecificationsDto[0].promotionPrice}}</view>
						<view class="price_two_view">
							{{goodsInfo.promotionLabel}}</view>
						<view class="price_three">{{goodsInfo.integralSpecificationsDto[0].integralPrice}}</view>
					</view>
					<view class="product_two_price" v-if="goodsInfo.promotionStatus == 20">
						<view class="">
							距结束还剩
						</view>
						<view style="margin-top: -5upx;">
							{{countdown}}
						</view>
					</view>
					<view class="product_two_price" v-if="goodsInfo.promotionStatus == 10">
						<view class="">
							距开始还剩
						</view>
						<view style="margin-top: -5upx;">
							{{countdown1}}
						</view>
					</view>
				</view>
				
			</view>
			
			<view class="product_msg_oneIntegral" >
				<view class="product_msg_oneIntegralImg">
					<view class="product_msg_IntegralMoneys">
						<view class="product_Integral" v-if="goodsInfo.promotionStatus !== 10 && goodsInfo.promotionStatus !== 20 && goodsInfo.promotionStatus !== 30">
							<view class="">
								积分:
							</view>
							<view class="product_IntegralRed" v-if="goodsInfo.promotionStatus == 20">
								{{selectGoodsInfo.promotionPrice}}
							</view>
							<view class="product_IntegralRed" v-else>
								{{selectGoodsInfo.integralPrice}}
							</view>
						</view>
					</view>
				</view>
				<view class="product_name">{{goodsInfo.goodsTitle}}</view>
				<view class="product_item">
					<view class="product_item_item">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/item_one.png" mode=""></image>
						<text>正品保障</text>
					</view>
					<view class="product_item_item">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/item_two.png" mode=""></image>
						<text>商品包邮</text>
					</view>
					<view class="product_item_item">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/item_three.png" mode=""></image>
						<text>精选好物</text>
					</view>
				</view>
			</view>

			<view class="product_msg_three" >
				<view class="product_msg_item" v-if="goodsUnitList.length>1">
					<view class="pro_item3_lable">选择</view>
					<view class="pro_item3_value">
						<view class="select" @click="openAddCartPopup">
							<view class="imgs">
								<image v-for="item in goodsUnitList.slice(0,3)" :key="item.integralGoodsId" :src="item.pictureUrl" mode=""></image>
							</view>
							<view class="imgDto" style="">共有{{goodsUnitList.length}}款分类可选择</view>
							<view class="">
								<image style="width: 40upx;height: 38upx;margin-top:10upx;margin-left:20upx;" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/nextImg.png" mode=""></image>
							</view>
						</view>
						<view v-if="selectGoodsInfo.specification!=null">已选：{{selectGoodsInfo.specification}}</view>
					</view>
				</view>
				<view class="product_msg_item">
					<view class="pro_item3_lable">品牌</view>
					<view class="pro_item3_value">
						{{goodsInfo.brandName?goodsInfo.brandName:'暂无品牌信息'}}
					</view>
				</view>
				<view class="product_msg_item" >
					<view class="pro_item3_lable">库存</view>
					<view class="pro_item3_value_stock">
						<view>{{selectGoodsInfo.stockNum}}件</view>
					</view>
				</view>
			</view>
			<view class="product_image" v-if="goodsInfo.content">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/title.png"
					mode="widthFix"></image>
			</view>
			<view class="product_detail" v-if="goodsInfo.content">
				<!-- <view class="" v-html="goodsInfo.content"></view> -->
				<!-- <bctos-rich-text :nodes="goodsInfo.content" ></bctos-rich-text> -->
				<mp-html :content="goodsInfo.content" :selectable='true' :tag-style="tagStyle" />
			</view>
		</view>
		<view class="detail_footer">
			<view class="cartMoneys">
				<text>可用积分：{{flag?userinfo.integral:'登录查看'}} </text>
			</view>
			<view v-if="flag" :class="selectGoodsInfo.stockNum>0?'addCartBtn':'nostock'" @click="selectGoodsInfo.stockNum>0?goBtnIntegral(selectGoodsInfo):''">
				<text class="on" style="margin: 0 auto;">
					{{selectGoodsInfo.stockNum>0?'立即兑换':'库存不足'}}
				</text>
			</view>
			<view class="addCartBtn" v-else>
				<text class="on" style="margin: 0 auto;" @click="toLogin">
					登录兑换
				</text>
			</view>

		</view>

		<uni-popup class="add_popup" ref="addCartPopup" :mask-click="true">
			<view class="addCartPopup">
				<view class="addCartTitle">
					<view class='addCartText'>
						<image class="goodsimage" :src="selectGoodsInfo.pictureUrl" mode=""></image>
						
						<view class="" v-if="selectGoodsInfo.promotionStatus == 20">{{selectGoodsInfo.promotionPrice}} <text>积分</text></view>
						<view class="" v-else>{{selectGoodsInfo.integralPrice}} <text>积分</text></view>
					</view>
					<image style="width: 30upx;height: 30upx;position: absolute;top: 40upx;right: 21upx;" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="closeCartPopup"></image>
				</view>
				
				<view class="spaceify" v-for="(item,index) in goodsUnit" :key="index">
					<view class="spaceify_title">{{item.name}}</view>
					<view class="spaceify_item">
						<text :class="subIndex[index] == index2?'active':'texts'" v-for="(item2,index2) in item.value" :key="index2" @click="specificationItem(item2,index,index2)">{{item2.name}}</text>
					</view>
				</view>
				
				<view class="integralNum">
					<view class="integralNum_text">兑换数量</view>
					<view class="integralNum_num">
						<uni-number-box v-model="number" min="1" :max="selectGoodsInfo.stockNum" @blur="blur($event)"></uni-number-box>
					</view>
				</view>
				<view :class="selectGoodsInfo.stockNum>0?'addCartBtnover':'nostock'" @click="selectGoodsInfo.stockNum>0?goBtnIntegral(selectGoodsInfo):''">
					<text>{{selectGoodsInfo.stockNum>0?'立即兑换':'库存不足'}}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {refresh, toast, getUrl, getRouter } from '@/utils/utils.js'
	import {integralGoodsDetail,} from '@/api/integral/integralGoodsDetail.js'
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components:{
			mpHtml
		},
		data() {
			return {
				tagStyle:{img: "width:100%;display:block;", table: "width:100%", video: "width:100%"},
				goodsBaseId: null,
				number:1,
				goodsInfo: {},
				goodsUnit:[],  //商城显示规格
				goodsUnitList:[], //所有规格
				selectArr:[],	  //存放被选中的值
				shopItemInfo: {}, //存放要和选中的值进行匹配的数据
				subIndex: [], //是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
				selectGoodsInfo:{},
				selectSpecification:'',
				interval: 2000,
				duration: 500,
				transparency: 0,
				addressId: '',
				token: '',
				globalData: {},
				flag: false,
				userinfo: {},
				countdown: '',
				countdown1:'',
				day: '',
				time: '',
				minute: '',
				second: '',
				timer: null ,//重复执行,
			}
		},
		onLoad(option) {
			this.timer = setInterval(() => {
				this.showtime();
			}, 500);
			this.goodsBaseId=option.integralId
			this.getGoodsDetail();
			this.getHeight()
			getUrl()
			getRouter()
		},
		onPullDownRefresh() {
			refresh(this.getGoodsDetail)
		},
		onShow() {
			var token = uni.getStorageSync('token')
			if (token) {
				this.flag = true
				this.token = token
				this.getAccountInfo()
			} else {
				this.flag = false
			} 
		},
		onPageScroll: function(e) {
			if (0 < e.scrollTop < 210) {
				this.transparency = parseInt(e.scrollTop / 21) * 1 / 10
			} else if (e.scrollTop >= '210') {
				this.transparency = 1
			}
		},
		methods: {
			showtime() {
				var nowtime = new Date();//获取当前时间
				if(this.goodsInfo.promotionStartTime !== null)
				{
					this.goodsInfo.promotionStartTime = this.goodsInfo.promotionStartTime.replaceAll('-', '/')
				}
				if(this.goodsInfo.promotionEndTime !== null){
					this.goodsInfo.promotionEndTime = this.goodsInfo.promotionEndTime.replaceAll('-', '/')	
				}				
				// this.goodsList.forEach((item)=>{
					if(this.goodsInfo.promotionStatus == 20){
									
						// this.endtime = new Date(item.goodsPrice.promotionEndTime)
						var lefttime = new Date(this.goodsInfo.promotionEndTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
							
							this.countdown = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
							// console.log(this.countdown,'countdown')
							// item.countdown = this.countdown
					}
					else if(this.goodsInfo.promotionStatus == 10){
						var lefttime = new Date(this.goodsInfo.promotionStartTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
							
							this.countdown1 = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
							// console.log(this.countdown,'countdown')
							// item.countdown1 = this.countdown1
					}
				
						// this.countdownList.push(this.countdown)
				// })
			},
			back() {
				uni.navigateBack({
					delta: 1
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
			blur(e){
				if(e.detail.value <= 1){
					this.number = 1
				}else if(e.detail.value > this.selectGoodsInfo.stockNum){
					this.number = this.selectGoodsInfo.stockNum
				}else if(typeof(e.detail.value)=='string'){
					this.number = 1
				}
			},
			getGoodsDetail() {
				integralGoodsDetail({
					goodsBaseId: this.goodsBaseId,
				}).then(res => {
					this.goodsInfo = res.data;
					this.goodsUnit = res.data.integralSpecifications	//供选择的规格
					this.goodsUnitList = res.data.integralSpecificationsDto	//所有规格
					this.selectGoodsInfo = res.data.integralSpecificationsDto[0] //默认展示的第一项规格
					// this.subIndex=[0,0,0]
				})
			},
			specificationItem(item,index,index2){
				if (this.selectArr[index] != item) {
					this.selectArr[index] = item;//当前规格选中,赋值为选项的名字(蓝色、黑色)
					this.subIndex[index] = index2;//设置此项为选中
				} else {
					this.selectArr[index] = "";
					this.subIndex[index] = -1; //去掉选中的颜色
				}
				// console.log(this.subIndex,"index-----")
				this.checkItem();
			},
			checkItem() {
				var option = this.goodsUnit;
				var result = []; //定义数组储存被选中的值
				for (var i in option) {
				   result[i] = this.selectArr[i] ? this.selectArr[i] : "";
				}
				var selectItem = []
				result.forEach(item=>{
				   selectItem.push(item.name)
				})
				this.selectSpecification=selectItem
				this.goodsUnitList.forEach(item=>{
					let a = item.specification.split(',');
					var select=[...this.selectSpecification].filter(e=> a.some(t=>t ==e))
					// console.log(this.selectSpecification,"---------",select,"---------",a,"----------")
					// console.log(this.selectSpecification.length,"---------",select.length,"---------",a.length,"-----------")
					if(this.selectSpecification.length == select.length && select.length == a.length){
						// console.log("一致")
						this.selectGoodsInfo=item
					}
				})
				this.$forceUpdate(); //重绘
			},
			
			openAddCartPopup() {
				if (this.token) {
					this.$refs.addCartPopup.open('bottom')
				} else {
					uni.showModal({
						title: '提示',
						content: '未登录不能兑换，是否登录？',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: '/loginPages/indexlogin',
								})
							} else if (res.cancel) {
							}
						}
					})
					
				}
			},
			closeCartPopup() {
				this.$refs.addCartPopup.close()
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
			toLogin() {
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			},
			// 立即兑换
			goBtnIntegral(info) {
				var totalPrice=info.integralPrice*this.number
				if(this.userinfo.integral>=totalPrice){
					uni.navigateTo({
						url: '/integralPages/integralOrderConfirm?integralId='+info.integralGoodsId+"&num="+this.number
					})
				}else{
					toast({
						title:'您的积分不足'
					})
				}
				
			},
		}
	}
</script>
<style>
	page {
		padding-bottom: 60rpx;
	}
</style>
<style scoped lang="scss">
	.active{
		color: #FB681A;
		background: #FFEADE;
		padding:5upx 35upx;
		height: 46upx;
		border-radius: 40upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 46upx;
		margin-left:30upx;
	}
	.productDetail {
		background-color: #F4F4F4;

		.detail_content {
			margin: 0upx 0 100upx;

			.page-section-spacing {
				width: 750upx;
				height: 750upx;
				background: linear-gradient(#ffffff, #f8f8f8);
				position: relative;
				.back {
					width: 46upx;
					height: 40upx;
					position: absolute;
					top: 75upx;
					left: 28upx;
					z-index:999;
				}

				.swiper {
					width: 100%;
					height: 100%;

					.swiper-item {
						image {
							width: 750upx;
						}
						
						
					}
				}
				.discount{
					width:100%;
					height: 100upx;
					border-radius: 20upx 20upx 0upx 0upx;
					padding:2upx 2upx;
					disply:flex;
					position: absolute;
					left:0;
					bottom: 0;
					background: linear-gradient(-70deg,#FF4F26,#FA9956);
					
					.product_one_price {
						display: flex;
						align-items: center;
					
						.price_two {
							display: inline;
							width: 150upx;
							margin-top: -20upx;
							font-size: 30upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							color: #fff;
							text-align: left;
							margin-left: 20upx;
						}
						.price_two_view{
							width: 120upx;
							height: 20upx;
							margin-top:-20upx;
							padding: 10upx 10upx;
							line-height: 20upx;
							border-radius:20upx 20upx 20upx 0;
							border:1upx solid #FFFFFF;font-size: 20upx;color: #FFFFFF;
							text-align:center;
						}
					
						.price_three {
					
							display: block;
							width: 250upx;
							text-align: left;
							font-size: 24upx;
							margin-top: 65upx;
							margin-left: -225upx;
							font-family: PingFang-SC-Bold;
							font-weight: normal;
							color: #fff;
							text-decoration: line-through;
						}
					
					}
					.product_two_price {
						height: 40upx;
						padding: 0 20upx;
						float: right;
						margin: -85upx auto 0;
						font-size: 30upx;
						color: #fff;
					}
				}
			}

			.product_msg_oneIntegral {
				width: calc(100% - 48upx);
				background-color: #FFFFFF;
				margin: 0upx 0 15upx;
				padding: 35upx 24upx 0;
				border-radius: 0 0 10upx 10upx;

				.product_msg_oneIntegralImg {
					.product_msg_IntegralMoneys {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.product_Integral {
							display: flex;
							align-items: center;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}

						.product_IntegralRed {
							font-size: 50upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FB681A;
						}
					}
				}

				.product_name {
					ffont-size: 32px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 45upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-top: 30upx;
				}
				.product_item{
					width: 100%;
					height:80upx;
					display:flex;
					justify-content: space-around;
					border-top:1px solid #EAEAEA;
					margin-top:30upx;
					.product_item_item{
						width:230upx;
						height:80upx;
						text-align:center;
						line-height: 80upx;
						position:relative;
						image{
							width:32upx;
							height:32upx;
							position:absolute;
							top:26upx;
							left:45upx;
						}
						text{
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #666666;
							margin-left:35upx;
						}
					}
				}
			}

			.product_msg_three {
				width: 100%;
				border-radius: 10upx;
				background-color: #FFFFFF;
				margin-bottom: var(--window-bottom);

				.product_msg_item {
					width: calc(100% - 48upx);
					padding: 22upx 24upx;
					display: flex;
					align-items: flex-start;
					border-bottom: 1upx solid #eeeeee;

					.pro_item3_lable {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						margin-right: 47upx;
						line-height: 42upx;
					}

					.pro_item3_value {
						width: calc(100% - 153upx);
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42upx;
						
						.select{
							width:100%;
							display:flex;
							justify-content:space-around;
							.imgs{
								width:270upx;
								display:flex;
								justify-content:left;
								image{
									width:60upx;
									height:60upx;
									border-radius:5upx;
									margin-right:10upx;
								}
							}
							.imgDto{
								width: 330upx;
								height: 54upx;
								line-height:54upx;
								text-align:center;
								background: #F2F2F2;
								border-radius: 5upx;
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #666666;
							}
						}
					}

					.pro_item3_value_stock {
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 42upx;
					}

					&:last-child {
						border-bottom: 0upx solid #eeeeee;
					}
				}
			}

			.product_image {
				width: 239upx;
				margin: 0upx 255upx var(--window-bottom) 255upx;

				image {
					width: 239upx;
					height: 24upx;
				}
			}

			.product_detail {
				width: 100%;
				margin: 30upx 0 var(--window-bottom) 0;
				background: #fff;
				image {
					width: 100%;
				}
			}
		}

		.detail_footer {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: content-box;
			justify-content: space-around;
			width: 100%;
			height: 95upx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;

			.cartMoneys {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #003330;
				margin-left: 30upx;
				margin-right: 30upx;
			}

			.addCartBtn {
				width: 412upx;
				height: 70upx;
				border-radius: 35upx;
				background: linear-gradient(126deg, #FF8D13, #FE7E30);
				margin-right: 10upx;
				overflow: hidden;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 70upx;
				text-align: center;

				.on {
					width: 412upx;
					color: #FFFFFF;
				}
			}
			.nostock{
				width: 412upx;
				height: 70upx;
				border-radius: 35upx;
				background: #b9b9b9;
				margin-right: 10upx;
				overflow: hidden;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				line-height: 70upx;
				text-align: center;
				.on {
					width: 412upx;
					color: #FFFFFF;
				}
			}

			
		}

		.add_popup {
			z-index: 999 !important;

			.addCartPopup {
				width: 100%;
				background-color: #FFFFFF;
				border-radius: 15upx 15upx 0 0;
				padding-bottom: 70upx;
				position: relative;

				.addCartBtnover {
					width: 702upx;
					height: 70upx;
					margin: 60upx 24upx 0;
					text-align: center;
					line-height: 70upx;
					background: linear-gradient(126deg, #FF8D13, #FE7E30);
					color: #FFFFFF;
					font-size: 28upx;
					border-radius: 35upx;
				}
				.nostock{
					width: 702upx;
					height: 70upx;
					margin: 60upx 24upx 0;
					text-align: center;
					line-height: 70upx;
					background: #b9b9b9;
					color: #FFFFFF;
					font-size: 28upx;
					border-radius: 35upx;
				}

				.addCartTitle {
					// width: 300upx;
					padding: 20upx 0;

					.addCartText {
						margin-left:20upx;
						display:flex;
						// justify-content:space-around;
						
						.goodsimage{
							width: 116upx;
							height: 116upx;
							border-radius: 5upx;
						}
						view{
							font-size: 50upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FB681A;
							margin-left:20upx;
							padding-top:50upx;
							
							text{
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #FB681A;
							}
						}
					}
				}
				.spaceify{
					width:702upx;
					.spaceify_title{
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 70upx;
						margin-left:40upx;
					}
					.spaceify_item{
						width:688upx;
						margin:0 auto;
						display:flex;
						justify-content:flex-start;
						.texts{
							padding:5upx 35upx;
							height: 46upx;
							background: #F2F2F2;
							border-radius: 40upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 46upx;
							margin-left:30upx;
						}
					}
				}
				.integralNum{
					width:702upx;
					margin-left:24upx;
					display:flex;
					justify-content:space-between;
					.integralNum_text{
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						line-height: 45px;
					}
					.integralNum_num{
						margin-top:20upx;
					}
				}
				// .addCartMsg {
				// 	width: 702upx;

				// 	.addCartMsgItem {
				// 		display: flex;
				// 		align-items: center;
				// 		justify-content: space-between;
				// 		font-size: 28upx;
				// 		font-family: PingFang SC;
				// 		font-weight: 400;
				// 		margin-left: 22upx;

				// 		.addCartMsgItemLable {
				// 			color: #666666;
				// 			line-height: 68upx;

				// 		}

				// 		.addCartMsgItemVal {
				// 			color: #333333;
				// 			line-height: 68upx;
				// 		}

				// 		.saleUnitName {
				// 			height: 68upx;
				// 			line-height: 68upx;
				// 			margin-left: 20upx;
				// 		}
				// 	}
				// }
				
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
