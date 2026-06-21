<template>
	<view>
		<view class="pageContent">
			<view class="pageContent_content">
				<view class="inquiry_text1">询价描述</view>
				<view style="position: relative;">
					<textarea placeholder="请输入询价内容" v-model="inquiryDetail.description"
						placeholder-style="font-size:24upx;color:A9A9A9;" maxlength="500"></textarea>
					<text
						style="position: absolute;right: 38upx;bottom: 6upx;font-size: 22upx;">{{inquiryDetail.description.length+'/'+500}}</text>
				</view>
			</view>
			<view class="pageContent_content" style="margin-top: 20upx;">
				<view class="input_content">
					<view class="inquiry_text">联系人</view>
					<input type="text" v-model="inquiryDetail.contact" placeholder="请输入联系人"
						placeholder-style="color:#A9A9A9;" />
				</view>
				<view class="input_content">
					<view class="inquiry_text">手机号</view>
					<input type="number" v-model="inquiryDetail.mobile" placeholder="请输入手机号码"
						placeholder-style="color:#A9A9A9;" />
				</view>
				<view class="input_content">
					<view class="inquiry_text">公司名称</view>
					<input type="text" v-model="inquiryDetail.company" placeholder="请输入公司名称"
						placeholder-style="color:#A9A9A9;" />
				</view>
				<view class="input_content" v-if="isProductsCross">
					<view class="inquiry_text">地区</view>
					<uni-data-picker class="uni-input" placeholder="点击选择省市区" popup-title="请选择地区"
						:localdata="addressTree" v-model="selectAddressValue" @change="onchange">
					</uni-data-picker>
				</view>
			</view>
			
			<view class="pageContent_button">
				<button :style="{ background:background}" @click="submit">提交</button>
			</view>
		</view>

	</view>
</template>

