<template>
	<view class="content">
		<view class="contents">
			<view class="instrumentrRepair">
				<view class="instrumentrRepairs">
					<view class="title">
						仪器报修
					</view>
					<view class="instrumentrRepairs_details">
						<span>欢迎您使用一键报修功能，工作日内我们提供24小时响应，本地可以上门维修，其他地区可寄修或协商上门维修。
						<text v-if="instrumentRepair.repairsSMSMobile">如需紧急处理，请联系售后工程师：</text>
						<text v-if="instrumentRepair.repairsSMSMobile">{{instrumentRepair.repairsReceptionName}}</text>
							<text style="margin-left: 20upx;" v-if="instrumentRepair.repairsSMSMobile!=null">{{instrumentRepair.repairsSMSMobile}}</text>
							<text v-if="instrumentRepair.repairsSMSMobile" style="margin-left: 20upx;">(微信同号)。</text>
						 </span>
						
					
					</view>
				</view>
			</view>
			<view class="instrumentInformation">
				<view class="instrumentInformations">
					<view class="title">
						仪器信息
					</view>
					<view class="instrumentDetails">
						<view class="name">仪器名称</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;margin-left: -20upx;" mode=""></image>
						<input type="text" value="" class="model" placeholder="请填写仪器名称" :class="saveRepairsDto.instrumentName!='' ? 'model1' : ''" v-model="saveRepairsDto.instrumentName"/>
						
					</view>
					<view class="instrumentDetails">
						<view class="name">仪器型号</view>
						<input type="text" value="" class="model" placeholder="请输入仪器型号" :class="saveRepairsDto.instrumentModel!='' ? 'model1' : ''" v-model="saveRepairsDto.instrumentModel"/>
						
					</view>
					<view class="instrumentDetails" >
						<view class="name">仪器所在地</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;margin-left: -220upx;" mode=""></image>
						<view class="select" @click="selectAddress">
							<state  ref="stateRef" @bindPickerChange='bindPicker' :countryName='countryName'
								:provinceName='provinceName' :cityName='cityName' :areaName='areaName' :isRepair='isRepair'></state>
						</view>
						
						
					</view>
					<view class="instrumentDetails">
						<view class="name">详情地址</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;margin-left: -50upx;" mode=""></image>
						<input type="text" value="" class="model" placeholder="请填写注册地址" :class="saveRepairsDto.detailAddress!='' ? 'model1' : ''" v-model="saveRepairsDto.detailAddress"/>
						
					</view>
				</view>
			</view>
			<view class="malfunctionInformation">
				<view class="malfunctionInformations">
					<view class="title">
						故障信息
					</view>
					<view class="class">
						<view class="class_title">
							故障分类
						</view>
						<view class="class_description">
							<input type="text" value="" class="model" :class="saveRepairsDto.faultType!='' ? 'model1' : ''" placeholder="请填写故障原因" v-model="saveRepairsDto.faultType"/>
						</view>
						
					</view>
					<view class="writeWhy" :class="saveRepairsDto.faultMessage!='' ? 'model1' : ''">
						<textarea placeholder="请描述一下具体故障" maxlength="300" v-model="saveRepairsDto.faultMessage"  @input="descInput"/>
						<span class="reciprocal">{{saveRepairsDto.faultMessage.length}} / 300字</span>
					</view>
					<view class="accessory_title">
						附件上传
					</view>
					<view class="uploading_file">
						<!-- <uni-file-picker v-model='modelImgList' :image-styles="imageStyles" file-mediatype="image"
							mode="grid" :limit="4" ref="files" @select="select()" :auto-upload="false"
							@delete='delfile()'/> -->
							<uni-file-picker @select="select()" :value="fileLists" :listStyles="listStyles" file-mediatype="image" :limit="4" @delete='delfile()' :auto-upload="false">
							</uni-file-picker>
							<uni-datetime-picker
											v-model="range"
											type="daterange"
											start="2021-3-20"
											end="2021-5-20"
											rangeSeparator="至"
										/>
					</view>
					<!-- <view class="waring">
						请上传小于10MB附件
					</view> -->
				</view>
			</view>
			<view class="malfunctionInformation">
				<view class="malfunctionInformations">
					<view class="contactWay">
						联系方式
					</view>
					<view class="contactName">
						<view class="contactNames" style="width: 185upx;">
							联系人姓名
						</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;margin-left: -80upx;" mode=""></image>
						<input v-model="saveRepairsDto.contact" type="text" value=""  class="writeNamed" :class="saveRepairsDto.contact!='' ? 'writeNamed1' : ''" placeholder="请填写联系人姓名" style=""/>
					</view>
					<view class="contactName">
						<view class="contactNames" style="width: 520upx;">
							手机号
							
						</view>
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/must.png" style="width: 10upx;height: 10upx;position: absolute;left: 180upx;" mode=""></image>
						<input v-model="saveRepairsDto.mobile" type="text" value="" class="writeName" :class="saveRepairsDto.contact!='' ? 'writeName1' : ''" placeholder="请填写手机号" style=" "/>
					</view>
					<view class="contactName" style="padding-bottom: 40upx;">
						<view class="contactNames" style="width: 520upx;">
							公司名
						</view>
						<input v-model="saveRepairsDto.companyName" type="text" value="" class="writeName" :class="saveRepairsDto.contact!='' ? 'writeName1' : ''" placeholder="请填写公司名"  style=""/>
					</view>
				</view>
			</view>
			<view class="button" @click="save" :style="{ background: background }">
				确定
			</view>
		</view>
	</view>
