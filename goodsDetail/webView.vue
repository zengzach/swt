<template>
	<view class="">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			};
		},
		onLoad(option) {
			this.url = option.url
		},
		methods: {}
	}
</script>

<style>
</style>