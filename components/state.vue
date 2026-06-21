<template>
	<view class="inputFlex" style="width: 100%;">
		<picker mode="multiSelector" @change="bindPickerChange" @columnchange="bindPickerChange1" :value="index1"
			:range="array1" :range-key="'name'" class="inputText">
			<view class="" style="display: flex;" v-if="countryName">
				{{countryName}}{{provinceName}}{{cityName}}{{areaName}}
			</view>
			<view class="" style="display: flex;"v-else-if="countryName&&isTrue">
				{{provinceName}}{{cityName}}{{areaName}}
			</view>
			<view class="repair" style="display: flex;"v-else-if="provinceName&&isRepair==1">
				{{provinceName}} {{cityName}} {{areaName}}
			</view>
			<view class="message" v-else-if="isMessages" style="">
				{{isMessages}}
				
			</view>
			<view class="selectPlaces" v-else-if="isRepair==1">
				请选择仪器所在地
			</view>
			<view class="selectPlace" v-else>
				请选择收货地址
			</view>
			<image v-if="isShow==1" class="form_icon"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png"
							mode="widthFix"></image>
			<image v-else-if="isRepair==1" class="form_icon2"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png"
							mode="widthFix"></image>			
			<image v-else src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/arrow_right.png"
				mode="" class='img'></image>
				
			

		</picker>
	</view>
</template>

<script>
	import {
		getAddressDetail,
		saveAddress,
		setDefult,
		getRegionParentId,
		getCountryList
	} from '@/api/address.js'
	import {
		toast
	} from '@/utils/utils.js'
	export default {

		data() {
			return {
				array1: [],
				index1: [0, 0, 0, 0],
				citys: [],
				country: [],
				provice: [],
				areaIndex: 0,
				prviceIndex: 0,
				proviceId: 0,
				citysId: 0,
			}
		},
		props: {
			countryName: '',
			cityName: '',
			areaName: '',
			provinceName: '',
			isMessages:'',
			isShow:'',
			isRepair:'',
		},
		onload() {
			
			this.getCountry()
		},
		methods: {
			bindPickerChange1(e) {
				this.index1[e.detail.column] = e.detail.value;
				if (e.detail.column == 0) {
					this.getRegion(this.array1[e.detail.column][e.detail.value].id)
				} else if (e.detail.column == 1) {
					this.getCity(this.array1[e.detail.column][e.detail.value].id)
				} else if (e.detail.column == 2) {
					this.getArea(this.array1[e.detail.column][e.detail.value].id)
				}
			},
			getCountry() {
				getCountryList().then(res => {
					this.country = res.data
					this.array1[0] = res.data
					this.$forceUpdate()
				})
			},
			getRegion(parentId) {
				var data = {
					parentId: parentId
				}
				getRegionParentId(data).then(res => {
					this.array1[1] = res.data[0].name == "/" ? [] : res.data
					this.getCity(res.data[0].id)
					this.prviceIndex = res.data[0].id
					this.$forceUpdate()
				})

			},
			bindPickerChange(e) {
				this.countryId = e.detail.value[0],
					this.proviceId = e.detail.value[1],
					this.citysId = e.detail.value[2],
					this.areaId = e.detail.value[3]
					if(this.array1[1][e.detail.value[1]] == undefined || this.array1[2][e.detail.value[2]] == undefined 
					|| this.array1[3][e.detail.value[3]] == undefined){
						toast({
							title: '该地区暂不支持收货，请选择其它地区'
						})
						this.index1 = [0,0,0,0];
						return;
					}
				var data = {
					countryId: this.array1[0][e.detail.value[0]].id,
					countryName:this.array1[0][e.detail.value[0]].name,
					provinceId: this.array1[1][e.detail.value[1]].id,
					province: this.array1[1][e.detail.value[1]].name,
					city: this.array1[2][e.detail.value[2]].name,
					cityId: this.array1[2][e.detail.value[2]].id,
					areaId: this.array1[3][e.detail.value[3]].id,
					area: this.array1[3][e.detail.value[3]].name
				}
				
				this.countryData = this.array1[0][e.detail.value[0]].name
				this.proviceData = this.array1[1][e.detail.value[1]].name
				this.cityData = this.array1[2][e.detail.value[2]].name
				this.areaData = this.array1[3][e.detail.value[3]].name
				this.$emit('bindPickerChange', data)

			},
			getCity(parentId) {
				var data = {
					parentId: parentId
				}
				getRegionParentId(data).then(res => {
					this.array1[2] = res.data[0].name == "/" ? [] : res.data
					this.getArea(res.data[0].id)
					this.$forceUpdate()
				})
			},
			getArea(parentId) {
				var data = {
					parentId: parentId
				}
				getRegionParentId(data).then(res => {
					this.array1[3] = res.data[0].name == "/" ? [] : res.data
					this.$forceUpdate()
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.inputText {
		/* width: 800upx; */
		/* display: flex;
		 */
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
	}
	.pickers{
		
	}
	.message{
		/* width: 90%; */
		color: #333333;font-size: 28upx;
	}
		
	.selectPlace{
		
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;		
		color: #9FA0A5;
	}
	.selectPlaces{	
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;		
		color: #7f7f7f;
	}
	.form_icon {
		width: 30upx;
		height: 30upx;
		position: absolute;
		top:15upx;
		left: 650upx;
		/* float: right; */
		/* margin-left: 500upx;
		margin-top: -80upx; */
	}
	.form_icon2{
		position: absolute;
		width: 30upx;
		height: 30upx;
		left: 670upx;
		top: 680upx;
	}
	.repair{
		width: 300upx;
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #202021;
		margin-left: -50upx;
	}	
	.img{
		width: 30upx;
		height: 30upx;
		/* float: right; */
		position: absolute;
		margin-left: 400upx;
		margin-top: -35upx;
		.img2{
			width: 30upx;
			height: 30upx;
			/* float: right; */
			position: absolute;
			margin-left: 1000upx;
			margin-top: -50upx;
		}
		
	}
	.yundianimg2{
		margin-top: -100upx;
	}
</style>
