<template>
	<view>
		<view class="list"
			:style="evaluateStatus==true||evaluateStatus=='true'?'':'position: relative;bottom: 100upx;left: 0;'">
			<view class="list_item" v-for="(item,index) in goodsInfoList.orderItemBasicsDto" :key="item.goodsId">
				<view class="item_goods">
					<view class="goods_img">
						<image
							:src="item.imgUrl?item.imgUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"
							mode=""></image>
					</view>
					<view class="goods_title">{{item.goodsTitle}}</view>
				</view>
				<view class="comment">
					<view class="comment_title">商品评价</view>
					<uni-rate class="uni_rate" :readonly="evaluateStatus==true||evaluateStatus=='true'"
						size="30" v-model="item.orderEvaluateDto.rate" @change="onChange($event,item)" />
					<view>{{item.orderEvaluateDto.rate?item.orderEvaluateDto.rate:''}}</view>
				</view>
				<view class="comment_content">
					<view class="comment_text" v-if="evaluateStatus==true||evaluateStatus=='true'">
						{{item.orderEvaluateDto.suggestion}}
					</view>
					<view class="comment_text" v-else>
						<textarea v-model="item.orderEvaluateDto.suggestion" 
							:placeholder="text"
							placeholder-style="line-height:60upx"
							maxlength="500"></textarea>
					</view>
					<view class="comment_Imgs" v-if="evaluateStatus==true||evaluateStatus=='true'">
						<view class="commentImg_flex" v-if="item.orderEvaluateDto.imageUrlList">
							<view class="item_imgs" v-for="(items,indexs) in item.orderEvaluateDto.imageUrlList" :key="indexs">
								<view>
									<image :src="items" mode="aspectFill"
										@click="checkImg(item.orderEvaluateDto.imageUrlList,indexs)"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="comment_imgs" v-else>
						<view class="imgs">
							<!-- v-model='item.orderEvaluateDto.base64files' -->
							<uni-file-picker :image-styles="imageStyles" file-mediatype="image" mode="grid" 
								:limit="8" ref="files" :auto-upload="false"
								@select="select($event,item)"
								@delete='delfile($event,item)' />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="submit" v-if="evaluateStatus==false||evaluateStatus=='false'">
			<view class="subBtn" :style="{ background:background}" @click="submit()">提交</view>
		</view>
	</view>
</template>

