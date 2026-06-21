<template>
	<view class="notice_detail_html" >
		<!-- <bctos-rich-text v-if="articleDetail.context" :nodes="articleDetail.context"></bctos-rich-text> -->
		<mp-html :content="articleDetail.context" :selectable='true' :tag-style="tagStyle" />
	</view>
</template>

<script>
	import {PrivacyPolicy,Agreement} from '@/api/articleApi.js'
	import mpHtml from '@/components/mp-html/mp-html'
	export default {
		components:{
			mpHtml
		},
		data() {
			return {
				tagStyle:{img: "width:100%;display:block;", table: "width:100%", video: "width:100%"},
				articleDetail:{},
				typeDictCode:'00120006',
			}
		},
		onLoad(option) {
			this.changeTitle(option.text)
			this.policy()
			this.greement()
		},
		onPullDownRefresh() {
			setTimeout(()=>{
				 uni.stopPullDownRefresh()
			},1000)
		},
		methods: {
			changeTitle(text) {
				uni.setNavigationBarTitle({
					title: text 
				})
			},
			policy(){
				PrivacyPolicy().then(res=>{
					this.articleDetail = res.data;
				})
			},
			greement(){
				Agreement().then(res=>{
					this.articleDetail = res.data;
				})
			}
		}
	}
</script>

<style>
</style>
