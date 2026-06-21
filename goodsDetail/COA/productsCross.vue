<template>
	<view class="productsCross">
		<view class="product_hrader">
			<view class="product_search">
				<input type="text" v-model="searchVal" placeholder="请输入想要查询的关键词,如赛普"
					confirm-type="search" bindconfirm="startSearch" @blur="search"
					placeholder-style="font-size:24upx;">
				<image @click="search"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/products_cross_search.png"
					mode=""></image>
			</view>
			<view class="categoryList">
				<view class="categoryItem" @click="openbrandPopup()">
					<view>{{brandTitle}}</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png" mode=""></image>
				</view>
				<view class="categoryItem" @click="openCategoryPopup()">
					<view>{{categoryTitle}}</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png" mode=""></image>
				</view>
				<view class="categoryItem" @click="openNumPopup()">
					<view>{{modelNumTitle}}</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/buy_jl.png" mode=""></image>
				</view>
			</view>
		</view>
		<uni-popup class="categoryPopup" ref="brandPopup">
			<view class="categoryPopupContent">
				<view class="categoryPopup_title">品牌</view>
				<scroll-view scroll-y class="categoryPopupList" style="height: 414upx;">
				   <view class="categoryPopupList_item" v-for="(item, index) in brandData" :key="item.id"
						@click="selectBrand(item)" :style="item.id == selectBrandId ? 'color:#E93323' : ''">
						{{item.name}}
				   </view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup class="categoryPopup" ref="categoryPopup">
			<view class="categoryPopupContent">
				<view class="categoryPopup_title">产品系列</view>
				<scroll-view scroll-y class="categoryPopupList" style="height: 414upx;">
				   <view class="categoryPopupList_item" v-for="(item, index) in categoryData" :key="item.id"
				   	@click="selectCategory(item)" :style="item.id == selectCategoryId ? 'color:#E93323' : ''">
						{{item.name}}
				   </view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup class="categoryPopup" ref="modelNumPopup">
			<view class="categoryPopupContent">
				<view class="categoryPopup_title">型号</view>
				<scroll-view scroll-y class="categoryPopupList" style="height: 414upx;">
				   <view class="categoryPopupList_item" v-for="(item, index) in modelNumData" :key="item.id"
						@click="selectModelNum(item)" :style="item.name == selectModelNumName ? 'color:#E93323' : ''">
						{{item.name}}
				   </view>
				</scroll-view>
			</view>
		</uni-popup>
		<view class="productList" v-if="goodsList.length>0">
			<view class="productItem" v-for="(item,index) in goodsList" :key="index">
				<view class="item_left">
					<view v-if="!item.isSelect" class="circle" @click="checkboxChange(item)"></view>
					<icon v-if="item.isSelect" type="success" @click="checkboxChange(item)" size="16" color="#EB0A00" />
				</view>
				<view class="item_right" @click="toDetail(item)">
					<view class="item_right_top">
						<view class="product_left">
							<image class="product_img"
								:src="item.imageUrl?item.imageUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"
								mode=""></image>
						</view>
						<view class="product_right">
							<view class="product_title">{{item.goodsTitle}}</view>
							<view class="product_unit">
								<view class="product_unit_one">货号：{{item.artNo}}</view>
								<view class="product_unit_two">包装规格：{{item.packDesc?item.packDesc:'暂无包装规格'}}</view>
							</view>
						</view>
					</view>
					<view class="item_right_bottom">
						<view class="product_info">
							<view class="info_left">
								<image class="info_left_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_brand.png"
									mode=""></image>
								<view class="info_left_title">品牌：</view>
							</view>
							<view class="info_right"> {{item.exBrandName?item.exBrandName:'暂无品牌'}} </view>
						</view>
						<view class="product_info">
							<view class="info_left">
								<image class="info_left_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_sku.png"
									mode=""></image>
								<view class="info_left_title">Sku：</view>
							</view>
							<view class="info_right"> {{item.sku?item.sku:'暂无sku'}} </view>
						</view>
						<view class="product_info">
							<view class="info_left">
								<image class="info_left_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_product.png"
									mode=""></image>
								<view class="info_left_title">产品系列：</view>
							</view>
							<view class="info_right"> {{item.exCategoryName?item.exCategoryName:'暂无产品系列'}} </view>
						</view>
						<view class="product_info">
							<view class="info_left">
								<image class="info_left_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_num.png"
									mode=""></image>
								<view class="info_left_title">型号：</view>
							</view>
							<view class="info_right"> {{item.modelNum?item.modelNum:'暂无型号'}} </view>
						</view>
						<view class="product_info" style="border: none;">
							<view class="info_left">
								<image class="info_left_icon"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_xinxi.png"
									mode=""></image>
								<view class="info_left_title">相关信息：</view>
							</view>
							<view class="info_right"> {{item.description?item.description:'暂无相关信息'}} </view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="noGoods" v-else>
			<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/nogoods.png" mode=""></image>
			<view class="noState"> 暂无数据 </view>
		</view>
		<view class="footer" v-if="goodsList.length>0">
			<view class="footer_left">
				<view v-if="!isSelectAll" @click="selectAll()" class="left_circle">
					<view class="circle"></view>
					<view class="text">全选</view>
				</view>
				<view v-if="isSelectAll" @click="selectAll()" class="left_circle">
					<icon type="success" size="16" color="#EB0A00" />
					<view class="text">全选</view>
				</view>
			</view>
			<view class="footer_right" @click="toInquiry">一键询价</view>
		</view>
	</view>
