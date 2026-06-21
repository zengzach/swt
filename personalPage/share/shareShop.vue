<template>
	<view class="box">
		<view class="share_top">
			<!-- style="width:100%;height:900upx;" -->
			<canvas class="canvas_bg" canvas-id="canvas" style="width:100%;height:880upx;"></canvas>
			<!-- <image class="poster_img" :src="posterImg" mode=""></image> -->
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
import {posterImage,posterInfo} from '@/api/commonApi.js'
export default {
	data() {
		return{
			imageWidth: '',
			imageHeight: '',
			posterMsg:{},
		}
	},
	onLoad() {
		this.getPosterImage()
	},
	methods:{
		getPosterImage(){
			var data={
				weChatCodeType:0
			}
			posterInfo(data).then(res=>{
				if(res.success){
					this.posterMsg=res.data
					// console.log(res,"海报详情")
					this.drawInit()
				}
				
			})
		},
		getViewHW() {
			let info = uni.createSelectorQuery().in(this).select(".share_top");
			return new Promise((resolve, reject) => {
				const dpr = wx.getSystemInfoSync().pixelRatio//获取当前设备像素
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
			const dpr = wx.getSystemInfoSync().pixelRatio//获取当前设备像素
			this.ctx = uni.createCanvasContext('canvas')
			this.ctx.drawImage('/static/canvasBG.png', 0, 0, this.imageWidth, this.imageHeight)
			this.ctx.setTextBaseline('middle')
			var that = this;
			// 绘制店铺海报
			wx.downloadFile({
				url: that.posterMsg.shopShareBackgroundUrl,
				success: function(res) {
					that.ctx.drawImage(res.tempFilePath, 10, 10, that.imageWidth-20, 350);
					that.ctx.draw(true);
				}
			});
			// 绘制店铺图标
			wx.downloadFile({
				url: that.posterMsg.shopShareLogoUrl,
				success: function(res) {
					// 这个就是绘制圆形头像
					that.ctx.save();
					// const d = 2 * r;直径
					// const cx = x + r;圆的x轴位置
					// const cy = y + r;圆的y轴位置
					that.ctx.beginPath();
					// that.ctx.arc(cx, cy, r, 0, 2 * Math.PI);
					that.ctx.arc(40, 400, 30, 0, 2 * Math.PI);
					that.ctx.clip();
					// that.ctx.drawImage(res.tempFilePath, x, y, d, d);
					that.ctx.drawImage(res.tempFilePath, 10, 370, 60, 60);
					that.ctx.restore();
					that.ctx.draw(true);
				}
			});
			// base64转图片
			let code = that.posterMsg.weChatCodeBase64.split('base64,')[1]; // 后台返回的base64图片，没有带data:image/png;base64,的前缀。
			let src = `data:image/png;base64,${code}`;
			const fsm = wx.getFileSystemManager();  // 获取文件管理器
			code = code .replace(/\ +/g, ""); //去掉空格方法
			code = code .replace(/[\r\n]/g, "");
			const buffer = wx.base64ToArrayBuffer(code );  //  将 base64 字符串转成 ArrayBuffer 对象
			const fileName = wx.env.USER_DATA_PATH + '/share_img.jpg';  // 文件系统中的用户目录路径 （本地路径）
			// @param fileName: 文件路径
			// @param buffer : 要写入的文本或二进制数据
			// @param binary: 指定写入文件的字符编码
			fsm.writeFileSync(fileName, buffer, 'binary');  // 写入文件， 同步方法
			// console.log(fileName,"./././");  // 写入成功后就可以访问到该图片路径了
			
			// 绘制店铺二维码
			wx.downloadFile({
				url: that.posterMsg.weChatCodeUrl,
				success: function(res) {
					that.ctx.drawImage(res.tempFilePath, 190, 370, 60, 60);					
					that.ctx.draw(true);
				}
			});
			// 左侧
			that.ctx.setFontSize(15)
			that.ctx.setFillStyle('#000000')
			that.ctx.fillText(that.posterMsg.shopName, 78, 390)
			
			that.ctx.setFontSize(12)
			that.ctx.setFillStyle('#000000')
			if(that.posterMsg.shopShareDescribe){
				if(that.posterMsg.shopShareDescribe.length>=10){
					var text = that.posterMsg.shopShareDescribe.slice(0,8)+'...'
				}else{
					var text = that.posterMsg.shopShareDescribe
				}
			}else{
				var text = '一站式生物科学商...'
			}
			
			that.ctx.fillText(text, 78, 415)
			
			// 右侧
			that.ctx.setFontSize(13)
			that.ctx.setFillStyle('#666666')
			that.ctx.fillText('长按识别', 258, 390)
			
			that.ctx.setFontSize(13)
			that.ctx.setFillStyle('#666666')
			that.ctx.fillText('访问店铺', 258, 415)
			
			that.ctx.draw(true);
		
		},
		// 分享好友
		shareFriends(){
			// console.log('分享好友')
			const dpr = wx.getSystemInfoSync().pixelRatio
			let imageWidth = this.imageWidth
			let	imageHeight = this.imageHeight
			wx.canvasToTempFilePath({ //将canvas生成图片
				canvasId: 'canvas',
				x: 0,
				y: 0,
				width: imageWidth,
				height: imageHeight,
				destWidth: imageWidth*dpr, //截取canvas的宽度
				destHeight: imageHeight*dpr, //截取canvas的高度
				success: function(res) {
					wx.showShareImageMenu({
						path: res.tempFilePath
					})
				}
			})
		},
		// 保存图片
		savePicture(){
			// console.log('保存图片')
			const dpr = wx.getSystemInfoSync().pixelRatio
			let imageWidth = this.imageWidth
			let	imageHeight = this.imageHeight
			wx.canvasToTempFilePath({ //将canvas生成图片
				canvasId: 'canvas',
				x: 0,
				y: 0,
				width: imageWidth,
				height: imageHeight,
				destWidth: imageWidth*dpr, //截取canvas的宽度
				destHeight: imageHeight*dpr, //截取canvas的高度
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
		}
		
		
	}
}

</script>

<style scoped lang="scss">
	.box{
		.share_top{
			width: 660upx;
			margin:30upx auto 0;
			
			.canvas_bg{ }
			
		}
		.share_bottom{
			width: 660upx;
			margin:60upx auto 0;
			display:flex;
			justify-content:space-around;
			
			.share{
				width:180upx;
				text-align:center;
				
				image{
					width:90upx;
					height:90upx;
				}
				view{
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