</template>

<script>
	import {InstrumentRepair,saveRepair,repairList} from "@/api/repair.js"
	import {upload_file1} from "@/utils/utils.js"
	import state from '@/components/state.vue'
	export default {
		components: {
			state
		},
		data() {
			return {
				saveRepairsDto:{
					instrumentName:'',
					instrumentModel:'',
					provinceId:'',
					cityId:'',
					areaId:'',
					detailAddress:'',
					faultType:'',
					faultMessage:'',
					contact:'',
					mobile:'',
					companyName:'',
					fileUrlDtos:[],
				},
				fileLists: [],
				imageList:[],
				isRepair:'1',
				provinceName:'',
				cityName:'',
				areaName:'',
				arr: [],
				text: '请选择仪器名称',
				reciprocal:0,
				desc:'',
				modelImgList: [],
				instrumentRepair:{},
				imgMessage:[],
				flage:false,
				background:'',
			}
		},
		onLoad(){
			this.style = uni.getStorageSync('style')
			this.background = this.style.cartbtn
			this.getInstrumentRepair();
			this.$refs.stateRef.getCountry()
			this.$refs.stateRef.getRegion(1)
			this.$refs.stateRef.getArea(3212)
			this.$refs.stateRef.getCity(2)
			var token = uni.getStorageSync("token")
			var userName = uni.getStorageSync("userName")
			if (token && userName) {
				this.flage = true
			} else {
				this.flage = false
			}
		},
		methods: {
			// 打开地址选择窗口
			selectAddress() {
				this.$refs.stateRef.getCountry()
				this.$refs.stateRef.getRegion(1)
				this.$refs.stateRef.getArea(3212)
				this.$refs.stateRef.getCity(2)
				this.$forceUpdate()
			},
			bindPicker(address) {
				this.address = address
				// console.log(this.address,'oooooooo')
				this.countryName = address.countryName	
				this.provinceName = address.province
				this.cityName = address.city
				this.areaName = address.area
				this.saveRepairsDto.provinceId = address.provinceId
				this.saveRepairsDto.cityId = address.cityId
				this.saveRepairsDto.areaId = address.areaId
				this.saveRepairsDto
			},
			
			descInput(){			 
			 this.reciprocal = this.desc.length;
			 },
			 getInstrumentRepair(){
				 InstrumentRepair().then(res=>{
					 this.instrumentRepair = res.data
				 })
			 },
			
			 // 保存信息
			save(){
				if(this.flage){
					saveRepair(this.saveRepairsDto).then(res=>{
						if(res.code=='0'){
							var token = uni.getStorageSync('token');
							for (let i = 0; i < this.imageList.length; i++) {	
								upload_file1(token,res.data,this.imageList[i]).then(res => {
										
									this.imgMessage.push(res.data)
								})
								if( i==this.imageList.length - 1){
									// this.imageList=[]
									break
								}
								
							}
							uni.navigateTo({
								url:'/personalPage/repair/repairsDetails?id='+res.data
							})
						}else{
							toast({title:'请填写必填信息'})
						}
					})
				}else{
					uni.showModal({
						title:"提示",
						content: '未登录不能提交报修单，是否去登录？',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							}else if(res.cancel){
								
							}
							
						}
					})
				}
				 
			},
			// 图片上传
			select(e){				 
				var that = this
				// console.log(e.tempFilePaths,'==========')
				e.tempFilePaths.forEach((item) => {
					that.imageList.push(item)
				})			 
			},
			delfile(e) {	 
				this.imageList.forEach((item, index) => {
					if (item== e.tempFilePath) {
						this.imageList.splice(index, 1)		
					}
				})
			},
				
		}
	}
