<template>
	<view class="add_address_div">
		<view class="add_address_form">
			<uni-forms ref="form" :modelValue="formData" :border="true">
				<uni-forms-item label="收货人" required name="addressName">
					<uni-easyinput type="text" v-model="formData.addressName"
						placeholderStyle="color:#A9A9A9;margin-top:3rpx" :inputBorder="false" placeholder="请输入收货人" />
				</uni-forms-item>
				<uni-forms-item label="手机号码" required name="addressPhone">
					<uni-easyinput type="number" v-model="formData.addressPhone"
						placeholderStyle="color:#A9A9A9;margin-top:3rpx" :inputBorder="false" placeholder="请输入手机号码" />
				</uni-forms-item>
				<uni-forms-item label="收货地区" required label-width="80" name="addressMsg">
					<view class="address_select_city" @click="selectAddress">	
						<uni-data-picker class="uni-input" placeholder="请选择地区" popup-title="请选择地区"
							:localdata="addressTree" v-model="selectAddressValue" @change="onchange"
							@nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</view>
				</uni-forms-item>
				<uni-forms-item label="详细地址" required name="detailAddress">
					<uni-easyinput type="text" v-model="formData.detailAddress"
						placeholderStyle="color:#A9A9A9;margin-top:3rpx" :inputBorder="false" placeholder="请输入详细地址" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="default_address">
			<view class="default_address_title">默认地址</view>
			<switch style="transform:scale(0.65)" :checked="isChecked" @change="setDefultAddress" color="#3F84EE" />
		</view>
		<view class="address_btn">
			<view class="add_address_submit" @click="addAddress" :style="{background: background}"
				:class="isAddOrEdit == '新增' && (!formData.addressName && !formData.addressPhone && !formData.addressMsg && !formData.detailAddress) ? 'add_no_msg_submit' : ''">
				确定</view>
		</view>
	</view>

</template>		

