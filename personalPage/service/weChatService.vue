<template>
	<view class="weChatPage">
		<view class="weChatImg">
			<image :src="urls"
				mode="widthFix"
				show-menu-by-longpress=true 
				alt="" >
		</view>
	</view>
</template>

<script>
	import {
		toast,
		getRouter,
		getUrl,
		refresh,
		getOrgNum
	} from '@/utils/utils.js'
	import moment from 'moment';
	export default {
		data() {
			return {
				// https://img1.bioyx.cn/prod/img/user/skyx/d6b7832c-a16a-4de3-ba6c-edaaab199e0f.jpeg
				urls:''
			};
		},
		onLoad(option) {
			// console.log(option,"------------")
			this.urls = option.url
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.weChatPage{
		wdith:100%;
		padding: 30upx;
		.weChatImg{
			width: 690upx;
			image{
				width: 100%;
				// height:840upx;
				border-radius: 24upx;
			}
			.weChatText{
				width: 100%;
				text-align: center;
				line-height: 60upx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #929396;
			}
		}
	}
</style>
