<template>
	<view style="background-color: #fff;min-height:100vh">
		<view class="sampleBack">
			<view class="" :style="{paddingTop:statusBarHeight+'px'}">
				<image @click="backGoods"
					src='https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png'
					style='width: 40upx;height:40upx'></image>
			</view>
		</view>
		<view class="sampleGoods">
			<view class="" style="padding: 20upx 0 20upx 0;">
				<view class="search">
					<image @click="goSearch" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png" mode=""></image>
					<input type="text" v-model="goodsSampleQueryDto.key"
						@confirm="onSearch"
						confirm-type="search" bindconfirm="startSearch" placeholder="请输入想要搜索的商品"
						placeholder-style="color:#B0B1B6;"/>
				</view>
			</view>
			
			<view class="sampleGoodsDetail" v-if="sampleArr.length>0">
				<view class="sampleGoodsContent" @click="goApply(item)" v-for="item in sampleArr" :key="item.goodsId">
					<image :src="item.coverImg?item.coverImg:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
					<view class="" style="height: 77upx;">
						<view class="sampleGoodsTitle">
							{{item.goodsTitle}}
						</view>
					</view>
					<view class="sampleGoodsBtn">
						<view class="sampleGoodsBtnBack" :style="{ background: background }"> </view>
						<view class="text" :style="{ color: color }">
							样品申请
						</view>
					</view>
				</view>
			</view>
			<view class="noSample" v-else>
				<view style="padding-top: 100upx;"></view>
				<view class="sample_img" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
			         backgroundSize:'100% 100%'}"></view>
				<view class="sample_text">暂无样品</view>
			</view>
		</view>

	</view>
</template>

<script>
	import '@/static/LHT/applySample.css'
	import {
		samplePage
	}
	from "@/api/sample"
	import {
		toast
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				goodsSampleQueryDto: {
					pageNum: 1,
					pageSize: 10,
					key:''
				},
				sampleArr: [],
				statusBarHeight: 0,
				menuButtonInfo: 0,
				background: '',
				color: '',
				imageURL: '',
				hasNextPage:false
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.loginbtn
			this.background = this.style.registerback
			this.imageURL = this.style.goodsListnogoods
			this.getSample()
		},
		onShow() {
			this.getHeight()
		},
		onReachBottom: function() {
			if(this.hasNextPage){
				this.goodsSampleQueryDto.pageNum++
				samplePage(this.goodsSampleQueryDto).then(res => {
					if (this.sampleArr.length < res.data.total) {
						this.sampleArr = this.sampleArr.concat(res.data.list);
						this.hasNextPage = res.data.hasNextPage
					}
				})
			}
		},
		methods: {
			getSample() {
				samplePage(this.goodsSampleQueryDto).then(res => {
					this.sampleArr = res.data.list
					this.hasNextPage = res.data.hasNextPage
				})
			},
			confirm(e) {
				// console.log(e);
			},
			goApply(item) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + item.goodsId + '&iSsampleList=true' + "&type=2" +
						'&isShowCouponList=true'
				})
			},
			backGoods() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
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
			//分享个人
			onShareAppMessage() {
				return {
					title: '样品列表',
					path: 'goodsDetail/samplePage/samplePage'
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '样品列表',
					path: 'goodsDetail/samplePage/samplePage'
				}
			},
			// 搜索
			goSearch(){
				// console.log("--------------")
				if(this.goodsSampleQueryDto.key){
					this.sampleArr=[]
					samplePage(this.goodsSampleQueryDto).then(res => {
						if ( res.success) {
							this.sampleArr = res.data.list;
							this.hasNextPage = res.data.hasNextPage
						}
					})
				}else{
					toast({
						title:'请输入搜索关键字'
					})
				}
				
			},
			onSearch(event) {
			  const keyword = event.target.value;
			  // 根据关键字执行搜索操作
			  // console.log(keyword,"点击了回车")
			  this.goSearch()
			},
		}
	}
</script>

<style lang="less" scoped>
	.sampleBack {
		width: 100%;
		height: 667upx;
		background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleBackground.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;

		image {
			margin-left: 22upx;
		}
	}

	.sampleGoods {
		width: 100%;
		background: #FFFFFF;
		border-radius: 30upx 30upx 0upx 0upx;
		padding-bottom: 30upx;
		margin-top: -233upx;

		.noSample {
			width: 100%;
			background-color: #fff;
			// margin-top: -220upx;
			height: 400upx;
			border-radius: 30upx 30upx 0 0;

			.sample_text {
				width: 300upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin: 0 auto;
				text-align: center;
			}
		}

		.search {
			width: 690upx;
			height: 60upx;
			border-radius: 30rpx;
			border: 1px solid #EEEEEE;
			display: flex;
			align-items: center;
			position: relative;
			margin: 0 auto;
			
			

			image {
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 15upx;
				z-index: 999;
			}

			input {
				width: 620upx;
				height: 60upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				// border: 1px solid #EEEEEE;
				border-radius: 30rpx;
				box-sizing: border-box;
				padding: 0 0 0 20rpx;
			}
		}

		.sampleGoodsDetail {
			width: calc(100% - 60upx);
			margin: 0 auto;
			display: flex;
			justify-content: space-between;
			// align-items: center;
			flex-wrap: wrap;
		}

		.sampleGoodsContent {
			width: 330upx;
			// height: 496upx;

			image {
				width: 330upx;
				height: 330upx;
				border-radius: 20upx 20upx 0upx 0upx;
			}

			.sampleGoodsTitle {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-top: 19px;
				// height: 77upx;
				display: -webkit-box;
				/*弹性伸缩盒子模型显示*/
				-webkit-box-orient: vertical;
				/*排列方式*/
				-webkit-line-clamp: 2;
				/*显示文本行数*/
				overflow: hidden;
				/*溢出隐藏*/
			}

			.sampleGoodsBtn {
				width: 330upx;
				height: 57upx;
				border-radius: 28upx;
				overflow: hidden;
				margin-top: 25upx;
				position: relative;
				margin-bottom: 30upx;




			}
		}
	}
</style>