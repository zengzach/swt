<template>
	<view style="width: 100%;">
		<view class="tabbar">
			<view class="navigator">
				<view class="navigator_item" v-for="(item,index) in selectList" :key="item.actionType"
					@click="switchTab(item,index)">
					<!-- <img :src="item.fileList == null ? item.selectedIconPath:item.fileList[0].url" class="icon" v-if="selectedIndex == index"> -->
					<!-- <img :src="item.fileList == null ? item.iconPath:item.fileList[1].url" class="icon" v-if="selectedIndex !== index"> -->
					<img :src="selectedIndex == index ? item.selectedIconPath:item.iconPath" class="icon">
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getAppIcon,
	} from '@/api/commonApi.js'
	export default {
		// props:{
		// 	selectedIndex:{
		// 		type:Number,
		// 		// default:""
		// 	},
		// 	index:{
		// 		type:Number,
		// 		// default:""
		// 	}
		// },
		data() {
			return {
				selectedIndex: uni.getStorageSync('selectedIndex') ? uni.getStorageSync('selectedIndex') : 0,
				selectList: [],
				showselected: false,
				list: [{
						actionType: 10,
						pagePath: "/pages/index/index",
						// iconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/unindex2x.png",//灰色
						// selectedIconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/index2x.png",//黑色
						iconPath: "",
						selectedIconPath: "",
						text: "首页"
					},
					{
						actionType: 15,
						pagePath: "/pages/prodcutClass/prodcutClass",
						// iconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/unproduct2x.png",
						// selectedIconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/product2x.png",
						iconPath: "",
						selectedIconPath: "",
						text: "产品分类"
					},
					{
						actionType: 20,
						pagePath: "/pages/cart/cart",
						// iconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/uncart2x.png",
						// selectedIconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/cart2x.png",
						iconPath: "",
						selectedIconPath: "",
						text: "购物车"
					},
					{
						actionType: 45,
						pagePath: "/pages/integral/integral",
						// iconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/unintegerMall.png",
						// selectedIconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/integerMall.png",
						iconPath: "",
						selectedIconPath: "",
						text: "积分商城"
					},
					{
						actionType: 25,
						pagePath: "/pages/personal/personal",
						// iconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/unpersonal.png",
						// selectedIconPath: "https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/personal2x.png",
						iconPath: "",
						selectedIconPath: "",
						text: "个人中心"
					},
				],
			}
		},
		created() {
			this.getAppIconList()
		},
		methods: {
			getAppIconList() {
				var _this = this
				this.selectList=[]
				getAppIcon().then(res => {
					if (res.success) {
						res.data.forEach((resItem,resIndex) => {
							this.list.forEach((listItem,listIndex) => {
								if (listItem.actionType == resItem.actionType) {
									listItem.selectedIconPath = resItem.fileList[0]?resItem.fileList[0].url:''
									listItem.iconPath = resItem.fileList[1]?resItem.fileList[1].url:''
									this.selectList.push({
										actionType: listItem.actionType,
										pagePath: listItem.pagePath,
										text: listItem.text,
										iconPath: listItem.iconPath,
										selectedIconPath: listItem.selectedIconPath,
									})
								}
							})
						})
						if(this.selectList.length>4){
							let temp = this.selectList[3];
							this.selectList[3] = this.selectList[4];
							this.selectList[4] = temp;
						}
						console.log(this.selectList,"selectList===================")
					}
				})
			},
			switchTab(item, index) {
				// console.log(this.selectedIndex,"------------",index)
				uni.setStorageSync('selectedIndex', index);
				uni.switchTab({
					url: item.pagePath
				})
			},

		}

	}
</script>

<style scoped lang="scss">
	.tabbar {
		width: 100%;
		height: 115upx;
		background: #fff;
		border-top: 2upx solid #eee;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;

		.navigator {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.navigator_item {
				width: calc(100%/6);
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				flex-direction: column;

				.icon {
					width: 100upx;
					height: 100upx;
					// margin: 0 40upx;
				}
			}
		}
	}





	.item-text {
		color: #777E86;
		font-size: 24upx;
		text-align: center;
	}

	.text-active {
		color: #2E92FD !important;
	}
</style>