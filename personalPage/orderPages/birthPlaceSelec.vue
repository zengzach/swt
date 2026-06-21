<template>
	<view class="proposal">
		<view class="header">
			<image class="header_nav_icon" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png"
				@click="backpage"></image>
			<view class="header-icon">
				开票资料
			</view>
		</view><strong></strong>	
		<view class="invoicePopup">
			<view class="invoiceMsg">
				<view class="invoice_msg_one">
					<view class="invoice_one_title">发票类型</view>
					<view class="invoice_one_content">
						<view v-for="(item,index) in invoiceTypeList" :style="[{background: current == item.code ? background1 : ''},{color: current == item.code ? color : ''}]" :key="index" :class="current == item.code ? 'on' : ''"
							@click="changeInvoiceType(item.code,item.description)">{{item.description}}</view>
					</view>
					<view class="invoice_one_introduce">
						温馨提示：设置您下单时的默认开票类型，本公司将根据您提交的开票信息开具并寄送发票，请确保开票资料正确，如因您的开票资料错误导致无法开票，本公司不承担责任，请线下联系申请重开。
					</view>
				</view>
				<view class="invoice_msg_two" v-if="current!='00170005'">
					<view class="invoice_two_title">发票信息</view>
					<view class="invoice_two_content">
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>发票抬头</text>
								<image class="required_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
									mode="widthFix" v-if="current !== '00170005'">
								</image>
							</view>
							<view class="invoice_form_input">
								<input class="uni-input" v-model="ruleForm.companyName" placeholder="请填写公司名称"
									placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>纳税人识别码</text>
								<image class="required_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
									mode="widthFix" v-if="current !== '00170005'">
								</image>
							</view>
							<view class="invoice_form_input">
								<input type="text" class="uni-input" v-model="ruleForm.taxNo"
									placeholder="请填写纳税人识别码" placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>注册电话</text>
							</view>
							<view class="invoice_form_input">
								<input class="uni-input" placeholder="请填写注册电话" v-model="ruleForm.invoiceTel"
									placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>注册地址</text>
							</view>
							<view class="invoice_form_input">
								<input class="uni-input" v-model="ruleForm.invoiceAddress" placeholder="请填写注册地址"
									placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>开户银行</text>
							</view>
							<view class="invoice_form_input">
								<input class="uni-input" v-model="ruleForm.invoiceBankName" placeholder="请输入开户银行"
									placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						<view class="invoice_form_item">
							<view class="invoice_form_lable">
								<text>开户账号</text>
							</view>
							<view class="invoice_form_input">
								<input class="uni-input" v-model="ruleForm.invoiceBankAccount" placeholder="请输入开户账号"
									placeholder-style="color:#A9A9A9" />
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view class="invoice_msg_three" v-if="current!='00170005'">
			<view class="invoice_three_title">收票地址</view>
			<view class="invoice_three_content">
				<view class="invoice_form_item">
					<view class="invoice_form_lable">
						<text>收票人姓名</text>
						<image class="required_icon"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
							mode="widthFix" v-if="current !== '00170005'">
						</image>
					</view>
					<view class="invoice_form_input">
						<input class="uni-input" v-model="ruleForm.invoiceTicketName" placeholder="请填写收票人姓名"
							placeholder-style="color:#A9A9A9" />
					</view>
				</view>
				<view class="invoice_form_item">
					<view class="invoice_form_lable">
						<text>收票人电话</text>
						<image class="required_icon"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
							mode="widthFix" v-if="current !== '00170005'">
						</image>
					</view>
					<view class="invoice_form_input">
						<input class="uni-input" type="number" v-model="ruleForm.invoiceTicketTel"
							placeholder="请填写收票人电话"  placeholder-style="color:#A9A9A9" />
					</view>
				</view>
					<view class="invoice_form_item">
						<view class="invoice_form_lable">
							<text>所在地区</text>
							<image class="required_icon"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
								mode="widthFix" v-if="current !== '00170005'">
							</image>
						</view>
						<view class="invoice_form_input" >
							<view class="address_select_city" @click="selectAddress">
								<state class="address_select_city_state" ref="stateRef" @bindPickerChange='bindPicker' :countryName='countryName'
									:provinceName='provinceName' :cityName='cityName' :areaName='areaName' :isMessages='addressMsg' :isTrue='1' :isyundian='isyundian'></state>
							</view>
						</view>
				</view>
				<view class="invoice_form_item">
					<view class="invoice_form_lable">
						<text>详细地址</text>
						<image class="required_icon"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/query.png"
							mode="widthFix" v-if="current !== '00170005'"></image>
					</view>
					<view class="invoice_form_input">
						<input class="uni-input" v-model="ruleForm.invoiceTicketAddress" placeholder="请选择收票人详细地址"
							placeholder-style="color:#A9A9A9" />
					</view>
				</view>
			</view>
		</view>
		<view class="invoice_msg_three">
			<view class="invoice_three_title">发票须知</view>
				<view class="invoiceTips">
					1、 开具发票前需要您先进行收货确认(即签收）；<br>
					2、退货后，原订单开具的发票自动生效，将不能再作 为有效票据；<br> 3、开具同一发票的多个商品部分退货的，原订单开具 的发票将作废，需重新申请开具与实际等额的发票
				</view>
			</view> 
		<view class="invoice_msg_btn" :style="{ background: background }" @click="closeCartPopup">确定</view>
	</view>
</template>

<script>
	import '@/static/LHT/invoice.css'
	import {
		saveInvoice,
		getInvoiceTypes,
		getCustomerInvoice,
		// saveInvoiceAddress
	} from '@/api/personalApi.js'
	import {
		toast,
		verifyMobileNumber,
		getRouter,
		getUrl
	} from '@/utils/utils.js'
	import state from '@/components/state.vue'
	// import itmisterAddressPicker from '@/components/itmister-address-picker/itmister-address-picker.nvue'
	export default {
		// itmisterAddressPicker,
		components: {
			state
		},
		data() {
			return {
				count: 100,
				invoiceTypeList: [],
				ruleForm: {
					addressDto: {
						customerAccountId: '',
						
					},
					invoiceType:''
				},
				current: '00170002',
				isAddOrEdit: '',
				addressMsg: '',
				address: [],
				addressIndex: [],
				isMain: '',
				fromPage: '',
				warehouseId: '',
				accountId: '',
				flag: '',
				routerUrl: '',
				goodsId:'',
				orderType:'',
				style:{},
				color:'',
				background:'',
				background1:'',
				description:null,//开票类型
				codes:'',
				couponId:null,
				oldCouponId:null,
				couponPrice:null,
				companyName:'',
				checkedIndex:0,
				checkCart:null,
				Flage: null,
				wxFlage:null,
			}
		},
		onLoad(opt) {
			// console.log(opt,"选择发票页面")
			this.style = uni.getStorageSync('style')
			if(opt.checkCart){
				this.checkCart = opt.checkCart
			}
			this.Flage = uni.getStorageSync('Flage')
			this.wxFlage = uni.getStorageSync('wxFlage')
			this.checkedIndex = opt.checkedIndex
			if(opt.companyName){
				this.companyName = opt.companyName
			}
			this.couponId = opt.couponId
			this.oldCouponId = opt.oldCouponId
			this.couponPrice = opt.couponPrice
			this.color = this.style.personalcolor
			this.background = this.style.cartbtn
			this.background1 = this.style.goodsListaa
			this.$refs.stateRef.getCountry()
			this.$refs.stateRef.getRegion(1)
			this.$refs.stateRef.getArea(3212)
			this.$refs.stateRef.getCity(2)
			this.routerUrl = opt.routerUrl
			this.goodsId = opt.goodsIds
			if (opt.fromPage) {
				this.fromPage = opt.fromPage
				this.warehouseId = opt.wareouseIds
				this.accountId = opt.accountId
			}
			this.warehouseId = opt.wareHouseIds
			this.goodsId = opt.goodsIds
			this.orderType = opt.orderType
			this.isMain = uni.getStorageSync('isMain')
			this.getTypes()
			setTimeout(()=>{
				this.changeInvoiceType(this.codes,'增值税专用发票')
			},100)
			this.getInvoice()
		},
		onPullDownRefresh() {
			this.getTypes()
			this.getInvoice()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			backpage() {
				var router = uni.getStorageSync('Router')
				var url = uni.getStorageSync('Url')
				if (router == '/personalPage/orderPages/confirmOrder') {
					uni.redirectTo({
						url: url
					});
				} else {
					uni.switchTab({
						url: '/pages/personal/personal'
					})
				}
			},
			//更改发票的类型
			changeInvoiceType(type,description) {
				this.current = type
				this.description = description
				this.ruleForm.invoiceType = type
			},
			//获取发票类型
			getTypes() {
				getInvoiceTypes().then(res => {
					if (res.success) {
						this.invoiceTypeList = res.data
						this.codes=this.invoiceTypeList[0].code
					}
				})
			},
			// 获取开票信息
			getInvoice() {
				getCustomerInvoice().then(res => {
					var data = res.data;
					this.current = res.data.invoiceType
					if (res.success && data) {
						if (data.country != null) {
							this.addressMsg = data.country+ ' ' +data.province + ' ' + data.city + ' ' + data.area
							this.addressIndex = [data.countryId, data.provinceId, data
								.cityId, data.areaId
							]
						} 
						// else {
							
							data.addressDto = {
								city: '',
								cityId: '',
								invoiceTicketName: '',
								county: '',
								countyId: '',
								countryId: '',
								customerAccountId: '',
								detailAddress: '',
								id: '',
								mobile: '',
								province: '',
								provinceId: '',
							}
						// }

						this.ruleForm = data;
						if (data.customerInfoId && data.customerInvoiceId && data.invoiceAddress && data
							.invoiceBankAccount && data.invoiceBankName && data.invoiceTel && data.companyName &&
							data.taxNo) {}
					} else {

					}

				})
			},
			changePhoneValue(phoneNum) {
				var flag = verifyMobileNumber(phoneNum)
				if (!flag) {
					toast({
						title: '输入的手机号格式不正确'
					})
					return false
				}
				return true
			},
			selectAddress() {
				
				this.$refs.stateRef.getCountry()
				this.$refs.stateRef.getRegion(1)
				this.$refs.stateRef.getArea(3212)
				this.$refs.stateRef.getCity(2)
				this.$forceUpdate()
			},
			bindPicker(address) {
				this.address = address
				this.countryName = address.countryName				
				this.provinceName = address.province
				this.cityName = address.city
				this.areaName = address.area
				this.addressMsg = address.province + ' ' + address.city + ' ' + address.area
				this.ruleForm.province = address.province
				this.ruleForm.provinceId = address.provinceId
				this.ruleForm.city = address.city
				this.ruleForm.cityId = address.cityId
				this.ruleForm.area = address.area
				this.ruleForm.areaId = address.areaId
				this.ruleForm.countryId = address.countryId		
			},
			// 保存发票信息
			Invoice(data) {
				let _this = this;
				if (this.current == '00170002'||this.current == '00170001') {
					if (!data.companyName) {
						toast({
							title: '请填写公司名称'
						})
					} else if (!data.taxNo) {
						toast({
							title: '请填写纳税人识别码'
						})
					} else if (!data.invoiceTicketName) {
						toast({
							title: '请填写收票人姓名'
						})
					} else if (!data.invoiceTicketTel) {
						toast({
							title: '请填写收票人电话'
						})
					} else if (!this.addressMsg) {
						toast({
							title: '请选择发票地址'
						})
					} else if (!data.invoiceTicketAddress) {
						toast({
							title: '请填写详细地址'
						})
					} else {
						if(!this.changePhoneValue(data.invoiceTicketTel)){
							return
						}
						saveInvoice(data).then(res => {
							if (res.success) {
								var router = uni.getStorageSync('Router')
								var url = uni.getStorageSync('Url')
								if (router == '/personalPage/orderPages/confirmOrder') {
									url = url + '&description=' + this.description+'&couponId='+this.couponId+
									'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+
									'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
									+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
									uni.redirectTo({
										url: url
									});
									url = uni.getStorageSync('Url')
								} else {
									uni.switchTab({
										url: '/pages/personal/personal'
									})
								}
								
							}
						})
					}
				} else {
					saveInvoice(data).then(res => {
							if (res.success) {
								var router = uni.getStorageSync('Router')
								var url = uni.getStorageSync('Url')
								if (router == '/personalPage/orderPages/confirmOrder') {
									url = url + '&description=' + this.description+'&couponId='+this.couponId+
									'&couponPrice='+this.couponPrice+'&companyName='+this.companyName+
									'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
									+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
									uni.redirectTo({
										 url:url
									});
									url = uni.getStorageSync('Url')
								} else {
									uni.switchTab({
										url: '/pages/personal/personal'
									})
								}
					
							}
						})
					
				}
			},
			closeCartPopup() {
				this.Invoice(this.ruleForm)
			},
		},
		
	}
</script>
<style>
	page {
		background-color: #F8F8F8;
	}
</style>
<style scoped lang="scss">
	.proposal {
		width: 100%;
		.header {
			width: 100%;
			height: 132upx;
			display: flex;
		
			.header_nav_icon {
				width: 40upx;
				height: 40upx;
				margin-top: 90upx;
				margin-left: 22upx;
			}
		
			.header-icon {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 21upx;
				margin-top: 94upx;
				margin-left: 260upx;
			}
		}
		

		.invoicePopup {
			width: calc(100% - 48upx);
			margin: 0 auto;
			overflow-y: auto;
			background-color: #FFFFFF;
			border-radius: 15upx;
			position: relative;
			margin-top: 19upx;
			padding-bottom: 29upx;

			.invoiceMsg {
				width: 100%;

				.invoice_msg_one {
					.invoice_one_title {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						line-height: 50upx;
						padding: 50upx 0 5upx 31upx;
					}

					.invoice_one_content {
						// width: 100%;
						display: flex;
						flex-wrap: wrap;
						justify-content: flex-start;
						margin-left: 31upx;

						view {
							margin-top: 20upx;
							padding: 0upx 20upx;
							height: 60upx;
							background: #F7F7F7;
							border-radius: 27upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 60upx;
							text-align: center;
							margin-right: 50upx;
						}

						view:nth-child(1) {
							margin-left: 0;
						}
					}

					.invoice_one_introduce {
						width: calc(100% - 58upx);
						font-size: 26upx;
						margin: 0 auto;
						font-family: PingFang SC;
						font-weight: 400;
						color: #9FA0A5;
						margin-top: 38upx;
					}
				}

				.invoice_msg_two {
					.invoice_two_title {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding: 25upx 0 10upx 32upx;
					}

					.invoice_two_content {
						.invoice_form_item {
							display: flex;
							align-items: center;
							margin-left: 32upx;

							.invoice_form_lable {
								width: 215upx;
								display: flex;

								text {
									font-size: 30upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #202021;
									line-height: 84upx;
								}

								.required_icon {
									width: 14upx;
									height: 14upx;
									margin: 20upx 10upx 0 0;
								}
							}

							.invoice_form_input {
								display: flex;
								align-items: center;

								.uni-input {
									width: 370upx;
									font-size: 30upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #202021;
									line-height: 84upx;
								}

								image {
									width: 36upx;
									height: 36upx;
								}
							}
						}
					}
				}
			}
		}

		.invoice_msg_three {
			width: calc(100% - 48upx);
			// height: 494upx;
			margin: 0 auto;
			margin-top: 20upx;
			background: #FFFFFF;
			border-radius: 15upx;

			.invoice_three_title {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color:#202021;
				padding: 49upx 0 28upx 32upx;
			}
.invoiceTips{
	width: calc(100% - 58upx);
	line-height: 40upx;
	font-size: 26upx;
	margin: 0 auto;
	font-family: PingFang SC;
	font-weight: 400;
	color: #9FA0A5;
	margin-top: 20upx;
}
			.invoice_three_content {
				padding-bottom: 68upx;

				.invoice_form_item {
					display: flex;
					align-items: center;
					margin-left: 31upx;

					.invoice_form_lable {
						width: 215upx;
						display: flex;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 70upx;
						}

						.required_icon {
							width: 14upx;
							height: 14upx;
							margin: 20upx 10upx 0 0;
						}
					}

					.invoice_form_input {
						width: calc(100% - 215upx);
						display: flex;
						justify-content: space-between;
						align-items: center;

						.uni-input {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 70upx;
						}

						image {
							width: 36upx;
							height: 36upx;
						}

						.text-area {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
					}
				}
			}
		}

		// .invoice_msg_btn {
		// 	width: 690upx;
		// 	height: 70upx;
		// 	background: linear-gradient(-70deg, #0D986A, #08AE63);
		// 	border-radius: 35upx;
		// 	font-size: 28upx;
		// 	font-family: PingFang SC;
		// 	font-weight: bold;
		// 	color: #FFFFFF;
		// 	line-height: 70upx;
		// 	text-align: center;
		// 	margin: 90upx auto  77upx;
		// 	position: relative;
		// 	bottom: 77upx;
		// }
		
	}
	
</style>
