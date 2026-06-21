import App from './App'
import share from '@/api/share.js'
import sharefriends from '@/api/sharefriends.js'
import i18n from './utils/lang.js';
import store from './store'
import Cache from './utils/cache'
import configs from './config/app.js'
import socket from './libs/new_chat.js'

// #ifdef MP-WEIXIN
// 初始化微信云开发
if (wx.cloud) {
  wx.cloud.init({
    env: 'cloud1-d1gdmvmst507ae4d9',  // 云开发环境ID
    traceUser: true
  })
  console.log('[云开发] 初始化成功')
} else {
  console.error('[云开发] 请使用 2.2.3 或以上的基础库')
}
// #endif
// import util from 'utils/util'

Vue.mixin(share)

Vue.mixin(sharefriends)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$Cache = Cache;
Vue.prototype.$config = configs;
Vue.prototype.$socket = new socket();
// Vue.prototype.$util = util;
// import pageLoading from './components/pageLoading.vue'
// import skeleton from './components/skeleton/index.vue'
// import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue'
// Vue.component('skeleton', skeleton)
// Vue.component('pageLoading', pageLoading)
// Vue.component('easyLoadimage', easyLoadimage)
App.mpType = 'app'

const app = new Vue({
	...App,
	store,
	Cache,
	i18n,
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import {
	SPREAD
} from './config/cache';
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}


if (urlSpread !== undefined) {
	var spread = Cache.get(SPREAD);
	urlSpread = parseInt(urlSpread);
	if (!Number.isNaN(urlSpread) && spread !== urlSpread) {
		Cache.set("spread", urlSpread || 0);
	} else if (spread === 0 || typeof spread !== "number") {
		Cache.set("spread", urlSpread || 0);
	}
}

if (vconsole !== undefined) {
	if (vconsole === md5UnCrmeb && Cache.has(cookieName))
		Cache.clear(cookieName);
} else vconsole = Cache.get(cookieName);

import VConsole from './pages/extension/components/vconsole.min.js'

if (vconsole !== undefined && vconsole === md5Crmeb) {
	Cache.set(cookieName, md5Crmeb, 3600);
	let vConsole = new VConsole();
}
// #endif


// const app = new Vue({
// 	...App,
// 	store,
// 	Cache,
// 	i18n,
// })
// app.$mount();