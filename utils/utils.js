import {
	Encrypt,
	Decrypt
} from '@/utils/crypto.js'
import md5 from '@/js_sdk/js-md5/src/md5.js'
var time = ''
var sign = ''
var userName = ''
var token = ''

// ********** 批量发布整合配置 start ************ //
/*
 * 【注意，请勿更改该配置】
 * 【如开发中需要指定orgNum 请在项目的根目录中，找到 ext.json 文件，将 orgNum 值进行更改即可】
 * 有问题咱们再沟通
 */
// var extConfig = wx.getExtConfigSync? wx.getExtConfigSync(): {}
// var orgNum = extConfig.orgNum
// uni.setStorageSync('orgNum', orgNum)

// 【如开发中需要指定baseUrl或secret 请在项目的根目录中，找到 ext.json 文件，将 baseUrl或secret 值进行更改即可】
// const baseUrl = extConfig.baseUrl
// var secret = extConfig.secret
// ********** 批量发布整合配置 end ************ //
// 测试环境
// var baseUrl= "http://10.1.33.75:9102" 
// var baseUrl= "http://192.168.1.44:9102"	
// var secret = "testSecret"
// 正式环境

var baseUrl= "https://wxapi.biotao.cn"
// var baseUrl= ""
var secret = "e2c56c04d7ea4f488159766913cdc07b"
		
var orgNum = 'swt2400'  // 生科云店	
// var orgNum='lht2201' // 北京六合通
// var orgNum='DS2202' // 西安道生
// var orgNum='JC2216' // 江西金驰

// var orgNum='shcc2205' // 上海橙诚科学仪器有限公司

// var orgNum='jz2206' // 苏州金钻称重设备系统开发有限公司

// var orgNum='bacx2210' // 北京百奥创新科技有限公司

// var orgNum='st2212' // 大连赛拓生物科技有限公司

// var orgNum='tdy2213' // 广西南宁天地扬生物科技有限公司

// var orgNum='dg2214' // 长沙鼎国生物科技有限公司

// var orgNum='DDY2215'  // 成都德鼎源生物科技有限公司

// var orgNum='XC2217'  //  学成生物科技（山东）有限公司 (初始生物)

// var orgNum='fms2218'  //  南京福麦斯生物技术有限公司 

// var orgNum='yh2223'  //  成都伊红科技有限公司

// var orgNum='sc2227'  //  安徽帅昌生物科技有限公司

// var orgNum='lc2228'  //  吉林省朗程生物科技有限公司

// var orgNum='zj2230'  //  四川知江生物科技有限公司

// var orgNum='krsx2232'  //  重庆科瑞思欣生物医药有限公司

// var orgNum='ars2233'  //  澳睿赛生物技术(上海)有限公司

// var orgNum='bn2237'  //  云南佰柠科技有限公司

// var orgNum='bf2238'  //  太原八方生物技术有限公司

// var orgNum='by2243'  //  武汉宝因生物科技有限公司

// var orgNum='mgbe2243'  //  麦格珀尔

// var orgNum='dh2250'  //  上海帝赫生物科技有限公司


export function localhost() {
	return baseUrl
}

export function getOrgNum() {
	return orgNum
}

export function request(options) {
	return new Promise((resolve, reject) => {
		userName = uni.getStorageSync('userName')
		token = uni.getStorageSync('token')
		time = new Date().getTime()
		sign = md5(secret + 'username' + userName + 'timestamp' + time + 'token' + token +'orgNum'+orgNum+ secret)
		var headers = {};
		headers['username'] = Encrypt(userName)
		headers['timestamp'] = Encrypt(time)
		headers['sign'] = Encrypt(sign)
		headers['token'] = Encrypt(token)
		headers['orgNum']=Encrypt(orgNum)
		const {url,method,data,msg,loding_hide} = options
		const header = headers
		uni.request({
			url: baseUrl + url,
			data: data || {},
			method: method || 'GET',
			header: header || {},
			timeout: 60000, //请求超时时间设置
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			},
			complete: (data) => {
				uni.hideLoading()
				if (data.data) {
					if (data.data.code == '35') {
						uni.setStorageSync('shopNum', data.data.data)
						uni.setStorageSync('code', data.data.code)
						uni.switchTab({
							url:'/pages/index/index'
						})
					} else if(data.data.code == '32'){
						uni.setStorageSync('shopNum', '')
						uni.setStorageSync('code', '')
						uni.setStorageSync('token', '')
						uni.setStorageSync('userName', '')
						uni.redirectTo({
							url:'/loginPages/indexlogin'
						})
					} else {
						uni.setStorageSync('shopNum', '')
						uni.setStorageSync('code', '')
					}
				}
			}
		})
	})
}