<script>
	import { getStyleById } from '@/api/indexApi'
	import { getGoodsDetail, saveInquiry } from '@/api/goodsDetailApi.js'
	import { getLoginAccount } from '@/api/personalApi.js'
	import { toast, verifyMobileNumber, } from '@/utils/utils.js'
	import { queryAllRegionsTreeV2 } from '@/api/address.js'
	import { saveExternalInquiry } from '@/api/coa.js'
	export default {
		data() {
			return {
				inquiryDetail: {
					description: '',
					contact: '',
					mobile: '',
					company: '',
				},
				background: '',
				goodsInfo: {},
				isProductsCross:false,
				addressTree: [],
				selectAddressValue: [],
				goodsId:'',
				goodsIdList:[]
			};
		},
		onLoad(option) {
			if(option.productsCross){
				this.isProductsCross = true
				this.goodsIdList = JSON.parse(option.goodsIdList)
				this.GetQueryAllRegionsTree()
			}else{
				this.goodsId = option.goodsId
				this.getdetail()
				this.getAccountInfo()
			}
			
			this.getStyleByIdList()
		},
		methods: {
			getStyleByIdList() {
				getStyleById().then(res => {
					this.background = res.data.colorblue
				})
			},
			getdetail() {
				getGoodsDetail({
					goodsId: this.goodsId
				}).then(res => {
					if (res.success) {
						this.goodsInfo = res.data;
					}
				});
			},
			//获取用户信息
			getAccountInfo() {
				getLoginAccount().then(res => {
					if (res.success) {
						this.inquiryDetail.contact = res.data.contact
						this.inquiryDetail.mobile = res.data.mobile
						this.inquiryDetail.company = res.data.company
					}
				})
			},
			GetQueryAllRegionsTree() {
				var that = this
				queryAllRegionsTreeV2().then(res => {
					if (res.success) {
						this.addressTree = res.data
					}
				})
			},
			onchange(e) {
				console.log(e.detail.value,"------------")
				this.selectAddressValue = e.detail.value
			},
			// 详情页询价
			submit() {
				if (!this.inquiryDetail.description) {
					toast({
						title: '请输入询价描述'
					})
					return false;
				}
				if (!this.inquiryDetail.contact) {
					toast({
						title: '请输入联系人'
					})
					return false;
				}
				if (!this.inquiryDetail.mobile) {
					toast({
						title: '请输入手机号'
					})	
					return false;
				}
				if(!verifyMobileNumber(this.inquiryDetail.mobile)){
					toast({
						title: '请输入正确格式的手机号'
					})
					return false;
				}
				if (!this.inquiryDetail.company) {
					toast({
						title: '请输入公司名称'
					})
					return false;
				}
				
				
				if(this.isProductsCross){
					if (this.selectAddressValue.length<=0) {
						toast({
							title: '请选择地区'
						})
						return false;
					}
					console.log(this.selectAddressValue)
					var dataCross={
						company: this.inquiryDetail.company,			//公司名
						contact: this.inquiryDetail.contact,			//联系人
						mobile: this.inquiryDetail.mobile,				//电话
						description: this.inquiryDetail.description,	//询价描述
						goodsIds: this.goodsIdList,		//商品id
						provinceId: this.selectAddressValue[1].value,
						cityId: this.selectAddressValue[2].value,
						areaId: this.selectAddressValue[3].value || '',
					}
					console.log(dataCross)
					saveExternalInquiry(dataCross).then(res => {
						if (res.success) {
							uni.showModal({
								title: '询价提交成功',
								content: '销售会尽快回复您的询价',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										uni.redirectTo({
											url:'/goodsDetail/COA/productsCross'
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							})
						}
					})
				}else{
					var data = {
						company: this.inquiryDetail.company, //公司名
						contact: this.inquiryDetail.contact, //联系人
						mobile: this.inquiryDetail.mobile, //电话
						description: this.inquiryDetail.description, //询价描述
						artNo: this.goodsInfo.artNo, //货号
						goodsId: this.goodsInfo.goodsPrice.goodsId, //商品id
						goodsPictureUrl: this.goodsInfo.goodsPictureUrl, //商品主图
						goodsTitle: this.goodsInfo.goodsTitle, //商品名称
					}
					saveInquiry(data).then(res => {
						if (res.success) {
							uni.redirectTo({
								url: "/goodsDetail/inquiryPage/inquiryList"
							})
						}
					})
				}
			},
		
		}
	}
</script>

<style>
	page {
		background: #F4F4F4;
	}
</style>
<style scoped lang="less">
	::v-deep .file-picker__box {
		width: 175upx !important;
		height: 175upx !important;
		padding: 0 !important;
	}

	::v-deep .uni-file-picker__container {
		height: 175upx !important;
	}

	.pageContent {
		width: 690upx;
		margin: 0 auto;
	}

	.pageContent_content {
		width: 690upx;
		margin: 20upx auto 0;
		background: #FFFFFF;
		border-radius: 20upx;
		padding: 20upx 0;
		
		.inquiry_text1 {
			width: 130upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #212121;
			line-height: 44upx;
			padding-left: 16px;
		}
		textarea {
			font-size: 28upx;
			overflow: auto;
			margin: 10upx auto 0;
			width: 610rpx;
			height: 224rpx;
			padding: 10upx 16upx;
			background: #F4F4F4;
			border-radius: 10rpx;
		}

		text {
			font-size: 24upx;
			color: #666;
		}

		.input_content {
			height: 60upx;
			line-height: 60upx;
			padding: 16upx 24upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.inquiry_text {
				width: 150upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #212121;
				line-height: 44upx;
			}
			input {
				width: 530upx;
				margin-left: 20upx;
				font-size: 28upx;
				// text-align: right;
			}
			.uni-input{
				width: 530upx;
				margin-left: 20upx;
			}
		}
	}
	.pageContent_button{
		button {
			width: 690rpx;
			height: 80rpx;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			margin-top: 96upx;
		}
	}
	
</style>