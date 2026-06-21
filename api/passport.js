import {
	request,
	toast
} from '@/utils/utils.js'
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
export function sendSms(shuju){
	return Promise.resolve(
		request({
			url: '/passport/sendSms',
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

/**
 * 授权注册/passport/authRegister
 */
export function register(Parameters) {
	return Promise.resolve(
		request({
			url: '/passport/register',
			data: Parameters,
			method: 'POST'
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

//   /passport/resetPassword
export function resetPassword(data) {
	return Promise.resolve(
		request({
			url: '/passport/resetPassword',
			method: 'POST',
			data: data
		}).then(res => {
			if (res.data.success) {
				return res.data
			} else {
				toast({
					title: res.data.msg
				})
			}
		}))
}

//   /passport/logout  退出登录
export function Logout() {
	return Promise.resolve(
		request({
			url: '/passport/logout',
			method: 'POST'
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

export function getDetailByOrgNum(){
	return Promise.resolve(
		request({
			url: '/orgNumInit/getDetailByOrgNum',	
			method:'GET',
		}).then((res) => {
			if(res.data.success){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// -----------------------------------------------
// 微信授权
// /wechat/weChatLogin weChatLogin
export function weChatLogin(data){
	return Promise.resolve(
		request({
			url: '/wechat/weChatLogin',	
			method: 'POST',
			data: data
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// 更换头像并上传头像
// /wechat/weChatUploadHeadImg  上传微信用户头像
export function weChatUploadHeadImg(data){
	return Promise.resolve(
		request({
			url: '/wechat/weChatUploadHeadImg',	
			method: 'POST',
			data: data
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// /wechat/weChatGetPhoneNumber  获取手机号
export function getPhoneNumber(data){
	return Promise.resolve(
		request({
			url: '/wechat/weChatGetPhoneNumber',	
			method: 'POST',
			data: data
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// 绑定手机号  /wechat/weChatBinding
export function weChatBinding(data){
	return Promise.resolve(
		request({
			url: '/wechat/weChatBinding',	
			method: 'POST',
			data: data
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}
// 解绑手机号  /wechat/weChatUnbind
export function weChatUnbind(data){
	return Promise.resolve(
		request({
			url: '/wechat/weChatUnbind',	
			method: 'GET',
			data: data
		}).then((res) => {
			if(res){
				return res.data
			}else{
				toast({title:res.data.msg})
			}
		})
	)
}