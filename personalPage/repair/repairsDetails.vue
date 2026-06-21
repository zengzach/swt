<template>
	<view class="content">
		<view class="contents">
			<view class="head">
				<image class="back" @click="back"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png" />
				<view class="pai">
					报修详情
				</view>
			</view>
			<view class="top">
				<view class="tops">
					<view class="img">
						<image v-if="repairDetailList.statusName=='待处理'" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/waitmanage.png" style="width: 64upx;height: 64upx;" mode=""></image>
						<image v-else-if="repairDetailList.statusName=='处理中'" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/managing.png" style="width: 64upx;height: 64upx;" mode=""></image>
						<image v-else-if="repairDetailList.statusName=='已完结'" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/managing.png" style="width: 64upx;height: 64upx;" mode=""></image>
						<view class="waitRepair">
							{{repairDetailList.statusName}}
						</view>
					</view>
					<view class="item">
						<view class="left" style="color: #333333;">
							工单编号
						</view>
						<view class="right" >
							{{repairDetailList.repairsCode}}
						</view>
					</view>
					<view class="item" style="padding-bottom: 39upx;">
						<view class="left" style="color: #333333;">
							提交时间
						</view>
						<view class="right">
							{{repairDetailList.createTime}}
						</view>
					</view>
				</view>
			</view>
			<view class="top">
				<view class="tops">
					<view class="instrumentInformation">
						仪器信息
					</view>
					<view class="instrumentInformations">
						<span>仪器名称</span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span >{{repairDetailList.instrumentName}}</span>
					</view>
					<view class="instrumentInformations">
						<span>仪器型号 </span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span>{{repairDetailList.instrumentModel}} </span>
					</view>
					<view class="instrumentInformations">
						<span>仪器所在地</span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span>{{repairDetailList.location}} </span>
					</view>
					<view class="instrumentInformations" style="padding-bottom: 49upx;">
						<span>详情地址</span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span>{{this.repairDetailList.detailAddress.slice(this.repairDetailList.detailAddress.lastIndexOf('-')+1,this.repairDetailList.detailAddress.length)}}</span>
					</view>
				</view>
			</view>
			<view class="top">
				<view class="tops" style="padding-bottom: 50upx;">
					<view class="malfunctionInformation">
						故障信息
					</view>
					<view class="malfunctionInformations">
						<span>故障分类</span>
						<span>{{repairDetailList.faultType}}</span>
					</view>
					<view class="describe">
						<view class="describe_text">
							{{repairDetailList.faultMessage}}
						</view>
					</view>
					<view class="accessoryUpload">
						附件上传
					</view>
					<image v-for="(item,index) in repairDetailListImg" :key="index" :src="item.url" mode="" style="width: 110upx;height: 110upx;margin-top: 25upx;" @click="dianji(item)"></image>
				</view>
			</view>
			<view class="top">
				<view class="tops" style="padding-bottom: 50upx;">
					<view class="instrumentInformation">
						联系方式
					</view>
					<view class="instrumentInformations">
						<span>联系人姓名</span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span>{{repairDetailList.contact}}</span>
					</view>
					<view class="instrumentInformations">
						<span>手机号 </span>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;" mode=""></image>
						<span>{{repairDetailList.mobile}} </span>
					</view>
					<view class="instrumentInformations">
						<span>公司名</span>
						<span>{{repairDetailList.companyName}} </span>
					</view>
					
				</view>
			</view>
			<view class="top">
				<view class="tops" style="padding-bottom: 50upx;">
					<view class="schedule">
						处理进度
					</view>
					<view class="scheduleDetails" style="margin-top: 20upx;">
						
						<view class="zong">
								<view class="user_box" >
									<view class="user_for" v-for="(list,id) in userList" :key="id">
										<view class="line_box">
											<!-- 圆球 -->
											<view class="line_radio" :style="{ 'background' : list.istrue ? '#153EE2' : '#fff','border' : list.istrue ? 'solid 1rpx #153EE2' : 'solid 1rpx #153EE2'}"></view>
											<!-- 线 -->
											<view class="line_for"  :style="{ 'background' : list.istrue ? '#153EE2' : '#8e8b8d'}" ></view>
										</view>
										
										<view class="right_box"  :style="{ 'color' : list.istrue ? '#153EE2' : '#333'}">
											<view class="titles">
												<span class="title11">{{list.statusName}}</span>
												<span class="title" style="margin-left: 20upx;">{{list.createTime}}</span>
											</view>
											
											<view class="desc" >
												<span style="width: 100upx;" v-if="list.type==2">回复:</span>
												<text style="margin-left: 57upx;">{{list.remark}}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 已处理结束 -->
				
			</view>
		</view>
		<view class="" style="padding-bottom: 29upx;">
			<view class="revocation" @click="torevocation" v-if="repairDetailList.status==1">
				撤回
			</view>
		</view>
		
	</view>
</template>

