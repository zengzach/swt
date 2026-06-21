<template>
	<!-- 富文本框 -->
	<view v-show="!isSortType">
		<view class='richText' :style="'background-color:'+bgColor+';margin:'+ udConfig +'rpx '+ lrConfig +'rpx;'" v-if="description">
			  <mp-html :content="description" ref="article" :tag-style="tagStyle" />
		</view>
	</view>

</template>


<script>
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		name: 'mpHtml',
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
		components: {
			mpHtml
		},
		data() {
			return {
				tagStyle: {
					img: 'width:100%;display:block;',
					table: 'width:100%',
					video: 'width:100%'
				},
				bgColor:this.dataConfig.bgColor.color[0].item,
				lrConfig:this.dataConfig.lrConfig.val,
				description:this.dataConfig.richText.val,
				udConfig:this.dataConfig.udConfig.val
			};
		},
		created() {},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.richText{
		padding: 20rpx;
		background-color: #fff;
		margin: 0 20rpx;
		border-radius: 24rpx;
	}
	::v-deepuni-video{
		width: 100%!important;
	}
	::v-deepvideo{
		width: 100%!important;
	}
</style>
