<template>
	<view class="pathway on-pathway" :style="{ background: background }" @touchend="onEnd">
		<view class="tips">
			<text v-if="isOk" style="color: #FFFFFF;">验证通过</text>
			<text v-else>请拖动完成验证</text>
		</view>
		<view class="track" :style="{'transform':'translateX('+oldx+'px)'}"></view>
		<movable-area :animation="true">
			<movable-view class="on-track" :style="{backgroundImage: 'url(' + imageURL + ')','background-repeat':'no-repeat', 
		         backgroundSize:'100% 100%'}" :class="{'active':isOk}" 
				:x="x" direction="horizontal" @change="onMove"
				:disabled="isOk"
			></movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		name: 'move-verify',
		data() {
			return {
				x: 0,
				oldx:0,
				isOk: false,
				size: {},
				count:0,
				isMove:false,
				background: '',
				imageURL:''
			};
		},
		mounted() {
			this.style = uni.getStorageSync('style')
			this.background = this.style.loginmove
			this.imageURL = this.style.loginimg
			let getSize = (selector) => {
				return new Promise((resolve, reject) => {
					let view = uni.createSelectorQuery().in(this).select(selector);
					view.fields({
						size: true,
					}, (res) => {
						resolve(res.width);
					}).exec();
				});
			}
			this.$nextTick(() => {
				getSize(".on-pathway").then((res1) => {
					this.size.pathway = res1;
					getSize(".on-track").then((res2) => {
						this.size.track = res2;
					});
				})
			})
		},
		methods: {
			/* 滑动中 */
			onMove(e) {
				this.oldx = e.detail.x;
			},
			/* 滑动结束 */
			onEnd() {
				if (this.isOk || this.oldx<1) {
					return;
				}
				
				this.count++;
				this.x = this.oldx;
				if ((this.oldx + 3) > (this.size.pathway - this.size.track)) {
					this.isOk = true;
					this.$emit("result",{flag:true,count:this.count});
				} else {
					this.$nextTick(() => {
						setTimeout(() => {
							this.x = 0;
							this.oldx = 0;
						}, 100);
					});
					this.$emit("result",{flag:false,count:this.count});
				}
			},
			/* 重置 */
			reset(){
				this.x = 0;
				this.oldx = 0;
				this.count = 0;
				this.isOk = false;
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url('@/static/LHT/moveVerify.css');
	// @import url('@/static/DS/moveVerify.css');
	.pathway {
		// height: 80upx;
		// width: 600upx;
		// background: linear-gradient(-70deg, #0D986A, #08AE63);
		// border-radius: 80upx;
		// position: relative;
		// overflow: hidden;
		
		/* 提示信息 */
		.tips {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			line-height: 80rpx;
			text-align: center;
			color: #666;
			font-size: 32rpx;
			z-index: 3;
		}
		
		/* 滑动轨道 */
		.track {
			position: absolute;
			top: 0;
			left: 0;
			background-color: #F6F6F6;
			border-radius: 80upx;
			width: 100%;
			height: 100%;
			padding-left: 0;
			box-sizing: content-box;
			transform: translateX(0);
		}
		
		movable-area {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background: none;
			z-index: 5;
		}
		
		// movable-view {
		// 	height: 100%;
		// 	width: 100rpx;
		// 	box-sizing: border-box;
		// 	background-color: #fff;
		// 	border: #dddddd solid 1upx;
		// 	background-position: center;
		// 	background-repeat: no-repeat;
		// 	background-size: 100%;
		// 	border-radius: 80upx;
		// 	background-image: url("https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/track.png")
		// 	}
		
		// movable-view.active {
		// 	border: #7ac23c solid 1upx;
		// 	border-radius: 80upx;
		// 	background-image: url("https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/track.png")
		// 	}
		
		/* 禁止 */
		.disabled {
			position: absolute;
			z-index: 10;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
		}
	}
</style>