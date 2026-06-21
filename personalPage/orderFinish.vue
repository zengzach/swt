<template>
	<view class="orderFinshPage">
		<view class="orderFinshTop">
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
			<view class="statusTypes">
				订单已完成
			</view>
		</view>
		<view class="personMassage">
			<view class="personName">
				王敏
				<text>1566566565</text>
			</view>
			<view class="presonAddress">
				江苏省苏州市吴中区群星三路10号
			</view>
		</view>
		<view class="goodsContent">
			<view class="goodsContentOne">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
				<view class="goodsContentRight">
					<view class="goodsContentTop">生科云选 900101Tecan200voiopvfepfkekg</view>
					<view class="goodsContentCenter">生科云选    96/包 20包/箱</view>
					<view class="goodsContentButtom">
						<text class="goodsPrice">￥<span>4:00</span></text>
						<text class="goodsNumber">*10</text>
					</view>
				</view>
				
			</view>
			<view class="goodsContentOne">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/search.png" mode=""></image>
				<view class="goodsContentRight">
					<view class="goodsContentTop">生科云选 900101Tecan200voiopvfepfkekg</view>
					<view class="goodsContentCenter">生科云选    96/包 20包/箱</view>
					<view class="goodsContentButtom">
						<text class="goodsPrice">￥<span>4:00</span></text>
						<text class="goodsNumber">*10</text>
					</view>
				</view>
				
			</view>
			
			<view class="goodsTotal">
				<view class="goodsLeftName">商品总额</view>
				<view class="goodsLeftPrice"><span>￥</span>560:00</view>
			</view>
			<view class="goodsTotal">
				<view class="goodsLeftName">运费</view>
				<view class="goodsLeftPrice"><span>￥</span>50:00</view>
			</view>
			<view class="realPrice">
				<view class="realPriceTitle">实付</view>
				<view class="realMoney"><span>￥</span>40:00</view>	
			</view>
		</view>
		
		
		<view class="orderNumberContent">
			<view class="orderNum">
				<view class="orderNumTitle">订单编号</view>
				<view class="orderNumDetail">1234567</view>
			</view>
			<view class="orderNum">
				<view class="orderNumTitle">下单时间</view>
				<view class="orderNumDetail">1234567</view>
			</view>
			<view class="orderNum">
				<view class="orderNumTitle">支付方式</view>
				<view class="orderNumDetail">1234567</view>
			</view>
			<view class="orderNum">
				<view class="orderNumTitle">配送方式</view>
				<view class="orderNumDetail">1234567</view>
			</view>
			<view class="orderNum">
				<view class="orderNumTitle">订单方式</view>
				<view class="orderNumDetail">1234567发顺丰</view>
			</view>
		</view>
		
		
		<view class="orderType">
			<view class="payContent">
				<view class="payContentTitle">支付详情</view>
				<view class="payContentRight">></view>
			</view>
			<view class="payContent">
				<view class="payContentTitle">发货详情</view>
				<view class="payContentRight">></view>
			</view>
			<view class="payContent">
				<view class="payContentTitle">发票详情</view>
				<view class="payContentRight">></view>
			</view>
		</view>
		
		<view class="orderBtn">
			<view>
				<span>退换</span>/
				<span>售后</span>
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
	@import url('@/static/LHT/orderDetail.css');
	// @import url('@/static/DS/orderDetail.css');
.orderFinshPage{
	width: 100%;
	background-color: #f1f1f1;
	.orderFinshTop{
		width: 200upx;
		margin: 0 auto;
		image{
			width: 56upx;
			height: 56upx;
			margin-left: 40upx;
			margin-top: 41upx;
		}
		// .statusTypes{
		// 	font-size: 32upx;
		// 	font-family: PingFang SC;
		// 	font-weight: 500;
		// 	color: #0D986A !important;
		// 	margin-top: 22upx;
		// 	padding-bottom: 50upx;
		// }
	}
	.personMassage{
		width: calc(100% - 60upx);
		height: 154upx;
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 0 auto;
		.personName{
			height: 27upx;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			line-height: 34upx;
			padding-top: 40upx;
			margin-left: 30upx;
			
			text{
				width: 163upx;
				height: 20upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #929396;
				line-height: 34upx;
				margin-left: 22upx;
			}
		}
		.presonAddress{
			height: 30upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin-left: 30upx;
			margin-top: 23upx;
		}
	}
	
	.goodsContent{
		width: calc(100% - 60upx);
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 20upx auto;
		.goodsContentOne{
			display: flex;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
				margin-top: 40upx;
				margin-left: 30upx;
			}
			.goodsContentRight{
				margin-top: 40upx;
				.goodsContentTop{
					width: 411upx;
					height: 40upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.goodsContentCenter{
					width: 312upx;
					height: 25upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #9FA0A5;
					margin-top: 20upx;
				}
				.goodsContentButtom{
					margin-top: 60upx;
					.goodsPrice{
						width: 77upx;
						height: 26upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #F33C0A;
						span{
							font-size: 28upx;
						}		
					}
					.goodsNumber{
						width: 46upx;
						height: 21upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-left: 280upx;
					}
				}
			}
		}
		
		.goodsTotal{
			display: flex;
			margin-top: 40upx;
			height: 40upx;
			.goodsLeftName{
			width: 200upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-left: 30upx;
			}
			.goodsLeftPrice{
			   width: 200upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
				margin-left: 400upx;	
			}
			
		}
		.realPrice{
			display: flex;
			margin-top: 40upx;
			.realPriceTitle{
				width: 200upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-left: 30upx;
			}
			.realMoney{
				width: 200upx;
				height: 26upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #F33C0A;
				margin-left: 400upx;
			}
		}
	}
	
	.orderNumberContent{
		width: calc(100% - 60upx);
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 20upx auto;
		.orderNum{
			display: flex;
			justify-content: space-between;
			margin-top: 20upx;
			.orderNumTitle{
				width: 129upx;
				margin-top: 40upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-left: 30upx;
			}
			.orderNumDetail{
				width: 292upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				line-height: 80upx;
				margin-left: 260upx;
			}
		}
	}
	
	.orderType{
		width: calc(100% - 60upx);
		background: #FFFFFF;
		border-radius: 15upx;
		margin: 20upx auto;
		.payContent{
			display: flex;
			justify-content: space-between;
			.payContentTitle{
				width: 690upx;
				background: #FFFFFF;
				border-radius: 20upx;
				margin-top: 40upx;
				margin-left: 30upx;
			}
			.payContentRight{
				width: 80upx;
				margin-top: 40upx;
			}
		}
	}
	.orderBtn{
		width: 750upx;
		height: 98upx;
		background: #FFFFFF;
		box-shadow: 0upx 1upx 0upx 0upx #EEEEEE;
		view{
			width: 164upx;
			height: 60upx;
			background: #FFFFFF;
			border: 1upx solid #929396;
			border-radius: 30upx;
			line-height: 60upx;
			text-align: center;
			margin-left: 540upx;
			
		}
	}
	
}
</style>
