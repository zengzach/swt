<template>
	<view class="content">
		<!-- <view class="header"> -->
		<!-- 	<image class="header_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
				@click="backpage"></image> -->
		<!-- 	<view class="header-icon">
				帮助中心
			</view>
		</view> -->
		<view class="main">
			<view class="header">
				<view :style="[{color: articleTypeDictCode=='00120002' ? color : ''}]"  :class="articleTypeDictCode=='00120002'?'focus':''" @click="change('00120002')" >
					新闻公告
				</view>
				<view :style="[{color: articleTypeDictCode=='00120001' ? color : ''}]" :class="articleTypeDictCode=='00120001'?'focus':''" @click="change('00120001')" >
					帮助中心
				</view>
				<view :style="[{color: articleTypeDictCode=='00120003' ? color : ''}]" :class="articleTypeDictCode=='00120003'?'focus':''" @click="change('00120003')" >
					关于我们
				</view>
			</view>
			<view class="">
				<view class="notice_list">
					<view class="notice_list_one">
						<view class="notice_one_item" v-for="item in list" :key="item.id" @click="todetail(item)">
							<view class="notice_title">{{item.title}}</view>
							<view class="notice_msg">
								<view>
									<view>{{item.createTime}}</view>
								</view>
								<view>
									<view>{{item.author}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="notice_list" v-if="list.length ==0">
					<view class="notice_list_one">
						<view class="notice_one_item">
							暂无任何信息
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/LHT/helpCenter.css'
	import {
		getArticleList,
		getArticleDetail
	} from '@/api/articleApi.js'
	import moment from 'moment';
	import {
		getRouter,
		refresh,
		getUrl
	} from '@/utils/utils.js'
	export default {

		data() {
			return {
				list: [],
				articleTypeDictCode: '00120002',
				style:{},
				color:''
			}
		},
		onLoad(opt) {
			this.style = uni.getStorageSync('style')
			this.color = this.style.personalcolor
			this.articleTypeDictCode = opt.articleTypeDictCode
			// this.articleTypeDictCode = '00120002';
			this.getArticle()
			var token = uni.getStorageSync('token')
			if(token){
				
			}else{
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			}
				getUrl()
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.getArticle()
				getRouter();				
			},
			getArticle(option) {
				var postData = {
					pageNum: 1,
					articleTypeDictCode: this.articleTypeDictCode
				};
				getArticleList(postData

				).then(res => {
					res.data.forEach(item => {
						item.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
					})
					this.list = res.data;
					console.log(this.list,'this.list');
				})
			},
			change(code) {
				this.articleTypeDictCode = code;
				this.getArticle();
			},
			todetail(item) {
				uni.navigateTo({
					url: '/personalPage/notice_detail?articleId=' + item.id
				})
			},
			backpage() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			//分享个人
			onShareAppMessage() {
				// console.log(this.articleTypeDictCode,'articleTypeDictCode');
				if(this.articleTypeDictCode){
					return {
						title: '帮助中心',
						path: '/personalPage/helpCenter?articleTypeDictCode='+this.articleTypeDictCode 	
					}
				}	
			},
			//分享朋友圈
			onShareTimeline() {
				if(this.articleTypeDictCode){
					return {
						title: '帮助中心',
						path: '/personalPage/helpCenter?articleTypeDictCode='+this.articleTypeDictCode 	
					}
				}
			},
		}
	}
</script>
<style>
	page {
		background: #f6f6f6;
	}
</style>
<style lang="less" scoped>
	.content {
		width: 750upx;
		height: 1334upx;
		margin-left: 30upx;

		.header {
			width: 100%;
			height: 132upx;
			display: flex;
			background-color: #FFFFFF;
			line-height: 80upx;
			.header_nav_icon {
				width: 40upx;
				height: 40upx;
				margin-top: 105upx;
				margin-left: 22upx;
			}

			.header-icon {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 21upx;
				margin-top: 87upx;
				margin-left: 230upx;
			}
		}

		.main {
			margin-top: 60upx;

			.header {
				width: 690upx;
				height: 70upx;
				margin-top: 20upx;
				font-size: 30upx;
				font-family: PingFang SC;
				color: #202021;
				border-radius: 10upx;
				justify-content: space-around;
			}

			.notice_list {
				width: 100%;
				padding: 19upx 0 22upx;
				margin-top: 20upx;

				.notice_list_one {
					.notice_one_item {
						width: calc(100% - 48upx);
						// padding: 20upx 24upx;
						background-color: #FFFFFF;
						margin-bottom: 24upx;
						border-radius: 15upx;
						// padding-bottom: 24upx;
						// text-align: center;
						.notice_title {
							width: 90%;
							font-size: 28upx;
							padding: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 36upx;
							margin: 0 auto;
							margin-bottom: 17upx;
							background-color: #FFFFFF;
							// text-align: center;
							border-radius: 15upx;
						}

						.notice_msg {
							width: 100%;
							display: flex;
							align-items: center;
							padding-bottom: 30upx;
							padding-left: 30upx;
							// text-align: center;
							view {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 300;
								color: #999999;
								margin-right: 33upx;
								display: flex;

								image {
									width: 30upx;
									height: 30upx;
									margin-right: 16upx;
								}
							}
						}

						.notice_detail_html {
							width: 100%;
							margin-top: 15upx;
						
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							line-height: 45upx;
						}
					}
				}
			}
		}

	}
</style>
