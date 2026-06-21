<template>
	<view class="leaveWordPage">
		<view class="leaveWordNav">
			<view @click="leaveWord" :class="flag?'color' :''"   :style="[{color: flag ? color : ''}]">留言反馈</view>
			<view @click="historyLeave" :class="!flag?'color' :''" :style="{color: !flag ? color : ''}">历史反馈</view>
		</view>
		<view class="leaveWordList" v-if="flag">
			<view class="leaveWordContent">
				<view class="leaveWordName">留言反馈</view>
				<view class="writeLeaveWord">
					<textarea  placeholder-style="font-size: 28upx;font-family: PingFang SC;font-weight: 400;color: #B0B1B6;" placeholder="请输入你的留言反馈" v-model="editParamDto.leaveContent" maxlength="200">

					</textarea>
					<view class="writeNum">
						{{editParamDto.leaveContent.length}}/200
					</view>
				</view>
				<view class="imgContent">
					<view class="getImg">
						上传图片
					</view>
					<view class="imgs">
						<uni-file-picker v-model='modelImgList' :image-styles="imageStyles" file-mediatype="image"
							mode="grid" :limit="4" ref="files" @select="select()" :auto-upload="false"
							@delete='delfile()'/>
					</view>
					<view class="mostImg">
						最多上传4张图片
					</view>
				</view>
			</view>
			<button class="lastBtn" :style="{background:background}"  @click="sureBtn">
				提交留言
			</button>
		</view>

		<view class="" v-else>
			<view class=""  v-if="leaveList.length">
				<view class="historyList" v-for="item in leaveList" :key="item.id">
					<view class="leaveWordMassage">
						{{item.leaveContent?item.leaveContent :''}}
					</view>
					<view class="leaveWordImgs">
						<image v-for="(item1,index1) in item.pictureUrls" :key="index1" :src="item1" mode="" @click="clickImg(item,index1)" ></image>
					</view>
					<view class="leaveWordTime" style="display: inline;">
						{{item.leaveTime?item.leaveTime :''}}
					</view>
					<view class="beforeState" v-if="item.status==0">
						未回复
					</view>
					<view class="line" v-if="item.status==1">
					</view>
					<view class="leaveWordState" :style="[{background:background1},{color:color}]" v-if="item.status==1">
						已回复
					</view>
					
					<view class="replyWrite">
						{{item.reply?item.reply :''}}
					</view>
					<view class="replyTime">
						{{item.replyTime?item.replyTime :''}}
					</view>
				</view>
			</view>
			<view class="noList" v-else>
				<view class="noImage"></view>
				<view class="noText">
					亲，暂无历史反馈信息
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import "@/static/LHT/leaveWord.css";
	import {
		getCustomerLeavePage,
		saveCustomerLeave
	} from '@/api/leaveWords.js'
	import {
		upload_file,
		toast,
		getRouter,
		getUrl,
		refresh
	} from '@/utils/utils.js'
	import moment from 'moment';
	export default {
		data() {
			return {
				pageNum: '1',
				leaveList: [],
				editParamDto: {
					leaveContent: ''
				},
				imgList: [],
				flag: true,
				modelImgList: [],
				flage: false,
				style:{},
				color:'',
				background:'',
				background1:''
			}
		},
		onLoad() {
			this.style = uni.getStorageSync('style')
			this.color = this.style.prodcuttext
			this.background = this.style.cartbtn
			this.background1 = this.style.placeOrderrgb
			getRouter()
			getUrl()
			var token = uni.getStorageSync("token")
			var userName = uni.getStorageSync("userName")
			if (token && userName) {
				this.flage = true
			} else {
				this.flage = false
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			// 下拉刷新
			getDataMsg() {
				this.historyLeave()
				getRouter();
				
				
			},
			clickImg(item,index1){
			  wx.previewImage({
			    urls: item.pictureUrls,//需要预览的图片http链接列表，注意是数组
			    current: ''+item.pictureUrls[index1], // 当前显示图片的http链接，默认是第一个
			    success: function (res) { },
			    fail: function (res) { },
			    complete: function (res) { },
			  })
			},
			
			CustomerLeave() {
				
				if(this.flage){
					getCustomerLeavePage(this.pageNum).then(res => {
						if (res.success) {
							 res.data.list.forEach(item=>{
								 if(item.leaveTime){
									  item.leaveTime=moment(item.leaveTime).format('YYYY.MM.DD HH:mm:ss')
								 }
								 if(item.replyTime){
									   item.replyTime=moment(item.replyTime).format('YYYY.MM.DD HH:mm:ss')
								 } 	  
							 })
							this.leaveList = res.data.list
							
							
						}
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '未登录不能查看历史反馈，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			saveLeave() {
				if(this.flage){
					if(this.editParamDto.leaveContent.length>200){
							toast({title:'请不要提交超过200字'})
					}else{	
						
					saveCustomerLeave(this.editParamDto).then(res => {
						if (res.success) {
							this.editParamDto.leaveContent=''
							var token = uni.getStorageSync('token')
							for (let i = 0; i < this.imgList.length; i++) {
								upload_file(token, res.data, this.imgList[i]).then(res => {
									if( i==this.imgList.length - 1){
										this.CustomerLeave()
										toast({title:'提交成功'})
										this.flag=false
										this.imgList=[]
									}
								})
							}	
								this.CustomerLeave()
								toast({title:'提交成功'})
								this.flag=false
						}
					
						
					})	}
				}else{
					uni.showModal({
						title: '提示',
						content: '未登录不能留言，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				
			
			},
			select(e) {
				var that = this
				e.tempFilePaths.forEach((item) => {
					that.imgList.push(item)
				})
			},
			delfile(e) {
				this.imgList.forEach((item, index) => {
					if (item == e.tempFilePath) {
						this.imgList.splice(index, 1)
					}
				})
			},
			sureBtn() {
				this.saveLeave()
			},
			leaveWord() {
				this.flag = true
			},
			historyLeave() {
				this.editParamDto.leaveContent = ''
				this.imgList=[]
				this.flag = false
				this.CustomerLeave()
				
			}


		},
	}
</script>

<style lang="less" scoped>
	@import url('@/static/LHT/orderPage.css');
	.leaveWordPage {
		.leaveWordNav {
			width: 100%;
			height: 60upx;
			font-size: 30upx;
			display: flex;
			justify-content: space-around;
			background-color: #ffffff;
			line-height: 60upx;
			font-size: 500;
			color: #B0B1B6;
		}

		.leaveWordList {
			.leaveWordContent {
				width: 688upx;
				height: 632upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin: 0 auto;
				margin-top: 20upx;
				.leaveWordName {
					width: 200upx;
					height: 28upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					padding-top: 40upx;
					margin-left: 35upx;
				}

				.writeLeaveWord {
					width: 630upx;
					height: 306upx;
					background: #F8F8F8;
					// background-color: #08AE63;
					border-radius: 13upx;
					margin: 20upx auto;
					position: relative;

					textarea {
						width: 90%;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						padding-top: 30upx;
						padding-bottom: 50upx;
						margin-left: 30upx;
						box-sizing: border-box;

					}

					.writeNum {

						width: 79upx;
						height: 27upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						position: absolute;
						bottom: 30upx;
						right: 40upx;

					}
				}

				.imgContent {
					margin-left: 30upx;
					min-height: 300upx;
					max-height: 1000upx;

					.getImg {
						width: 200upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
					}

					.imgs {
						display: flex;
						margin-top: 20upx;	
					}
					.mostImg {
						width: 90%;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #B0B1B6;
						text-align: right;
						margin-bottom: -20upx;
					}

				}
			}

			
		}

		.historyList {
			width: 688upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin: 20upx auto;

			.leaveWordMassage {
				width: 650upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-left: 30upx;
				padding-top: 40upx;
			}
			
			.leaveWordImgs {
				display: flex;
				justify-content: start;
				image {
					width: 140upx;
					height: 140upx;
					background: #F8F8F8;
					border-radius: 15upx;
					margin-top: 20upx;
					margin-left: 20upx;
				}
			}
			.leaveWordTime {
				height: 20upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #B0B1B6;
				margin-left: 30upx;
				margin-top: 40upx;
			}
			.beforeState {
				width: 100upx;
				height: 23upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #B0B1B6;
				margin-left: 600upx;
				margin-top: -35upx;
			}

			.line {
				width: 625upx;
				border: 1upx solid #EEEEEE;
				margin: 0 auto;
				margin-top: 20upx;
			}

			

			.replyWrite {
				width: 623upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #67686B;
				line-height: 40upx;
				margin: 20upx auto 0;
				white-space: wrap !important;
				overflow: hidden;
			}

			.replyTime {
				width: 261upx;
				height: 20upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #B0B1B6;
				margin-top: 20upx;
				margin-left: 30upx;
				padding-bottom: 40upx;
			}
		}


		.actColor {
			color: #08AE63;
		}

	}
</style>
<style scoped lang="less">
	::v-deep .file-picker__box {
		width: 140upx !important;
		height: 140upx !important;
		padding: 0 !important;
	}

	::v-deep .uni-file-picker__container {
		height: 140upx !important;
	}
</style>
