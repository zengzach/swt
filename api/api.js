import { request ,toast} from '@/utils/utils.js'

// 登录 /passport/login
export function post_login(shuju){
	return Promise.resolve(
		request({
			url: '/passport/login',
			data: shuju,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				uni.setStorageSync('token',res.data.data.token)
				uni.setStorageSync('userName',res.data.data.userName)
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

// /passport/mobileLogin 
export function mobileLogin(shuju){
	return Promise.resolve(
		request({
			url: '/passport/mobileLogin',
			data: shuju,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				uni.setStorageSync('token',res.data.data.token)
				uni.setStorageSync('userName',res.data.data.userName)
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * /sms/getBase64CodeSlider 获取滑块验证码
 */
export function getBase64CodeSlider(data) {
	return Promise.resolve(
		request({
			url: '/sms/getBase64CodeSlider',
			data: data,
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}

/**
 * /passport/getValidationImg 获取图片验证码
 */
export function getValidationImg(data) {
	return Promise.resolve(
		request({
			url: '/passport/getValidationImg',
			data: data,
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({title: res.data.msg})
			}
		})
	)
}

/**
 * 验证图片计算结果并发送短信
 */
export function SendSms(data){
	return Promise.resolve(
		request({
			url: '/passport/validateImgCodeAndSendSms',
			data: data,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

/**
 * /sms/validateSmsVerifyCode 检验手机验证码
 */
export function validateSmsVerifyCode(shuju){
	return Promise.resolve(
		request({
			url: '/sms/validateSmsVerifyCode',
			data: shuju,
			method:'POST'
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}

// 获取地址
export function getCountryList() {
	return Promise.resolve(
		request({
			url: '/region/getAllCountry',
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		})
	)
}