</script>

<style lang="less" scoped>
	.content{
		background:#F5F5F5; 
		padding-bottom: 62upx;
		.contents{
			width: 90%;
			margin: 0 auto;
			.instrumentrRepair{
				height: 349upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin-top: 21upx;
				.instrumentrRepairs{
					width: 90%;
					margin: 0 auto;
					.title{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 39upx;
					}
					.instrumentrRepairs_details{
						height: 214upx;
						background: #fff5e7;
						// opacity: 0.1;
						border-radius: 10upx;
						margin-top: 24upx;
						span{
							width: 92%;
							margin: 0 auto;
							height: 154upx;
							font-size: 26upx;
							display: inline-block;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FB9101;
							padding-top: 30upx;
							margin-left: 31upx;
							
							text:nth-child(3){
								color: #466AFC;
							}
						}
							
					}
				}
				
			}
			.instrumentInformation{
				height: 450upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin-top: 21upx;
				.instrumentInformations{
					width: 90%;
					margin: 0 auto;
					.title{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 40upx;
					}
					.instrumentDetails{
						display: flex;
						flex-wrap: nowrap;
						justify-content: space-between;
						margin-top:40upx ;
						.name{
							// display: inline-block;
							width: 159upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
						}
						.model{
							width: 250upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							
							color: #9FA0A5;
							margin-left: 200upx;
						}
						.model1{
							color: #333333;
						}
						.select{
							width: 250upx;
							image{
								position: absolute;
								top: 515upx;
								left: 650upx;
							}
							
						}
						
					}
				}
			}
			.malfunctionInformation{
				// height: 653upx;
				background: #FFFFFF;
				border-radius: 15upx;
				margin-top: 21upx;
				.malfunctionInformations{
					width: 90%;
					margin: 0 auto;
					.title{
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 40upx;
					}
					.class{
						display: flex;
						justify-content: space-between;
						margin-top: 32upx;
						.class_title{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							
						}
						.class_description{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							
							.model{
								font-size: 30upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #9FA0A5;
								width: 220upx;
							}
							.model{
								font-size: 30upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								width: 220upx;
							}
						}
						
					}
					.writeWhy{
						// height: 264upx;
						background: #F8F8F8;
						border-radius: 10upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: -100;
						color: #9FA0A5;
						margin-top: 24upx;
						padding-top: 24upx;
						padding-left: 10upx;
						position:relative;
						textarea{
							height: 264upx;
							padding-bottom:40upx;
							box-sizing: border-box;
						}
						.reciprocal{
							position: absolute;
							left: 435upx;
							top: 245upx;
						}
					}
					.model1{
						color: #333333;
					}
					.accessory_title{
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						margin-top: 29upx;
					}
					.uploading_file{
						margin-top: 25upx;
						padding-bottom: 25upx;
						display: flex;
					}
					.waring{
						margin-left: 200upx;
						margin-top: -70upx;
						padding-bottom: 52upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
					}
					.contactWay{
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
						padding-top: 41upx;
					}
					.contactName{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.contactNames{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							
						}
						.writeName{
							// padding-right: -100upx;
							// text-align: right
							// margin-right: -100upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							margin-right: -10upx;
							padding-left: 100upx;
							
						}
						.writeNamed{
							// padding-right: -100upx;
							// text-align: right
							// margin-right: -100upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							// margin-right: -10upx;
							padding-left: 100upx;
							margin-left: 20upx;
							width:270upx ;
							
						}
						.writeNamed1{
							color: #333333 ;
							padding-left: 180upx;
							 width: 200upx;
							 
					}
						.writeName1{
							color: #333333 ;
						}
						margin-top: 49upx;
					}
				}
			}
			.button{
				height: 70upx;
				// background: linear-gradient(90deg, #4C6FFF, #143DE1);
				border-radius: 35upx;
				margin-top: 59upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				text-align: center;
				line-height: 70upx;
				
			}
		
		}
		
		
	}
</style>
