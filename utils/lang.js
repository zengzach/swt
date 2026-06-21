import Vue from 'vue';
import VueI18n from 'vue-i18n'
import Cache from '@/utils/cache';

Vue.use(VueI18n)

let lang = '';
// #ifdef MP || APP-PLUS
lang = Cache.has('locale') ? Cache.get('locale') : 'zh-CN';
// #endif
// #ifdef H5
lang = Cache.has('locale') ? Cache.get('locale') : navigator.language;
// #endif
const i18n = new VueI18n({
	locale: lang,
	fallbackLocale: 'zh-CN',
	messages: uni.getStorageSync('localeJson'),
	silentTranslationWarn: true, // 去除国际化警告
})


// const i18n = new VueI18n({
//   locale: "zh", 
//   messages: {
//     zh: require('./assets/langs/zh.json'),
//     en: require('./assets/langs/en.json')
//   }
// })
// 解决兼容问题
// Vue.use(iview, {
//   i18n: (key, value) => i18n.t(key, value)
// })
 
// Vue.prototype.$plat = platService
// const vm = new Vue({
//   i18n,
//   router,
//   store: store,
//   render: h => h(App),
// }).$mount('#app')

export default i18n
