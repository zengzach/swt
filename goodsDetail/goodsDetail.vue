<template>
	<view class="" v-if="showIcon" style="margin-top: 600upx;">
		<uni-load-more status="loading" :showIcon=showIcon iconType="circle" color="#ccc"></uni-load-more>
	</view>
	<view class='productDetail' v-else>
		<view class="detail_content">
			<view class="header_text"
				:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
				<view style="margin-left:20upx;">
					<uni-icons type="back" size="20" color="#67696d" @click="back" />
				</view>
				<view class="title">
					商品详情页
				</view>
			</view>
			<view class="page-section-spacing">
				<swiper class="swiper" :interval="interval" :duration="duration">
					<swiper-item v-if="goodsInfo.videoUrl">
						<view class="swiper-item" v-if="!autoplay" @click="autoplay=true" :style="{
							'width': '750upx','height': '770upx',
							backgroundImage: 'url(' + goodsInfo.goodsPictureUrl + ')',
							backgroundSize: '100% 100%',
							'display': 'flex',
							'justify-content': 'center',
							'align-items': 'center'}">
							<image style="width: 120upx; height: 120upx;" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/pc/others/logo/playCircle.png" mode=""></image>
						</view>
						<view class="swiper-item" v-if="autoplay">
							<video :src="goodsInfo.videoUrl" controls :autoplay="autoplay"></video>
						</view>
					</swiper-item>
					<swiper-item v-for="item in goodsInfo.goodsPictures" :key="item">
						<view class="swiper-item">
							<image :src="item?item:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'" mode=""></image>
							<image v-if="goodsInfo.status==10&&!goodsInfo.isReserve&&goodsInfo.stock<=0"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/product_off_the_shelf.png"
								mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
				<view v-if="!iSsampleList&&(goodsPrice.promotionStatus == 20 || goodsPrice.promotionStatus == 10)&&goodsType != 20&&goodsType != 30&&!isGift"
					class="discount">
					<view class="product_one_price">
						<view class="price_two">￥{{goodsPrice.promotionPrice}}</view>
						<view class="price_two_view">
							{{goodsPrice.promotionLabel}}
						</view>
						<view class="price_three">￥{{goodsPrice.marketPrice}}</view>
						<view class="price_four">已抢{{goodsPrice.promotionBuyNum}}个</view>
					</view>
					<view class="product_two_price" v-if="goodsPrice.promotionStatus == 20">
						<view class="">
							距结束还剩
						</view>
						<view style="margin-top: -5upx;">
							{{countdown}}
						</view>
					</view>
					<view class="product_two_price" v-if="goodsPrice.promotionStatus == 10">
						<view class="">
							距开始还剩
						</view>
						<view style="margin-top: -5upx;">
							{{countdown1}}
						</view>
					</view>
				</view>
				<view v-if="!iSsampleList&&goodsType!=20">
					<!-- &&!goodsInfo.isReserve -->
					<view :class="iSsampleList ? 'no_product_tips' : 'no_product_tips1'"
						v-if="goodsInfo.status==10&&goodsInfo.stock<=0&&!goodsInfo.isReserve">
						<image v-if="goodsInfo.stock<=0"
							:src="!iSsampleList?'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/no_product_detail.png':''"
							mode="widthFix"></image>
						<image v-if="goodsInfo.status==5"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/product_off_the_shelf.png"
							mode="widthFix"></image>
					</view>
				</view>
				<view v-if="goodsType==20">
					<view :class="iSsampleList ? 'no_product_tips' : 'no_product_tips1'"
						v-if="goodsInfo.giftStock<=0">
						<image v-if="goodsInfo.giftStock<=0"
							:src="!iSsampleList?'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/no_product_detail.png':''"
							mode="widthFix"></image>
						<image v-if="goodsInfo.status==5"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/product_off_the_shelf.png"
							mode="widthFix"></image>
					</view>
				</view>
			</view>
			<view class="product_msg_one">
				<view class="product_one_price" v-if="iSsampleList||goodsType==30">
					<view class="price_one">￥</view>
					<view class="price_two">0</view>
				</view>
				<view class="product_one_price" v-if="goodsType==20">
					<view class="price_one" style="font-weight: 400;font-size:30upx;" v-if="goodsPrice.promotionStatus !== 20&&goodsPrice.promotionStatus !== 10">
						价值￥</view>
					<view class="price_two" v-if="goodsPrice.promotionStatus !== 20&&goodsPrice.promotionStatus !== 10">
						{{goodsPrice.price}}
					</view>
					<view class="getIntegral2">赠</view>
				</view>
				<view class="product_one_price" v-if="!iSsampleList&&goodsType!=20&&goodsType!=30">
					<view v-if="goodsPrice.price">
						<view class="price_one" v-if="goodsPrice.promotionStatus !== 20&&goodsPrice.promotionStatus !== 10">
							￥</view>
						<view class="price_two" v-if="goodsPrice.promotionStatus !== 20&&goodsPrice.promotionStatus !== 10">
							{{goodsPrice.price}}
						</view>
					</view>
					<view class="price_one" v-if="!goodsPrice.price">
						询价
					</view>
					<view class="marketPriceContent"
						v-if="goodsPrice.price!=0&&goodsPrice.marketPrice!=0&&goodsPrice.promotionStatus !== 20&&goodsPrice.promotionStatus !== 10">
						<span>￥</span>
						<view class="marketPrice">
							{{goodsPrice.marketPrice}}
						</view>
					</view>
					<!-- <view class="sharePrice">
						分享两位好友可得<span>100</span>积分>
					</view> -->
				</view>
				<view class="product_name">{{goodsInfo.goodsTitle}}</view>
				<view class="goodsDescribe" v-if="goodsInfo.goodsDesc">{{goodsInfo.goodsDesc}}</view>
				<view class="product_msg_two">
					<view class="product_mag_two01">
						<view class="product_two_item">
							<view class="pro_item_value">{{goodsInfo.artNo}}</view>
							<view class="pro_item_lable">货号</view>
						</view>
						<view class="product_two_item">
							<view class="pro_item_value">{{goodsInfo.brandName}}</view>
							<view class="pro_item_lable">品牌</view>
						</view>
						<view class="product_two_item">
							<view class="pro_item_value">
								{{goodsInfo.specification==''||goodsInfo.specification==null?'暂无产品规格':goodsInfo.specification}}
							</view>
							<view class="pro_item_lable">产品规格</view>
						</view>
					</view>
				</view>
			</view>
			<view class="product_msg_three">
				<view class="product_msg_item" @click="openMultiformat" v-if="goodsGroup != ''&&goodsType != 30&&goodsType != 20&&!iSsampleList">
					<view class="pro_item3_lable" style="font-weight: bold;color: #202021;width: 122upx;">已选择</view>
					<view class="pro_item3_value specification" style="width: 330upx;padding-left: 20upx;">
						{{specificationss=='' ? goodsInfo.specification : specificationss}}
					</view>
					<view class="" style="width: 270upx;display: flex;margin-left: 140upx;box-sizing: content-box;">
						<view class="pro_item3_lable" style="text-align: right;">{{goodsGroupData.length}}个可选</view>
						<image style="width: 24upx;height: 24upx;margin-top: 10upx;margin-left: -10upx;"
							src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/moreMsg.png" mode="">
						</image>
					</view>

				</view>
				<view class="product_msg_item" @click="opengoodsMsg">
					<view class="pro_item3_lable">基础信息</view>
					<view class="pro_item3_value">
						产品单位 / 起订量 / 仓库 / 包装规格
					</view>
					<image style="width: 24upx;height: 24upx;margin-left: 90upx;margin-top: 10upx;"
						src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/moreMsg.png" mode=""></image>
				</view>
				<view class="product_msg_item" @click="opengoodsAtt">
					<view class="pro_item3_lable">商品属性</view>
					<view class="pro_item3_value" v-for="(item,key) in goodsInfo.goodsAttrMap" :key="item">
						{{key}}/
					</view>
					<view class="pro_item3_value" v-if="goodsInfo.goodsAttrMap==null">暂无商品属性</view>
				</view>
				<view class="product_msg_item">
					<view class="pro_item3_lable">库存</view>
					<!-- v-if="iSsampleList" sampleStock 样品 -->
					<!-- v-if="goodsType==20" giftStock 赠品 -->
					<!-- v-if="!iSsampleList&&goodsType!=20" 正常品 -->
					<view class="" v-if="iSsampleList">
						<view class="pro_item3_value">
							{{goodsInfo.sampleStock?goodsInfo.sampleStock:0}}{{goodsInfo.saleUnitName}}
						</view>
					</view>
					<view class="" v-if="goodsType==20">
						<view class="pro_item3_value">
							{{goodsInfo.giftStock?goodsInfo.giftStock:0}}{{goodsInfo.saleUnitName}}
						</view>
					</view>
					<view class="" v-if="!iSsampleList&&goodsType!=20">
						<view class="pro_item3_value" v-if="goodsInfo.isReserve">
							0{{goodsInfo.saleUnitName}}
						</view>
						<view class="pro_item3_value" v-else>
							{{goodsInfo.stock?goodsInfo.stock:0}}{{goodsInfo.saleUnitName}}
						</view>
					</view>
					<view class="stock_tips" v-if="goodsInfo.isReserve&&goodsInfo.stock<=0">
						库存不足时可预订，预计15天交货
					</view>
				</view>
			</view>
			<!-- 优惠券 -->
			<view class="discounts" v-if="!isShowCouponList&&goodsType!=20&&goodsType!=30&&!isGift&&goodsPrice.price">
				<scroll-view class="discountsList" scroll-y="true" show-scrollbar="false">
					<view class="discountsItem" v-for="(item,index) in goodsInfo.couponList" :key="index" @click="receiveCoupon(item)">
						<view class="price" v-if="item.couponType==1">
							￥<text>{{item.discountAmount}}</text>
							<view class="price_left">{{item.couponName}}</view>
						</view>
						<view class="price" v-if="item.couponType==2">
							<text>{{item.discountRate*10}}</text>折
							<view class="price_left">{{item.couponName}}</view>
						</view>
						<view class="price_center">
							<view class="discountsDetail_one">{{item.couponType==1?'满减券':'折扣券'}}</view>
							<view class="discountsDetail_two" v-if="item.useType==1">全部商品可用</view>
							<view class="discountsDetail_two" v-if="item.useType==2">指定商品可用</view>
							<view class="discountsDetail_two" v-if="item.useType==3">指定商品不可用</view>
							<view class="discountsDetail_three">{{item.startTime}}-{{item.endTime}}</view>
						</view>
						<view class="price_right" v-if="!item.isReceived">
							<view style="margin-top: 30upx;">立</view>
							<view>即</view>
							<view>领</view>
							<view>取</view>
						</view>
						<view class="price_right" v-else>
							<view style="margin-top: 45upx;">已</view>
							<view>领</view>
							<view>取</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 评价 -->
			<view class="comment">
				<view class="commentTitle">商品评价（{{reatListNum}}）</view>
				<view class="comment_list" v-if="reatList.length">
					<view class="commentLists" v-for="item in reatList" :key="item.id">
						<view class="commentAutor">
							<view class="commentAutor_">
								<image style="background-color: #C0C4CC;" 
									:src="item.headImg?item.headImg:'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'" mode="">
								</image>
								<view class="autorText">{{item.mobile}}</view>
								<uni-rate class="uni_rate" size="18" :readonly="true" :value="item.rate" />
							</view>
							<view class="comment_timer">{{item.createTime}}</view>
						</view>
						<view class="comment_content">	
							<view class="comment_text">
								{{item.suggestion}}	
							</view>
							<view class="comment_image">
								<image v-for="(items,index) in item.imageUrlList" :key="index" 
									@click="checkImg(item.imageUrlList,index)"
									style="width: 130upx;height: 130upx;" 
									:src="items" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<view class="comment_more" @click="toCommentList()"> 查看更多>> </view>
				</view>
				<view class="noComment" v-else>暂无评价</view>	
			</view>
			<!-- 详情 -->
			<view class="product_image" v-if="goodsInfo.goodsContent">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/goodsdetail_img.png"
					mode="widthFix"></image>
			</view>
			<view class="product_detail" v-if="goodsInfo.goodsContent">
				<mp-html :content="goodsInfo.goodsContent" :selectable='true' :tag-style="tagStyle" />
				<!-- <jyf-parser :html="goodsInfo.goodsContent" :selectable='true' :tag-style="tagStyle" /> -->
			</view>
		</view>
		<view class="detail_footer">
			<view class="cart" @click="goCart">
				<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/product/cart.png"
					mode="widthFix"></image>
				<text style="width:100upx;text-align: center;">购物车</text>
			</view>
			<view class="collect">
				<image v-if="flag" @click="collection(goodsInfo.goodsId)"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/collect.png" mode="widthFix">
				</image>
				<image v-else @click="delCollection(goodsInfo.goodsId)"
					src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/collect_org.png" mode="widthFix">
				</image>
				<text>收藏</text>
			</view>
			<view class="getBuyContent" v-if="goodsInfo.isSampleRepeatOrder==1&&iSsampleList" @click="goApply">
				<view class="sampleRequest" style="background-color: #C0C4CC;border-radius: 35upx;">
					已申请样品
				</view>
			</view>
			<view class="getBuyContent" v-else-if="goodsInfo.sampleStock<=0&&iSsampleList">
				<view class="sampleRequest" style="background-color: #C0C4CC;border-radius: 35upx;">
					样品无库存
				</view>
			</view>
			<view class="getBuyContent" :style="{ background: background }"
				v-else-if="(goodsInfo.isHaveSample==0&&iSsampleList&&goodsInfo.isSampleRepeatOrder==0) || goodsType == 30"
				@click="goApply">
				<view class="sampleRequest">
					样品申请
				</view>
			</view>
			<view class="getBuyContent" :style="{ background: background }" v-else-if="goodsType == 20 || isGift">
				<view class="sampleRequest" @click="goApply">
					免费领取
				</view>
			</view>
			<view class="" v-else>
				<view class="getBuyContent" :style="{ background: background }" v-if="goodsInfo.isCanBuy&&goodsInfo.goodsPrice.price">
					<view class="addCartBtn" :style="{ color: color }" @click="openAddCartPopup('购物车')">
						加入购物车
					</view>
					<view class="getBuy" @click="GetCartBtn('立即购买')">
						立即购买
					</view>
				</view>
				<view class="getBuyContent2" v-if="!goodsInfo.isCanBuy&&goodsInfo.goodsPrice.price">
					<view class="addCartBtn2">
						加入购物车
					</view>
					<view class="getBuy2">
						立即购买
					</view>
				</view>
				<view class="getBuyContent" :style="{ background: background }" v-if="goodsInfo.goodsPrice.price==0">
					<view class="sampleRequest" @click="toInquiry">
						立即询价
					</view>
				</view>
			</view>

		</view>
		<uni-popup class="add_popup" ref="addCartPopup">
			<!-- 加购 -->
			<view class="addCartPopup">
				<view class="addCartTitle">
					<view class='addCartText'>
						{{cartflag == true ? '加入购物车' : goodsflag == true ? '基础信息' :  '商品属性' }}
					</view>
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="closeCartPopup"></image>
				</view>
				<view class="addCartMsg" v-if="cartflag">
					<view class="addCartMsgItem">
						<view class="addCartMsgItemLable">数量：</view>
						<view class="pro_bottom_addNum">
							<uni-number-box v-model="num" @blur="blur($event)"
								:value="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock"
								:min="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock"
								:max="goodsInfo.isReserve ? goodsInfo.maxOrderBuy : goodsInfo.stock"></uni-number-box>
						</view>
					</view>
				</view>
				<view v-if="cartflag">
					<view class="product_msg_item">
						<view class="product_msg_item_flex">
							<view class="pro_item3_lable">
								库存{{goodsInfo.stock}}{{goodsInfo.saleUnitName}}</view>
						</view>
					</view>
					<view class="stock_tips" v-if="goodsInfo.isReserve">库存不足时可预订，预计15天交货</view>
				</view>

				<view class="msg" v-if="goodsflag">
					<view class="msg_one">
						<view class="views">产品单位 ：</view>
						<view class="vie">{{goodsInfo.goodsUnit}}</view>
					</view>
					<view class="msg_one">
						<view class="views">起订量 ：</view>
						<view class="vie">{{goodsInfo.minOrderBuy}}{{goodsInfo.saleUnitName}}</view>
					</view>
					<view class="msg_one">
						<view class="views">仓库 ：</view>
						<view class="vie">{{goodsInfo.warehouseName}}</view>
					</view>
					<view class="msg_one">
						<view class="views">包装规格 ：</view>
						<view class="vie">{{goodsInfo.packDesc}}
						</view>
					</view>
				</view>
				<view class="msg" v-if="msgflag" v-for="(item,key) in goodsInfo.goodsAttrMap" :key="item">
					<view class="msg_one">
						<view class="views">{{key}}:</view>
						<view class="vie">{{item}}</view>
					</view>
				</view>
				<view class="addCartBtnover" :style="{ background: background }" v-if="cartflag"
					@click="addGoodsToCart">
					<text>确定</text>
				</view>
				<view class="addCartBtnover" :style="{ background: background }" v-if="goodsflag==true||msgflag==true"
					@click="closeCartPopup">
					<text>完成</text>
				</view>
			</view>

		</uni-popup>
		<!-- 单规格立即购买弹窗 -->
		<uni-popup v-if="goodsInfo.isCanBuy" class="buyPopup" ref="getCartPopup">
			<view class="buyPopupContent">
				<view class='buyPopupText'>
					立即购买
				</view>
				<view class="buyNumberContent">
					<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
						mode="widthFix" @click="CancleGetCartBtn"></image>
					<view class="buyNumber">
						数量:
					</view>
					<view class="numberBox">
						<uni-number-box v-model="num" @blur="blur($event)"
							:min="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock"
							:max="goodsInfo.isReserve ? goodsInfo.maxOrderBuy : goodsInfo.stock"
							:value="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock">
						</uni-number-box>
					</view>
					<view class="tips">
						<view class="stock_tips" v-if="goodsInfo.isReserve">库存不足时可预订，预计15天交货</view>
					</view>

				</view>
				<view class="getGobuyOnce" :style="{ background: background }" @click="goAccount">
					立即购买
				</view>
			</view>
		</uni-popup>
		<!-- 多规格开始 -->
		<uni-popup ref="multiformat" class="multiformat" :mask-click="false">
			<view class="multiformatAll">
				<view class="price">
					<view class="left" v-if="goodsPrice.promotionStatus == 20">
						<span>￥{{goodsPrice.promotionPrice}}</span>
						<span>￥{{goodsPrice.price}}</span>
					</view>
					<view class="left" v-else>
						<view class="" v-if='goodsPrice.price'>
							<span>￥{{goodsPrice.price}}</span>
							<span>￥{{goodsPrice.marketPrice}}</span>
						</view>
						<view class="" v-else>
							<span>询价</span>
						</view>
					</view>
					<view class="right">
						<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/add_cart_close.png"
							mode="widthFix" @click="Canclemultiformat" style="width: 26upx;height: 26upx;"></image>
					</view>
				</view>
				<view class="selected">
					<view class="stock_tips" v-if="goodsInfo.isReserve">库存不足时可预订，预计15天交货</view>
					已选择：{{specificationss=='' ? goodsInfo.specification : specificationss}}
				</view>
				<view class="specification"> 规格 </view>
				<scroll-view scroll-y="true">
					<view class="specificationDetail">
						<view class=""
							:style="{color: specifications==item.id ? color : '',background:specifications==item.id ? background1 : ''}"
							@click="selectSpecification(item)" v-for="item in goodsGroupData" :key='item.id'>
							{{item.specification}}
						</view>
					</view>
				</scroll-view>
				<view class="number">
					<view class="">
						数量
					</view>
					<uni-number-box v-model="num" @blur="blur($event)"
						:value="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock"
						:min="goodsInfo.stock>goodsInfo.minOrderBuy?goodsInfo.minOrderBuy:goodsInfo.stock"
						:max="goodsInfo.isReserve ? goodsInfo.maxOrderBuy : goodsInfo.stock"></uni-number-box>
				</view>
				<view class="remain">
					剩余：{{goodsInfo.stock}}箱
				</view>
				<view class="" v-if="goodsPrice.price">
					<view class="button" v-if="!isGoodsGroup">
						<view class="addGoodsCar" v-if="addGoodsCar"
							:style="{ background: background }" @click="addGoodsCars">
							加入购物车
						</view>
						<view class="purchaseNow" v-if="purchaseNow"
							:style="{ background: background }" @click="purchaseNows">
							立即购买
						</view>
					</view>
					<view class="button2" :style="[{ background: background },{border: '1px solid'+ color}]" v-if="isGoodsGroup">
						<view class="addGoodsCar"
							:style="[{color: color}]" @click="addGoodsCars">
							加入购物车
						</view>
						<view class="purchaseNow" @click="purchaseNows">
							立即购买
						</view>
					</view>
				</view>
				<view class="" v-else>
					<view class="button">
						<view class="addGoodsCar" :style="{ background: background }" @click="toInquiry()"> 询价 </view>
					</view>
				</view>
				
			</view>
		</uni-popup>
		<!-- 多规格结束 -->
		<view class="applySample" v-if="isShow||(!iSsampleList&&goodsInfo.isHaveSample==0)">
			<view v-if="isShow" @click="toShareGoods" style="width: 46upx;margin: 28upx auto 0;">
				<image style="width: 46upx;height: 46upx;"
					:src="shareIcon?shareIcon:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/index_share.png'">
				</image>
				<view class="applySampleText">
					分享
				</view>
			</view>
			<view v-if="!iSsampleList&&goodsInfo.isHaveSample==0&&goodsType != 30&&goodsType != 20&&!isGift" @click="goApply"
				style="width: 46upx;margin: 28upx auto 0;">
				<image style="width: 46upx;height: 46upx;"
					:src="appIconList.fileList == null ? 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/newPcBack/sample.png' : appIconList.fileList[0].url">
				</image>
				<view class="applySampleText">
					样品申请
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getStyleById,receiveCoupon,getPersonNumber
	} from '@/api/indexApi'
	import moment from 'moment';
	import "@/static/LHT/goodsDetail.css"
	import {
		getGoodsDetail,
		goodsEvaluatePageList,
		settleBuyNow,
		getGoodsGroupDetail
	} from '@/api/goodsDetailApi.js'
	import {
		delCollectionGoods,
		collectionGoods
	} from '@/api/collectionApi.js'
	import {
		AddCartGoods,
		settleCheck,
	} from '@/api/cartApi.js'
	import {
		getAppIcon,
		shareIcon,
		getActivityGoods,
		showShareButton
	} from '@/api/commonApi.js'
	import {
		toast,
		getUrl,
		refresh,
		getRouter
	} from '@/utils/utils.js'
	import parser from "@/components/jyf-parser/jyf-parser";
	import mpHtml from '@/components/mp-html/mp-html'	
	export default {
		components:{
			mpHtml,
			"jyf-parser":parser
		},
		data() {
			return {
				tagStyle:{img: "width:100%;display:block;", table: "width:100%", video: "width:100%"},
				commentFlag:true,
				flag: true,
				cartflag: false,
				msgflag: false,
				goodsflag: false,
				id: null,
				goodsInfo: {},
				interval: 2000,
				duration: 500,
				goodsPrice: {},
				num: '',
				flage: false,
				BuyNowData: {},
				iSsampleList: false,
				isShowCouponList:false,
				appIconList: [],
				isGoodsGroup:false,
				addGoodsCar: false,
				purchaseNow: false,
				goodssId: '',
				goodsGroup: '',
				goodsGroupData: [],
				specifications: '',
				specificationss: '',
				isTrue: true,
				countdown: '',
				countdown1: '',
				day: '',
				time: '',
				minute: '',
				second: '',
				timer: null, //重复执行,
				isDiscount: '',
				isShow: null,
				shareIcon: '',
				style: {},
				background: '',
				background1: '',
				color: '',
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				type: '',
				isSample: '',
				showIcon: true,
				goodsType: null,
				isGift: '',
				pageNum:1,
				pageSize:20,
				reatList:[],
				reatListNum:'',
				autoplay:false,
			}
		},
		created() {
			this.getAppIconList()
		},
		onShow() {
			this.getStyleByIdList()
		},
		onLoad(option) {
			this.getPersonNumbers()
			this.style = uni.getStorageSync('style')
			this.color = this.style.loginbtn
			this.background = this.style.addressadd
			this.background1 = this.style.goodsListaa
			this.iSsampleList = option.iSsampleList
			if(option.isShowCouponList){//从样品列表带过来的
				this.isShowCouponList = option.isShowCouponList
			}
			this.id = option.goodsId
			this.type = option.type
			this.isSample = option.isSample
			this.goodsType = option.goodsType
			if (option.isGift) {
				this.isGift = option.isGift
				this.goodsType = 20
			}
			getUrl()
			var token = uni.getStorageSync("token")
			var userName = uni.getStorageSync("userName")
			if (token && userName) {
				this.flage = true
			} else {
				this.flage = false
			}
			// this.getdetail()
			this.getDataMsg()
			this.getHeight()
			setTimeout(() => {
				this.showIcon = false
			}, 100)
		},
		// 下拉刷新
		onPullDownRefresh() {
			refresh(this.getDataMsg)
		},
		methods: {
			getStyleByIdList() {
				getStyleById().then(res => {
					this.style = res.data
					this.color = this.style.loginbtn
					this.background = this.style.addressadd
					this.background1 = this.style.goodsListaa
					// console.log(this.style,'styles')
				})
			},
			// 返回
			back() {
				var isGoodList = uni.getStorageSync('isGoodList')
				if (this.type == 1) {
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (this.type == 2) {
					uni.navigateTo({
						url: '/goodsDetail/samplePage/samplePage'
					})
				} else if (this.type == 3) {
					uni.redirectTo({
						url: '/goodsDetail/COA/productsCross'
					})
				} else if(isGoodList) {
					uni.navigateBack({
						data:1
					})
				}else{
					uni.switchTab({
						url: '/pages/index/index'
					})
				}

			},
			// 获取访客数量
			getPersonNumbers() {
				// wx.login({
					//成功放回
					// success: (res) => {
						// let code = res.code
						getPersonNumber().then(res => {})
					// }
				// })
			},
			// 获取头部相关信息
			getHeight() {
				//  获取状态栏信息
				let stateHeight = 0; //  接收状态栏高度
				const navHeight = wx.getMenuButtonBoundingClientRect().height; //  获取胶囊高度
				let top = 0;
				wx.getSystemInfo({
					success(res) {
						stateHeight = res.statusBarHeight;
					},
				});
				top = wx.getMenuButtonBoundingClientRect().top - stateHeight; //  获取top值
				this.menuButtonInfo = navHeight
				this.statusBarHeight = stateHeight + top
			},

			// 获取分享icon
			getShareIcon() {
				shareIcon().then(res => {
					this.shareIcon = res.data
				})
			},
			// 是否显示分享icon
			isShowShareButton() {
				showShareButton().then(res => {
					this.isShow = res.data.shareBtn
				})
			},
			// 分享
			toShareGoods() {
				if (this.flage) {
					uni.navigateTo({
						url: '/personalPage/share/shareGoods?sample=' + this.iSsampleList + '&discount=' + this
							.isDiscount + '&id=' + this.goodsInfo.id + '&goodsType=' + this.goodsType + '&isGift=' + this.isGift
					})
				}
				 else {
					uni.navigateTo({
						url: '/loginPages/indexlogin'
					})
				}

			},
			showtime() {
				if (this.goodsPrice.promotionStartTime !== null) {
					this.goodsPrice.promotionStartTime = this.goodsPrice.promotionStartTime.replaceAll('-', '/')
				}
				if (this.goodsPrice.promotionEndTime !== null) {
					this.goodsPrice.promotionEndTime = this.goodsPrice.promotionEndTime.replaceAll('-', '/')
				}
				if (this.goodsPrice.promotionStatus == 20) {
					var nowtime = new Date(), //获取当前时间
						endtime = new Date(this.goodsPrice.promotionEndTime); //定义结束时间
					var lefttime = endtime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
						leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
						lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
						leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
						lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
					if (lefth < 10) {
						this.countdown = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
					} else {
						this.countdown = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
					}

					this.day = leftd; //返回天 
					this.time = lefth; //返回时
					this.minute = leftm; //返回分
					this.second = lefts; //返回秒
				} else if (this.goodsPrice.promotionStatus == 10) {
					var nowtime = new Date(), //获取当前时间
						starttime = new Date(this.goodsPrice.promotionStartTime); //定义结束时间
					var lefttime = starttime.getTime() - nowtime.getTime(), //距离结束时间的毫秒数
						leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
						lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
						leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
						lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
					if (lefth < 10) {
						this.countdown1 = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
					} else {
						this.countdown1 = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
					}
					// console.log(this.countdown1,'countdown1')
					this.day = leftd; //返回天 
					this.time = lefth; //返回时
					this.minute = leftm; //返回分
					this.second = lefts; //返回秒
				}
			},
			getAppIconList() {
				getAppIcon().then(res => {
					if (res.success) {
						this.appIconList = res.data[6];
						// console.log(this.appIconList,'123111')
					}
				})
			},
			getDataMsg() {
				this.getdetail()
				this.isShowShareButton()
				this.getShareIcon()
				getRouter();
				this.timer = setInterval(() => {
					this.showtime();
				}, 500);
			},
			blur(e) {
				if (e.detail.value == "") {
					e.detail.value = this.goodsInfo.minOrderBuy
				}
			},
			// 商品详情信息
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			getdetail() {
				getGoodsDetail({goodsId: this.id}).then(res => {
					this.flag = !res.data.isCollection
					this.goodsContentList = res.data.goodsContent
					this.goodsPrice = res.data.goodsPrice
					this.num = res.data.minOrderBuy
					this.isDiscount = res.data.goodsPrice.promotionStatus == 20 || res.data.goodsPrice.promotionStatus == 10
					this.goodssId = res.data.id
					this.goodsGroup = res.data.goodsGroup
					if (this.isTrue) {
						var data = {
							goodsId: this.goodssId,
							goodsGroup: this.goodsGroup
						}
						getGoodsGroupDetail(data).then(res => {
							this.goodsGroupData = res.data
						})
					}
					if(res.data.couponList){
						res.data.couponList.forEach(item => {
							item.startTime = moment(res.data.startTime).format('YYYY.MM.DD HH:mm:ss')
							item.endTime = moment(res.data.endTime).format('YYYY.MM.DD HH:mm:ss')
						})
					}
					this.goodsInfo = res.data;
					this.getGoodsEvaluatePageList()
				});
			},
			// 获取评论数据
			getGoodsEvaluatePageList(){
				var data={
					pageNum:this.pageNum,
					pageSize:this.pageSize,
					artNo:this.goodsInfo.artNo
				}
				goodsEvaluatePageList(data).then(res=>{
					if(res.success){
						this.reatListNum = res.data.total
						if(res.data.list){
							res.data.list.forEach(item=>{
								item.createTime = moment(item.createTime).format('YYYY.MM.DD HH:mm:ss')
								item.createTime = item.createTime.split(' ')[0]
								var str1 = item.mobile.slice(0,3)
								var str2 = item.mobile.slice(-4)	
								item.mobile = str1+'****'+str2
							})
							this.reatList = res.data.list.slice(0,2)
						}
					}
				})
			},
			// 查看评论图片
			checkImg(list,index) {
				wx.previewImage({
					urls: list, //需要预览的图片http链接列表，注意是数组
					current: '' + list[index], // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			// 评论-查看更多
			toCommentList(){
				uni.navigateTo({
					url:'/goodsDetail/commentList?artNo='+this.goodsInfo.artNo
				})
			},
			// 领取优惠券
			receiveCoupon(item){
			    var token = uni.getStorageSync('token')
			    if(token){
			    	var data={
			    		couponId:item.id
			    	}
			    	receiveCoupon(data).then(res=>{
			    		if(res.success){
			    			toast({
			    				title:'领取成功'
			    			})
			    			item.isReceived=true
			    		}else{
			    			toast({
			    				title:res.msg
			    			})
			    		}
			    	})
			    }else{
			    	uni.showModal({
			    		title: '提示',
			    		content: '未登录不能领取优惠券，是否去登录？',
			    		success: function(res) {
			    			if (res.confirm) {
			    				uni.navigateTo({
			    					url: '/loginPages/indexlogin'
			    				})
			    			} else if (res.cancel) {
			    				console.log('用户点击取消');
			    			}
			    		}
			    	})
			    }
			},
			// 打开多规格弹窗
			openMultiformat() {
				this.isGoodsGroup = true
				this.$refs.multiformat.open('bottom')
				var data = {
					goodsId: this.goodssId,
					goodsGroup: this.goodsGroup
				}
				getGoodsGroupDetail(data).then(res => {
					this.goodsGroupData = res.data
				})

				this.specifications = this.goodssId

			},
			// 关闭多规格弹窗
			Canclemultiformat() {
				// this.addGoodsCar = true
				// this.purchaseNow = true
				this.isGoodsGroup = false
				this.isTrue = true
				this.$refs.multiformat.close();
			},
			// 选则规格
			selectSpecification(item) {
				this.specificationss = item.specification
				this.specifications = item.id;
				this.isTrue = false;
				this.id = item.id;
				this.getdetail();
			},
			addGoodsCars() {
				this.cartflag = true
				this.addGoodsToCart();
			},
			// addGoodsCarss() {
			// 	this.cartflag = true
			// 	this.addGoodsToCart();
			// },
			purchaseNows() {
				this.getsettleBuyNow()
			},
			// purchaseNowss() {
			// 	this.getsettleBuyNow()
			// },
			//去购买弹框
			CancleGetCartBtn() {
				this.$refs.getCartPopup.close()
			},
			goApply() {
				if (this.goodsInfo.isSampleRepeatOrder && this.goodsType != 20) {
					toast({
						title: '已申请样品'
					})
				} else if (this.goodsType == 20 || this.isGift == 'true') {
					var data = {
						goodsIds: [this.goodsInfo.id],
						wareHouseIds: [this.goodsInfo.warehouseId],
						orderType: 4
					}
					uni.navigateTo({
						url: '/goodsDetail/samplePage/applySample?goodsIds=' + JSON
							.stringify(
								data.goodsIds) +
							'&wareHouseIds=' + JSON.stringify(data
								.wareHouseIds) + '&orderType=' + data.orderType +
							'&goodsType=' + this.goodsType
					})
				} else {
					var data = {
						goodsIds: [this.goodsInfo.id],
						wareHouseIds: [this.goodsInfo.warehouseId],
						orderType: 2
					}
					if (this.isSample == 1) {
						uni.navigateTo({
							url: '/goodsDetail/samplePage/applySample?goodsIds=' + JSON
								.stringify(
									data.goodsIds) +
								'&wareHouseIds=' + JSON.stringify(data
									.wareHouseIds) + '&orderType=' + data.orderType + "&isSample=1" +
								'&goodsType=' + this.goodsType
						})
					} else {
						uni.navigateTo({
							url: '/goodsDetail/samplePage/applySample?goodsIds=' + JSON
								.stringify(
									data.goodsIds) +
								'&wareHouseIds=' + JSON.stringify(data
									.wareHouseIds) + '&orderType=' + data.orderType +
								'&goodsType=' + this.goodsType
						})
					}

				}

			},
			//打开去购买弹框
			GetCartBtn(name) {
				if (this.flage) {
					if (this.goodsGroup == '') {
						this.$refs.getCartPopup.open('bottom')
					} else {
						this.addGoodsCar = false
						this.purchaseNow = true
						this.$refs.multiformat.open('bottom')
						var data = {
							goodsId: this.goodssId,
							goodsGroup: this.goodsGroup
						}
						getGoodsGroupDetail(data).then(res => {
							this.goodsGroupData = res.data
						})
						this.specifications = this.goodssId
					}


				} else {
					uni.showModal({
						title: '提示',
						content: '未登录不能' + name + '，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 关闭弹窗
			closeCartPopup() {
				this.$refs.addCartPopup.close()
			},
			// 打开弹窗
			openAddCartPopup(name) {
				if (this.flage) {
					this.msgflag = false
					this.goodsflag = false
					this.cartflag = true
					if (this.goodsGroup == '') {
						this.$refs.addCartPopup.open('bottom')
					} else {
						this.addGoodsCar = true
						this.purchaseNow = false
						this.$refs.multiformat.open('bottom')
						var data = {
							goodsId: this.goodssId,
							goodsGroup: this.goodsGroup
						}
						getGoodsGroupDetail(data).then(res => {
							this.goodsGroupData = res.data
						})
						this.specifications = this.goodssId
					}

				} else {
					uni.showModal({
						title: '提示',
						content: '未登录不能加入' + name + '，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})

							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}

			},
			// 打开基础信息
			opengoodsMsg() {
				this.goodsflag = true
				this.cartflag = false
				this.msgflag = false
				this.$refs.addCartPopup.open('bottom')
			},
			// 打开商品属性
			opengoodsAtt() {
				this.msgflag = true
				this.goodsflag = false
				this.cartflag = false
				this.$refs.addCartPopup.open('bottom')
			},
			// 加购
			addGoodsToCart() {
				if (this.cartflag == true) {
					var options = {
						goodsId: this.id,
						num: this.num,
						id: this.goodsInfo.id
					}
					AddCartGoods(options).then(res => {
						if (res.success) {
							this.closeCartPopup()
							this.Canclemultiformat()
							toast({
								title: '加入购物车' + res.msg
							})
						}
					})
				} else {
					this.closeCartPopup()
				}
			},
			// 客服
			showCustomerService() {
				uni.navigateTo({
					url: '/pages/service/customerService'
				})
			},
			//收藏商品
			collection(id) {
				if (this.flage) {
					collectionGoods({
						goodsId: this.id
					}).then(res => {
						if (res.success) {
							toast({
								title: '收藏' + res.msg
							})
							this.flag = false
						} else {
							toast({
								title: res.msg
							})
						}
					})
				} else {
					this.openAddCartPopup('收藏')
				}
			},
			//取消收藏
			delCollection(id) {
				delCollectionGoods({
					goodsId: this.id
				}).then(res => {
					if (res.success) {
						toast({
							title: '移出收藏' + res.msg
						})
						this.flag = true
					} else {
						toast({
							title: res.msg
						})
					}

				})
			},
			onShareAppMessage() {
				if (this.iSsampleList || this.goodsType == 30) {
					return {
						title: this.goodsInfo.goodsTitle,
						path: '/goodsDetail/goodsDetail?goodsId=' + this.goodsInfo.id + '&iSsampleList=' + this
							.iSsampleList
					}
				}
				 else if(this.goodsType == 20 || this.isGift == 'true'){
					return {
						title: this.goodsInfo.goodsTitle,
						path: '/goodsDetail/goodsDetail?goodsId=' + this.goodsInfo.id + '&goodsType=' + this.goodsType + '&isGift=' + this.isGift
					}
				 }
				 else {
					return {
						title: this.goodsInfo.goodsTitle,
						path: '/goodsDetail/goodsDetail?goodsId=' + this.goodsInfo.id
					}
				}
			},
			//分享朋友圈
			onShareTimeline() {
				if (this.iSsampleList) {
					return {
						title: this.goodsInfo.goodsTitle,
						path: '/goodsDetail/goodsDetail?goodsId=' + this.goodsInfo.id + '&iSsampleList=' + this
							.iSsampleList
					}
				} else {
					return {
						title: this.goodsInfo.goodsTitle,
						path: '/goodsDetail/goodsDetail?goodsId=' + this.goodsInfo.id
					}
				}
			},
			goAccount() {
				this.getsettleBuyNow()
			},

			getsettleBuyNow() {
				var params = {
					goodsId: this.id,
					num: this.num,
					isUseCoupon:true
				}
				var price = this.goodsPrice.price
				settleBuyNow(params).then(res => {
					if (res.success) {
						uni.removeStorageSync('Flage')
						uni.removeStorageSync('wxFlage')
						var oldCouponId=null
						if(res.data.useCouponList!=null&&res.data.useCouponList.length){
							oldCouponId = res.data.useCouponList[0].customerCouponId
						}
						uni.redirectTo({
							url: '/personalPage/orderPages/confirmOrder?goodsId=' + params.goodsId +
								'&num=' + params.num + '&price=' + JSON.stringify(price)
								+'&oldCouponId=' + oldCouponId+'&checkCart=true'
						})

					}
				})
			},
			// 询价
			toInquiry(){
				var token = uni.getStorageSync('token')
				if(token){
					uni.navigateTo({
						url:"/goodsDetail/inquiryPage/inquiry?goodsId="+this.id
					})
				}else{
					uni.showModal({
						title: '提示',
						content: '未登录不能进行询价，是否去登录？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
		}
	}
</script>
<style>
	page {
		padding-bottom: 60rpx;
	}
</style>
<style scoped lang="scss">
	.productDetail {
		width: 100%;
		overflow: hidden;
		background-color: #F4F4F4;

		.detail_content {
			.header_text {
				position: fixed;
				z-index: 999;
				width: 100%;
				display: flex;
				background-color: #FFFFFF;

				.title {
					width: 100%;
					margin-left: 225upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					// font-weight: bold;
					color: #212121;
				}
			}

			margin: 0upx 0 100upx;

			.page-section-spacing {
				width: 750upx;
				height: 900upx;
				background: linear-gradient(#ffffff, #f8f8f8);
				position: relative;

				.swiper {
					width: 100%;
					height: 100%;
					position: absolute;
					left: 0;
					bottom: 0;

					.swiper-item {
						width: 750upx;
						height: 770upx;
						margin-top: 153upx;
						
						image {
							width: 750upx;
							height: 770upx;
						}
						video{
							width: 750upx;
							height: 770upx;
						}
					}
				}
				.discount {
					width: 100%;
					height: 100upx;
					border-radius: 20upx 20upx 0upx 0upx;
					padding: 2upx 2upx;
					disply: flex;
					position: absolute;
					left: 0;
					bottom: 0;
					background: linear-gradient(-70deg, #FF4F26, #FA9956);
					.product_one_price {
						display: flex;
						align-items: center;
					
						.price_two {
							display: inline;
							width: 150upx;
							margin-top: -20upx;
							font-size: 30upx;
							font-family: PingFang-SC-Bold;
							font-weight: bold;
							color: #fff;
							text-align: left;
							margin-left: 20upx;
						}
						.price_two_view{
							width: 120upx;
							height: 20upx;
							margin-top:-20upx;
							margin-left:20upx;
							padding: 10upx 10upx;
							line-height: 20upx;
							border-radius:20upx 20upx 20upx 0;
							border:1upx solid #FFFFFF;
							font-size: 20upx;color: #FFFFFF;
							text-align:center;
						}
					
						.price_three {
							display: block;
							width: 200upx;
							text-align: left;
							font-size: 24upx;
							margin-top: 65upx;
							margin-left: -305upx;
							font-family: PingFang-SC-Bold;
							font-weight: normal;
							color: #fff;
							text-decoration: line-through;
						}
					
						.price_four {
							display: block;
							width: 100upx;
							text-align: left;
							font-size: 20upx;
							margin-top: 65upx;
							// margin-left: 100upx;
							font-family: PingFang-SC-Bold;
							font-weight: normal;
							color: #fff;
						}
					
					}
					
					.product_two_price {
						height: 40upx;
						padding: 0 20upx;
						float: right;
						margin: -80upx 10upx 0 0;
						font-size: 30upx;
						color: #fff;
					}
				}

				

				.no_product_tips {
					width: 750upx;
					height: 750upx;
					background-color: rgba(0, 0, 0, 0);
					position: absolute;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;

					image {
						width: 321upx;
						height: 321upx;
					}
				}

				.no_product_tips1 {
					width: 750upx;
					height: 750upx;
					background-color: rgba(0, 0, 0, 0.4);
					position: absolute;
					top: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 148upx;

					image {
						width: 360upx;
						height: 360upx;
					}
				}
			}

			.product_msg_oneIntegral {
				width: calc(100% - 48upx);
				background-color: #FFFFFF;
				margin: 0upx 0 15upx;
				padding: 35upx 24upx 30upx;
				border-radius: 0 0 10upx 10upx;

				.product_msg_oneIntegralImg {
					.product_msg_IntegralMoneys {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.product_Integral {
							display: flex;
							align-items: center;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
						}

						.product_IntegralRed {
							font-size: 50upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #E1251B;
						}

						.product_red {
							font-size: 28upx;
							color: #666;
							text-decoration: line-through;
						}

						.product_Img {
							display: flex;
							font-size: 24upx;
							align-items: center;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;

							image {
								width: 54upx;
								height: 48upx;
							}
						}
					}
				}


			}


			.product_msg_one {
				width: calc(100% - 48upx);
				// height: 350upx;
				background-color: #fff;
				margin-bottom: 15upx;
				padding: 35upx 24upx 30upx;
				// border-radius: 40upx 40upx 0 0;
				z-index: 9999 !important;

				.product_one_price {
					display: flex;
					align-items: center;

					.price_one {
						display: inline;
						font-size: 32upx;
						font-family: DIN-Bold;
						font-weight: bold;
						color: #FF5000;
						margin-top: 10upx;
					}

					.price_two {
						display: inline;
						font-size: 50upx;
						font-family: PingFang-SC-Bold;
						font-weight: bold;
						color: #FF5000;
					}

					.marketPriceContent {
						display: flex;
						align-items: center;
						margin-top: 13upx;
						margin-left: 20upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						text-decoration: line-through;
						color: #9FA0A5;
					}
					.marketPriceContent2 {
						display: flex;
						align-items: center;
						margin-top: 13upx;
						margin-left: 20upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #9FA0A5;
					}
					.getIntegral2 {
						width:38upx;
						height: 42upx;
						background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/integralLogo.png');
						background-size:100% 100%;
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 40rpx;
						text-align: center;
						margin-top: 5upx;
						margin-left: 15upx;
						display:inline-block;
					}
					.sharePrice{
						height: 54upx;
						background: rgba(225,37,27,0.1);
						border-radius: 27upx;
						margin-left: 80upx;
						font-size: 18upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 54upx;
						padding-left: 20upx;
						padding-right: 20upx;
						span{
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #E1251B;
							line-height: 54upx;
						}
						
					}
				}

				.product_name {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #202021;
					line-height: 45upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-top: 30upx;
				}
				.goodsDescribe{
					font-size: 24upx;
					line-height: 40upx;
					color: #999;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					overflow: hidden;
					text-overflow: ellipsis;
					margin: 15upx 0;
				}
			}

			.product_msg_two {
				// height: 200upx;
				background-color: #FFFFFF;
				border-radius: 10upx;
				margin: 10upx 0 10upx;

				.product_mag_two01 {
					width: 702upx;
					// height: 200upx;
					background: #F8F8F8;
					border-radius: 10px;
					display: flex;
					justify-content: space-around;

					.product_two_item {
						height: 153upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;

						.pro_item_lable {
							width: 210upx;
							color: #666666;
							text-align: center;
							font-size: 24upx;
							margin-top: 24upx;
							margin-bottom: 15px;

						}

						// .pro_item_lable4  {
						// 	// width: 150upx;
						// 	color: #666666;
						// 	text-align: center;
						// 	font-size: 24upx;
						// 	margin-top: 24upx;
						// 	margin-bottom: 15px;
						// }

						.pro_item_value {
							width: 210upx;
							color: #202021;
							font-family: PingFang SC;
							font-weight: bold;
							text-align: center;
							font-size: 24upx;
							margin-top: 38upx;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}
					}
				}
			}

			.product_msg_three {
				width: 100%;
				border-radius: 10upx;
				background-color: #FFFFFF;
				margin-bottom: var(--window-bottom);

				.product_msg_item {
					width: calc(100% - 48upx);
					padding: 22upx 24upx;
					display: flex;
					align-items: flex-start;
					border-bottom: 1upx solid #eeeeee;

					.pro_item3_lable {
						width:120upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
						margin-right: 47upx;
						line-height: 42upx;
					}

					.pro_item3_value {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						line-height: 42upx;

						.pro_item3_value_item {
							display: flex;
						}
					}
					.stock_tips {
						min-width: 390upx;
						max-width: 467upx;
						height: 40upx;
						margin-left: 29upx;
						background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
						background-size: cover;
						text-indent: 55upx;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 40upx;
					}

					.specification {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}

					.pro_item3_value_stock {
						display: flex;
						align-items: center;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
						line-height: 42upx;

						.stock_tips {
							min-width: 390upx;
							max-width: 467upx;
							height: 40upx;
							margin-left: 29upx;
							background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
							background-size: cover;
							text-indent: 55upx;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #E1251B;
							line-height: 40upx;
						}
					}

					&:last-child {
						border-bottom: 0upx solid #eeeeee;
					}
				}
			}
			
			.discounts{
				width: 100%;
				max-height: 400rpx;
				margin-top:20upx;
				overflow:auto;
				padding:0 30upx 20upx 30upx;
				
				.discountsList {
					width: 100%;
					white-space: nowrap;
				}
				.discountsItem {
					width:690upx;
					height: 180rpx;
					background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discountCart_bgLine.png');
					background-size:100% 100%;
					margin-top:20upx;
					display:flex;
					justify-content:space-between;
					
					.price{
						width: 185upx;
						color: #FFFFFF;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: bold;
						text-align: center;
						
						text {
							color: #FFFFFF;
							font-size: 50rpx;
							font-family: PingFang SC;
							font-weight: 800;
							line-height: 160upx;
						}
						
						.price_left {
							font-size: 18rpx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							margin-top: -45upx;
						}
					}
					.price_center{
						width:400upx;
						text-align: left;
						padding-left:25upx;
						
						.discountsDetail_one{
							font-size: 32rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #666666;
							margin-top:36upx;
						}
						.discountsDetail_two{
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							margin-top:10upx;
						}
						.discountsDetail_three{
							font-size: 20rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							margin-top:10upx;
						}
					}
					.price_right{
						width:60upx;
						text-align:center;
						view{
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #FF5000;
						}
						
					}
				}
			}
			
			// 评价 
			.comment{
				width: 750upx;
				background: #fff;
				padding:20upx 30upx;
				.commentTitle{
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #333333;
					line-height: 45rpx;
				}
				.comment_list{
					width: 750upx;
					.commentLists{
						width: 690upx;
						padding: 20upx 0;
						border-bottom:1px solid #F5F5F5;
						
						.commentAutor{
							width: 100%;
							display: flex;
							justify-content: space-between;
							
							.commentAutor_{
								width:480upx;
								display: flex;
								justify-content: start;
								
								image{
									width: 60rpx;	
									height: 60rpx;
									border-radius: 50%;
								}
								.autorText{
									font-size: 26rpx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #333333;
									margin-top: 8upx;
									margin-left: 20upx;	
								}
								.uni_rate{
									margin-left: 20upx;
									margin-top: 9upx;
								}
							}
							.comment_timer{
								font-size: 24rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
								margin-top: 8upx;
							}
						}
						.comment_content{
							margin-left: 80upx;
							.comment_text{
								width: 610rpx;
								font-size: 26rpx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								line-height: 40rpx;
								-webkit-line-clamp: 3;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.comment_image{
								width: 610upx;
								display: flex;
								flex-wrap: wrap;
								justify-content: start;
								image{
									width: 135rpx;
									height: 135rpx;
									margin-top: 20upx;
									margin-right: 20upx;
								}
								
							}
							
						}
						
					}
					.comment_more{
						width: 690upx;
						text-align: center;
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 300;
						color: #999999;
						line-height: 50rpx;
						padding-top: 15upx;
					}
				}
				// 暂无评论
				.noComment{
					width: 690upx;
					line-height: 110upx;
					text-align: center;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 300;
					color: #999999;
				}
			}

			.product_image {
				width: 239upx;

				image {
					width: 239upx;
					height: 24upx;
					margin: 30upx 255upx;
				}
			}

			.product_detail {
				width: 100%;
				background: #fff;
				margin: 0 0 var(--window-bottom) 0;
				// font-size: 0;
				img {
					width: 100%;
					vertical-align:top;
					display:block !important;
				}
				  blockquote {
				  display: block;
				  border-left: 8px solid #d0e5f2;
				  padding: 5px 10px;
				  margin: 10px 0;
				  line-height: 1.4;
				  font-size: 100%;
				  background-color: #f1f1f1;
				}
			    blockquote p {
				  padding: 10px 0;
				}
				
				// p.fa {
				// 	font-size:0;
				// }
			}
			.product_detail  blockquote {
			  display: block;
			  border-left: 8px solid red;
			  padding: 5px 10px;
			  margin: 10px 0;
			  line-height: 1.4;
			  font-size: 100%;
			  background-color: #f1f1f1;
			}
			.product_detail  blockquote p {
			  padding: 10px 0;
			}

		}


		.detail_footer {
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: content-box;
			justify-content: space-around;
			width: 100%;
			height: 95upx;
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-top: 1px solid #eee;


			.cartMoneys {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #003330;
				margin-left: 30upx;
				margin-right: 30upx;
			}

			.kefu_tabBar {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 52upx;

				image {
					width: 40upx;
					height: 40upx;
				}

				text {
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333;
				}
			}

			.cart {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 55upx;

				image {
					width: 40upx;
					height: 40upx;
				}

				text {
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333;
				}
			}

			.collect {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 73upx;

				image {
					width: 40upx;
					height: 40upx;
				}

				text {
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333;
				}
			}

			.getBuyContent2 {
				width: 412upx;
				height: 70upx;
				display: flex;
				justify-content: space-between;
				background: #CFD0D2;
				border-radius: 35upx;
				text-align: center;
				margin-right: 20upx;
				line-height: 70upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;

				.addCartBtn2 {
					width: 206upx;
					height: 68upx;
					color: #CFD0D2;
					border: 1px solid #CFD0D2;
					// background: #CFD0D2;
					background-color: #fff;
					border-radius: 35upx 0upx 35upx 35upx;
					font-size: 28upx;
					// color: #fff;
					font-family: PingFang SC;
					font-weight: 500;
					line-height: 70upx;
					text-align: center;
				}

				.getBuy2 {
					width: 206upx;
					height: 70upx;
					color: #fff;
					// background: #CFD0D2;
					border-radius: 0 35upx 35upx 0;
				}
			}

			.getBuyContent {

				width: 412upx;
				height: 70upx;
				display: flex;
				justify-content: space-between;
				// background: var(--cart-btn);
				border-radius: 35upx;
				text-align: center;
				margin-right: 20upx;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 500;

				.addCartBtn {
					width: 206upx;
					height: 66upx;
					line-height: 66upx;
					// color: var(--prodcut-text);
					background: #FFFFFF;
					border: 1upx solid #E8E8E8;
					border-radius: 35upx 0upx 35upx 35upx;

				}

				.sampleRequest {
					text-align: center;
					width: 412upx;
					height: 70upx;
					line-height: 70upx;
					color: #FFFFFF;
				}


				.getBuy {
					width: 206upx;
					height: 70upx;
					color: #fff;
					line-height: 70upx;
					// background: var(--prodcut-text);
					border-radius: 0 35upx 35upx 0;
				}


			}



		}

		.add_popup {

			.addCartPopup {
				width: 100%;
				background-color: #fff;
				border-radius: 15upx 15upx 0 0;
				padding-bottom: 50upx;
				position: relative;
				bottom: 0;

				.addCartTitle {
					width: 100%;
					padding: 39upx 0;
					text-align: center;
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;

					.addCartText {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #202021;
					}

					image {
						width: 30upx;
						height: 30upx;
						position: absolute;
						top: 40upx;
						right: 21upx;
					}
				}

				.addCartMsg {
					width: 702upx;

					.addCartMsgItem {
						display: flex;
						align-items: center;
						justify-content: space-between;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						margin-left: 22upx;

						.addCartMsgItemLable {
							color: #666666;
							line-height: 68upx;

						}

						.pro_bottom_addNum {
							width: 200upx;
							height: 36upx;
							background: #fff;
							display: flex;
							justify-content: space-between;


						}

						.addCartMsgItemVal {
							color: #202021;
							line-height: 68upx;
						}

						.saleUnitName {
							height: 68upx;
							line-height: 68upx;
							margin-left: 20upx;
						}
					}
				}

				.product_msg_item {
					width: 702upx;
					padding: 0upx 24upx 22upx;
					display: flex;
					border-bottom: 1upx solid #eeeeee;
					justify-content: space-between;

					.product_msg_item_flex {
						display: flex;
						margin-right: 24upx;

						.pro_item3_lable {
							// width: 104upx;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
							margin-right: 47upx;
						}

						.pro_item3_value_stock {
							display: flex;
							align-items: center;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							line-height: 42upx;
						}
					}


				}

				.stock_tips {
					min-width: 390upx;
					max-width: 467upx;
					height: 40upx;
					margin-left: 29upx;
					background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
					background-size: cover;
					text-indent: 55upx;
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #E1251B;
					line-height: 40upx;
					margin-top: 24upx;
					margin-bottom: 12upx;
				}

				.msg {
					.msg_one {
						width: 700upx;
						height: 105upx;
						margin: 0 auto;
						line-height: 105upx;
						display: flex;
						justify-content: space-between;
						border-bottom: 1px solid #eeeeee;

						.views {
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #999999;
						}

						.vie {
							width: 520upx;
							text-align: left;
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
						}
					}
				}

			}
		}

		.applySample {
			width: 86upx;
			// height: 155upx;
			padding-bottom: 20upx;
			background: #FFFFFF;
			border: 1upx solid #EEEEEE;
			border-radius: 42upx;
			position: fixed;
			right: 30upx;
			bottom: 461upx;
			z-index: 1;

			.applySampleText {
				width: 50upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-top: 11upx;

			}
		}



		.applySampleBtn {
			width: 86upx;
			height: 155upx;
			padding-bottom: 20upx;
			background: #FFFFFF;
			border: 1upx solid #EEEEEE;
			border-radius: 42upx;
			position: fixed;
			right: 30upx;
			bottom: 680upx;
			z-index: 111;

			.applySampleText {
				width: 50upx;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #202021;
				margin-top: 11upx;

			}
		}

		// .applySample1 {
		// 	display: none;
		// }

		.buyPopup {

			.buyPopupContent {
				width: 100%;
				background-color: #fff;
				border-radius: 15upx 15upx 0 0;
				padding-bottom: 50upx;
				position: relative;
				bottom: 0;

				.buyPopupText {
					width: 148upx;
					height: 29upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					padding-top: 49upx;
					margin: 0 auto;
				}

				.buyNumberContent {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-top: 76upx;

					image {
						width: 30upx;
						height: 30upx;
						position: absolute;
						top: 40upx;
						right: 21upx;
					}

					.buyNumber {

						margin-left: 26upx;
					}

					.numberBox {
						width: 200upx;
						margin-right: 22upx;

					}

					.tips {
						width: 100%;
						margin-top: 20upx;
						border-top: 1upx solid #EEEEEE;

						.stock_tips {
							min-width: 390upx;
							max-width: 467upx;
							height: 40upx;
							margin-left: 29upx;
							margin-top: 30upx;
							background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
							background-size: cover;
							text-indent: 55upx;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #E1251B;
							line-height: 40upx;
						}
					}

				}

				.getGobuyOnce {
					width: 702upx;
					height: 70upx;
					background: var(--prodcut-text);
					border-radius: 35upx;
					margin: 82upx auto 0;
					text-align: center;
					line-height: 70upx;
					color: #fff;
				}
			}
		}

		.multiformat {

			.multiformatAll {
				z-index: 99999;
				width: 100%;
				background-color: #fff;
				border-radius: 15upx 15upx 0 0;
				padding-bottom: 50upx;
				position: relative;
				bottom: 0;

				.price {
					display: flex;
					justify-content: space-between;
					padding: 34upx 27upx;

					.left span:nth-child(1) {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: #FF5000;
					}

					.left span:nth-child(2) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						text-decoration: line-through;
						color: #9FA0A5;
						margin-left: 20upx;
					}
				}

				.selected {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					padding-left: 27upx;

					.stock_tips {
						min-width: 390upx;
						max-width: 467upx;
						height: 40upx;
						// margin-left: 29upx;
						background-image: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/inventoryTips.png');
						background-size: cover;
						text-indent: 55upx;
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #E1251B;
						line-height: 40upx;
						margin-bottom: 15upx;
					}
				}

				.specification {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					padding-left: 27upx;
					margin-top: 30upx;
				}

				.specificationDetail {
					padding: 15upx 30upx;
					padding-top: 0;
					display: flex;
					flex-wrap: wrap;

					view {
						// height: 46upx;
						background: #F2F2F2;
						border-radius: 23upx;
						font-size: 24upx;
						margin: 20upx 34upx;
						margin-bottom: 0;
						padding: 11upx 31upx;
						// line-height: 46upx;
					}
				}

				.number {
					display: flex;
					justify-content: space-between;
					padding: 34upx 27upx;
				}

				.remain {
					float: right;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					padding-right: 37upx;
				}

				.button {
					width: 690upx;
					margin: 20upx 30upx;
					margin-top: 60upx;

					.addGoodsCar {
						width: 690upx;
						height: 70upx;
						border-radius: 35upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 70upx;
						text-align: center;
					}

					.purchaseNow {
						width: 690upx;
						height: 70upx;
						line-height: 70upx;
						border-radius: 35upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
					}
				}
				.button2{
					width: 690upx;
					display: flex;
					border-radius: 35upx;
					margin: 20upx 30upx;
					margin-top: 60upx;
					
					.addGoodsCar {
						width: 345upx;
						height: 66upx;
						border-radius: 35upx 0upx 35upx 35upx;
						background: #FFFFFF;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						line-height: 66upx;
						text-align: center;
						margin-top: 2upx;
					}
					
					.purchaseNow {
						width: 345upx;
						height: 70upx;
						line-height: 70upx;
						border-radius: 0 35upx 35upx 0;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #FFFFFF;
						text-align: center;
					}
				}
				.button3{
					width: 690upx;
					margin: 20upx 30upx;
					margin-top: 60upx;
				}
				
			}
		}

	}
</style>
<style lang="scss">
	::v-deep .uni-numbox {
		height: 50upx !important;
		line-height: 50upx !important;
		width: 200upx !important;

		.uni-numbox__minus {
			width: 50upx !important;
			height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}

		.uni-numbox__value.data-v-dd94a2a8 {
			width: 100upx !important;
			height: 50upx !important;
			line-height: 50upx !important;
			font-size: 24upx !important;
			background-color: #f8f8f8 !important;
			border-style: none !important;
		}

		.uni-numbox__plus.data-v-dd94a2a8 {
			width: 50upx !important;
			height: 50upx !important;
			background-color: #ffffff !important;
			border-style: none !important;
		}
	}
</style>