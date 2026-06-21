import { request, toast } from '@/utils/utils.js'

// 订单列表
export function orderList(pageNum,orderParam) {
	return Promise.resolve(
		request({
			url: '/order/orderList?pageNum=' + pageNum,
			data: orderParam,
			method: 'POST'
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// 订单详情
export function orderDetail(orderParam) {
	return Promise.resolve(
		request({
			url: '/order/orderDetail',
			data: orderParam,
			method: 'POST'
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


// 取消订单
export function cancelOrder(orderCode) {
	return Promise.resolve(
		request({
			url: '/order/cancelOrder?orderCode='+orderCode,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// 开票

// 签收		/order/signForOrder
export function signForOrder(orderId) {
	return Promise.resolve(
		request({
			url: '/order/signForOrder?orderId='+orderId,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// 支付		/order/orderPayment
export function orderPayment(orderCode) {
	return Promise.resolve(
		request({
			url: '/order/orderPayment?orderCode='+orderCode,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// 获取退货原因枚举

export function getRefundReasonEnum(orderCode) {
	return Promise.resolve(
		request({
			url: '/order/refund/getRefundReasonEnum?orderRefundTypeCode='+orderCode,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function orderRefundDetail(orderParam ) {
	return Promise.resolve(
		request({
			url: '/order/refund/orderDetail',
			data:orderParam ,
			method: 'POST',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function refundApply(param ) {
	return Promise.resolve(
		request({
			url: '/order/refund/apply',
			data:param ,
			method: 'POST',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function getReturnAmount(data) {
	return Promise.resolve(
		request({
			url: '/order/refund/getEffectiveReturnAmount',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}
export function getCheck(orderCode) {
	return Promise.resolve(
		request({
			url: '/order/refund/check',
			data:orderCode ,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}



export function getOrderRefundTypeEnum() {
	return Promise.resolve(
		request({
			url: '/order/refund/getOrderRefundTypeEnum',
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


// /order/refund/record
export function record(pageNum,data) {
	return Promise.resolve(
		request({
			url: '/order/refund/record?pageNum='+pageNum,
			data:data,
			method: 'POST',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}
// /order/refund/getOrderRefundDetail
export function getOrderRefundDetail(data) {
	return Promise.resolve(
		request({
			url: '/order/refund/getOrderRefundDetail',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// /order/refund/getOrderRefundStatusEnum
export function getOrderRefundStatusEnum(data) {
	return Promise.resolve(
		request({
			url: '/order/refund/getOrderRefundStatusEnum',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// 撤销申请 
export function revoke(data) {
	return Promise.resolve(
		request({
			url: '/order/refund/revoke',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


export function saveRefundLogistics(data) {
	return Promise.resolve(
		request({
			url: '/order/refund/saveRefundLogistics',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


export function confirm(data) {
	return Promise.resolve(
		request({
			url: '/order/confirm',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function reject(data) {
	return Promise.resolve(
		request({
			url: '/order/reject',
			data:data,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function getPaymentOrderDetail(orderId) {
	return Promise.resolve(
		request({
			url: '/paymentOrder/getPaymentOrderDetail?orderId='+orderId,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function getOrderOutList(orderId) {
	return Promise.resolve(
		request({
			url: '/orderOut/getOrderOutList?orderId='+orderId,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

export function getInvoiceDetail(orderId) {
	return Promise.resolve(
		request({
			url: '/historyInvoice/getInvoiceDetail?orderId='+orderId,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


export function getPayTypeList() {
	return Promise.resolve(
		request({
			url: '/paymentOrder/getPayTypeList',
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}


export function getOrderPayDetail(orderId) {
	return Promise.resolve(
		request({
			url: '/paymentOrder/getOrderPayDetail?orderId='+orderId,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

//物流轨迹
export function getLogisticsTrajectory(logisticsCompanyCode,deliveryNo) {
	return Promise.resolve(
		request({
			url: '/logistics/getLogisticsTrajectory?logisticsCompanyCode='+logisticsCompanyCode+'&deliveryNo='+deliveryNo,
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}
//获取物流公司 /order/refund/getLogisticsCompanyList
export function getLogisticsCompanyList() {
	return Promise.resolve(
		request({
			url: '/order/refund/getLogisticsCompanyList',
			method: 'GET',
		}).then((res) => {
			if (res.data.success) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}

// /orderEvaluate/getOrderEvaluateInfo 获取订单评价详情
export function orderEvaluateInfo(orderCode) {
	return Promise.resolve(
		request({
			url: '/orderEvaluate/getOrderEvaluateInfo?orderCode='+orderCode,
			method: 'GET',
		}).then((res) => {
			if (res) {
				return res.data
			} else {
				toast({ title: res.data.msg })
			}
		})
	)
}
// /orderEvaluate/saveOrderEvaluate 保存评价
export function saveOrderEvaluate(data) {
	return Promise.resolve(
		request({
			url: '/orderEvaluate/saveOrderEvaluate',
			data:data,
			method: 'POST',
		}).then((res) => {
			if (res) {
				return res.data
			} else {
				// toast({ title: res.data.msg })
			}
		})
	)
}







