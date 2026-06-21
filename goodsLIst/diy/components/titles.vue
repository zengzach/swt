<template>
	<view v-show="!isSortType">
		<view v-if="titleConfig" :style="'margin:0 '+prConfig*2+'rpx;'">
			<view  @click='goPage(linkConfig)'  hover-class="none" class='title' 
				:class="[(textPosition==0?'left':textPosition==2?'right':''),(textStyle==1?'italics':textStyle==2?'blod':''), (bgStyle==0?'':'borderRadius15')]" 
				:style="'font-size:'+fontSize+'rpx;margin-top:'+mbConfig*2+'rpx;background-color:'+titleColor+';color:'+themeColor+';'">
				<div>{{titleConfig}}</div>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: 'titles',
		props: {
			dataConfig: {
				type: Object,
				default: () => {}
			},
			isSortType:{
				type: String | Number,
				default:0
			}
		},
		data() {
			return {
				fontSize:this.dataConfig.fontSize.val*2,
				linkConfig:this.dataConfig.linkConfig.value,
				mbConfig:this.dataConfig.mbConfig.val,
				textPosition:this.dataConfig.textPosition.type,
				textStyle:this.dataConfig.textStyle.type,
				titleColor:this.dataConfig.titleColor.color[0].item,
				titleConfig:this.dataConfig.titleConfig.value,
				themeColor:this.dataConfig.themeColor.color[0].item,
				prConfig:this.dataConfig.prConfig.val,
				bgStyle:this.dataConfig.bgStyle.type
			};
		},
		created() {
		},
		methods: {
			goPage(item){
				let urls = item
				// console.log(urls,"url")
				// 截取正确的跳转路径
				var linkType = urls.split('?')[0]
				
				if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
					'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass'|| 
					linkType == '/pages/integral/integral') {
					uni.switchTab({
						url: urls
					})
				} else {
					uni.navigateTo({
						url: urls
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.borderRadius15 {
		border-radius: 15rpx;
	}
	.title{
		font-size: 40rpx;
		color: #282828;
		text-align: center;
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		
		&.left{
			text-align: left;
		}
		&.right{
			text-align: right;
		}
		&.blod{
			font-weight: bold;
		}
		&.italics{
			font-style: italic;
		}
	}
	
</style>
