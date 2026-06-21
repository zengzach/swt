<template>
	<view class="box">
		<view class="share_top">
			<canvas class="canvas_bg" canvas-id="canvas" style="width:100%;height:890upx;"></canvas>
		</view>
		<view class="share_bottom">
			<view class="share" @click="shareFriends">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png" mode=""></image>
				<view>分享好友</view>
			</view>
			<view class="share" @click="savePicture">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/upload.png" mode=""></image>
				<view>保存图片</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		posterImage,
		posterInfo
	} from '@/api/commonApi.js'
	export default {
		data() {
			return {
				imageWidth: '',
				imageHeight: '',
				posterMsg: {},
				isSample: '',
				isDiscount: '',
				id: '',
				goodsType: '',
				isGift: ''
			}
		},
		onLoad(option) {
			this.isSample = option.sample
			this.isDiscount = option.discount
			this.goodsType = option.goodsType
			this.isGift = option.isGift
			this.id = option.id
			this.getPosterImage()
		},
		methods: {
			// 获取海报信息
			getPosterImage() {
				// console.log(this.goodsType,'this.goodsType')
				if (this.isSample == 'true'|| this.goodsType == 30) {
					var data = {
						actionId: this.id,
						weChatCodeType: 2
					}
				} else if (this.goodsType == 20 || this.isGift == 'true') {
					var data = {
						actionId: this.id,
						weChatCodeType: 4
					}
				} else if (this.isDiscount == 'true') {
					var data = {
						actionId: this.id,
						weChatCodeType: 3
					}
				} else {
					var data = {
						actionId: this.id,
						weChatCodeType: 1
					}
				}
				posterInfo(data).then(res => {
					if (res.success) {
						this.posterMsg = res.data
						// console.log(res,"海报详情")
						this.drawInit()
					}

				})
			},
			getViewHW() {
				let info = uni.createSelectorQuery().in(this).select(".share_top");
				return new Promise((resolve, reject) => {
					info.boundingClientRect((data) => {
						this.imageWidth = data.width
						this.imageHeight = data.height
						resolve()
					}).exec(function(res) {
						// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
					})
				})
			},
			// 画海报
			async drawInit() {
				await this.getViewHW()
				this.ctx = uni.createCanvasContext('canvas')
				this.ctx.drawImage('/static/canvasBG.png', 0, 0, this.imageWidth, this.imageHeight)
				this.ctx.setTextBaseline('middle')
				var that = this;
				// 绘制头像
				wx.downloadFile({
					url: that.posterMsg.headImg ? that.posterMsg.headImg :
						'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
					success: function(res) {
						// 这个就是绘制圆形头像
						that.ctx.save();
						// const d = 2 * r;直径
						// const cx = x + r;圆的x轴位置
						// const cy = y + r;圆的y轴位置
						that.ctx.beginPath();
						// that.ctx.arc(cx, cy, r, 0, 2 * Math.PI);
						that.ctx.arc(45, 35, 25, 0, 2 * Math.PI);
						that.ctx.clip();
						// that.ctx.drawImage(res.tempFilePath, x, y, d, d);
						that.ctx.drawImage(res.tempFilePath, 20, 10, 50, 50);
						that.ctx.restore();
						that.ctx.draw(true);
					}
				});

				that.ctx.setFontSize(12)
				that.ctx.setFillStyle('#000000')
				that.ctx.fillText('为你选了一个好物', 80, 45)
				// 绘制店铺海报
				wx.downloadFile({
					url: that.posterMsg.goodsImg,
					success: function(res) {
						that.ctx.drawImage(res.tempFilePath, 15, 65, that.imageWidth - 30, 300);
						that.ctx.draw(true);
					}
				});

				// 价格
				if (this.isSample == 'true' || this.goodsType == 30) {
					// console.log("样品")
					this.ctx.drawImage('/static/title_bg.png', 15, 373, 80, 20)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#ffffff')
					that.ctx.fillText('免费领样品', 27, 385)

					that.ctx.setFontSize(16)
					that.ctx.setFillStyle('#FF5000')
					that.ctx.fillText('￥' + that.posterMsg.goodsPrice, 100, 385)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#999999')
					that.ctx.fillText('￥' + that.posterMsg.marketPrice, 140, 385)
					// 文字删除线
					that.ctx.beginPath();
					const textWidth = that.ctx.measureText('￥' + that.posterMsg.marketPrice).width;
					that.ctx.rect(140, 385, textWidth, 1);
					that.ctx.fillStyle = '#999999';
					that.ctx.fill();

					that.ctx.draw(true);
				} else if (this.goodsType == 20 || this.isGift == 'true') {
					this.ctx.drawImage('/static/title_bg.png', 15, 373, 66, 20)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#ffffff')
					that.ctx.fillText('免费领取', 25, 385)

					that.ctx.setFontSize(16)
					that.ctx.setFillStyle('#FF5000')
					that.ctx.fillText('￥' + that.posterMsg.promotionPrice, 85, 385)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#999999')
					that.ctx.fillText('价值￥' + that.posterMsg.goodsPrice, 120, 385)
					// 文字删除线
					that.ctx.beginPath();
					// const textWidth = that.ctx.measureText('价值￥' + that.posterMsg.goodsPrice).width;
					// that.ctx.rect(120, 385, textWidth, 1);
					that.ctx.fillStyle = '#999999';
					that.ctx.fill();

					that.ctx.draw(true);
				} else if (this.isDiscount == 'true') {
					// console.log("限时折扣")
					this.ctx.drawImage('/static/title_bg.png', 15, 373, 66, 20)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#ffffff')
					that.ctx.fillText('限时折扣', 25, 385)

					that.ctx.setFontSize(16)
					that.ctx.setFillStyle('#FF5000')
					that.ctx.fillText('￥' + that.posterMsg.promotionPrice, 85, 385)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#999999')
					that.ctx.fillText('￥' + that.posterMsg.goodsPrice, 165, 385)
					// 文字删除线
					that.ctx.beginPath();
					const textWidth = that.ctx.measureText('￥' + that.posterMsg.goodsPrice).width;
					that.ctx.rect(165, 385, textWidth, 1);
					that.ctx.fillStyle = '#999999';
					that.ctx.fill();

					that.ctx.draw(true);
				} else {
					// console.log("正常品")
					that.ctx.setFontSize(16)
					that.ctx.setFillStyle('#FF5000')
					that.ctx.fillText('￥' + that.posterMsg.goodsPrice, 15, 385)

					that.ctx.setFontSize(11)
					that.ctx.setFillStyle('#999999')
					that.ctx.fillText('￥' + that.posterMsg.marketPrice, 85, 385)
					// 文字删除线
					that.ctx.beginPath();
					const textWidth = that.ctx.measureText('￥' + that.posterMsg.marketPrice).width;
					that.ctx.rect(85, 385, textWidth, 1);
					that.ctx.fillStyle = '#999999';
					that.ctx.fill();

					that.ctx.draw(true);
				}
				// 商品title
				that.ctx.setFontSize(14)
				that.ctx.setFillStyle('#000000')
				if (that.posterMsg.goodsTitle.length >= 20) {
					var text = that.posterMsg.goodsTitle.slice(0, 20) + '...'
				} else {
					var text = that.posterMsg.goodsTitle
				}
				that.ctx.fillText(text, 18, 405)

				// 绘制需要字体加粗的文字
				that.ctx.setFillStyle('#000000')
				that.ctx.font = 'normal bold 15px sans-serif';
				that.ctx.fillText(that.posterMsg.nickName, 80, 27)
				that.ctx.draw(true);

				// 绘制二维码
				wx.downloadFile({
					url: that.posterMsg.weChatCodeUrl,
					success: function(res) {
						that.ctx.drawImage(res.tempFilePath, 250, 375, 60, 60);
						that.ctx.draw(true);
					}
				});
				that.ctx.draw(true);

			},
			// 分享好友
			shareFriends() {
				// console.log('分享好友')
				const dpr = wx.getSystemInfoSync().pixelRatio
				let imageWidth = this.imageWidth
				let imageHeight = this.imageHeight
				wx.canvasToTempFilePath({ //将canvas生成图片
					canvasId: 'canvas',
					x: 0,
					y: 0,
					width: imageWidth,
					height: imageHeight,
					destWidth: imageWidth * dpr, //截取canvas的宽度
					destHeight: imageHeight * dpr, //截取canvas的高度
					success: function(res) {
						wx.showShareImageMenu({
							path: res.tempFilePath
						})
					}
				})
			},
			// 保存图片
			savePicture() {
				// console.log('保存图片')
				const dpr = wx.getSystemInfoSync().pixelRatio
				let imageWidth = this.imageWidth
				let imageHeight = this.imageHeight
				wx.canvasToTempFilePath({ //将canvas生成图片
					canvasId: 'canvas',
					x: 0,
					y: 0,
					width: imageWidth,
					height: imageHeight,
					destWidth: imageWidth * dpr, //截取canvas的宽度
					destHeight: imageHeight * dpr, //截取canvas的高度
					success: function(res) {
						wx.saveImageToPhotosAlbum({ //保存图片到相册
							filePath: res.tempFilePath,
							success: function() {
								wx.showToast({
									title: "图片保存成功！",
									duration: 2000
								})
							}
						})
					}
				})

			},


		}
	}
</script>

<style scoped lang="scss">
	.box {
		.share_top {
			width: 660upx;
			margin: 30upx auto 0;

			.canvas_bg {}

		}

		.share_bottom {
			width: 660upx;
			margin: 60upx auto 0;
			display: flex;
			justify-content: space-around;

			.share {
				width: 180upx;
				text-align: center;

				image {
					width: 90upx;
					height: 90upx;
				}

				view {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					line-height: 30upx;
				}
			}
		}
	}
</style>
