<template>
	<view class="content">
		<view class="contents">
			<view class="head">
				<image class="back" @click="back"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/home.png" />
				<view class="pai">
					我的报修
				</view>
			</view>
			<view class="top">
				<view class="search">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png" mode="" @click="getRepairList1"></image>
					<input type="text" placeholder="请输入工单编号" v-model="iptValue"/>
				</view>
				<view class="orderType">
						<view v-for="item in RepairListTypeList" @click="getRepairList(item.code)" :class="item.code==code ? 'orderTypeName1' : 'orderTypeName'"
						>{{item.description}}</view>
				</view>
				
			</view>
			<view class="item" v-for="item in repairListMessage" :key=item.id @click="goRepairsDetails(item.id)">
				<view class="items" >
					<view class="items_top">
						<view class="workOrder_number">
							工单编号：{{item.repairsCode}}
						</view>
						<view class="manage" :class="item.statusName=='待处理' ? 'manage1' : ''">
							{{item.statusName}}
						</view>
					</view>
					<view class="items_content">
						<view class="items_content_title">
							{{item.instrumentName}}
						</view>
						<view class="items_content_des">
							<span>仪器型号：</span>
							<span>{{item.instrumentModel}}</span>
							<span v-if='item.faultType!=""'>（{{item.faultType}}）</span>
						</view>
						<view class="items_content_des">
							<span>联系人：</span>
							<span>{{item.contact}}</span>
						</view>
						<view class="items_content_des" style="padding-bottom:40upx ;">
							<span>仪器地址：</span>
							<span>{{item.detailAddress}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {repairList,RepairListType} from "@/api/repair.js"
	export default {
		data() {
			return {
				repairListMessage:'',
				repairListMessage1:'',
				pagesize: 20,
				pageNum: 1,
				iptValue:'',
				RepairListTypeList:[],
				code:null,
				ID:''
			}
		},
		onLoad() {
			this.getRepairList();
			this.getRepairListType()
		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/personal/personal'
				})
			},
			// 获取保修单类型
			getRepairListType(){
				RepairListType().then(res=>{
					this.RepairListTypeList = res.data
				})
			},
			// 报修单列表
			getRepairList(code){
				this.code=code
				var paramDto  = {
					pageSize: 20,
					pageNum: 1,
					repairsCode:this.iptValue,
					status:code
				}
				repairList(paramDto).then(res=>{
					this.repairListMessage = res.data.list
					
					
				})
			},
			getRepairList1(code){
				
				var paramDto  = {
					pageSize: 20,
					pageNum: 1,
					repairsCode:this.iptValue,
					
				}
				repairList(paramDto).then(res=>{
					this.repairListMessage = res.data.list
					
					
				})
			},
			// 根据报修单号查询
			toSearch(){
				
			},
			// 去报修详情单
			goRepairsDetails(id){
				this.ID = id
				uni.navigateTo({
					url: '/personalPage/repair/repairsDetails?id=' + this.ID
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
							background-size: 750upx 574upx;
							position: relative;
							background-color: #FFFFFF;
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
				background: #FFFFFF;
				padding-top: 50upx;
				.search{
					width: 90%;
					display: flex;
					height: 62upx;
					background: #FFFFFF;
					border: 1upx solid #CFCFCF;
					border-radius: 30upx;
					margin: 0 auto;
					input{
						margin: auto 0;
						margin-left:21upx ;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #8D8D8D;
					}
					image{
						width: 30upx;
						height: 30upx;
						margin: auto 0;
						margin-left: 41upx;
					}
				}
				.orderType {
					width:692upx;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 49upx;
					margin-bottom: 44upx;
					font-weight: bold;
					// margin-left:20px;
					
				
						.orderTypeName {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #212121;
							padding-bottom: 10upx;
						}
						.orderTypeName1{
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #153EE2;
							padding-bottom: 10upx;
							border-bottom: 3upx solid #153EE2;
						}
						
					
				}
			}
			.item{
				width: 90%;
				// height: 334upx;
				margin: auto;
				background: #FFFFFF;
				border-radius: 15upx;
				margin: 0 auto;
				margin-top: 20upx;				
				.items{
					width: 90%;
					margin: 0 auto;
					.items_top{
						display: flex;
						justify-content: space-between;
						border-bottom: 1upx solid #EAEAEA;
						padding-top: 39upx;
						padding-bottom: 16upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #666666;
						.workOrder_number{
							
						}
						.manage{
							color: #333;
							
						}
						.manage1{
							color: #E1251B;
						}
						
					}
					.items_content{
						.items_content_title{
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #212121;
							margin-top: 30upx;
						}
						.items_content_des{
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #666666;
							margin-top: 29upx;
						}
					}
				}
			}
		}
	}
</style>