</template>

<script>
	import { toast,getUrl } from '@/utils/utils.js'
	import { externalBrand, externalCategory, externalModelNum, externalGoods } from '@/api/coa.js'
	export default {
		data() {
			return {
				searchVal: '',

				brandData: [],
				brandTitle: '品牌',
				selectBrandId: '',

				categoryData: [],
				categoryTitle: '产品系列',
				selectCategoryId: '',

				modelNumData: [],
				modelNumTitle: '型号',
				selectModelNumName: '',

				selectGoodsList: [], //已选择的商品
				isSelectAll: false, //全选
				goodsList: [],
				pageNum:1,
				hasNextPage:false,
			};
		},
		onLoad() {
			// getUrl()
			this.getExternalBrand()
			this.getGoodsList()
		},
		onReachBottom: function() {
			if (this.hasNextPage) {
				this.pageNum++
				this.getGoodsList()
			}
		},
		methods: {
			openbrandPopup() {
				this.$refs.modelNumPopup.close()
				this.$refs.categoryPopup.close()
				this.$refs.brandPopup.open('top')
			},
			// 获取外部品牌数据
			getExternalBrand() {
				externalBrand().then(res => {
					if (res.success) {
						this.brandData = res.data
					}
				})
			},
			// 选择品牌
			selectBrand(item) {
				console.log(this.selectBrandId,"--------------",item.id)
				if(this.selectBrandId==item.id){//再次选择了
					this.brandTitle = '品牌'
					this.selectBrandId = ''
				}else{
					this.brandTitle = item.name
					this.selectBrandId = item.id
					this.getGoodsCategory()
				}
				this.categoryData = []
				this.categoryTitle = '产品系列'
				this.selectCategoryId = ''

				this.modelNumData = []
				this.modelNumTitle = '型号'
				this.selectModelNumName = ''

				// console.log(this.selectList, "--------------选择品牌")
				this.$refs.brandPopup.close()
				this.pageNum=1
				this.goodsList=[]
				this.getGoodsList()
			},
			openCategoryPopup() {
				this.$refs.brandPopup.close()
				this.$refs.modelNumPopup.close()
				this.$refs.categoryPopup.open('top')
			},
			// 获取外部产品系列数据
			getGoodsCategory() {
				externalCategory({
					externalBrandId: this.selectBrandId
				}).then(res => {
					if (res.success) {
						this.categoryData = res.data
					}
				})
			},
			// 选择系列
			selectCategory(item) {
				console.log(this.selectCategoryId,"--------------",item.id)
				if(this.selectCategoryId==item.id){//再次选择了
					this.categoryTitle = '产品系列'
					this.selectCategoryId = ''
				}else{
					this.categoryTitle = item.name
					this.selectCategoryId = item.id
					this.getGoodsModelNum()
				}
				
				this.modelNumData = []
				this.modelNumTitle = '型号'
				this.selectModelNumName = ''

				// console.log(this.selectList, "--------------选择系列")
				this.$refs.categoryPopup.close()
				this.pageNum=1
				this.goodsList=[]
				this.getGoodsList()
			},
			openNumPopup() {
				this.$refs.brandPopup.close()
				this.$refs.categoryPopup.close()
				this.$refs.modelNumPopup.open('top')
			},
			// 获取外部产品型号数据
			getGoodsModelNum() {
				externalModelNum({
					externalBrandId: this.selectBrandId,
					externalCategoryId: this.selectCategoryId
				}).then(res => {
					if (res.success) {
						res.data.forEach((item, index) => {
							this.modelNumData.push({
								id: index + 1,
								name: item
							})
						})
					}
				})
			},
			// 选择型号
			selectModelNum(item) {
				console.log(this.selectModelNumName,"--------------",item.id)
				if(this.selectModelNumName==item.id){//再次选择了
					this.modelNumTitle = '型号'
					this.selectModelNumName = ''
				}else{
					this.modelNumTitle = item.name
					this.selectModelNumName = item.name
				}
				
				// console.log(this.selectList, "--------------选择型号")
				this.$refs.modelNumPopup.close()
				this.pageNum=1
				this.goodsList=[]
				this.getGoodsList()
			},
			// 获取产品对照信息
			getGoodsList() {
				var data = {
					externalBrandId: this.selectBrandId,
					externalCategoryId: this.selectCategoryId,
					modelNum: this.selectModelNumName,
					searchKey: this.searchVal
				}
				externalGoods(this.pageNum,data).then(res => {
					if (res.success) {
						if (res.data.list) {
							res.data.list.forEach(item => {
								item.isSelect = false
								this.goodsList.push(item)
							})
						}
						this.hasNextPage = res.data.hasNextPage
						// this.goodsList = res.data
						console.log(this.goodsList,"-----------",this.goodsList.length)
					}
				})
			},
			toDetail(item) {
				uni.navigateTo({
					url: '/goodsDetail/goodsDetail?goodsId=' + item.goodsId + "&type=3"
				})
			},
			search() {
				// if (this.searchVal) {
					this.pageNum=1
					this.goodsList=[]
					this.getGoodsList()
				// } else {
				// 	toast({
				// 		title: '请输入您要搜索的内容'
				// 	})
				// }
			},
			// 单选
			checkboxChange(item) {
				this.selectGoodsList = []
				if (item.isSelect == false) {
					item.isSelect = true
					this.goodsList.forEach(items => {
						if (items.isSelect == true) {
							this.selectGoodsList.push(items)
						}
					})
				} else {
					item.isSelect = false
					this.goodsList.forEach(items => {
						if (items.isSelect == true) {
							this.selectGoodsList.push(items)
						}
					})
				}
				if (this.selectGoodsList.length == this.goodsList.length) {
					this.isSelectAll = true
				} else {
					this.isSelectAll = false
				}
				// console.log(item.isSelect,"====")
				// console.log(this.selectGoodsList.length,"========",this.goodsList.length)
				// console.log(this.selectGoodsList,"-----------单选")

			},
			// 多选
			selectAll(e) {
				if (this.isSelectAll) {
					// console.log("----",this.isSelectAll)
					this.goodsList.forEach(item => {
						item.isSelect = false
					})
					this.isSelectAll = false
					this.selectGoodsList = []
				} else {
					// console.log("====",this.isSelectAll)
					this.goodsList.forEach(item => {
						item.isSelect = true
					})
					this.isSelectAll = true
					this.selectGoodsList = this.goodsList
				}
				// console.log(this.selectGoodsList,"-----------全选")
			},
			// 一键询价
			toInquiry() {
				if (this.selectGoodsList.length <= 0) {
					toast({
						title: '请选择需要询价的商品'
					})
					return false
				}
				var goodsIds = []
				this.selectGoodsList.forEach(item=>{
					goodsIds.push(item.goodsId)
				})
				uni.navigateTo({
					url:"/goodsDetail/inquiryPage/inquiry?goodsIdList="+JSON.stringify(goodsIds)+'&productsCross=true'
				})
			},


		}
	}