<script>
	import {
		toast,
		getUrl,
		getRouter,
		rate_upload_file
	} from '@/utils/utils.js'
	import {
		getLoginAccount
	} from '@/api/personalApi.js'
	import {
		getStyleById
	} from '@/api/indexApi'
	import {
		orderEvaluateInfo,
		saveOrderEvaluate
	} from '@/api/orderListApi.js'
	export default {
		data() {
			return {
				// rateValue:'',//分值
				// isRate:true,//为true是我的评价，为false是商品评价
				text:'您对产品的质量还满意嘛？\n产品的规格、型号是否适配您现在的实验？\n销售人员的服务水平是否专业？\n小程序的使用是否丝滑便捷？\n请留下您宝贵的意见和建议，我们将虚心改进\n在使用过程中遇到任何问题请随时与客服联系哦~',
				imgList: [],
				modelImgList: [],
				style: {},
				background: '',
				orderCode: '',
				mobile:'',
				accountId:'',
				title: '',
				evaluateStatus: null, // 是否已评价
				goodsInfoList: [],
				list: {
					orderEvaluateDtoList:[]
				},
				imgs:[],
				timer:null,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.title
			})
			this.getStyleByIdList()
		},
		onLoad(option) {
			// console.log(option,"-------评价option--------")
			this.orderCode = option.orderCode
			this.title = option.title
			this.evaluateStatus = option.evaluateStatus
			this.getAccountMessage()
			this.getorderEvaluateInfo()
		},
		methods: {
			getStyleByIdList() {
				getStyleById().then(res => {
					this.style = res.data
					this.background = this.style.colorblue
				})
			},
			//获取用户信息
			getAccountMessage() {
				getLoginAccount().then(res => {
					if(res.success){
						this.mobile = res.data.mobile
					}
				})
			},
			getorderEvaluateInfo() {
				orderEvaluateInfo(this.orderCode).then(res => {
					if (res.success) {
						this.goodsInfoList = res.data
						// this.mobile = res.data.orderAddressDto.mobile
						this.accountId = res.data.accountId
						this.evaluateStatus = res.data.evaluateStatus
						this.goodsInfoList.orderItemBasicsDto.forEach(item => {
							if(this.evaluateStatus==false||this.evaluateStatus=="false"){
								item.orderEvaluateDto.imageUrlList = []
								item.orderEvaluateDto.base64files = []
							}
						})
					}
				})
			},
			checkImg(list, index2) {
				wx.previewImage({
					urls: list, //需要预览的图片http链接列表，注意是数组
					current: '' + list[index2], // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			onChange(e, item) {
				// console.log(e.value,"-----------",item)
				item.rate = e.value
			},
			select(e, item) {
				// console.log(e, "select-------")
				e.tempFilePaths.forEach(fileItem => {
					var base64 = 'data:image/jpeg;base64,'+wx.getFileSystemManager().readFileSync(fileItem, "base64");
					// console.log(base64);
					item.orderEvaluateDto.base64files.push(base64)
					item.orderEvaluateDto.imageUrlList.push(fileItem)
					// console.log(item.orderEvaluateDto.imageUrlList,"上传之后imageUrlList-------")
				})
			},
			delfile(e,item) {
				// console.log(e,"delfile-------")
				// console.log(item.orderEvaluateDto.imageUrlList,"删除之前imageUrlList-------")
				item.orderEvaluateDto.imageUrlList.forEach((items,index)=>{
					if (items == e.tempFilePath) {
						item.orderEvaluateDto.base64files.splice(index, 1)
						item.orderEvaluateDto.imageUrlList.splice(index, 1)
						// console.log(item.orderEvaluateDto.imageUrlList,"删除之后imageUrlList-------")
						// console.log(item.orderEvaluateDto.base64files,"删除之后的base64-------")
					}
				})
			},
			submit(){
				if (this.timer == null) {
					this.timer = setTimeout(() => {
						this.submitReat()
						clearTimeout(this.timer)
						this.timer = null
					}, 3000);
				}
			},
			// 提交评价
			submitReat() {
				this.list.orderEvaluateDtoList = []
				this.goodsInfoList.orderItemBasicsDto.forEach(item => {
					this.list.orderEvaluateDtoList.push({
						orderCode: this.orderCode,
						accountId: this.accountId,
						accountName: this.mobile,//取个人信息手机号（未修改）
						mobile: this.mobile,//取个人信息手机号（未修改）
						orderItemId: item.orderItemId,
						artNo: item.artNo,
						imgUrl: item.imgUrl,
						showTitle: item.goodsTitle,
						rate: item.orderEvaluateDto.rate,
						suggestion: item.orderEvaluateDto.suggestion,
						base64files: item.orderEvaluateDto.base64files,
					})
				})
				// console.log(this.list.orderEvaluateDtoList, "----提交-参数----")
				saveOrderEvaluate(this.list).then(res => {
					if(res.success){
						// console.log(res, "-----------")
						this.evaluateStatus = true
						this.title = "我的评价"
						this.getorderEvaluateInfo()
					}else if(res.msg=='缺少参数{0}'){
						toast({
							title:"请补全商品评价"
						})
					}else{
						toast({
							title:res.msg
						})
					}
				})
				
				
			},
		}
	}
</script>

<style scoped lang="less">
	::v-deep .file-picker__box {
		width: 175upx !important;
		height: 175upx !important;
		padding: 0 !important;
	}

	::v-deep .uni-file-picker__container {
		height: 175upx !important;
	}

	.list {
		width: 100%;
		background: #F6F6F6;

		.list_item:last-child {
			padding-bottom: 120upx;
		}

		.list_item {
			background: #FFFFFF;
			padding: 20upx 34upx;
			margin-bottom: 20upx;

			.item_goods {
				width: 680upx;
				display: flex;
				justify-content: space-between;

				.goods_img {
					width: 120rpx;
					height: 120rpx;
					background: #F5F5F5;
					border-radius: 10rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}

				.goods_title {
					width: 540upx;
					height: 70upx;
					margin-left: 20upx;
					padding-top: 20upx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 35rpx;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}

			.comment {
				width: 680upx;
				border-bottom: 1px solid #F5F5F5;
				padding: 20upx 0;
				display: flex;
				justify-content: start;

				.comment_title {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 60upx;
				}

				.uni_rate {
					margin-left: 20upx;
				}

				view {
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 60upx;
					margin-left: 10upx;
				}
			}

			.comment_content {
				padding-top: 20upx;

				.comment_text {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					background: #FFFFFF;
					border-radius: 10upx;
					padding: 10upx;

					textarea {
						width: 640upx;
						height: 300upx;
						word-wrap: break-word;
						white-space: pre-line;
						line-height: 40upx;
					}
				}
				.comment_Imgs{
					width:100%;
					margin-top: 15upx;
					
					.commentImg_flex{
						display: flex;
						flex-wrap: wrap;
						justify-content: start;
						
						.item_imgs{
							view{
								width: 160upx;
								height: 160upx;
								margin: 0 10upx 10upx 0;
								image{
									width: 160upx;
									height: 160upx;
								}
							}
						}
					}
					
				}

				.comment_imgs {
					width: 100%;
					height: 340upx;
					margin-top: 15upx;
					display: flex;
					flex-wrap: wrap;
					justify-content: start;
					
					.imgs {
						width: 100%;
						height: 340upx;
						display: flex;
						flex-wrap: wrap;
						justify-content: start;
					}
				}
			}
		}
	}

	.submit {
		width: 100%;
		height: 120upx;
		background: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9;

		.subBtn {
			width: 690rpx;
			height: 80rpx;
			// background: linear-gradient(121deg, #5A75FF, #4C4DFF);
			border-radius: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
		}
	}
</style>