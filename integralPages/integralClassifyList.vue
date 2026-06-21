<template>
	<view class="integralBox">
		<view class="integral_herderBox">
			<view class="integral_herder">
				<view class="integral_back">
					<image class="back" @click="back"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/back_black.png" />
				</view>
				<view class="integral_Input">
					<input @confirm="canBuyFlag?search(true):search(false)" type="text" v-model="searchKey" placeholder="请输入兑换礼品名称" confirm-type="search"/>
					<image @click="canBuyFlag?search(true):search(false)" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/serach.png"
						mode=""></image>
				</view>
			</view>
			<view class="integral_Btn">
				<view class="integral_flex">
					<view v-if="canBuyFlag==false" class="integral_CanBuy" @click="canbuy">
						只显示我能购买
					</view>
					<view v-if="canBuyFlag==true" class="integral_CanBuy_click" @click="canbuy_no">
						只显示我能购买
					</view>
					<view class="integral_Brand" v-show="flag">
						<view class="brand1">{{brand}}</view>
						<view class="brand2" @click="close">×</view>
					</view>
				</view>
				<view class="integral_moneys">
					<span>当前积分：</span>
					<span style='color: #FB681A;' v-if='loginflag'> {{userinfo.integral}}</span>
					<span style='color: #FB681A;' v-else @click='logoin'>登录查看积分</span>
				</view>
			</view>
		</view>


		<view class="integralList">
			<view class="integralListText" style="width: 188upx;">
				<view class="integralListName"
					@click="canBuyFlag?all(true):all(false)"
					:class="{ active: categoryId == currentId }">
					全部分类
				</view>
				<view class="integralListName" v-for="item in goodslist" :key="item.categoryId"
					@click="canBuyFlag?changelist(item,true):changelist(item,false)"
					:class="{ active: item.categoryId == currentId }">
					{{item.name}}
				</view>
			</view>
			<view class="integralListImg" style="width: 562upx;">
				<view class="integraLsales" style="margin-bottom: 30upx;">
					<view class="title" style="">
						{{title==""?"全部分类":title}}
					</view>
					<view class="sort">
						<view class="price" v-if="clickflag" @click="price">
							兑换价
						</view>
						<view class="price2" v-else @click="price">
							兑换价
						</view>
						<view class="vertical" style="">
							<image v-if="topflag" style="width:26upx;height: 26upx;"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/up.png"
								mode=""></image>
							<image v-else style="width:26upx;height: 26upx;"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/red_up.png"
								mode=""></image>
							<image v-if="downflag" style="width:26upx;height: 26upx;"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/down.png"
								mode=""></image>
							<image v-else style="width:26upx;height: 26upx;"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/integral/red_down.png"
								mode=""></image>
						</view>
					</view>
				</view>
				<view class="integralListImgBack" v-for="items in list" :key="items.integralBaseId">
					<!--  -->
					<image v-if="items.pictureUrl==null" @click="toDetail(items.integralBaseId)"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg" mode="" >
					</image>
					<image v-else :src="items.pictureUrl" @click="toDetail(items.integralBaseId)" mode="">
					</image>
					<view class="integralListTitle">
						<view class="integralListTitles" @click="toDetail(items.integralBaseId)">
							{{items.goodsTitle}}
						</view>
						<view class="integralConversion">
							<view class="integralConversionsFlex">
								<view class="integralConversions">
									积分：<span>{{items.integralPrice}}</span>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-show="isLoadMore">
					<uni-load-more :status="loadStatus"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {ingergalCategoryTree,ingergalCategoryTreeGoodsList} from '@/api/integral/integralClassifyListApi.js'
	import { toast, getUrl, getRouter } from '@/utils/utils.js'
	export default {
		data() {
			return {
				topflag: true,
				downflag: true,
				number: 3,
				clickflag:true,
				goodslist: [],
				list: [],
				selectItem:null,
				currentId: '',
				userinfo: {}, //个人信息
				title: '',
				accountId: 0,
				flag: false,
				categoryId: 307,
				canBuyFlag: false,
				totalNum: '',
				pagesize: 20,
				isLoadMore: false,
				pageNum: 1,
				loadStatus: 'loading',
				brand: '',
				brandId: [],
				loginflag: false,
				searchKey:'',
				integralSort:0
			}
		},
		onLoad(option) {
			if(option.brandName){
				this.flag=true
			}
			this.brand = option.brandName
			this.brandId.push(option.brandId)
			this.title = option.title
			this.currentId = option.categoryId
			this.getIngergalCategoryTree()//分类
			this.getFirstCategoryList(false)//首次调用 获取商品
			getUrl()
			getRouter()
		},
		onShow() {
			var token = uni.getStorageSync('token')
			if(token){
				this.loginflag = true
				this.getAccountInfo()
			}else{
				this.loginflag = false
			}
		},
		// 上拉触底
		onReachBottom() {
			var that = this
			if (that.totalNum > that.pagesize) {
				if (!this.isLoadMore) { 
					this.isLoadMore = true
					that.pageNum++
					uni.showLoading({
						title: '加载中'
					})
					if(that.currentId=='307'){
						var data={
							canBuy:that.canBuyFlag,
							categoryId: null,
							integralSort: this.integralSort
						}
					}else{
						var data={
							canBuy:that.canBuyFlag,
							categoryId: that.currentId,
							integralSort: this.integralSort
						}
					}
					
					ingergalCategoryTreeGoodsList(that.pageNum,data).then(res => {
						uni.hideLoading()
						if (res.data.list.length>0) {
							that.list = that.list.concat(res.data.list);
							if (res.data.hasNextPage==false) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
								that.isLoadMore = true
								that.loadStatus = 'nomore'
							} else {
								that.isLoadMore = false
							}
						} else {
							that.isLoadMore = true
							that.loadStatus = 'nomore'
						}
					}).catch(err => {});
				}
			}
		},
		methods: {
			// 获取账号信息
			getAccountInfo(){
				getLoginAccount().then(res=>{
					if(res.success){
						this.userinfo=res.data
					}
				})
			},
			getIngergalCategoryTree(){
				ingergalCategoryTree().then(res=>{
					this.goodslist=res.data
				})
			},
			// 首次获取列表
			getFirstCategoryList(canBuy) {
				if(this.flag){//品牌跳转
					if(this.currentId=='307'){
						var data={
							canBuy:canBuy,
							categoryId: null,
							filterBrandIds: this.brandId //品牌id
						}
					}else{
						var data={
							canBuy:canBuy,
							categoryId: this.currentId,
							filterBrandIds: this.brandId //品牌id
						}
					}
					
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}else{
					if(this.currentId=='307'){
						var data={
							canBuy:canBuy,
							categoryId: null,
						}
					}else{
						var data={
							canBuy:canBuy,
							categoryId: this.currentId,
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}
				
			},
			// 搜索&&回车搜索
			search(canBuy){
				this.pageNum = 1
				if(this.brand){
					if(this.currentId=='307'){
						var data={
							categoryId: null,
							searchKey:this.searchKey,
							filterBrandIds: this.brandId, //品牌id
							canBuy:canBuy
						}
					}else{
						var data={
							categoryId: this.currentId,
							searchKey:this.searchKey,
							filterBrandIds: this.brandId, //品牌id
							canBuy:canBuy
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
						if(res.data.list.length<=0){
							toast({
								title:"没有找到你想要的商品"
							})
						}
					});
				}else{
					if(this.currentId=='307'){
						var data={
							categoryId: null,
							searchKey:this.searchKey,
							canBuy:canBuy
						}
					}else{
						var data={
							categoryId: this.currentId,
							searchKey:this.searchKey,
							canBuy:canBuy
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
						if(res.data.list.length<=0){
							toast({
								title:"没有找到你想要的商品哦！"
							})
						}
					});
				}
				
			},
			//取消品牌
			close() {
				this.flag = false;
				this.currentId = this.categoryId
				this.changelist(this.currentId, this.canBuyFlag)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			canbuy() {
				if(this.loginflag){
					this.canBuyFlag = true;
					if(this.currentId == '307'){
						this.all(true)
					}else{
						// this.changelist(this.selectItem, true)
						if(this.flag){
							var data={
								categoryId: this.currentId,
								canBuy:true,
								filterBrandIds: this.brandId //品牌id
							}
						}else{
							var data={
								categoryId: this.currentId,
								canBuy:true
							}
						}
						
						ingergalCategoryTreeGoodsList(this.pageNum, data).then(res => {
							this.list = res.data.list
							this.pageNum = res.data.pageNum
							this.totalNum = res.data.total
						});
					}
				}else{
					uni.showModal({
						title: '提示',
						content: '是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
					
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				
			},
			canbuy_no() {
				if(this.loginflag){
					this.canBuyFlag = false;
					if(this.currentId == '307'){
						this.all(false)
					}else{
						// this.changelist(this.selectItem, false)
						if(this.flag){
							var data={
								categoryId: this.currentId,
								canBuy:false,
								filterBrandIds: this.brandId //品牌id
							}
						}else{
							var data={
								categoryId: this.currentId,
								canBuy:false
							}
						}
						
						ingergalCategoryTreeGoodsList(this.pageNum, data).then(res => {
							this.list = res.data.list
							this.pageNum = res.data.pageNum
							this.totalNum = res.data.total
						});
					}
				}else{
					uni.showModal({
						title: '提示',
						content: '是否去登陆？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
					
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
				
			},
			//点击商品列表 "全部分类" 获取商品
			all(canBuy) {
				this.pageNum = 1
				if (this.flag) {
					this.currentId = this.categoryId;
					this.title = "全部分类";
					ingergalCategoryTreeGoodsList(this.pageNum,{ categoryId: null, filterBrandIds: this.brandId, canBuy:this.canBuyFlag,searchKey:this.searchKey, }).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				} else {
					this.currentId = this.categoryId;
					this.title = "全部分类";
					ingergalCategoryTreeGoodsList(this.pageNum,{ categoryId: null, canBuy:this.canBuyFlag,searchKey:this.searchKey, }).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}
			},
			
			//点击 商品列表 获取商品
			changelist(item, canBuy) {
				this.pageNum = 1
				this.selectItem = item
				if (this.flag) {//品牌
					this.currentId = item.categoryId;
					this.title = item.name;
					if(this.searchKey){
						var data={
							searchKey:this.searchKey,
							categoryId: this.currentId,
							canBuy:canBuy,
							filterBrandIds: this.brandId //品牌id
						}
					}else{
						var data={
							categoryId: this.currentId,
							canBuy:canBuy,
							filterBrandIds: this.brandId //品牌id
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum, data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				} else {
					this.currentId = item.categoryId;
					this.title = item.name;
					if(this.searchKey){
						var data={
							searchKey:this.searchKey,
							categoryId: this.currentId,
							canBuy:canBuy
						}
					}else{
						var data={
							categoryId: this.currentId,
							canBuy:canBuy
						}
					}
					
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}
			},
			
			// 兑换价排序
			price() {
				this.pageNum = 1
				this.canBuyFlag = false
				this.searchKey = ''
				this.isLoadMore = false
				// this.currentId = 307
				// this.title = '全部分类'
				this.number++;
				if (this.number % 3 == 1) { //升序
					this.integralSort = 1
					this.clickflag=false;
					this.topflag = false;
					this.downflag = true;
					if(this.currentId=='307'){
						var data={
							categoryId: null,
							canBuy:this.canBuyFlag,
							integralSort: this.integralSort
						}
					}else{
						var data={
							categoryId: this.currentId,
							canBuy:this.canBuyFlag,
							integralSort: this.integralSort
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				} else if(this.number % 3 == 2) {//降序 
					this.integralSort = 2
					this.clickflag=false;
					this.topflag = true;
					this.downflag = false;
					if(this.currentId=='307'){
						var data={
							categoryId: null,
							canBuy:this.canBuyFlag,
							integralSort: this.integralSort
						}
					}else{
						var data={
							categoryId: this.currentId,
							canBuy:this.canBuyFlag,
							integralSort: this.integralSort
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}else if(this.number % 3 == 0){//正常
					this.clickflag=true;
					this.topflag = true;
					this.downflag = true;
					if(this.currentId=='307'){
						var data={
							categoryId: null,
							canBuy:this.canBuyFlag,
						}
					}else{
						var data={
							canBuy:this.canBuyFlag,
							categoryId: this.currentId
						}
					}
					ingergalCategoryTreeGoodsList(this.pageNum,data).then(res => {
						this.list = res.data.list
						this.pageNum = res.data.pageNum
						this.totalNum = res.data.total
					});
				}
			},
			//去积分商品详情
			toDetail(id) {
				uni.navigateTo({
					url: '/integralPages/integralDetail?integralId='+id
				})
			},
			logoin() {
				uni.redirectTo({
					url: '/loginPages/indexlogin'
				})
			},
		},
	}
</script>

<style lang="scss">
	.integralBox {
		width: 100%;
		background: #F4F4F4;

		.integral_herderBox {
			width:750upx;
			background: #fff;
			padding-bottom: 18upx;
			position:fixed;
			top:0;
			left:0;

			.integral_herder {
				width: 100%;
				padding-top: 90upx;
				display: flex;
				align-items: center;

				.integral_back {
					margin-left: 22upx;
					margin-right: 20upx;

					.back {
						image {
							width: 50upx;
							height: 50upx;
						}

						width: 50upx;
						height: 50upx;
					}

				}

				.integral_Input {
					width: 445upx;
					height: 50upx;
					background: #F4F4F4;
					border: 1upx solid #EEEEEE;
					border-radius: 30upx;
					line-height: 60upx;
					padding-top: 11upx;
					// text-indent: 30upx;
					position: relative;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;

					input {
						width: 410upx;
						border-radius: 30upx;
						margin-left: 30upx
					}

					image {
						width: 30upx;
						height: 30upx;
						position: absolute;
						right: 20upx;
						top: 16upx;
						z-index:1000;
					}
				}
			}

			.integral_Btn {
				width: 706upx;
				height: 44upx;
				margin: 32upx auto 15upx;
				display: flex;
				justify-content: space-between;
				align-items: center;


				.integral_flex {
					display: flex;
					width: 374upx;
					justify-content: space-between;
					text-align: center;
					// position:relative;

					.integral_CanBuy {
						width: 219upx;
						text-align: center;
						background: #f4f4f4;
						border-radius: 22upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333;
						line-height: 44upx;
						padding: 1px;
					}

					.integral_CanBuy_click {
						width: 219upx;
						text-align: center;
						background: rgba(251,104,26,0.1);
						border: 1upx solid #FB681A;
						border-radius: 22upx;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FB681A;
						line-height: 44upx;
					}

					.integral_Brand {
						width: 120upx;
						height: 44upx;
						// background: #F4F4F4;
						border-radius: 22upx;
						margin-left: 35upx;
						position: relative;

						.brand1 {
							width: 80upx;
							height: 44upx;
							position: absolute;
							top: 0;
							left: 10upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333;
							line-height: 44upx;
							text-align: left;
							text-indent: 16upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.brand2 {
							position: absolute;
							top: 0;
							right: 16upx;
							font-size: 30upx;
						}
					}
				}

				.integral_moneys {
					width: 526upx;
					text-align: right;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
		}
		.integralList {
			width: 100%;
			display: flex;
			margin-top: 18upx;
			border-radius: 0px 20px 0px 0px;

			.integralListText {
				width:210upx;
				height: 100vh;
				background: #f4f4f4;
				position:fixed;
				left:0;
				top:262upx;
			

				.active {
					width: 196upx;
					height: 90upx;
					background: #fff;
					color: #FB681A;
					font-weight: 700;
					font-size: 28upx;
					border-left: 2px solid #FB681A;
				}

				.integralListName {
					line-height: 90upx;
					margin: 0 auto;
					text-align: center;
					font-size: 28upx;
				}
			}

			.integralListImg {
				background: #FFFFFF;
				margin-left: 200upx;
				margin-top: 230upx;

				.integraLsales {
					height: 74upx;
					display: flex;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666;

					.title {
						width: 182upx;
						height: 74upx;
						line-height: 74upx;
						text-indent: 20upx;
						font-size: 30upx;
						padding-top: 10upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #666;
					}

					.sort {
						width: 130upx;
						height: 70upx;
						margin-left: 240upx;
						display: flex;
						line-height: 70upx;
						justify-content: space-between;

						.price {
							height: 70upx;
							line-height: 70upx;
							font-size: 26upx;
							color: #333;
						}
						.price2 {
							height: 70upx;
							line-height: 70upx;
							font-size: 26upx;
							color: #FB681A;
						}

						.vertical {
							width: 40upx;
							height: 30upx;
							margin-top: 12upx;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
						}
					}
				}

				.integralListImgBack {
					display: flex;
					margin-bottom: 25upx;
					margin-left: 20upx;

					image {
						width: 220upx;
						height: 220upx;
						border-radius: 10upx;
					}

					.integralListTitle {
						.integralListTitles {
							margin-top: 15upx;
							margin-left: 14upx;
							width: 279upx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2; // 多行在这里修改数字即可，这里显示2行
							overflow: hidden;
							-webkit-box-orient: vertical;
						}
					}

					.integralConversion {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 65upx;
						margin-left: 15upx;

						.integralConversionsFlex {
							display: flex;
							align-items: center;

							.integralConversions {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								span{
									font-size: 36upx;
									font-family: PingFang SC;
									font-weight: bold;
									color: #FB681A;
								}
							}
						}

						.integralConversionBtn {
							width: 80upx;
							height: 40upx;
							background: linear-gradient(126deg, #FF8D13, #FE7E30);
							border-radius: 6upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							text-align: center;
							line-height: 40upx;
						}
					}

				}
			}
		}
	}
</style>
