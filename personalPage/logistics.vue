<template>
	<view class="logistics">
		<view class="logisticsInp">
			<view class="" style="height: 50upx;">
			</view>
			<view class="logisticsContent" style="display:flex;align-items: center;">
				<view class="logisticsCompany">
					物流公司：
				</view>
				<picker style="width:65%;" @change="bindPickerChange($event)" :range-key="'description'"
					:range="deliverCompany">
					
					<view class="uni-input" :style="{color:(deliveryCompanyName=='请选择' ? '#999999' : '')}"
						style="margin-left: 40upx;width:450upx;">
						{{deliveryDto.deliveryCompanyName}}
					</view>
				</picker>
				<image style="width: 30upx;height: 30upx;"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/arrowRight.png" mode="">
				</image>

			</view>
			<view class="logisticsContent" style="display:flex;margin-top: 40upx;align-items: center;">
				<view class="logisticsCompany">
					物流单号：
				</view>
				<input style="width:50%" placeholder-style="color:#A9A9A9;" type="text" v-model="deliveryDto.deliveryNo"
					placeholder="请输入物流单号">
				<!-- <text class="textCopyClick" style="" @tap="copyClick">复制</text> -->
			</view>
		</view>
		<view class="logisticsBtn" :style="{background:background}" @click="confirmBtn">
			确认
		</view>
	</view>
</template>

<script>
	import "@/static/LHT/returnOrderDetail.css"
	import {
		saveRefundLogistics,
		getLogisticsCompanyList
	}
	from '@/api/orderListApi.js'
	import {
		upload_file,
		toast
	} from '@/utils/utils.js'
	export default {

		data() {
			return {
				deliveryDto: {
					orderRefundId: '',
					deliveryCompanyName: '请选择',
					deliveryNo: '',
					logisticsCompanyCode: ''
				},
				style: {},
				background: '',
				show: false,
				deliverCompany: [],
				lableName: '',
				btnGetCode: {
					borderRadius: 'none',
					border: 'none',
					outline: 'none'
				},

			}
		},
		onLoad(opt) {
			this.getLogisticsCompany()
			this.style = uni.getStorageSync('style')
			this.background = this.style.cartbtn
			this.deliveryDto.orderRefundId = opt.orderRefundId	
			if (opt.deliveryCompanyName) {
				this.deliveryDto.deliveryCompanyName = opt.deliveryCompanyName	
				if(opt.deliveryCompanyName=="null"){
					this.deliveryDto.deliveryCompanyName = '请选择'
				}
			}
			if(opt.deliveryNo){
				this.deliveryDto.deliveryNo = opt.deliveryNo
				if(opt.deliveryNo=="null"){
					this.deliveryDto.deliveryNo=''
				}
			}
			if(opt.logisticsCompanyCode){
				this.deliveryDto.logisticsCompanyCode = opt.logisticsCompanyCode
				if(opt.logisticsCompanyCode=="null"){
					this.deliveryDto.logisticsCompanyCode = ''
				}
			}
		},
		methods: {
			getLogisticsCompany() {
				getLogisticsCompanyList().then(res => {
					if (res.success) {
						this.deliverCompany = res.data
						// this.deliverCompany.push(res.data)
					}
				})
			},
			bindPickerChange(e) {
				this.deliveryDto.deliveryCompanyName = this.deliverCompany[e.target.value].description
				this.deliverCompany.forEach((item, index) => {
					if (this.deliveryDto.deliveryCompanyName == item.description) {
						this.deliveryDto.logisticsCompanyCode = item.code
					}

				})
			},

			// confirm(e) {
			// 	this.lableName = e.value[0].description
			// 	this.deliveryDto.deliveryCompanyName=e.value[0].description
			// 	this.deliveryDto.logisticsCompanyCode=e.value[0].code
			// 	this.show = false
			// },
			// 复制物流单号
			copyClick() {
				uni.setClipboardData({
					data: this.deliveryDto.deliveryNo,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: "复制成功",
									icon: 'none',
								});
							},
						});
					},
				});
			},
			cancel() {
				this.show = false
			},

			confirmBtn() {
				if (this.deliveryDto.deliveryCompanyName.length == 0) {
					toast({
						title: '请填写物流公司'
					})
				}
				if (this.deliveryDto.deliveryNo.length == 0) {
					toast({
						title: '请填写物流单号'
					})
				}
				if (this.deliveryDto.deliveryNo.length && this.deliveryDto.deliveryCompanyName.length) {
					saveRefundLogistics(this.deliveryDto).then(res => {

						if (res.code == '0') {
							toast({
								title: '填写成功'
							})
							uni.navigateTo({
								url: '/personalPage/returnOrderDetail?refundId=' + this.deliveryDto
									.orderRefundId + '&deliveryCompanyName=' + this.deliveryDto
									.deliveryCompanyName + '&logisticsCompanyCode=' + this.deliveryDto
									.logisticsCompanyCode
							})
						}
					})
				}

			}
		}
	}
</script>
<style scoped>
	u-button::after {
		border: none !important;
	}
</style>

<style scoped lang="less">
	.logistics {
		width: 100%;

		.logisticsInp {
			width: calc(100% - 60upx);
			margin: 20upx auto 0;
			height: 258upx;
			background: #FFFFFF;
			border-radius: 15upx;

			.logisticsContent {
				width: calc(100% - 150upx);
				margin: 0 auto;

				.logisticsCompany {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
				}

				.textCopyClick {
					margin-left: 14upx;
					width: 80upx;
					height: 34upx;
					background: #EAEAEA;
					border-radius: 17upx;
					display: inline-block;
					font-size: 23upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					text-align: center;

				}

				// image {
				// 	width: 30upx;
				// 	height: 30upx;
				// }

				// .uni-input {
				// 	font-size: 30upx;
				// 	font-family: PingFang SC;
				// 	font-weight: 500;
				// 	color: #202021;
				// }
				// .uni-input {
				// 	font-size: 30upx;
				// 	font-family: PingFang SC;
				// 	font-weight: 500;
				// 	color: #202021;
				// }
				// view{
				// 	.u-hairline-border:after{
				// 		 border: none !important;
				// }

				// }

				input {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #000000;
				}


			}
		}


	}
</style>
