<template>
	<view class="myOrderContent">
		<view class="header_text"
			:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
			<view style="margin-left:20upx;width: 40upx;height: 40upx;">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/home.png" mode="" @click="backHome"
					style="width: 40upx;height: 40upx;"></image>
			</view>
			<view class="title">
				订单列表
			</view>
		</view>
		<view class="myOrderTop">
			<view class="inputContent">
				<input class="myOrderTopInput" type="text" v-model="value1" confirm-type="search" bindconfirm="startSearch"  placeholder="请输入订单号">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/h5/searchWhite.png" mode="" @click="searchOrder"></image>
			</view>
			<view class="orderType" style="display: flex;justify-content: space-between;">
				<view v-for="(item,index) in orderStatus" :key="index">
					<view style="text-align: center;" :style="{color: item.name==names ? color : ''}"
						:class="item.name==names?'orderBtn':''" @click="TypeBtn(item,index)">{{item.name}}</view>
				</view>
			</view>
			<view class="orderTypeBtn"
				style="width:690upx;display: flex;justify-content: flex-start;margin-left: 30upx;">
				<view class="uni-padding-wrap uni-common-mt">
					<scroll-view class="scroll-view_H" scroll-x="true">
						<view class=""
							style="width:690upx;display: flex;justify-content: flex-start;margin-left: 10upx;">
							<view v-for="(items,index) in arr" :key="index" style="margin-right:40upx;">
								<view style="font-size: 26upx; background: #F6F6F6;
							border-radius: 25upx;padding: 0upx 30upx; color: #929396; height:50upx; line-height:50upx;text-align: center;"
									:style="[{color: items.name==nextName ? color : ''},{background: items.name==nextName ? background : ''}]"
									:class="items.name==nextName?'orderNextBtn':''" @click="TypeNextBtn(ite,items)">
									{{items.name}}
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- orderPageList.length -->
		<view v-if="orderPageList!=null||orderPageList.length>0" class="myOrderList" v-for="(item,index) in orderPageList" @click="goDetail(item)"
			:key="index">
			<view class="orderListContetn">
				<view class="orderListTop">
					<view class="orderNumber">
						{{names=='售后'?'售后单号：':'订单号：'}}
						<text>{{item.orderCode?item.orderCode:item.refundCode}}</text>
					</view>
					<view class="afterSentOut" :style="{color: item.orderStatus==10&&names=='全部订单' ? color : ''}"
						v-if="item.orderStatus==10&&names=='全部订单'">
						待审核
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==40&&names=='全部订单'">
						待确认
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==50&&names=='全部订单'">
						已驳回
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==20&&names=='全部订单'">
						进行中
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==30&&names=='全部订单'">
						已完结
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==0&&names=='全部订单'">
						作废/取消
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.orderStatus==5&&names=='全部订单'">
						待支付
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.payStatus==10&&names=='支付'">
						待支付
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.payStatus==20&&names=='支付'">
						部分支付
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.payStatus==30&&names=='支付'">
						全部支付
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.outStatus==10&&names=='发货'">
						待发货
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.outStatus==20&&names=='发货'">
						部分发货
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.outStatus==30&&names=='发货'">
						全部发货
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.outStatus==40&&names=='发货'">
						已签收
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.invoiceStatus==10&&names=='开票'">
						未开票
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.invoiceStatus==20&&names=='开票'">
						部分开票
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.invoiceStatus==30&&names=='开票'">
						已开票
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.evaluateStatus==false&&names=='评价'">
						待评价
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.evaluateStatus==true&&names=='评价'">
						已评价
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.refundType==10&&names=='售后'">
						仅退款
					</view>
					<view class="afterSentOut" :style="{color: color }" v-if="item.refundType==20&&names=='售后'">
						退货退款
					</view>
				</view>
				<template>
					<view class="orderListcenter" v-for="(items,index) in item.orderItemBasicsDto" :key="index">
						<image v-if="items.imgUrl" :src="items.imgUrl" mode=""></image>
						<image v-else
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg"
							mode="widthFix"></image>
						<view class="listDetails">
							<view class="listDetailsTop">
								<view>
									{{items.goodsTitle==null?'':items.goodsTitle}}
								</view>
							</view>
							<!-- <view class="sale" v-if="items.returnNum!=null&&items.returnNum!=0">已退数量*{{items.returnNum}}
							</view> -->
							<view class="listDetailsCenter">
								<view class="listDetailsCenter2">
									品牌:{{items.brandName}}
									规格:{{items.specification==null||items.specification==''?'暂无规格':items.specification}}
								</view>
								<view class="ListPrice" v-if="returnType">
									<span>*{{items.num}}</span>
								</view>
							</view>
							<view class="listDetailsCenter3">
								<view class="ListPrice" v-if="item.orderType==3">
									<span>{{items.price}}积分</span>
								</view>
								<view class="ListPrice" v-else>
									<span>￥{{items.price}}</span>
								</view>
							</view>
							<view class="invoicePrice" v-if="names == '售后'">
								<view>
									￥{{items.amount}}
								</view>
								<view class="ListPrice">
									<span>*{{items.num+items.outNum}}</span>
								</view>
							</view>
						</view>
						<image v-if='item.orderType==2' class="sampleLogo"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleLogo.png"></image>
						<image v-if='item.orderType==4' class="sampleLogo"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E7%9F%A2%E9%87%8F%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%402x%20%287%29.png">
						</image>
					</view>
				</template>
				<template v-if="returnType">
					<view class="last">
						<view class="listDetailsLast">
							<text v-if="item.orderType!=3">运费
								<text>￥</text>
								{{item.freight?item.freight:0}}
							</text>
							<text class="realPay" v-if="item.orderType==3">总积分:
								<text>{{item.orderAmount ?item.orderAmount :0}}</text>
							</text>
							<text class="realPay" v-else>总金额:
								<text>{{item.orderAmount ?item.orderAmount :0}}</text>
							</text>
						</view>
					</view>
				</template>
				<template v-if="!returnType">
					<view class="returnSatuts">
						<view class="returnSatutsName">
							{{item.status==20?'已申请':item.status==30?'同意申请':item.status==50?'同意申请':item.status==40?'拒绝退款':item.status==100?'售后关闭':item.status==60?'已发货':item.status==80?'拒绝收货':item.status==70?'收货并退款':item.status==90?'拒绝退货退款':''}}
						</view>
						<view class="returnSatutsCode">
							{{item.status==20?'等待商家处理':item.status==30?'买家同意退款':item.status==40?'商家拒绝退款':item.status==50?'买家待发货':item.status==100?'撤销申请':item.status==60?'已发货待商家处理':item.status==80?'商家拒绝收货':item.status==70?'商家收货并退款':item.status==90?'商家拒绝退货退款':''}}
						</view>
					</view>
				</template>
				<view class="deliverGoods">
					<!-- .length -->
					<view class="deliverType" v-if="item.orderOperations">
						<view class="afterSentOut" v-if="item.orderStatus==10&&names=='全部订单'">
							待审核
						</view>
						<view class="afterSentOut" v-if="item.orderStatus==20&&names=='全部订单'">
							进行中
						</view>
						<view class="afterSentOut" v-if="item.orderStatus==30&&names=='全部订单'">
							已完结
						</view>
						<view class="afterSentOut" v-if="item.orderStatus==0&&names=='全部订单'">
							作废/取消
						</view>
						<view class="afterSentOut" v-if="item.payStatus==10&&names=='支付'">
							未支付
						</view>
						<view class="afterSentOut" v-if="item.payStatus==20&&names=='支付'">
							部分支付
						</view>
						<view class="afterSentOut" v-if="item.payStatus==30&&names=='支付'">
							全部支付
						</view>
						<view class="afterSentOut" v-if="item.outStatus==10&&names=='发货'">
							待发货
						</view>
						<view class="afterSentOut" v-if="item.outStatus==20&&names=='发货'">
							部分发货
						</view>
						<view class="afterSentOut" v-if="item.outStatus==30&&names=='发货'">
							全部发货
						</view>
						<view class="afterSentOut" v-if="item.outStatus==40&&names=='发货'">
							已签收
						</view>
						<view class="afterSentOut" v-if="item.invoiceStatus==10&&names=='开票'">
							未开票
						</view>
						<view class="afterSentOut" v-if="item.invoiceStatus==20&&names=='开票'">
							部分开票
						</view>
						<view class="afterSentOut" v-if="item.invoiceStatus==30&&names=='开票'">
							已开票
						</view>
					</view>

					<view class="deliverStyleContent" v-for="(item1,index) in item.orderOperations" :key="index">
						<view class="deliverStyle">
							{{item1.operationTime==null?'':item1.operationTime}}
							{{item1.operation==null?'':item1.operation}}
						</view>
					</view>
				</view>
				<view class="orderListButtom">
					<button class="button"
						v-if="item.orderType!=3 && (item.orderStatus==20 || item.orderStatus==10) && item.outStatus==10 && item.invoiceStatus==10 && item.payStatus==10"
						@click.stop="cancleBtn(item)">取消订单</button>
					<button class="pay" :style="{background:background1}" v-if="item.orderStatus==40"
						@click.stop="Confirmed(item)">确认订单</button>
					<button class="button"
						v-if="item.evaluateStatus==false&&item.outStatus==30" @click.stop="sign(item)">签收评价</button>
					<button class="button"
						v-if="item.evaluateStatus==false&&item.outStatus==40" @click.stop="comment(item)">评价</button>
					<button class="button"
						v-if="item.evaluateStatus==true" @click.stop="myComment(item)">我的评价</button>
				</view>
			</view>
		</view>
		<!-- orderPageList.length==null -->
		<view class="noList" v-else>
			<view class="" style="margin-top: 500upx;">
				<view class="noImage" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat',
				     backgroundSize:'100% 100%'}"></view>
				<view class="noText">
					亲，暂无订单信息
				</view>
			</view>
		</view>
		<!-- 确认签收弹窗 -->
		<view class="mark" v-if="flags">
			<view class="small">
				<view class="title">签收并评价</view>
				<view class="sure_text">确认进行商品签收操作吗？ 签收之后请对商品评价！</view>
				<view class="sure">
					<view class="no" @click.stop="no">取消</view>
					<view class="yes" @click.stop="sure">签收并评价</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		orderList,
		cancelOrder,
		record,
		confirm,
		signForOrder
	} from '@/api/orderListApi.js'
	import {
		getUrl,
		getRouter,
		refresh,
		toast
	} from '@/utils/utils.js'
	import moment from 'moment';
	export default {
		data() {
			return {
				flags:false,
				orderParam: {
					invoiceStatus: null,
					orderStatus: 1,
					orderCode: null,
					outStatus: null,
					payStatus: null,
					isEvaluate:null
				},
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				value1: '',
				index: 0,
				value: '',
				returnType: true,
				one: [{
						name: '待确认',
						code: 40
					},
					{
						name: '已驳回',
						code: 50
					}, {
						name: '待审核',
						code: 10
					}, {
						name: '进行中',
						code: 20
					}, {
						name: '已完结',
						code: 30
					}, {
						name: '作废/取消',
						code: 0
					},

				],
				two: [{
					name: '待支付',
					code: 10
				}, {
					name: '部分支付',
					code: 20
				}, {
					name: '全部支付',
					code: 30,
				}],
				three: [{
						name: '待发货',
						code: 10
					},
					{
						name: '部分发货',
						code: 20
					},
					{
						name: '全部发货',
						code: 30
					},
					{
						name: '已签收',
						code: 40
					}
				],
				four: [{
						name: '已开票',
						code: 30
					},
					{
						name: '未开票',
						code: 10
					},
					{
						name: '部分开票',
						code: 20
					}
				],
				five: [{
						name: '仅退款',
						code: 10
					},
					{
						name: '退货退款',
						code: 20
					},
				],
				six: [{
						name: '待评价',
						code: false
					},
					{
						name: '已评价',
						code: true
					},
				],
				arr: [{
						name: '待确认',
						code: 40
					},
					{
						name: '已驳回',
						code: 50
					},
					{
						name: '待审核',
						code: 10
					}, {
						name: '进行中',
						code: 20
					}, {
						name: '已完结',
						code: 30
					}, {
						name: '作废/取消',
						code: 0
					}
				],
				orderStatus: [{
						name: '全部订单',
						code: 1
					}, {
						name: '支付',
						code: 1
					}, {
						name: '发货',
						code: 1
					},
					{
						name: '开票',
						code: 1,
					},
					{
						name: '评价',
						code: 1,
					},
					{
						name: '售后',
						code: 0,
					}
				],
				orderPageList1: [],
				orderItemBasicsDtoList: [],
				orderPageList: [],
				li: {
					code: 1,
					name: '全部订单'
				},
				ite: {
					code: 1,
					name: '全部订单'
				},
				names: '全部订单',
				nextName: null,
				pageNum: 1,
				refundType: '',
				style: {},
				color: '',
				background: '',
				background1: '',
				imageURL: '',
				hasNextPage: null,
				orderData:{}
			}

		},
		onLoad(opt) {
			// console.log(opt,"---------------")
			this.orderPageList = []
			this.style = uni.getStorageSync('style')
			this.color = this.style.logincheckbox
			this.background = this.style.orderrgb
			this.background1 = this.style.cartbtn
			this.imageURL = this.style.orderlistnolist
			this.getHeight();
			this.names = opt.name
			if (this.names == '待审核') {
				var data = {
					name: '全部订单',
					code: 10
				}
				this.TypeBtn(data)
				this.orderParam.orderStatus = opt.orderStatus
				this.names = '全部订单'
				this.nextName = '待审核'
			} else if (this.names == '待确认') {
				var data = {
					name: '全部订单',
					code: 40
				}
				this.TypeBtn(data)
				this.orderParam.orderStatus = opt.orderStatus
				this.names = '全部订单'
				this.nextName = '待确认'
			} else if (this.names == '待支付') {
				this.orderParam.payStatus = opt.orderStatus
				this.orderParam.orderStatus = null
				this.names = '支付'
				var data = {
					name: '支付',
					code: 10
				}
				this.TypeBtn(data)
				this.nextName = '待支付'
			} else if (this.names == '待发货') {
				this.orderParam.outStatus = opt.orderStatus
				this.orderParam.orderStatus = null
				this.names = '发货'
				var data = {
					name: '发货',
					code: 10
				}
				this.TypeBtn(data)
				this.nextName = '待发货'
			} else if (this.names == '待评价') {
				this.orderParam.isEvaluate = opt.orderStatus
				this.orderParam.orderStatus = null
				this.names = '评价'
				var data = {
					name: '评价',
					code: false
				}
				this.TypeBtn(data)
				this.nextName = '待评价'
			} else if (this.names == '售后') {
				var data = {
					name: '售后',
				}
				this.TypeBtn(data)
			} else {
				this.orderPageList=[]
				this.getOrderList()
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		onReachBottom() {
			if (this.hasNextPage) {
				this.pageNum++
				this.getOrderList()
			}
		},
		methods: {
			// 返回首页
			backHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			getHeight() {
				//  获取状态栏信息
				let stateHeight = 0; //  接收状态栏高度
				const navHeight = wx.getMenuButtonBoundingClientRect().height; //  获取胶囊高度
				let top = 0;
				wx.getSystemInfo({
					success(res) {
						stateHeight = res.statusBarHeight;
					},
				});
				top = wx.getMenuButtonBoundingClientRect().top - stateHeight; //  获取top值
				this.menuButtonInfo = navHeight
				this.statusBarHeight = stateHeight + top
			},
			// 下拉刷新
			getDataMsg() {
				this.orderPageList=[]
				if (this.names == "售后") {
					if (this.refundType == 10) {
						this.getRecord(this.refundType)
					} else if (this.refundType == 20) {
						this.getRecord(this.refundType);
					} else {
						this.getRecord()
					}
				} else {
					this.getOrderList();
				}
				getUrl();
				getRouter();
			},
			getOrderList() {
				orderList(this.pageNum, this.orderParam).then((res) => {
					if (res.code == "0") {
						if (res.data.list) {
							res.data.list.forEach(item => {
								this.orderPageList.push(item)
								if (item.orderOperations) {
									item.orderOperations.forEach(item1 => {
										item1.operationTime = moment(item1.operationTime).format(
											'YYYY.MM.DD HH:mm:ss')
									})
								}
							})
						}
						this.hasNextPage = res.data.hasNextPage
					}
				})
			},
			Confirmed(item) {
				var data = {
					orderCode: item.orderCode
				}
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定确认订单',
					success: function(res) {
						if (res.confirm) {
							confirm(item).then(res => {
								that.orderPageList=[]
								that.getOrderList()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			searchOrder() {
				if(this.value1){
					this.orderParam.orderCode = this.value1
					this.orderPageList=[]
					orderList(this.pageNum,this.orderParam).then(res => {
						if (res.success) {
							if (res.data.list) {
								res.data.list.forEach(item => {
									if (item.orderOperations) {
										item.orderOperations.forEach(item1 => {
											item1.operationTime = moment(item1.operationTime).format('YYYY.MM.DD HH:mm:ss')
										})
									}
									this.orderPageList.push(item)
								})
							}
							this.hasNextPage = res.data.hasNextPage
						}
					})
				}else{
					toast({
						title:'请输入订单号'
					})
				}
				
			},
			cancleBtn(item) {
				var orderCode = item.orderCode;
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定取消订单',
					success: function(res) {
						if (res.confirm) {
							cancelOrder(orderCode).then((res) => {
								if (res.success) {
									that.orderPageList=[]
									that.getOrderList()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			// 签收评价
			sign(item) {
				this.flags = true
				this.orderData = item
			},
			sure(){
				signForOrder(this.orderData.id).then(res => {
					if (res.success) {
						this.flags = false;
						this.orderPageList=[]
						this.getOrderList()
						uni.navigateTo({
							url:'/goodsDetail/rate?title=商品评价&orderCode='+this.orderData.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
						})
					}
				})
			},
			no(){
				this.flags = false
			},
			// 评价
			comment(item) {
				this.orderData = item
				uni.navigateTo({
					url:'/goodsDetail/rate?title=商品评价&orderCode='+this.orderData.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
				})
			},
			// 我的评价
			myComment(item){
				this.orderData = item
				uni.navigateTo({
					url:'/goodsDetail/rate?title=我的评价&orderCode='+this.orderData.orderCode+'&evaluateStatus='+this.orderData.evaluateStatus
				})
			},
			TypeBtn(item) {
				// console.log("==============",item)
				this.pageNum = 1
				this.orderPageList = []
				this.names = item.name
				this.ite = item
				this.nextName = ""
				this.returnType = true
				if (item.name == '全部订单') {
					this.arr = this.one
					this.orderParam.orderStatus = item.code
					this.orderParam.payStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.outStatus = null
					this.orderParam.isEvaluate = null
					this.orderPageList=[]
					this.getOrderList()
				} else if (item.name == '开票') {
					this.arr = this.four
					this.orderParam.invoiceStatus = item.code
					this.orderParam.orderStatus = null
					this.orderParam.payStatus = null
					this.orderParam.outStatus = null
					this.orderParam.isEvaluate = null
					this.orderPageList=[]
					this.getOrderList()
				} else if (item.name == '支付') {
					this.arr = this.two
					this.orderParam.payStatus = item.code
					this.orderParam.outStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.orderStatus = null
					this.orderParam.isEvaluate = null
					this.orderPageList=[]
					this.getOrderList()
				} else if (item.name == '发货') {
					this.arr = this.three
					this.orderParam.outStatus = item.code
					this.orderParam.payStatus = null
					this.orderParam.orderStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.isEvaluate = null
					this.orderPageList=[]
					this.getOrderList()
				} else if (item.name == '评价') {
					item.code = false
					this.arr = this.six
					this.orderParam.isEvaluate = item.code
					this.orderParam.outStatus = null
					this.orderParam.payStatus = null	
					this.orderParam.orderStatus = null
					this.orderParam.invoiceStatus = null
					this.orderPageList=[]
					this.getOrderList()
				} else {
					this.returnType = false
					this.getRecord()
					this.arr = this.five
				}


			},
			TypeNextBtn(ite, items) {
				// console.log(ite,"==============",items)
				this.pageNum = 1
				this.orderPageList = []
				if (items.name == '仅退款' || items.name == '退货退款') {
					this.getRecord(items.code)
				} else if(items.name=='待评价'||items.name=='已评价'){
					this.ite.code=items.code
					this.nextBtn(this.ite, items)
					this.orderPageList=[]
					this.getOrderList()
				} else {
					this.nextBtn(this.ite, items)
					this.orderPageList=[]
					this.getOrderList()
				}
				this.nextName = items.name
			},
			goDetail(item) {
				if (item.orderCode) {
					uni.navigateTo({
						url: '/personalPage/orderDetail?orderCode=' + item.orderCode + '&orderType=' + item
							.orderType + '&pageType=1'
					})
				} else {
					uni.navigateTo({
						url: '/personalPage/returnOrderDetail?refundId=' + item.refundId + '&orderType=' + item
							.orderType + '&pageType=2'
					})
				}

			},
			nextBtn(ite, items) {
				this.nextName = ite.name
				if (ite.name == '全部订单') {
					this.orderParam.orderStatus = items.code
					this.orderParam.payStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.outStatus = null
					this.orderParam.isEvaluate = null
				} else if (ite.name == '开票') {
					this.orderParam.invoiceStatus = items.code
					this.orderParam.orderStatus = null
					this.orderParam.payStatus = null
					this.orderParam.outStatus = null
					this.orderParam.isEvaluate = null
				} else if (ite.name == '支付') {
					this.orderParam.payStatus = items.code
					this.orderParam.outStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.orderStatus = null
					this.orderParam.isEvaluate = null
				} else if (ite.name == '发货') {
					this.orderParam.outStatus = items.code
					this.orderParam.payStatus = null
					this.orderParam.orderStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.isEvaluate = null
				} else if (ite.name == '评价') {
					this.orderParam.isEvaluate = items.code
					this.orderParam.payStatus = null
					this.orderParam.orderStatus = null
					this.orderParam.invoiceStatus = null
					this.orderParam.outStatus = null
				}
			},
			getRecord(code) {
				this.refundType = code
				var data = {
					refundType: code ? code : ''
				}
				record(this.pageNum, data).then(res => {
					if (res.code == "0") {
						if (res.data.list) {
							res.data.list.forEach(item => {
								this.orderPageList.push(item)
								if (item.orderOperations) {
									item.orderOperations.forEach(item1 => {
										item1.operationTime = moment(item1.operationTime).format(
											'YYYY.MM.DD HH:mm:ss')
									})
								}
							})
						} else {}
						this.hasNextPage = res.data.hasNextPage
					}
				})
			}
		}
	}
</script>

<style>
	.scroll-Y {
		height: 300rpx;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}
</style>
<style lang="less" scoped>
	@import url('@/static/LHT/orderPage.css');

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.myOrderContent {
		width: 100%;

		.header_text {
			position: fixed;
			z-index: 999;
			width: 100%;
			display: flex;
			background-color: #FFFFFF;

			.title {
				width: 100%;
				margin-left: 275upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				// font-weight: bold;
				color: #212121;
			}
		}



		.myOrderTop {
			width: 750upx;
			padding-bottom: 20upx;
			background-color: #fff;
			padding-top: 180upx;

			.inputContent {
				width: 690upx;
				height: 60upx;
				background-color: #F6F6F6;
				border: 1upx solid #EEEEEE;
				border-radius: 30upx;
				margin-left: 30upx;
				display: flex;
				align-items: center;
				position: relative;

				.myOrderTopInput {
					width: 620upx;
					height: 60upx;
					border-radius: 30upx;
					box-sizing: border-box;
					padding-left: 30upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 30upx;
					position: absolute;
					left:0;
				}

				image {
					width: 29upx;
					height: 29upx;
					position: absolute;
					right: 20upx;
				}
			}

			.orderType {
				width: 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30upx;
				margin-bottom: 44upx;
				font-weight: bold;
				margin-left: 20px;

				.orderTypeBtn {
					font-family: PingFang SC;
					color: #202021;
					height: 50upx;
					background: #F6F6F6;
					border-radius: 25upx;
					font-size: 26upx;

					view {

						text {
							width: 101upx;
							height: 25upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #929396;
							width: 164upx;
							height: 50upx;

						}
					}
				}
			}

			.orderStyle {
				// width: 678upx;
				display: flex;
				justify-content: space-between;
				// align-items: center;

				.orderStyleBtn {
					// width: 140upx;
					height: 50upx;
					background: #F6F6F6;
					border-radius: 25upx;
					line-height: 50upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					text-align: center;
					color: #929396;
				}
			}
		}


		.myOrderList {
			width: 100%;
			background-color: #F6F6F6;
			margin-top: 30upx;

			.orderListContetn {
				width: 750upx;
				background-color: #FFFFFF;
				border-radius: 30upx;
				margin-top: 20upx;

				.orderListTop {
					width: calc(100% - 60upx);
					display: flex;
					justify-content: space-between;
					margin: 0 auto;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					border-bottom: 2upx solid #EEEEEE;
					padding-top: 40upx;

					.orderNumber {
						color: #202021;

						text {
							color: #202021;
						}
					}
				}

			}

			.orderListcenter {
				width: calc(100% - 60upx);
				margin: 0 auto;
				display: flex;
				margin-top: 30upx;
				position: relative;

				.sampleLogo {
					position: absolute;
					width: 172upx;
					height: 103upx;
					top: 44upx;
					right: 31upx;
				}

				image {
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
					margin: 0upx 20upx;
				}

				.listDetails {
					width: 471.5upx;

					.listDetailsTop {
						display: flex;
						height: 45upx;
						font-size: 30upx;
						font-family: PingFang SC;
						color: #202021;

						view {
							width: 400upx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.ListPrice {
							width: 100upx;
							// height: 26upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #202021;

							span {
								font-size: 24upx;
							}
						}

					}

					.sale {
						text-align: right;
						margin-right: 20upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
					}

					.listDetailsCenter {

						display: flex;
						justify-content: space-between;
						margin-top: 20upx;

						view {
							width: 423upx;
							height: 25upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							line-height: 31upx;
						}

						.listDetailsCenter2 {
							height: 30upx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}

						.ListPrice {
							width: 77upx;
							// height: 26upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							// color: #202021;

							span {
								font-size: 26upx;
							}
						}
					}

					.listDetailsCenter3 {

						display: flex;
						justify-content: space-between;
						margin-top: 20upx;

						view {
							width: 423upx;
							height: 25upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							line-height: 31upx;
						}

						.listDetailsCenter2 {
							height: 30upx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}

						.ListPrice {
							// width: 177upx;
							// height: 26upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							// color: #202021;

							span {
								font-size: 26upx;
							}
						}
					}

					.return_Num {
						float: right;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-top: 10upx;
						margin-right: 10upx;
					}

					.invoicePrice {
						display: flex;
						justify-content: space-between;
						margin-top: 60upx;

						view {
							width: 423upx;
							height: 25upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #F33C0A;
							line-height: 31upx;
						}

						.ListPrice {
							width: 77upx;
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
							margin-right: -13px;

							span {
								font-size: 24upx;
							}
						}
					}
				}
			}

			.returnSatuts {
				width: calc(100% - 60upx);
				margin: 25upx auto 0;
				display: flex;
				height: 85upx;
				background: #F8F8F8;
				border-radius: 15upx;
				line-height: 85upx;
				align-items: center;

				.returnSatutsName {
					padding-left: 32upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
				}

				.returnSatutsCode {
					padding-left: 41upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #67686B;
				}
			}

			.last {
				width: calc(100% - 60upx);
				margin-top: 20upx;
				padding-bottom: 20upx;

				.listDetailsLast {
					// width: 430upx;
					height: 30upx;
					font-size: 28upx;
					margin-top: -35upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					line-height: 30upx;
					float: right;

					.realPay {
						font-size: 30upx;
						font-weight: 600;
						margin-left: 50upx;

						span {
							font-size: 30upx;
							font-weight: 500;
						}
					}
				}
			}

			.deliverGoods {
				width: 690upx;
				background: #F6F6F6;
				border-radius: 20upx;
				margin: 20upx auto;

				.deliverType {
					height: 27upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					padding-top: 30upx;
					margin: 20upx 30upx;

					.deliverStyle {
						// width: 531upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #67686B;
						margin: -17upx 15upx;

					}
				}

				.deliverStyleContent {
					padding-top: 20upx;
					padding-bottom: 30upx;

					.deliverStyle {
						// width: 531upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #67686B;
						margin: 0upx 30upx;

					}
				}

			}

			.orderListButtom {
				width: calc(100% - 60upx);
				margin: 30upx auto;
				// border-top: 2upx solid #EEEEEE;
				padding-bottom: 30upx;

				.button {
					width: 160upx;
					height: 60upx;
					background: #FFFFFF;
					border: 2upx solid #929396;
					border-radius: 40upx;
					line-height: 58upx;
					margin-top: 30upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 510upx;
				}
			}
		}
		
		.noList {
			width: 750upx;
			height: 80vh;
			background: #5974FF;
			
		}


		.orderListLastContent {
			width: 750upx;
			background-color: #FFFFFF;
			border-radius: 30upx;
			margin-top: 20upx;

			.orderListTop {
				width: calc(100% - 60upx);
				display: flex;
				justify-content: space-between;
				margin: 0 auto;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				border-bottom: 2upx solid #EEEEEE;
				padding-top: 40upx;

				.orderNumber {
					color: #202021;

					text {
						color: #202021;
					}
				}

			}

			.orderListLastcenter {
				width: calc(100% - 60upx);
				margin: 0 auto;
				display: flex;
				margin-top: 30upx;

				image {
					width: 180upx;
					height: 180upx;
					border-radius: 10upx;
					margin: 0 10upx;
				}

				.centerRight {
					view {
						width: 77upx;
						height: 26upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;

						span {
							font-size: 26upx;
						}
					}

					.priceText {
						width: 46upx;
						height: 21upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
						margin-top: 30upx;
						margin-left: 40upx;
					}
				}
			}

			.lastPrice {
				height: 29upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-left: 220upx;

				.realPay {
					font-size: 30upx;
					font-weight: 600;
					margin-left: 100upx;

					span {
						font-size: 30upx;
						font-weight: 500;
					}
				}
			}

			.serveDetail {
				width: 690upx;
				height: 171upx;
				background: #F6F6F6;
				border-radius: 20upx;
				margin: 30upx auto;

				.serveTitle {
					height: 27upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #212121;
					padding-top: 30upx;
					margin-left: 30upx;
				}

				.serveContent {
					view {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #67686B;
						margin-left: 30upx;
						margin-top: 10upx;
					}


				}
			}
		}




	}


	// 确认签收弹窗样式
	.mark {
		width: 750upx;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, .4);

		.small {
			width: 550upx;
			height: 380upx;
			background: #fff;
			border-radius: 20upx;

			.title {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				width: 100%;
				text-align: center;
				line-height: 120upx;
			}

			.sure_text {
				width: 336upx;
				margin: 20upx auto 0;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #666666;
				line-height: 38rpx;
				text-align: center;
			}

			.sure {
				width: 100%;
				height: 85upx;
				margin: 74upx auto 0;
				display: flex;
				justify-content: space-between;
				border-top: 1px solid #EEEEEE;

				.yes {
					width: 274upx;
					height: 85upx;
					border-radius: 10upx;
					text-align: center;
					line-height: 85upx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #5974FF;
				}

				.no {
					width: 274upx;
					height: 85upx;
					border-radius: 10upx;
					border-right: 1px solid #EEEEEE;
					text-align: center;
					line-height: 85upx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
				}
			}
		}
	}
</style>