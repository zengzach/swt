import CryptoJS from '@/node_modules/crypto-js/crypto-js.js'
// 默认的 KEY 与 iv 如果没有给
const keyOrigin = 'Kin4Krz4iH0Smtbf'
const ivOrigin = '8072346834802315'
const KEY = CryptoJS.enc.Utf8.parse(keyOrigin)
const IV = CryptoJS.enc.Utf8.parse(ivOrigin)

// console.log('keyOrigin', keyOrigin)
// console.log('ivOrigin', ivOrigin)
/**
 * AES加密 ：字符串 key iv 返回base64
 */
export function Encrypt(word, keyStr, ivStr) {
	var key = KEY
	var iv = IV

	if (keyStr) {
		key = CryptoJS.enc.Utf8.parse(keyStr)
		iv = CryptoJS.enc.Utf8.parse(ivStr)
	}

	var srcs = CryptoJS.enc.Utf8.parse(word)
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.ZeroPadding
	})
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 */
export function Decrypt(word, keyStr, ivStr) {
	var key = KEY
	var iv = IV

	if (keyStr) {
		key = CryptoJS.enc.Utf8.parse(keyStr)
		iv = CryptoJS.enc.Utf8.parse(ivStr)
	}

	var base64 = CryptoJS.enc.Base64.parse(word)
	var src = CryptoJS.enc.Base64.stringify(base64)

	var decrypt = CryptoJS.AES.decrypt(src, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.ZeroPadding
	})

	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
	return decryptedStr.toString()
}
