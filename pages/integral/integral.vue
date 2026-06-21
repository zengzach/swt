<template>
	<view class="box">
		<view class="integral_header">
			<!-- lineHeight: menuButtonInfo+'px' -->
			<view class="title"
				:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px'}">
				积分商城
			</view>
			<!-- 搜索 -->
			<view class="integral_search">
				<view class="search_left" style="position: relative;" @click="goSearch">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/integral_search.png" mode=""></image>
					<input type="text" value="" disabled placeholder=" " />
				</view>
				<view class="search_right">
					<view class="" @click="sign" style="text-align: center;" v-if="flag==true">
						可用积分：{{userinfo.integral}}
						&nbsp&nbsp <image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/login_right.png" mode=""></image>
					</view>
					<view class="" style="text-align: center;margin-left:55upx;" v-else @click="toLogin">立即登录 &nbsp <image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/login_right.png" mode=""></image></view>
				</view>
			</view>
		</view>
		<view class="integral_cont">
			<!-- banner -->
			<view class="bannerImg" v-if="bannerList.length">
				<swiper class="swiper" circular :indicator-dots='true' autoplay style="width: 100%;height: 400upx">
					<swiper-item v-for="item in bannerList" :key='item.bannerId'>
						<image @click="bannerJump(item)" :src="item.url"></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- icon 分类 -->
			<view class="classify" v-if="categoryList.length">
				<view class="classifyBox" v-for="item in categoryList" :key='item.categoryId'>
					<image @click="toIntegralList(item,item.name)" :src="item.imgUrl" mode=""></image>
					<view class="classifyText">{{item.name}}</view>
				</view>
				<view class="classifyBox">
					<image @click="toIntegralList(307,'全部分类')" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/classify_six.png" mode=""></image>
					<view class="classifyText">全部分类</view>
				</view>
			</view>
			
			<view class="sign">
				<view>
					<image @click="torankList" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/rankList.png" mode=""></image>
				</view>
				<view>
					<image @click="sign" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/sign.png" mode=""></image>
				</view>
			</view>
			<!-- 品牌专区 -->
			<view class="integralBrand" v-if="brandList.length>0">
				<view class="integralBrandTop">
					<view class="integralBrandText">
						品牌专享
					</view>
					<view class="integralBrandMore" @click="toBrandList">
						查看更多 >
					</view>
				</view>
				<view class="integralBrandFlex">
					<view class="" style="margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view class="integralBrandFlexContent" v-for="item in brandList" :key='item.id'>
							<view  style="width: 140upx;height: 80upx;margin: 0 auto;" @click="toIntegralList_brand(item.id,item.name)">
								<image style="width: 140upx;height: 80upx;margin: 0 auto;" :src="item.logoUrl"></image>
							</view>
							<view class="integralBrandFlexText">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 限时折扣专区 -->
			<view class="integralBrand" style="background:#fff"  v-if="activityGoodsList.length">
				<view class="integralBrandTop">
					<view class="integralBrandText" style="color:#212121">
						限时折扣
					</view>
					<view class="integralBrandMore" @click="goActivityGoodsList">
						查看更多>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;flex-wrap: wrap;margin-left: 20upx;">
					<scroll-view class="major" scroll-x="true" enhanced :show-scrollbar="false">
						<view>
							<view class="major_box" v-for="item in activityGoodsList" :key="item.goodsId"
								@click="goDetail(item.goodsId ? item.goodsId : item.integralBaseId, item.goodsId ? true : false)">
								<view class="major_box1">
									<view class="canbuyimageBottom" v-if="item.goodsPrice.promotionStatus == 20">
										距结束{{item.countdown}}
									</view>
									<view class="canbuyimageBottom" v-if="item.goodsPrice.promotionStatus == 10">
										距开始{{item.countdown1}}
									</view>
									<image class="pic" :src="item.goodsPictureUrl"></image>
								</view>
								<view class="major_txt">{{item.goodsTitle}}</view>
								<view class="major_txt">
									
									<span v-if="item.integralBaseId" class="major_txt_span">
										<span style="font-size: 24upx;color: #333;font-weight: 400;">积分:</span>{{item.goodsPrice.promotionPrice}}
									</span>
									<span v-else class="major_txt_span">
										￥{{item.goodsPrice.promotionPrice}}
									</span>
									<span v-if="!item.integralBaseId" class="major_txt_span2">
										￥{{item.goodsPrice.price}}
									</span>
									<span v-else class="major_txt_span2">
										{{item.integralPrice}}
									</span>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
			<!-- 商品列表 -->
			<view class="contentSelect ">
				<view class="integralChoicenessTitle">
					<view class="integralChoicenessFlex" @click="tabChange">
						<image
							:src="flagShow? 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/integralGoodsSelect.png':''"
							mode=""></image>
						<view :class="{'integralChoicenessRedText':flagShow}">
							精选好物
						</view>
					</view>
					<view class="integralChoicenessFlex" @click="tabChange2">
						<image
							:src="!flagShow? 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/integralGoodsSelect.png':''"
							mode=""></image>
						<view :class="{'integralChoicenessRedText':!flagShow}">
							新品推荐
						</view>
					</view>
				</view>
				<view class="selection">
					<view class="selectGoods" v-for="item in goodsList" :key="item.goodsBaseId" @click="toDetail(item.goodsBaseId)">
						<image :src="item.url?item.url:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"></image>
						<view class="selectGoodsTitle">
							{{item.goodsTitle}}
						</view>
						<view class="selectGoodsPrice">
							<view class="selectGoodsPrice_span">积分：<span>{{item.integralPrice}}</span> </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tab-bar :selectedIndex = "3" :index = "3" > </tab-bar>
	</view>