</script>
<style scoped lang="less">
	.productsCross {
		width: 750upx;
		overflow: hidden;
		background: #F6F6F6;

		.product_hrader {
			width: 100%;
			height: 172upx;
			background: #fff;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999 !important;

			.product_search {
				width: 690upx;
				padding: 30upx 30upx 0;
				position: relative;

				input {
					width: 620rpx;
					height: 60rpx;
					background: #F8F8F8;
					border-radius: 10rpx;
					padding-left: 70upx;
					font-size: 24upx;
				}

				image {
					width: 30upx;
					height: 30upx;
					position: absolute;
					left: 50upx;
					top: 45upx;
				}
			}

			.categoryList {
				width: 690upx;
				margin: 20upx auto 0;
				overflow-x:auto;
				display: flex;
				justify-content: flex-start;
				
				.categoryItem {
					width: 160upx;
					height: 40rpx;
					display: flex;
					justify-content: space-between;
					padding: 4upx 18upx;
					background: #F5F5F5;
					// background: #b6f5ba;
					border-radius: 10rpx;
					margin-right: 20upx;
					view{
						width: 130upx;
						height: 40rpx;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						// color: #EB0A00;
						color: #333;
						line-height: 40rpx;
						overflow: hidden;//（文字长度超出限定宽度，则隐藏超出的内容）
						white-space: nowrap;//（设置文字在一行显示，不能换行）
						text-overflow: ellipsis;//（规定当文本溢出时，显示省略符号来代表被修剪的文本）
					}
				
					image {
						width: 22upx;
						height: 22upx;
						margin-top: 10upx;
					}
				}
				
			}

		}

		.categoryPopup {
			.categoryPopupContent {
				height: 486upx;
				overflow-y: auto;
				padding: 20upx 30upx;
				background: #fff;
				margin-top: 172upx;

				.categoryPopup_title {
					border-left: 10upx solid #EB0A00;
					text-indent: 20upx;
					font-weight: bold;
					font-size: 24upx;
				}

				.categoryPopupList {
					width: 690upx;
					height: 414upx;
					overflow: auto;
					margin-top: 20upx;

					.categoryPopupList_item {
						width: 690upx;
						height: 50upx;
						font-size: 22upx;
						line-height: 50upx;
						text-indent: 30upx;
					}
				}
			}
		}

		.productList {
			width: 750upx;
			margin: 190upx auto 110upx;

			.productItem {
				width: 700upx;
				padding: 30upx 25upx;
				background-color: #FFF;
				display: flex;
				justify-content: space-between;
				margin-bottom: 20upx;

				.item_left {
					width: 35upx;

					.circle {
						width: 30rpx;
						height: 30rpx;
						border: 1px solid #999999;
						border-radius: 50%;
					}
				}

				.item_right {
					width: 645upx;

					.item_right_top {
						width: 645upx;
						display: flex;
						justify-content: space-between;

						.product_left {
							width: 200rpx;
							height: 200rpx;

							.product_img {
								width: 200rpx;
								height: 200rpx;
							}
						}

						.product_right {
							width: 430rpx;

							.product_title {
								font-size: 28rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								line-height: 35rpx;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								overflow: hidden;
							}

							.product_unit {
								margin-top: 68upx;

								.product_unit_one {
									font-size: 24rpx;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #999999;
									line-height: 35rpx;
								}

								.product_unit_two {
									font-size: 24rpx;
									font-family: Microsoft YaHei;
									font-weight: 400;
									color: #999999;
									line-height: 35rpx;
								}
							}
						}
					}

					.item_right_bottom {
						width: 602rpx;
						background: #F8F8F8;
						border-radius: 10rpx;
						padding: 20upx 24upx;
						margin-top: 20upx;

						.product_info {
							width: 100%;
							padding: 10upx 0;
							display: flex;
							justify-content: flex-start;
							border-bottom: 1px solid #E5E5E5;

							.info_left {
								width: 166upx;
								display: flex;

								.info_left_icon {
									width: 30upx;
									height: 30upx;
								}

								.info_left_title {
									font-size: 22rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #333333;
									margin-left: 20upx;
								}
							}

							.info_right {
								width: 430upx;
								font-size: 20rpx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #999999;
								// line-height: 56rpx;
							}
						}
					}
				}
			}
		}

		.noGoods {
			width: 750upx;
			text-align: center;
			image {
				width: 84upx;
				height: 84upx;
				margin-top: 300upx;
			}
		
			.noState {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin: 0 auto;
				margin-top: 40upx;
				padding-bottom: 50upx;
			}
		}
		
		.footer {
			width: 690upx;
			height: 98upx;
			padding: 0 30upx;
			background: #FFFFFF;
			box-shadow: 0rpx 1rpx 0rpx 0rpx #EEEEEE;
			position: fixed;
			left: 0%;
			bottom: 0;
			display: flex;
			justify-content: space-between;

			.footer_left {
				margin-top: 30upx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;

				.left_circle {
					width: 100upx;
					display: flex;

					.circle {
						width: 28rpx;
						height: 28rpx;
						border: 1px solid #999999;
						border-radius: 50%;
					}

					.text {
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						margin-left: 14upx;
						line-height: 30upx;
					}
				}

			}

			.footer_right {
				width: 240rpx;
				height: 54rpx;
				margin-top: 22upx;
				background: #EB0A00;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
				line-height: 54rpx;
			}
		}

	}
</style>