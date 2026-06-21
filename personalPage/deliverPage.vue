<template>
	<view class="deliverPage">
		<view class="deliverContent">
			<view class="deliverContentTitle">
				<view >
					已发货金额
					<text><span>￥</span>600.00</text>
				</view>
				<button>立即签收</button>
			</view>
			<view class="deliverDetail">
				
				<view class="deliverDetailOne">
					<view class="deliverDetailLeft">订单号</view>
					<view class="deliverDetailRight">564555625555522</view>
				</view>
				<view class="deliverDetailOne">
					<view class="deliverDetailLeft">订单金额</view>
					<view class="deliverDetailRight">564555625555522</view>
				</view>
				<view class="deliverDetailOne">
					<view class="deliverDetailLeft">已发货金额</view>
					<view class="deliverDetailRight">564555625555522</view>
				</view>
				<view class="deliverDetailOne">
					<view class="deliverDetailLeft">未发货金额</view>
					<view class="deliverDetailRight">564555625555522</view>
				</view>				
			</view>
		</view>
		
		
		<view class="deliverHistory">
			<view class="deliverHistoryTitle">
				发货历史
			</view>
			<view class="deliverHistoryContent">
				<view class="HistoryPrice"><span>￥</span>600.00</view>
				<view class="HistoryMoney">发货金额</view>
				<view class="deliverHistoryDetail">
					<view class="HistoryDetailOne">
						<view class="redDot">
							<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
						</view>
						<view class="fromOrder">商家发货</view>
						<view class="fromOrderTime">2020.06.08 8:00</view>
					</view>
					<view class="line">
						
					</view>
					<view class="HistoryDetailOne" style="margin-top: -54upx;">
						<view class="redDot">
							<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
						</view>
						<view class="fromOrder">提交订单</view>
						<view class="fromOrderTime">2020.06.08 8:00</view>
					</view>
				</view>
				
				<view class="expressContent">
					<view class="expressCompany">物流公司:</view>
					<view class="expressName">顺丰</view>
				</view>
				<view class="expressContent">
					<view class="expressCompany">物流公司:</view>
					<view class="expressName">51646461163416</view>
				</view>
				<view class="expressContent">
					<view class="expressCompany">物流公司:</view>
					<view class="expressName">164656564646151</view>
				</view>
			</view>
			
		</view>
		
		
		
		<view class="orderMassage">
			<view class="orderMassageTitle">
				订单信息
			</view>
			<view class="orderMassageContent">
				<view class="orderMassageNumber">
					订单号:
					<text>16164646111</text>
				</view>
				<view class="hLine">
				</view>
				<view class="orderMassageButtom">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
					
					<view class="orderMassageLast">
						<view class="orderMassageLastPrice">
							<span>￥</span>
							4.20
						</view>
						<view class="orderMassageNum">*10</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
.deliverPage{
	width: 100%;
	.deliverContent{
		width: calc(100% - 60upx);
		height: 541upx;
		background: #F8F8F8;
		border-radius: 20upx;
		margin: 40upx auto;
		.deliverContentTitle{
			width: 281upx;
			height: 33upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #202021;
			line-height: 60upx;
			margin: 0 auto;
			view{
				padding-top: 45upx;
				font-weight: bold;
				text{
					font-size: 36upx;
					color: #F33C0AFF;
					span{
						font-size: 28upx;
					}
				}
			}
			button{
				width: 154upx;
				height: 56upx;
				background: #F8F8F8;
				border: 2upx solid #0D986A;
				border-radius: 28upx;
				text-align: center;
				line-height:56upx ;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
		
		.deliverDetail{
			width: 630upx;
			height: 305upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin: 166upx auto;
			.deliverDetailOne{
				display: flex;
				padding-top: 30upx;
				.deliverDetailLeft{
					width: 137upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 30upx;
				}
				.deliverDetailRight{
					width: 267upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					margin-left: 160upx;
				}
			}
		}
		
	}
	.deliverHistory{
		width: calc(100% - 60upx);
		margin: 40upx auto;
		.deliverHistoryTitle{
			height: 31upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #202021;
			margin: 50upx 0upx 40upx 5upx;
		}
		.deliverHistoryContent{
			width: 690upx;
			height: 614upx;
			background: #F8F8F8;
			border-radius: 20upx;
			.HistoryPrice{
				width: 153upx;
				height: 31upx;
				font-size: 31upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F33C0A;
				margin: 0 auto ;
				padding-top: 50upx;
				span{
					font-size: 28upx;
				}
			}
			.HistoryMoney{
				width: 123upx;
				height: 25upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin: 16upx auto 0;
			}
			.deliverHistoryDetail{
			width: 630upx;
			height: 216upx;
			background: #FFFFFF;
			border-radius: 15upx;
			margin: 30upx auto;
			.HistoryDetailOne{
				display: flex;
				.redDot{		
					image{
						width: 30upx;
						height: 30upx;
						margin-top: 55upx;
						margin-left: 45upx;
					}
				}
				.fromOrder{
					margin-top: 45upx;
					height: 25upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 36upx;
				}
				.fromOrderTime{
					width: 182upx;
					height: 17upx;
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #929396;
					margin-top: 47upx;
					margin-left: 34upx;
				}
			}
			.line{
				width: 1upx;
				height: 83upx;
				border: 1upx solid #E2E2E2;
				margin-left: 55upx;
				margin-top: -14upx;
			}
		}
		.expressContent{
			display: flex;
			justify-content: space-between;
			margin-left: 30upx;
			.expressCompany{
				width: 112upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 60upx;
				text-align: right;
			}
			.expressName{
				width: 261upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 60upx;
				text-align: right;
			}
		}
		}
		
	}
	
	.orderMassage{
		.orderMassageTitle{
			width: 200upx;
			height: 31upx;
			font-size: 32upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #202021;
			margin-top: 50upx;
			margin-left: 30upx;
			
		}
		.orderMassageContent{
			width: 690upx;
			height: 350upx;
			background: #F8F8F8;
			border-radius: 20upx;
			margin: 40upx auto;
			.orderMassageNumber{
				
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				padding-top: 40upx;
				margin-left: 30upx;
			}
			.hLine{
				width: 630upx;
				height: 1upx;
				border: 1upx solid #EEEEEE;
				margin: 20upx auto;
			}
			.orderMassageButtom{
				display: flex;
				margin-left: 30upx;
				margin-top: 20upx;
				image{
					width: 180upx;
					height: 180upx;
					background: #F8F8F8;
					border-radius: 10upx;
					margin-left: 22upx;
				}
				.orderMassageLast{
					width: 123upx;
					height: 180upx;
					background: #F8F8F8;
					opacity: 0.9;
					.orderMassageLastPrice{
						width: 77upx;
						height: 26upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;view
						color: #202021;
						margin-top: 25upx;
						span{
							font-size: 26upx;
						}
					}
					.orderMassageNum{
						width: 46upx;
						height: 21upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-top: 20upx;
						text-align: right;
					}
				}
				
			}
			
		}
		
	}
	
}
</style>