<script>
	import "@/static/LHT/addAddress.css";
	import {
		getAddressDetail,
		saveAddress,
		setDefult,
		queryAllRegionsTree,
		queryAllRegionsTreeV2
	} from '@/api/address.js'
	import {
		toast,
		verifyMobileNumber,
		verifyPasswordFormat
	} from '@/utils/utils.js'
	export default {
		data() {
			return {
				QueryAlladdressList: [],
				address: [],
				index: 0,
				isChecked: '',
				isAddOrEdit: '',
				addressId: '',
				fromPage: '',
				routerUrl: '',
				accountId: '',
				formData: {
					addressName: '',
					addressPhone: '',
					addressMsg: '',
					detailAddress: '',
					allow: '',
					countryId: 1,
					provinceId: '',
					cityId: '',
					areaId: '',
				},
				show: false,
				goodsId: '',
				list: [],
				style: {},
				background: '',
				addressTree: [],
				selectAddressValue: '',
				goodsType:'',
				orderType:'',
				description:null,
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
			// console.log(opt,"地址详情页面")
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
			this.description = opt.description
			
			this.style = uni.getStorageSync('style')
			this.background = this.style.addressadd
			this.integralGoodsId = opt.integralId
			this.integralNum = opt.integralNum
			this.routerUrl = opt.routerUrl
			if (opt.sample == 'undefined') {
				this.sample = false
			} else {
				this.sample = opt.sample
			}
			if (opt.num) {
				this.num = opt.num
			}
			if (opt.integral) {
				this.integral = opt.integral
			}
			if (opt.carPage) {
				this.carPage = opt.carPage
			}
			if (opt.goodsType) {
				this.goodsType = opt.goodsType
			}
			this.goodsId = opt.goodsId
			this.warehouseId = opt.warehouseId
			this.goodsIds = JSON.parse(opt.goodsIds)
			this.wareHouseId = JSON.parse(opt.wareHouseId)
			this.accountId = opt.accountId
			this.fromPage = opt.fromPage
			this.isAddOrEdit = opt.type
			this.addressId = opt.addressId ? opt.addressId : ''
			this.changeTitle(opt.type)
			if (this.isAddOrEdit == '编辑') {
				this.getAddressMsg(opt.addressId)
			}
			this.GetQueryAllRegionsTree()
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			GetQueryAllRegionsTree() {
				var that = this
				queryAllRegionsTreeV2().then(res => {
					if (res.success) {
						this.addressTree = res.data
					}
				})
			},
			// 更改标题
			changeTitle(type) {
				uni.setNavigationBarTitle({
					title: type + '地址'
				})
			},
			// 获取数据
			getAddressMsg(addressId) {
				let _this = this
				getAddressDetail({
					customerAddressId: addressId
				}).then(res => {
					_this.formData.addressName = res.data.contact
					_this.formData.addressPhone = res.data.mobile
					_this.formData.detailAddress = res.data.detailAddress
					_this.isChecked = res.data.isDefault
					_this.selectAddressValue=res.data.areaId
					_this.address = res.data
					_this.formData.addressMsg = res.data.province + ' ' + res.data.city + ' ' + res.data.area

					if (res.data.deliveryType == 2) {
						_this.index = 1
					} else {
						_this.index = 0
					}
				})
			},
			//设置为默认地址
			setDefultAddress() {
				this.isChecked = !this.isChecked
			},
			// 打开地址选择窗口
			selectAddress() {
				this.show = true
			},
			onchange(e) {
				this.address.countyId = e.detail.value[0].value,
				this.address.county = e.detail.value[0].text,

				this.address.provinceId = e.detail.value[1].value,
				this.address.province = e.detail.value[1].text,

				this.address.cityId = e.detail.value[2].value,
				this.address.city = e.detail.value[2].text,

				this.address.areaId = e.detail.value[3].value,
				this.address.area = e.detail.value[3].text,

				this.selectAddressValue = e.detail.value[e.detail.value.length - 1].value
			},
			onpopupopened() {

			},
			onpopupclosed() {

			},
			onnodeclick() {

			},
			//新增或编辑保存
			addAddress() {
				var that = this
				if (this.index) {
					this.index = 2
				}
				if(this.formData.addressName){
					if(this.formData.addressPhone){
						if(verifyMobileNumber(this.formData.addressPhone)){
							if(this.address.cityId){
								if(this.formData.detailAddress){
									var data = {
										area: this.address.area,
										areaId: this.address.areaId,
										city: this.address.city,
										cityId: this.address.cityId,
										countryId: this.address.countryId,
										contact: this.formData.addressName,
										deliveryType: this.index,
										detailAddress: this.formData.detailAddress,
										id: this.isAddOrEdit == '编辑' ? this.addressId : '',
										isDefault: this.isChecked,
										mobile: this.formData.addressPhone,
										province: this.address.province,
										provinceId: this.address.provinceId
									}
									var formData = ''
									saveAddress(data).then(res => {
										if (res.success) {
											toast({
												title: that.isAddOrEdit + '成功'
											})
											formData = JSON.stringify(this.formData)
											var router = uni.getStorageSync('Router')
											var url = uni.getStorageSync('Url')
											
											if (this.carPage == 1) {
												// console.log('保存地址1');
												uni.redirectTo({
													url: './addressList?fromData=' + formData + '&routerUrl=' +
														this.routerUrl + '&fromPage=' + this.fromPage +
														'&addressId=' + this.addressId + '&accountId=' + this
														.accountId + '&goodsId=' + this.goodsId + '&warehouseId=' +
														this.warehouseId + '&goodsIds=' + JSON.stringify(this
															.goodsIds) + '&wareHouseIds=' +
														JSON.stringify(this.wareHouseId) + '&sample=' + this
														.sample + '&integralId=' + this.integralGoodsId +
														'&integralNum=' + this.integralNum + '&carPage=' + this.carPage
														+'&description=' + this.description+'&couponId='+this.couponId
														+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName
														+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
														+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
												})
											} else if (this.num) {
												// console.log('保存地址2');
												uni.redirectTo({
													url: './addressList?fromData=' + formData + '&routerUrl=' +
														this.routerUrl + '&fromPage=' + this.fromPage +
														'&addressId=' + this.addressId + '&accountId=' + this
														.accountId + '&goodsId=' + this.goodsId + '&warehouseId=' +
														this.warehouseId + '&goodsIds=' + JSON.stringify(this
															.goodsIds) + '&wareHouseIds=' +
														JSON.stringify(this.wareHouseId) + '&sample=' + this
														.sample + '&integralId=' + this.integralGoodsId +
														'&integralNum=' + this.integralNum + '&num=' + this.num
														+'&description=' + this.description+'&couponId='+this.couponId
														+'&couponPrice='+this.couponPrice+'&companyName='+this.companyName
														+'&oldCouponId=' +this.oldCouponId+'&checkedIndex=' +this.checkedIndex
														+'&checkCart='+this.checkCart+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
												})
											} else if (this.integral) {
												// console.log('保存地址3');
												uni.redirectTo({
													url: './addressList?fromData=' + formData + '&routerUrl=' +
														this.routerUrl + '&fromPage=' + this.fromPage +
														'&addressId=' + this.addressId + '&accountId=' + this
														.accountId + '&goodsId=' + this.goodsId + '&warehouseId=' +
														this.warehouseId + '&goodsIds=' + JSON.stringify(this
															.goodsIds) + '&wareHouseIds=' +
														JSON.stringify(this.wareHouseId) + '&sample=' + this
														.sample + '&integralId=' + this.integralGoodsId +
														'&integralNum=' + this.integralNum + '&integralGoods=' +
														this.integral+'&description=' + this.description
														+'&couponId='+this.couponId +'&couponPrice='+this.couponPrice
														+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId
														+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCart
														+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
												})
											} else {
												// console.log('保存地址4');
												if(this.goodsType == 20){
													this.orderType = 4
												}
												uni.redirectTo({
													url: './addressList?fromData=' + formData + '&routerUrl=' +
														this.routerUrl + '&fromPage=' + this.fromPage +
														'&addressId=' + this.addressId + '&accountId=' + this
														.accountId + '&goodsId=' + this.goodsId + '&warehouseId=' +
														this.warehouseId + '&goodsIds=' + JSON.stringify(this
															.goodsIds) + '&wareHouseIds=' +
														JSON.stringify(this.wareHouseId) + '&sample=' + this
														.sample + '&integralId=' + this.integralGoodsId +
														'&integralNum=' + this.integralNum+'&goodsType=' + this.goodsType+
														'&orderType=' + this.orderType+'&description=' + this.description+
														'&couponId='+this.couponId +'&couponPrice='+this.couponPrice
														+'&companyName='+this.companyName+'&oldCouponId=' +this.oldCouponId
														+'&checkedIndex=' +this.checkedIndex+'&checkCart='+this.checkCar
														+'&Flage='+this.Flage+'&wxFlage='+this.wxFlage
												})
											}
									
										}else{
											// if(res.code=='30'){
											// 	toast({
											// 		title: '请填写收货地区'
											// 	})	
											// }
											toast({
												title: res.msg
											})
										}
									})
								}else{
									toast({
										title: '请输入详细地址'
									})
								}
							}else{
								toast({
									title: '请选择收货地区'
								})
							}
						}else{
							toast({
								title: '手机号格式不正确'
							})
						}
					}else{
						toast({
							title: '请输入手机号码'
						})
					}
				}else{
					toast({
						title: '请输入收货人'
					})
				}
				
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
	}
</style>
<style scoped lang="scss">
	.add_address_div {
		.add_address_form {
			width: calc(100% - 47upx);
			margin: 25upx 0;
			padding: 18upx 20upx 19upx 27upx;
			background-color: #FFFFFF;

			.address_select_city {
				width: 100%;
				height: 72upx;
				align-items: center;
				justify-content: space-between;
				line-height: 72upx;
			}
		}

		.default_address {
			width: calc(100% - 50upx);
			padding: 39upx 23upx 40upx 27upx;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.default_address_title {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
			}
		}

		// .add_address_submit {
		// 	width: 702upx;
		// 	height: 70upx;
		// 	background: linear-gradient(-70deg, #0D986A, #08AE63);
		// 	border-radius: 30upx;
		// 	font-size: 30upx;
		// 	font-family: PingFang SC;
		// 	font-weight: 500;
		// 	color: #FFFFFF;
		// 	line-height: 60upx;
		// 	text-align: center;
		// 	margin: 99upx auto;
		// }

		.add_no_msg_submit {
			background: #E2E2E2;
		}
	}
	::v-deep .uni-icons{
		font-size: 16px !important;
	}
	.placeholder{
		font-size: 18upx;
	}
</style>