export function upload_file1(token,actionId,file) {
	return new Promise((resolve, reject) => {
		userName = uni.getStorageSync('userName')
		token = uni.getStorageSync('token')

		time = new Date().getTime()
		sign = md5(secret + 'username' + userName + 'timestamp' + time + 'token' + token +'orgNum'+orgNum+ secret)
		var headers = {};
		headers['username'] = Encrypt(userName)
		headers['timestamp'] = Encrypt(time)
		headers['sign'] = Encrypt(sign)
		headers['token'] = Encrypt(token)
		headers['orgNum']=Encrypt(orgNum)
		headers['Content-Type'] = 'multipart/form-data;'
		const header = headers
		// for(let i = 0;i < file.length; i++) {
		uni.uploadFile({
			url: baseUrl + '/repairs/upload?actionId=' + actionId + '&actionType=46',
			filePath:file,
			name:'file',
			// files:file,
			header: header || {},
			success: (res) => {
				var datas = JSON.parse(res.data)
				resolve(datas)
			},
			fail:(res) => {
				reject(res)
			}
		})
		// }
	})
}

// 上传文件 
export function upload_file(token, customerLeaveId,file) {
	return new Promise((resolve, reject) => {
		userName = uni.getStorageSync('userName')
		token = uni.getStorageSync('token')
		
		time = new Date().getTime()
		sign = md5(secret + 'username' + userName + 'timestamp' + time + 'token' + token +'orgNum'+orgNum+ secret)
		var headers = {};
		headers['username'] = Encrypt(userName)
		headers['timestamp'] = Encrypt(time)
		headers['sign'] = Encrypt(sign)
		headers['token'] = Encrypt(token)
		headers['orgNum']=Encrypt(orgNum)
		headers['Content-Type'] = 'multipart/form-data;'
		const header = headers
		uni.uploadFile({
			url: baseUrl + '/customerLeave/uploadCustomerLeaveImage?customerLeaveId=' + customerLeaveId,
			filePath:file,
			name:'customerLeaveFiles',
			header: header || {},
			success: (res) => {
				var datas = JSON.parse(res.data)
				resolve(datas)
			},
			fail: (res) => {
				reject(res)
			}
		})
	})
}

export function return_upload_file(token, returnedItemId, file) {
	return new Promise((resolve, reject) => {
		userName = uni.getStorageSync('userName')
		token = uni.getStorageSync('token')

		time = new Date().getTime()
		sign = md5(secret + 'username' + userName + 'timestamp' + time + 'token' + token + secret)

		var headers = {};

		headers['username'] = Encrypt(userName)
		headers['timestamp'] = Encrypt(time)
		headers['sign'] = Encrypt(sign)
		headers['token'] = Encrypt(token)
		headers['Content-Type'] = 'multipart/form-data;'
		const header = headers
		// for(let i = 0;i < file.length; i++) {
		uni.uploadFile({
			url: baseUrl + '/returned/uploadReturnedImage?returnedItemId=' + returnedItemId,
			filePath: file,
			name: 'returnedFile ',
			// files:file,
			header: header || {},
			success: (res) => {
				var datas = JSON.parse(res.data)
				resolve(datas)
			},
			fail:(res) => {
				reject(res)
			}
		})
		// }
	})
}
export function weChat_upload_file(token, file) {
	return new Promise((resolve, reject) => {
		userName = uni.getStorageSync('userName')
		token = uni.getStorageSync('token')
		time = new Date().getTime()
		sign = md5(secret + 'username' + userName + 'timestamp' + time + 'token' + token +'orgNum'+orgNum+ secret)
		var headers = {};
		headers['username'] = Encrypt(userName)
		headers['timestamp'] = Encrypt(time)
		headers['sign'] = Encrypt(sign)
		headers['token'] = Encrypt(token)
		headers['Content-Type'] = 'multipart/form-data;'
		headers['orgNum']=Encrypt(orgNum)
		const header = headers
		uni.uploadFile({
			url: baseUrl + '/wechat/weChatUploadHeadImg',
			filePath: file,
			name: 'headImgFile',
			header: header || {},
			success: (res) => {
				var datas = JSON.parse(res.data)
				resolve(datas)
			},
			fail:(res) => {
				reject(res)
			}
		})
	})
}