</template>

<script>
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {
		getActivityGoods,
	} from '@/api/commonApi.js'
	import {
		getRouter,getUrl,refresh
	} from '@/utils/utils.js'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import { integralIndexBannerList,
			integralCategoryTree,
			integralBrandList,
			integralArrivalsGoods,
			integralGoodThingSGoods} from "@/api/integral/integralIndexApi.js"
	export default{
		components: {
		 tabBar
		},
		data(){
			return{
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				musicheadHeight: 0,
				bannerList:[],
				categoryList:[],
				brandList:[],
				flagShow: true,
				goodsList: [],
				userinfo: {}, //个人信息
				flag:null,
				activityGoodsList: [],
				countdown: '',
				countdown1: '',
				timer: null, //重复执行,
			}
		},
		onLoad() {
			this.timer = setInterval(() => {
				this.showtime();
			}, 500);
			this.getActivityGoodsList()
			this.getBannerList()
			this.getIntegralCategory()
			this.getBrandList()
			this.getGoods()
			// this.getAccountInfo()
			
		},
		onShow() {
			this.getHeight()
			var token = uni.getStorageSync('token')
			if(token){
				this.flag = true
				this.getAccountInfo()
			}else{
				this.flag = false
			}
			getRouter()
			getUrl()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods:{
			// 限时折扣
			getActivityGoodsList() {
				var data = {
					pageSize: 20,
					pageNum: 1,
					goodsType:2
				}
				getActivityGoods(data).then(res => {
					if (res.success) {
						this.activityGoodsList = res.data;
						this.activityGoodsList.forEach((item) => {
							if (!item.goodsPictureUrl)
								item.goodsPictureUrl = item.pictureUrl
						})
						this.activityGoodsList = this.activityGoodsList.slice(0, 3)
					}
				})
			},
			goActivityGoodsList() {
				uni.navigateTo({
					url: '/goodsLIst/activityGoodsLIst?goodsType=2'
				})
			},
			
			goDetail(goodsId, bool) {
			
				if (bool) {
					uni.navigateTo({
			
						url: '/goodsDetail/goodsDetail?goodsId=' + goodsId + "&type=1" + "&isSample=1"
					})
				} else {
			
					uni.navigateTo({
						url: '/integralPages/integralDetail?integralId=' + goodsId
					})
				}
			
			},
			showtime() {
				var nowtime = new Date(); //获取当前时间
				this.activityGoodsList.forEach((item) => {
					item.goodsPrice.promotionEndTime = item.goodsPrice.promotionEndTime.replaceAll('-', '/')
					item.goodsPrice.promotionStartTime = item.goodsPrice.promotionStartTime.replaceAll('-', '/')
					if (item.goodsPrice.promotionStatus == 20) {
						// this.endtime = new Date(item.goodsPrice.promotionEndTime)
						var lefttime = new Date(item.goodsPrice.promotionEndTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
			
						if (leftd < 0) {
							leftd = 0
						} else if (lefth < 0) {
							lefth = 0
						} else if (leftm < 0) {
							leftm = 0
						} else if (lefts < 0) {
							lefts = 0
						}
						if (lefth < 10) {
							this.countdown = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						} else {
							this.countdown = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}
			
						// console.log(this.countdown,'countdown')
						item.countdown = this.countdown
					} else if (item.goodsPrice.promotionStatus == 10) {
						var lefttime = new Date(item.goodsPrice.promotionStartTime) - nowtime
							.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
						if (leftd < 0) {
							leftd = 0
						} else if (lefth < 0) {
							lefth = 0
						} else if (leftm < 0) {
							leftm = 0
						} else if (lefts < 0) {
							lefts = 0
						}
						if (lefth < 10) {
							this.countdown1 = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						} else {
							this.countdown1 = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}
						// console.log(this.countdown,'countdown')
						item.countdown1 = this.countdown1
					}
			
					// this.countdownList.push(this.countdown)
				})
			},
			getDataMsg(){
				this.getBannerList()
				this.getIntegralCategory()
				this.getBrandList()
				this.getGoods()
			},
			// 获取账号信息
			getAccountInfo(){
				getLoginAccount().then(res=>{
					if(res.success){
						this.userinfo=res.data
					}
				})
			},
			//  获取状态栏信息
			getHeight() {
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
			// 搜索
			goSearch() {
				uni.navigateTo({
					url:'/integralPages/integralSearch'
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'/loginPages/indexlogin'
				})
			},
			// 获取banner
			getBannerList(){
				integralIndexBannerList().then(res=>{
					this.bannerList=res.data
				})
			},
			bannerJump(item){
				var weixinUrl = item.linkUrl.split('/')[0]+'//'+item.linkUrl.split('/')[2]
				if(weixinUrl=='https://mp.weixin.qq.com'){
					uni.navigateTo({
						url:'/goodsDetail/webView?url='+item.linkUrl
					})
				}else{
					var linkNum = item.linkUrl.split('?')[1]
					if(item.linkUrl.indexOf('/goodsDetail/goodGift') != -1){
						uni.navigateTo({
							url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
						})
					}else if(item.linkUrl && item.linkUrl.indexOf('/goodsDetail/goodGift') == -1){
						uni.navigateTo({
							url:item.linkUrl
						})
					}
				}
			},
			// 获取分类
			getIntegralCategory(){
				integralCategoryTree().then(res=>{
					this.categoryList=res.data.slice(0,9)
				})
			},
			// 去分类列表
			toIntegralList(item,name) {
				if(item==307){
					uni.navigateTo({
						url: "/integralPages/integralClassifyList?categoryId=" + item + '&title=' + name 
					})
				}else{
					uni.navigateTo({
						url: "/integralPages/integralClassifyList?categoryId=" + item.categoryId + '&title=' + name
					})
				}
				
			},
			toIntegralList_brand(id,name) {
				uni.navigateTo({
					url: "/integralPages/integralClassifyList?brandId=" + id + '&brandName='+name +  '&categoryId=' + 307 + '&title=' + '全部分类'
				})
			},
			// 排行榜
			torankList() {
				uni.navigateTo({
					url: "/integralPages/rankList"
				})
			},
			// 签到领积分
			sign(){
				uni.navigateTo({
					url: "/integralPages/integralSign"
				})
			},
			tabChange() {
				this.flagShow = true
				this.getGoods()
			},
			tabChange2() {
				this.flagShow = false	
				this.getNewGoods()
			},
			// 精选好物
			getGoods(){
				integralGoodThingSGoods().then(res=>{
					this.goodsList=res.data
				})
			},
			// 新品上架
			getNewGoods(){
				integralArrivalsGoods().then(res=>{
					this.goodsList=res.data
				})
			},
			// 去详情
			toDetail(id){
				uni.navigateTo({
					url:"/integralPages/integralDetail?integralId="+id
				})
			},
			// 获取品牌
			getBrandList(){
				integralBrandList({
					pageNum:1,
					pageSize:20
				}).then(res=>{
					if(res.success){
						if (res.data.list.length == 3) {
							this.brandList = res.data.list.slice(0, 3)
						} else if (res.data.list.length < 3) {
							this.brandList = [];
						} else if (res.data.list.length > 3 && res.data.list.length < 8) {
							this.brandList = res.data.list.slice(0, 4)
						} else if (res.data.list.length >= 8) {
							this.brandList = res.data.list.slice(0, 8)
						}
					}
				})
			},
			// 去品牌专区
			toBrandList(){
				uni.navigateTo({
					url:'/integralPages/integralBrandList'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.box{
		width: 100%;
		
		.integral_header {
			width: 100%;
			padding-bottom:20upx;
			background: linear-gradient(126deg, #FE7E30, #FFA443);
			.title {
				text-align: center;
				color:#fff;
			}
			// 搜索框
			.integral_search{
				width:calc(100% - 30upx);
				height:70upx;
				margin:10upx auto 0;
				display:flex;
				
				.search_left{
					position:relative;
					
					image{
						width:36upx;
						height:36upx;
						position:absolute;
						left:20upx;
						top:18upx;
					}
					
					input{
						width: 440upx;
						height: 66upx;
						background: #FFFFFF;
						border: 1px solid #EEEEEE;
						border-radius: 33upx;
						text-indent:60upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
					}
				}
				
				.search_right{
					margin-left:30upx;
					
					view{
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 70upx;
						text-align:center;
						
						image{
							width:20upx;
							height:22upx;
							margin:3upx 0 0 10upx;
						}
					}
				}
			}
		}
	
	
		.integral_cont {
			width: 100%;
			margin: 0 auto;
			padding-bottom:30upx;
			
			// banner 图
			.bannerImg {
				width: 100%;
				height: 400upx;
				margin: 20upx auto 0;
				overflow: hidden;
			
				image {
					height: 100%;
					width: 100%;
				}
			}
			
			// icon分类
			.classify {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				margin: 20upx auto 0;
				background: #ffffff;
				border-radius: 10upx;
				padding-top: 18upx;
			
				.classifyBox {
					width: 120upx;
					margin-left: 25upx;
					margin-bottom: 17upx;
					image {
						width: 118upx;
						height: 118upx;
					}
					.classifyText {
						width: 118upx;
						text-align: center;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			
			// 排行榜 签到
			.sign{
				width:100%;
				height: 230upx;
				margin-top:20upx;
				background: #FFFFFF;
				border-radius: 10upx;
				display:flex;
				justify-content:space-around;
				
				view{
					width:345upx;
					height:185upx;
					margin-top:22upx;
					image{
						width:100%;
						height:100%;
					}
				}
			}
			
			// 品牌专区 限时活动
			.integralBrand {
				width: 100%;
				margin: 20upx auto 0;
				background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/skyd_integral/brand_bg.png) no-repeat;
				background-size:100% 100%;
				margin-top: 20upx;
			
				.integralBrandTop {
					width: calc(100% - 56upx);
					margin: 10upx auto 0;
					display: flex;
					justify-content: space-between;
			
					.integralBrandText {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FB681A;
						padding-top: 30upx;
					}
			
					.integralBrandMore {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						padding-top: 36upx;
					}
				}
				
				// 限时活动样式
				.major {
					white-space: nowrap;
					margin: 0 auto;
					.major_box {
						text-align: left;
						width: 340upx;
						height: 200px;
						display: inline-block;
						position: relative;
						
						.major_box1 {
							margin-top: 20upx;
							width: 150px;
							height: 150px;
							position: relative;
							
							.canbuyimageBottom {
								width: 94.5%;
								height: 40upx;
								position: absolute;
								left: 0;
								bottom: 0;
								background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
								border-radius: 0upx 0upx 10upx 10upx;
								font-size: 20upx;
								line-height: 40upx;
								padding: 0upx 8upx;
								color: #FFFFFF;
								font-weight: normal;
							}
						
							.pic {
								width: 150px;
								height: 150px;
								border-radius: 20upx;
							}
						}
						
						.major_txt {
							width: 300upx;
							margin-top: 10upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							overflow: hidden;
							text-overflow: ellipsis;
							line-height: 38upx;
							
							.major_txt_span{
								font-size: 36upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: #FF5000;
							}
							.major_txt_span2{
								text-decoration: line-through;
								font-size: 30upx;
								margin-left: 20upx;
								color:#9FA0A5;
								font-weight: normal;
							}
							
						}
					}
					
				}
				
				// 品怕专区样式
				.integralBrandFlex {
					margin: 20upx auto 0;
					flex-wrap: wrap;
					
					.integralBrandFlexContent {
						width: 160upx;
						text-align: center;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						margin: 10upx auto 0;
			
						.integralBrandFlexText {
							margin-bottom: 20upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
				}
			}	
			// 商品列表
			.contentSelect {
				width: 100%;
				background: #fff;
				margin-top:20upx;
				.integralChoicenessTitle {
					width: 441upx;
					display: flex;
					justify-content: space-between;
					margin: 0 auto 10upx;
					padding-top:38upx;
				
					.integralChoicenessFlex {
						display: flex;
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
				
						image {
							width: 22upx;
							height: 24upx;
							margin-right: 11upx;
						}
					}
				
					.integralChoicenessRedText {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: 800;
						color: #FB681A;
					}
				}
			
				.selection {
					width: calc(100% - 60upx);
					margin: 20upx auto 0;
					padding-bottom:110upx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
			
					.selectGoods {
						width: 330upx;
						height: 475upx;
						margin-top: 30upx;        
			
						image {
							width: 330upx;
							height: 338upx;
							border-radius: 20upx;
						}
			
						.selectGoodsTitle {
							width: 330upx;
							height: 76upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
							line-height: 38upx;
						}
			
						.selectGoodsPrice {
							display: flex;
							margin-top: 10upx;
							color: #ff5000;
							
							.selectGoodsPrice_span {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								
								span{
									font-size: 36upx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #FB681A;
								}
							}
			
							.selectGoodsMoney {
								width: 80upx;
								height: 40upx;
								background: linear-gradient(126deg, #FF8D13, #FE7E30);
								border-radius: 6upx;
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #FFFFFF;
								line-height: 40upx;
								text-align:center;
							}
							
						}
					}
				}
			}
			
		}
	}
	
</style>