<script>
	import {repairDetails,revocation} from '@/api/repair.js'
	export default {
		data() {
			return {
				repairDetailList:{},
				repairsIds :'',
				repairDetailListImg:[],
				repairDetailListReceivers:[],
				repairDetailListReceiverss:'',
				active:0,
				userList: [],
				flage:false			
			}
		},
		onLoad(options){
			this.repairsIds  = options.id
			this.getrepairDetails()
			var token = uni.getStorageSync("token")
			var userName = uni.getStorageSync("userName")
			if (token && userName) {
				this.flage = true
			} else {
				
				this.flage = false
			}
		},
		// onUnload(event){ //监听是否跳转页面
		// 	this.back();		
		// },
		methods: {
			back() {
				uni.navigateTo({
					url: '/personalPage/repair/myRepair'
				})
			},
			dianji(item){
				uni.previewImage({
					urls: [item.url], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			// 撤回
			torevocation(){
				var repairsId = this.repairsIds
				var that = this
				uni.showModal({
				    title: '提示',
				    content: '确定撤回',
				    success: function (res) {
						
				        if (res.confirm) {
				            revocation(repairsId).then(res=>{
								that.getrepairDetails();
							})
							
				        } else if (res.cancel) {
				            
				        }
				    }
				});
				
			},
			getrepairDetails(){
				var repairsId = this.repairsIds
				repairDetails({repairsId} ).then(res=>{
					this.repairDetailList = res.data
					this.repairDetailListImg = res.data.fileUrlDtos
					this.repairDetailListReceivers = res.data.repairsReceivers
					 
					this.repairDetailListReceivers = res.data.repairsReceivers
					res.data.repairsReceivers.sort((a, b) => {
					  let aa = new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
					  return aa? -1 : 1
					})
					res.data.repairsReceivers[0].istrue = true
					this.userList = res.data.repairsReceivers
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	
	.content{
		.contents{
			margin: 0 auto;
			.head {
				width: 750upx;
				height: 100upx;
				// background-image: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/ranklist_banner.png);
				background-size: 750upx 574upx;
				position: relative;
				color: black;
			}
			
			.back {
				width: 46upx;
				height: 40upx;
				position: absolute;
				top: 75upx;
				left: 28upx;
			}
			
			.pai {
				font-size: 32upx;
				color: #000;
				position: absolute;
				top: 75upx;
				left: 300upx;
			}
			.top{
				margin: 0 auto;
				width: 90%;
				background: #FFFFFF;
				border-radius: 15upx;
				background: #FFFFFF;
				margin-top: 50upx;
				.tops{
					width: 90%;
					margin: 0 auto;
					.img{
						width: 95upx;
						margin: 0 auto;
						padding-top: 38upx;
						.waitRepair{
							width: 111upx;
							margin-left: -15upx;
							margin-top: 21upx;
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #153EE2;
						}
					}
					.item{
						display: flex;
						justify-content: space-between;
						margin-top: 42upx;
						.left{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #666666;
						}
						.right{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
						}
					}
					.instrumentInformation{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 40upx;
					}
					.instrumentInformations{
						display: flex;
						justify-content: flex-end;
						// align-items: flex-end;
						margin-top: 49upx;
						span:last-child{
							flex-grow: 1;
							text-align: right;
						}
						
					}
					.malfunctionInformation{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 40upx;
						
					}
					.malfunctionInformations{
						display: flex;
						justify-content: space-between;
						margin-top: 34upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}
					.describe{
						height: 214upx;
						background: #F8F8F8;
						border-radius: 10px;
						margin-top: 24upx;
						flex: auto;
						overflow: auto;
						
						.describe_text{
							width: 90%;
							margin: 0 auto;
							margin-top: 30upx;
							padding-bottom: 30upx;
						}
						
					}
					.accessoryUpload{
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						margin-top: 30upx;
					}
					.schedule{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 40upx;
					}
					.scheduleDetails{
						display: flex;
						.status-btn {
								
								display: flex;
								
								flex-direction: row;
								align-items: center;
								justify-content: center;
								height: 92rpx;
								margin: 30rpx;
								background-color: #007AFF;
							}
						
							.example-body {
								
								display: block;
								
								padding: 15px;
								flex-direction: row;
							}
						.left{
							margin-top: 50upx;
							.left_top{
								width: 20upx;
								height: 20upx;
								background: #153EE2;
								border-radius: 50%;
							}
							.left_center{
								height: 138upx;
								border-left: 1upx solid #153EE2;
								margin-left: 10upx;
							}
							.left_bottom{
								width: 18upx;
								height: 18upx;
								background: #FFFFFF;
								border: 2upx solid #153EE2;
								border-radius: 50%;

							}
						}
						.right{
							margin-left: 35upx;
							margin-top: 50upx;
							.processing{
								display: flex;
								justify-content: space-between;
								// width: 300upx;
								span{
									font-size: 24upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #333333;
								}
								span:nth-child(1){
									font-size: 32upx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #333333;
								}
								span:nth-child(2){
									margin-left: 20upx;
								}
							}
							.reply{
								width: 526upx;
								
							}
						}
					}
				}
					
				
			}
		}
		.user_for{
			display: flex;
		}
		.item_year {
			font-size: 34rpx;
			height: 50rpx;
		}
		.line_for {
			width: 2upx;
			height: 112upx;
			margin: 0 20rpx 10rpx;
		}	
		.line_radio {
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			top: 0;
		}
		.right_box {
			padding: 0rpx 20upx 20upx 20upx;
			.title{
				
			}
		}
		.desc{
			font-size: 30rpx;
			color: #8e8b8d;
			display: flex;
			margin-top: 20rpx;
			align-items: center;
		}
	}
	.title11{
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
	}
	.revocation{
		width: 90%;
		margin: 0 auto;
		height: 70upx;
		background: linear-gradient(90deg, #4C6FFF, #143DE1);
		border-radius: 35upx;
		margin-top: 39upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		line-height: 70upx;
	}
</style>