export function toast(options) {
	const {
		title,
		icon
	} = options
	uni.showToast({
		title: title,
		icon: icon || 'none',
		duration: 3000
	})
}
//验证手机号
export function verifyMobileNumber(phoneNum) {
	let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
	if (!reg.test(phoneNum) || !phoneNum.length == 11) {
		toast({
			title: '手机号格式不正确'
		})
		return false
	}
	return true
}
//验证密码格式
export function verifyPasswordFormat(password) {
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
	const isPassword = reg.test(password);
	if (!isPassword) {
		toast({
			title: '密码应由8-16位的数字或者字母组成'
		})
		return false
	}
	return true
}
//验证登录名 
export function verifyLoginNameFormat(value) {
	const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/;
	const isuserValue = reg.test(value);
	if (!isuserValue) {
		toast({
			title: '登录名是由4-20位的数字和字母组成'
		})
		return false
	}
	return true
}

/* 
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
export function formatRichText(html) {
	let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
		match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
		match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
		match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
		return match;
	});
	newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
		match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
		return match;
	});
	newContent = newContent.replace(/<br[^>]*\/>/gi, '');
	newContent = newContent.replace(/\<img/gi,
		'<img class="allimg" style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
	return newContent;
}

/*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs() {
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var url = currentPage.route //当前页面url
	var options = currentPage.options //如果要获取url中所带的参数可以查看options

	//拼接url的参数
	var urlWithArgs = url + '?'
	for (var key in options) {
		var value = options[key]
		urlWithArgs += key + '=' + value + '&'
	}
	urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

	return urlWithArgs
}

// 数字转汉字 
export function convertToChinaNum(num) {
	var arr1 = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九');
	var arr2 = new Array('', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千', '万', '十', '百', '千',
		'亿'); //可继续追加更高位转换值
	if (!num || isNaN(num)) {
		return "零";
	}
	var english = num.toString().split("")
	var result = "";
	for (var i = 0; i < english.length; i++) {
		var des_i = english.length - 1 - i; //倒序排列设值
		result = arr2[i] + result;
		var arr1_index = english[des_i];
		result = arr1[arr1_index] + result;
	}
	return result
}

// 毫秒转换年月日
export function chagneTimeType(time1) {
	let time = new Date(time1)
	let result = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
	return result
}
// 毫秒转换年月日时分秒
export function translateTime(time) { //将毫秒转换为年月日时分秒
	if (!time) {
		return "";
	} else {
		let date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds();
		return Y + M + D + h + m + s;
	}
}

// 超过长度变省略号
export function beautySub(str, len) {
	var reg = /[\u4e00-\u9fa5]/g, //专业匹配中文
		slice = str.substring(0, len),
		chineseCharNum = (~~(slice.match(reg) && slice.match(reg).length)),
		realen = slice.length * 2 - chineseCharNum;
	return str.substr(0, realen) + (realen < str.length ? "..." : "");
}

// 对json数据进行排序
export function JsonSort(json, key) {
	//console.log(json);
	for (var j = 1, jl = json.length; j < jl; j++) {
		var temp = json[j],
			val = temp[key],
			i = j - 1;
		while (i >= 0 && json[i][key] > val) {
			json[i + 1] = json[i];
			i = i - 1;
		}
		json[i + 1] = temp;

	}
	//console.log(json);
	return json;

}
export function widthHeight(id, _this) {
	return new Promise((resolve, reject) => {
		let result = '111'
		let query = uni.createSelectorQuery().in(_this);
		query.select('' + id).boundingClientRect(data => {
			result = data
		}).exec(() => {
			resolve(result)
		});
	})
}

export function isLogin() {
	if (uni.getStorageSync('userName') == null || uni.getStorageSync('userName') == '' ||
		uni.getStorageSync('token') == null || uni.getStorageSync('token') == '') {
		return false;
	}
	return true;
}

// 获取当前页面的 带参数的url

export function getRouter() { //此方法跟上面一个方法前四行一致，只是这里是获取路由不是拼接参数的
	var pages = getCurrentPages() //获取加载的页面
	var currentPage = pages[pages.length - 1] //获取当前页面的对象
	var router = currentPage.route //当前页面url
	wx.setStorageSync('Router', `/${router}`)
}
export function getUrl() {
  var pages = getCurrentPages() //获取加载的页面
  var currentPage = pages[pages.length - 1] //获取当前页面的对象
  var url = currentPage.route //当前页面url
  wx.setStorageSync('Router', `/${url}`)
  var options = currentPage.options //如果要获取url中所带的参数可以查看options

  //参数多时通过&拼接url的参数
  var urlWithArgs = url + '?'
  for (var key in options) {
    var value = options[key]
    urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  wx.setStorageSync('Url', `/${urlWithArgs}`)
}

export function refresh(Fun){
	Fun()
	setTimeout(()=>{
		uni.stopPullDownRefresh();
	},1000)
}