<template>
	<view style="height: 100vh;overflow: hidden;">
		<view class="navBar">
			<view class="navigationHeight" :style="{'height':40+'px'}">
				<search :searchKey='searchGoodsParamBo.searchKey' @gosearch='gosearch'></search>
			</view>
		</view>
		<view class="classifyContent">
			<view class="classifyContentLeft">
				<view :class="active==index?'classifyContentTitle':'classifyContentTitleNo'" :style="{color: active==index? color : ''}"
					v-for="(item,index) in categoryData" :key='item.categoryId' @click="activeBtn(index,'b'+index)">
					{{item.name}}
				</view>
			</view>
			<scroll-view class="classifyContentRight" scroll-y="true" :scroll-into-view="toView"
				:style='"height:"+78+"vh;"' @scroll="scroll">
				<view>
					<view class="" :id="'b'+index" v-for="(item,index) in categoryData" :key='item.categoryId'>
						<view class="categoryContent" v-for="item1 in item.children" :key='item1.categoryId'>
							<view class="categoryTwo" @click="goListDetail(item1.categoryId,item1.name)">
								{{item1.name}}
							</view>
							<view class="categoryThree">
								<view class="categoryChildren" v-for="item2 in item1.children"
									@click="goListDetail(item2.categoryId,item2.name)" :key='item2.categoryId'>
									<image :src="item2.imgUrl" mode=""></image>
									<view class="categoryTitle">
										{{item2.name}}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
					
			</scroll-view>
	
		</view>
			<tab-bar :selectedIndex = "1" :index = "1"> </tab-bar>
	</view>
</template>

<script>
	import '@/static/LHT/productClass.css'
	import search from '@/components/search.vue'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import {
		
		getRouter,
		refresh
	} from '@/utils/utils.js'
	import {
		getIndexCategoryTree,
		queryGoodsListByParam
	} from '@/api/category.js'
	export default {
		components: {
			search,tabBar
		},
		data() {
			return {
				navHeight: 0,
				InfoHeight: 0,
				navBarHeights: 0,
				categoryData: [],
				active: 0,
				categoryDataList: [],
				toView: '',
				hightArr: [],
				height: 0,
				searchGoodsParamBo: {
					searchKey: 12
				},
				color:''
			}
		},
		onLoad(opt) {
			this.style = uni.getStorageSync('style')
			this.color = this.style.prodcuttext
			this.toView=opt.toView
			this.active=opt.active
			this.getDataMsg(),
			this.getCategory()	
			uni.removeStorageSync('chooseList')
		},
		
		//下拉刷新
		onPullDownRefresh(){
			refresh(this.getDataMsg)
		},
		onShow() {
			uni.hideTabBar({
						      animation: false
						     })
						     if (typeof this.getTabBar === 'function' &&
						          this.getTabBar()) {
						          this.getTabBar().setData({
						            selectedIndex: 1
						          })
						        }
		},
		methods: {	
			
			//下拉刷新获取页面信息
			getDataMsg(){	
				this.getCategory()					
				getRouter()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			gosearch() {
				uni.navigateTo({
					url: '/goodsLIst/search'
				})
			},
			infoScroll: function() {
				let that = this;
				let len = that.categoryData.length;
				// console.log(that.categoryData,'ggggg')
				this.number = that.categoryData[len - 1].children.length;
				// //设置商品列表高度
				uni.getSystemInfo({
					success: function(res) {
						that.height = (res.windowHeight) * (750 / res.windowWidth) - 98;
					},
				});
				let height = 0;
				let hightArr = [];
				for (let i = 0; i < len; i++) {
					//获取元素所在位置
					let query = uni.createSelectorQuery().in(this);
					let idView = "#b" + i;
					query.select(idView).boundingClientRect();
					query.exec(function(res) {
						let top = res[0].top;
						hightArr.push(top);
						that.hightArr = hightArr
					});
				};
			},
			getCategory() {	
				
				var that = this
				getIndexCategoryTree().then(res => {
					if (res.code == '0') {
						this.categoryData = res.data
						// console.log(res.data,'好')
						setTimeout(function() {
							that.infoScroll();
						}, 500)
					}
				})
			},
			
			//分享个人
			onShareAppMessage() {
				console.log(this.active,this.toView,'====' );
				return {
					title: '产品分类',
					path: '/pages/prodcutClass/prodcutClass?toView='+this.toView+'&active='+this.active 	
				}
			},
			//分享朋友圈
			onShareTimeline() {
				return {
					title: '产品分类',
					path: '/pages/prodcutClass/prodcutClass?active='+this.active+'&toView='+this.toView 	
				}
			},
			activeBtn(index, toView) {
				this.active = index
				console.log(index,toView)
				this.toView = toView
			},
			
			scroll: function(e) {
				let scrollTop = e.detail.scrollTop;
				let scrollArr = this.hightArr;
				for (let i = 0; i < scrollArr.length; i++) {
					if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0] - 100) {
						this.active = 0
					} else if (scrollTop >= scrollArr[i] - scrollArr[0] - 100 && scrollTop < scrollArr[i + 1] -
						scrollArr[0] - 100) {
						this.active = i
					} else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0] - 10) {
						this.active = scrollArr.length - 1
					}
				}
			},
			goListDetail(item1, item2) {

				uni.navigateTo({
					url: '/goodsLIst/goodsLIst?categoryId=' + item1 + '&name=' + item2
				})
			},
			
		}
	}
</script>
<style>
	page {
		background-color: #f6f6f6;
	}
</style>

<style lang="less" scoped>
	.navBar {
		width: 100%;
		height: 100%;
		// background-color: #FFFFFF;
		position: fixed;
		top: 0;

		.navigationHeight {
			background-color: #FFFFFF !important;
			display: flex;
			align-items: center;
			padding: 10upx 0;
		}
	}

	.classifyContent {
		width: calc(100% - 60upx);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		position: relative;
		top: 120upx;

		// padding-bottom: 150upx;
		.classifyContentLeft {
			position: absolute;
			// top: 120upx;
			width: 164upx;
			text-align: center;
			line-height: 90upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			// height: 1600upx;

			// .classifyContentTitle {
			// 	width: 100%;
			// 	height: 90upx;
			// 	background: #FFFFFF;
			// 	border-radius: 20upx 20upx 0upx 20upx;
			// 	font-size: 30upx;
			// 	font-family: PingFang SC;
			// 	font-weight: Bold;
			// 	color: #0D986A;
			// 	margin-bottom: 14upx;
			// }

			.classifyContentTitleNo {
				height: 90upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: Medium;
				color: #202021;
				margin-bottom: 9upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			}
		}

		.classifyContentRight {
			position: absolute;
			left: 180upx;
			width: 516upx;
			padding: 0 0 40upx 0;
			// height: 500upx;
			background: #FFFFFF;
			margin-bottom: 40upx;
			border-radius: 20upx 20upx 20upx 20upx;
			
			.categoryContent {
				width: calc(100% - 60upx);
				margin: 0 auto;
			}

			.categoryTwo {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #202021;
				padding-top: 39upx;
			}

			.categoryThree {
				display: flex;
				flex-wrap: wrap;
				text-align: center;
				align-items: center;
				margin-top: 30upx;
				.categoryChildren{
					margin-top: 25upx;
				}

				.categoryChildren:nth-child(3n-1){
					margin: 25upx 27upx 0;
				}

				image {
					width: 134upx;
					height: 134upx;
					overflow: hidden;
					border-radius: 8upx;
				}

				.categoryTitle {
					width: 124upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
					font-size: 24upx;
					font-family: PingFang SC;
					color: #202021;
				}
			}
		}
	}
</style>
