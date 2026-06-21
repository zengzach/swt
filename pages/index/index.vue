<template>
	<view>
		<!-- 服务到期 -->
		<view class="endDate" v-if="shopCode=='35'">
			<view class="header_text"
				:style="{paddingTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}">
				首页
			</view>
			<view class="header-content">
				<image class="cont_image" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/shopEndDate.png" mode=""></image>
				<view class="cont_text">
					<view class="cont_text_title">店铺服务已到期</view>
					<view class="cont_texts">
						<view>如需继续恢复经营，请咨询客服</view>
						<view @click="callShopNum(shopNum)">联系电话：{{shopNum}}</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="" v-else>
			<!-- 开屏广告 -->
			<view class="" v-if="advertising1===1">
				<view class="content1">
					<image mode="aspectFill" :src="advertiseImgList[0].url" @click="goDetailType(advertiseImgList[0].linkUrl)"></image>
					<view class="skip">
						<view class="time">
							{{time}}
						</view>
						<view class="skips" @click="jmp">
							跳过
						</view>
					</view>
				</view>
			</view>
			
			<!-- 首页 -->
			<view class="" v-else>
				<view class="content"  v-if="dpzxFlag==false">
					<view class="contentHeader" :style="{backgroundImage: 'url(' + imageURL4 + ')','background-repeat':'no-repeat', 
						 backgroundSize:'100% 100%'}">
						<!-- 大banner -->
						<view v-if="bigSwiper==1" style="padding-bottom: 30upx;background-color:#FAFBFB;">
							<view class="bigStyleSwiper">
								<swiper class="swiper" circular :indicator-dots='true' autoplay>
									<swiper-item v-for="item in getBannerList" :key='item.bannerId' @click="goGoodList(item)">
										<image style="width: 100%;height: 100%;" :src="item.url"></image>
									</swiper-item>
								</swiper>
							</view>
							<view>
								<header-search :background="background2" :imageURL="imageURL"></header-search>
							</view>
						</view>
						<!-- 小banner -->
						<view class="uni-form-item uni-column" style="padding-top: 12upx;" v-else>
							<view class="header">
								<view class="header-text"
									:style="{marginTop:statusBarHeight+'px',height:menuButtonInfo+'px',lineHeight: menuButtonInfo+'px'}	">
									<image v-if="logo" :src="logo" mode=""></image>
									<text class="title" :style="{ color: color }">{{title}}</text>
								</view>
							</view>
							<view class="">
								<header-search :background="background2" :imageURL="imageURL"></header-search>
							</view>
							<view class="uni-margin-wrap bannerImg" style="background-color:#FAFBFB;padding-bottom:20upx;">
								<swiper class="swiper" circular :indicator-dots='true' autoplay
									style="width: 100%;height: 100%;">
									<swiper-item v-for="item in getBannerList" :key='item.bannerId' @click="goGoodList(item)">
										<image :src="item.url"></image>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<!-- 广告通知  功能区 -->
						<view class="notice_classify">
							<view class="notice_content">
								<view class="notice_content_one" :style="{ background: background }">
									<view class="images" :style="{backgroundImage: 'url(' + imgUrl + ')','background-repeat':'no-repeat', 
									backgroundSize:'100% 100%'}"></view>
								</view>
								<view class="notice_content_two" @click="goArticleList(articleList[0])">
									<uni-notice-bar single="true" speed="30" scrollable="true" background-color="#fff"
										:text="(articleList.length ? articleList[0].title : '暂无公告')"></uni-notice-bar>
								</view>
							</view>
							<!-- 功能区 -->
							<view class="classify">
								<view class="classifyBox" v-for="item in getcategoryList" :key='item.id' @click="goCategory(item)">
									<image :src="item.pictureUrl" mode=""></image>
									<view class="classifyText">{{item.name}}</view>
								</view>
							</view>
						</view>
						<!-- 优惠券模块 -->
						<view class="coupon" v-if="couponList.length>0">
							<scroll-view class="couponList" scroll-x="true" show-scrollbar="false">
								<view class="couponItem" v-for="(item,index) in couponList" :key="index" @click="receiveCoupon(item)">
									<image class="alreadyImg" v-if="item.isReceived" src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/already.png" mode=""></image>
									<view class="price" v-if="item.couponType==1">
										￥<text>{{item.discountAmount}}</text>
									</view>
									<view class="price" v-if="item.couponType==2">
										<text>{{item.discountRate*10}}</text>折
									</view>
									<!-- <view class="price_text" v-if="item.couponType==1">满{{item.conditionPrice}}减{{item.discountAmount}}元</view> -->
									<!-- <view class="price_text" v-if="item.couponType==2">满{{item.conditionPrice}}打{{item.discountRate*10}}折</view> -->
									<view class="price_text">{{item.couponName}}</view>
								</view>
							</scroll-view>
						</view>
						<!-- 样品申请模块 -->
						<view class="Samples">
							<view class="repairsAndsample" v-if='["jz2206","skyx","JC2216","cp2247"].includes(orgNum)'>
								<view class="repairs" @click="goProductsCross" v-if="orgNum=='cp2247'||orgNum=='skyx'">
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/productCross/productsCross_bg.png" mode=""></image>
								</view>
								<view class="repairs" @click="goRepair" v-else>
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/repair.png" mode=""></image>
								</view>
								<view class="sample" @click="goSamplePage">
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sample.png" mode=""></image>
								</view>
							</view>
							<view class="samples" @click="goSamplePage" v-else>
								<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/sampleIndex.png" mode=""></image>
							</view>
						</view>
						<!-- 客服模块 -->
						<view class="customerService" v-if="serviceData.saleName||serviceData.customerServiceName||serviceData.itName">
							<view class="customerService_cont">
								<view class="integralBrandTop">
									<view class="integralBrandText">
										专属服务
									</view>
								</view>
								<view class="customerServiceFlex">
									<view class="customerServiceFlex_s">
										<view class="customerServiceFlex_item" 
											v-if="serviceData.saleName">
											<view class="customerServiceFlex_left">
												<view class="serviceFlex_left_left">
													<image :src="serviceData.saleHeadUrl?serviceData.saleHeadUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service.png'"></image>
												</view>
												<view class="serviceFlex_left_right">
													<!-- 名字 -->
													<view class="view_1">{{serviceData.saleName?serviceData.saleName:'--'}}</view>
													<!-- 职务 -->
													<view class="view_2">{{serviceData.salePosition}}</view>
												</view>
											</view>
											
											<view class="customerServiceFlex_right">
												<view class="serviceFlex_left_top" @click="callMe(serviceData.saleMobile)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_phone.png"></image>
													<!-- 电话 -->
													<view>{{serviceData.saleMobile}}</view>
												</view>
												<view class="serviceFlex_left_top" @click="toService(serviceData.saleVxUrl)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_wechat.png"></image>
													<view>微信</view>
												</view>
											</view>
										</view>
										<view class="customerServiceFlex_item" 
											v-if="serviceData.customerServiceName">
											<view class="customerServiceFlex_left">
												<view class="serviceFlex_left_left">
													<image :src="serviceData.customerServiceHeadUrl?serviceData.customerServiceHeadUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service.png'"></image>
												</view>
												<view class="serviceFlex_left_right">
													<!-- 名字 -->
													<view class="view_1">{{serviceData.customerServiceName?serviceData.customerServiceName:'--'}}</view>
													<!-- 职务 -->
													<view class="view_2">{{serviceData.customerServicePosition}}</view>
												</view>
											</view>
											
											<view class="customerServiceFlex_right">
												<view class="serviceFlex_left_top" @click="callMe(serviceData.customerServiceMobile)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_phone.png"></image>
													<!-- 电话 -->
													<view>{{serviceData.customerServiceMobile}}</view>
												</view>
												<view class="serviceFlex_left_top" @click="toService(serviceData.customerServiceVxUrl)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_wechat.png"></image>
													<view>微信</view>
												</view>
											</view>
										</view>
										<view class="customerServiceFlex_item"
											v-if="serviceData.itName">
											<view class="customerServiceFlex_left">
												<view class="serviceFlex_left_left">
													<image :src="serviceData.itHeadUrl?serviceData.itHeadUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service.png'"></image>
												</view>
												<view class="serviceFlex_left_right">
													<!-- 名字 -->
													<view class="view_1">{{serviceData.itName?serviceData.itName:'--'}}</view>
													<!-- 职务 -->
													<view class="view_2">{{serviceData.itPosition}}</view>
												</view>
											</view>
											
											<view class="customerServiceFlex_right">
												<view class="serviceFlex_left_top" @click="callMe(serviceData.itMobile)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_phone.png"></image>
													<!-- 电话 -->
													<view>{{serviceData.itMobile}}</view>
												</view>
												<view class="serviceFlex_left_top" @click="toService(serviceData.itVxUrl)">
													<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/service_wechat.png"></image>
													<view>微信</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 品牌专区 -->
						<view class="integralBrand" style="display: block;" v-if="brandList.length">
							<view class="integralBrand_cont">
								<view class="integralBrandTop">
									<view class="integralBrandText">
										品牌专栏
									</view>
									<view class="integralBrandMore" @click="goBrandList">
										更多>
									</view>
								</view>
								<view class="integralBrandFlex">
									<view class="integralBrandFlex_s">
										<view class="integralBrandFlex_item" @click="toproductList(item)"
											v-for="(item,index) in brandList" :key='index'>
											<view>
												<image :src="item.logoUrl"></image>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 限时折扣模块 -->
						<view class="integralBrand" v-if="activityGoodsList.length > 0">
							<view class="integralBrand_cont">
								<view class="integralBrandTop">
									<view class="integralBrandText">
										限时折扣
									</view>
									<view class="integralBrandMore" @click="goActivityGoodsList">
										查看更多>
									</view>
								</view>
								<view class="discount">
									<!-- 循环遍历 -->
									<scroll-view class="discountList" scroll-x="true" enhanced :show-scrollbar="false">
										<!-- 循环遍历 -->
										<view>
											<view class="discountList_box" v-for="item in activityGoodsList" :key="item.goodsId"
												@click="goDetail(item.goodsId ? item.goodsId : item.integralBaseId, item.goodsId ? true : false)">
												<view class="discountList_box1">
													<view class="canbuyimageBottom" v-if="item.goodsPrice.promotionStatus == 20">
														距结束
														{{item.countdown}}
													</view>
													<view class="canbuyimageBottom" v-if="item.goodsPrice.promotionStatus == 10">
														距开始
														{{item.countdown1}}
													</view>
													<image class="pic" :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'"></image>
												</view>
												<view class="txt">{{item.goodsTitle}}</view>
												<view class="txt">
													<span v-if="item.integralBaseId" class="txt2_span1">
														积分:{{item.goodsPrice.promotionPrice}}
													</span>
													<span v-else class="txt2_span1">
														￥{{item.goodsPrice.promotionPrice}}
													</span>
													<span v-if="!item.integralBaseId" class="txt2_span2">
														￥{{item.goodsPrice.marketPrice}}
													</span>
													<span v-else class="txt2_span2">
														{{item.integralPrice}}
													</span>
												</view>
											</view>
										</view>
									</scroll-view>
								</view>
							</view>
							
						</view>
						<!-- 精选好物商品 -->
						<view class="contentSelect ">
							<view class="selectTop">
								<view class="selectTopTitle">
									<view class="" v-for="(item,index)  in getGoodsTypeList" :key="index"
										@click="titleBtn(item.recommendType,index,flag)">
										<image v-if="item.flag" :src="item.imgUrl" mode=""></image>
										<view v-else class="titleName">
											{{item.name}}
										</view>
									</view>
								</view>
							</view>
							<!-- 商品列表 -->
							<view class="selection">
								<view class="selectGoods" v-for="item in goodsDataList" :key="item.goodsId"
									@click="goDetail(item.goodsId ? item.goodsId : item.integralBaseId, item.goodsId ? true : false)">
										<image :src="item.goodsPictureUrl?item.goodsPictureUrl:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/icon/no_img_icon.jpg'">
										</image>
										<view class="selectGoodsTitle">{{item.goodsTitle}}</view>
										<view style="display: flex;justify-content: space-between;">
											<view class="selectGoodsPrice">
												<!-- <span></span> -->
												<view class="selectGoodsMoney" v-if="item.goodsPrice.promotionStatus == 20">
													￥{{item.goodsPrice.promotionStatus == 20?item.goodsPrice.promotionPrice:0}}
												</view>
												<view class="selectGoodsMoney" v-if="item.goodsPrice.promotionStatus != 20">
													<span v-if="item.goodsPrice.price">￥{{item.goodsPrice.price}}</span>
													<!-- @click="toInquiry(item)" -->
													<span v-else>询价</span>
												</view>
											</view>
											<view class="">
												<view class="getIntegral" v-if="item.isBonusIntegral&&item.goodsPrice.price">积</view>
												<view class="getIntegral2" v-if="item.isUseCoupon&&item.goodsPrice.price">券</view>
											</view>
										</view>
										<view class="unit">
											<view class="">货号：{{item.artNo}}</view>
											<view class="">规格：{{item.packDesc?item.packDesc:'暂无规格'}}</view>
											<view class="" v-if="!item.isReserve">库存：{{item.stock}}{{item.saleUnitName}}</view>
											<view class="" v-if="item.stock<=0&&item.isReserve">库存：可预订</view>
										</view>
								</view>
							</view>
						</view>
						<view style="width: 100%;height: 95upx;"></view>
						<tab-bar :selectedIndex="0" :index="0"> </tab-bar>
					</view>
					<!-- 按钮 -->
					<view class="suspend">
						<view class="suspendContent">
							<image @click="openChat"
								:src="appIconList.fileList == null ? 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/newPcBack/leaveWords.png' : appIconList.fileList[0].url"
								mode=""></image>
							<view class="suspendTwo" @click="openChat">
								问答
							</view>
							<view v-if="!isMobile">
								<view class="suspendLink"></view>
								<image @click="isTelmark"
									:src="appIconList.fileList == null ? ' https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/newPcBack/kefu.png' : appIconList1.fileList[0].url"
									mode="">
								</image>
								<view class="suspendPhone" @click="isTelmark">
									客服
								</view>
							</view>
			
							<view v-if="isShow">
								<view class="suspendLink"></view>
								<image @click="toShareShop"
									:src="shareIcon?shareIcon:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/index_share.png'"
									mode=""></image>
								<view class="suspendPhone">
									分享
								</view>
							</view>
			
							<!-- <view v-if="isShow">
								<view class="suspendLink"></view>
								<image @click="toShareGift"
									:src="shareIcon?shareIcon:'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/index_share.png'"
									mode=""></image>
								<view class="suspendPhone">
									分享有礼
								</view>
							</view> -->
						</view>
					</view>
					<!-- 客服弹窗 -->
					<view class="call" v-if="telmark">
						<view class="mark">
							<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/publicIcon/phoneCall.png"
								mode="">
							</image>
							<view class="tel_name">{{exclusive.customerServiceName}}</view>
							<view class="tel_number" :style="{color:color1}">{{exclusive.customerServiceMobile}}</view>
							<view class="tel">
								<view @click="cancel">取消</view>
								<view class="cal" :style="{color:color1}" @click="call(exclusive.customerServiceMobile)">立即拨打
								</view>
							</view>
						</view>
					</view>
					<!-- 待确认订单弹窗 -->
					<view class="call" v-if="ConfirmedTelmark">
						<view class="popoutContent">
							<view class="popoutTitle">
								<view style="margin-left:210upx;">
									订单待确认
								</view>
								<view class="" @click="colseCall">
									<image style="width:26upx; height:26upx;margin-left: 54px; "
										src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/cancleBtn.png" mode="">
									</image>
								</view>
							</view>
							<view class="popoutLine"></view>
							<view class="popoutNumber">
								你有<span>{{ConfirmedNum}}</span>条订单待确认，请进行确认操作！
							</view>
							<view class="popoutText">
								<image style="height: 28upx; width: 28upx;"
									src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/dsWV/tanImg.png" mode=""></image>
								<view style="width: 440upx; margin-left: 10upx;margin-top:-10upx;">请及时处理待确认的订单，否则会影响商品发货等流程。
								</view>
							</view>
							<view class="popoutBtn" :style="{ background: background1 }" @click="goComfin('待确认',40)">
								立即确认
							</view>
						</view>
					</view>
					<!-- 大礼包 -->
					<view class="advertise" v-if="isShowPackage">
						<view class="advertising">
							<!-- <view class="gift">
								<view class="font">新人大礼包</view>
								<view class="font1">恭喜你获得价值1000元的优惠券</view>
								<view class="">
									
								</view>
							</view> -->
							<view class="gift1">
								<view class="font" v-if="packages.giftPackType == 20">注册领赠品</view>
								<view class="font" v-else-if="packages.giftPackType == 10">注册领积分</view>
								<view class="font1" v-if="packages.giftPackType == 20">注册即可获得{{packages.giftName}}</view>
								<view class="font1" v-else-if="packages.giftPackType == 10">注册即可获得{{packages.giftContent}}积分</view>
								<view class="goods">
									<image :src="packages.giftContent.goodsImg" v-if="packages.giftPackType == 20" mode=""></image>
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/DS/%E7%BB%84%20220%402x%20%281%29.png" v-if="packages.giftPackType == 10" mode=""></image>
									<view class="goodsFont1" v-if="packages.giftPackType == 20">{{packages.giftContent.goodsTitle}}</view>
									<view class="goodsFont2" v-if="packages.giftPackType == 10">{{packages.giftContent}}<span style='font-size: 24upx;'>积分</span></view>
									<span style="color: #FF5000;font-size: 26upx;margin-left:20upx" v-if="packages.giftPackType == 20">￥{{packages.giftContent.price}}</span> <span style="color: #9FA0A5;font-size: 24upx;margin-left: 100upx;" v-if="packages.giftPackType == 20">*1</span>
								</view>
								<view class="font2" @click="goReceive">
									注册领取
								</view>
							</view>
							
							<view class="closes">
								<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/BA/indexCancleBtn.png"
									@click="closeBtn()"></image>
							</view>
						</view>
					</view>
					<!-- 广告弹窗 -->
					<view class="advertise" v-if="showAdvertising">
						<view class="advertising">
							<image mode="widthFix" class="min_img" :src="bannerImgList[0].url"
								@click="goToDetail(bannerImgList[0])"></image>
							<view class="closes">
								<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/BA/indexCancleBtn.png"
									@click="close()"></image>
							</view>
						</view>
					</view>
					<view class="shareFinish" v-if="shareFinishImg">
						<view class="advertising">
							<view class="closes">
								<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/BA/indexCancleBtn.png"
									@click="closeShare()"></image>
							</view>
							<image mode="widthFix" class="min_img"
								src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/BA/indexCancleBtn.png"
								@click="goToDetail(bannerImgList[0])"></image>
						</view>
					</view>
					<!-- 分享有礼弹窗 -->
					<view class="add_popup" v-if="shareContetn" @click="closeshareContetn">
						<view class="shareType">
							<view class="shareTypeTop">
								<view class="TypeImg">
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png"
										mode="">
									</image>
								</view>
								<view class="TypeImgRight">
									<view class="TypeShareNum">
										分享两位好友可得<span>100积分</span>
									</view>
									<view class="TypeShareMore">
										最多得2次 查看详情>
									</view>
								</view>
							</view>
							<view class="shareWechatContent">
								<view class="shareWechatLeft">
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png"
										mode="">
									</image>
									<view class="ShareStyle">
										分享好友
									</view>
								</view>
								<view class="shareWechatLeft">
									<image src="https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/ydShare/share.png"
										mode="">
									</image>
									<view class="ShareStyle">
										分享海报
									</view>
								</view>
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 智能问答对话框 -->
	<view class="chat-overlay" v-if="chatOpen" @tap.stop>
		<view class="chat-dialog" @tap.stop>
			<!-- 对话框头部 -->
			<view class="chat-header">
				<view class="chat-header-left">
					<text class="chat-header-title">智能问答</text>
				</view>
				<view class="chat-header-right">
					<view class="chat-new-btn" @tap="startNewChat" v-if="showNewChatBtn">
						<text>+ 新对话</text>
					</view>
					<view class="chat-close" @tap="closeChat">✕</view>
				</view>
			</view>

			<!-- 消息列表 -->
			<scroll-view class="chat-messages" scroll-y :scroll-into-view="scrollToMsg" :scroll-with-animation="false">
				<!-- 欢迎消息 -->
				<view class="chat-msg chat-msg-ai" v-if="chatMessages.length === 0">
					<view class="chat-avatar ai-avatar">🤖</view>
					<view class="chat-bubble ai-bubble">
						<text>您好！我是耗材智能小助手，可以帮您查询公司信息、产品信息、使用方法等。请输入您的问题。</text>
					</view>
				</view>

				<block v-for="(item, index) in chatMessages" :key="item.id">
					<!-- AI消息 -->
					<view class="chat-msg chat-msg-ai" v-if="item.role === 'ai'" :id="'msg-' + index">
						<view class="chat-avatar ai-avatar">🤖</view>
						<view class="chat-bubble-wrap ai-bubble-wrap">
							<view class="chat-bubble ai-bubble" @tap="copyMessage(index)">
								<text :selectable="true">{{item.content}}</text>
							<text v-if="item.link" class="chat-link" :data-idx="index" @tap.stop="onChatLinkTap">{{item.link.text}}</text>
							<!-- 小程序分享卡片 -->
							<view v-if="item.card" class="chat-card" :data-idx="index" @tap.stop="onChatLinkTap">
									<image v-if="item.card.image" class="chat-card-cover" :src="item.card.image" mode="aspectFill"></image>
									<view class="chat-card-body">
										<view class="chat-card-info">
											<view class="chat-card-title">{{item.card.title}}</view>
											<view class="chat-card-desc">{{item.card.desc}}</view>
										</view>
									</view>
								</view>
							<view class="copy-tip" v-if="!item.card">点击复制全部 · 长按选择复制</view>
						</view>
						<!-- 追问建议 -->
						<view v-if="item.recommendQuestions && item.recommendQuestions.length" class="chat-recommend-questions">
							<view
								v-for="(rq, ri) in item.recommendQuestions"
								:key="ri"
								class="recommend-q"
								:data-q="rq"
								@tap="onQuickQuestion"
							>{{rq}}</view>
						</view>
					</view>
				</view>
				<!-- 用户消息 -->
					<view class="chat-msg chat-msg-user" v-if="item.role === 'user'" :id="'msg-' + index">
						<view class="chat-bubble-wrap user-bubble-wrap">
							<view class="chat-bubble user-bubble" @tap="copyMessage(index)">
								<text>{{item.content}}</text>
								<view class="copy-tip">点击复制</view>
							</view>
						</view>
						<view class="chat-avatar user-avatar">
							<image v-if="userAvatarUrl" class="avatar-img" :src="userAvatarUrl" mode="aspectFill"></image>
							<text v-else class="avatar-emoji">👤</text>
						</view>
					</view>
				</block>

				<!-- 加载中 -->
				<view class="chat-msg chat-msg-ai" v-if="chatLoading" id="msg-loading">
					<view class="chat-avatar ai-avatar">🤖</view>
					<view class="chat-bubble ai-bubble chat-typing">
						<view class="typing-dots">
							<view class="dot"></view>
							<view class="dot"></view>
							<view class="dot"></view>
						</view>
					</view>
				</view>
			</scroll-view>

		<!-- 快捷问题（按 botId 从数据库动态加载） -->
		<view class="chat-quick-questions" v-if="chatMessages.length === 0 && quickQuestions.length > 0">
			<view
				v-for="(q, qi) in quickQuestions"
				:key="qi"
				class="quick-q"
				:data-q="q.query"
				@tap="onQuickQuestion"
			>{{q.text}}</view>
		</view>

			<!-- 输入区域 -->
			<view class="chat-input-area" @tap.stop>
				<input
					class="chat-input"
					placeholder="输入您的问题..."
					:value="chatInput"
					@input="onChatInput"
					@confirm="sendChat"
					confirm-type="send"
					:disabled="chatLoading"
					:adjust-position="true"
					cursor-spacing="20"
				/>
				<view class="chat-send-btn" :class="canSend ? 'chat-send-active' : 'chat-send-disabled'" @tap="sendChat">
					发送
				</view>
			</view>
<!-- 输入区域 -->
 <view class="chat-send-btn-t" :class="canSend ? 'chat-send-active' : 'chat-send-disabled'" @tap="sendChat">
					111
				</view>
 <!-- 输入区域 -->
			
		</view>
	</view>
	</view>


	
</template>

<script>
	import {
		getIndexTitle,
		getIndexBannerList,
		getGoodsRecommendType,
		getGoodsRecommendItemDetail,
		getFunctionAreaList,
		getDetailByOrgNum,
		getExclusiveServiceStaffInfo,
		indexBrandList,
		toBeConfirmed,
		getPersonNumber,
		advertiseImg,
		DetailByOrgNum,
		getIndexWindowBannerList,
		getStyleById,
		couponIndexList,
		receiveCoupon,
		getAppGiftPack,
		serviceInfo
	} from '@/api/indexApi'
	import {
		getAppIcon,
		getActivityGoods,
		shareIcon,
		showShareButton
	} from '@/api/commonApi.js'
	import {
		toast,
		getRouter,
		refresh,
		getOrgNum
	} from '@/utils/utils.js'
	import headerSearch from '@/components/hederSearch.vue'
	import tabBar from '@/components/tabBar/tabBar.vue'
	import {
		getArticleList
	} from '@/api/articleApi.js'
	import moment from 'moment';
	export default {
		components: {
			headerSearch,
			tabBar,
		},
		data() {
			return {
				isEndDate:true,
				getBannerList: [],
				getcategoryList: [],
				getGoodsTypeList: [],
				goodsList: [],
				goodsDataList: [],
				flag: '',
				articleList: [],
				token: '',
				pageNum: 1,
				code: '',
				pageSize: 20,
				menuButtonInfo: 0, //胶囊按钮信息
				statusBarHeight: 0, //状态栏高度
				telmark: false,
				exclusive: {},
				isMobile: false,
				title: '',
				logo: '',
				brandList: {},
				ConfirmedNum: null,
				ConfirmedTelmark: false,
				appIconList: [],
				appIconList1: [],
				appIconList2: [],
				activityGoodsList: [],
				flage: false,
				orgNum: getOrgNum(),
				countdown: '',
				countdown1: '',
				day: '',
				time: '',
				minute: '',
				second: '',
				timer: null, //重复执行,
				shareIcon: '',
				isShow: null,
				bigSwiper: 0,
				advertising1: 1,
				style: {},
				background: '',
				background1: '',
				imgUrl: '',
				color: '',
				color1: '',
				color2: '',
				imageURL: '',
				background2: '',
				bannerImgList: [],
				advertiseImgList: [],
				advertiseImgListUrl: '',
				showAdvertising: false,
				tabBarFlag: false,
				time: 3,
				imgFlag: false,
				advertising: null,
				x: '',
				imageURL4: '',
				// orgNum: '',
				role: '',
				userid: '',
				scene: '',
				couponList:[],
				linkName: '',
				shareFinishImg: false,
				shareContetn: false,
				dpzxFlag: true,
				goodsType: 1,
				DpName:'',
				diyId:0,
				shopCode:'',
				shopNum:'',
				packages:{},
				isShowPackage:false,
				serviceData:{},
				hasNextPage:false,
				// 聊天相关
				chatOpen: false,           // 控制聊天窗口显示
				chatMessages: [],          // 聊天消息列表
				chatThreadId: '',         // 对话线程 ID
				showNewChatBtn: false,    // 是否显示"新对话"按钮
				chatInput: '',            // 输入框文本（注意：原代码用的是 chatInput，不是 chatInputText）
				chatLoading: false,       // 是否正在加载 AI 回复
				canSend: false,           // 是否可以发送消息
				scrollToMsg: '',          // 滚动到指定消息
				userAvatar: '',           // 用户头像（可选）
			aiAvatar: 'https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/ai-avatar.png', // AI 头像
			chatBotId: 'agent-tengxunyunz-2eiueb23fdc573', // 当前智能问答 Agent ID
			quickQuestions: [],          // 动态快捷问题（从数据库按 botId 加载）
		}
	},
		created() {
			this.getAppIconList()
			this.advertising = wx.getStorageSync("advertising");
			if (this.advertising == 1) {
				// wx.hideTabBar();
				var that = this
				// 隐藏底部按钮
				this.x = setInterval(function() {
					that.time = that.time - 1
					if (that.time == 0)
						that.jmp()

				}, 1000) //每秒执行一次 
			} else if (this.advertising == 2) {
				// wx.showTabBar();
			} else {
				// wx.hideTabBar();
				var that = this
				// 隐藏底部按钮
				this.x = setInterval(function() {
					that.time = that.time - 1
					if (that.time == 0)
						that.jmp()
				}, 1000) //每秒执行一次 
			}
			// this.getAdvertiseImg();
		},
		onReady() {},
		onLoad(query) {
			this.timer = setInterval(() => {
				this.showtime();
			}, 500);
			this.DpName=decodeURIComponent(query.scene)
			var diyIds=this.DpName.slice(this.DpName.indexOf(''))
			this.diyId=diyIds.split('=')[1]
			if(this.DpName==''||this.DpName=="undefined"){
				this.dpzxFlag=false
			}else{
				uni.navigateTo({
					url:this.DpName
				})
			}
			if(this.dpzxFlag){
				this.dpzxFlag=false
			}
			this.goodsDataList = [];
			this.getGoodsType()
			this.getActivityGoodsList()
			var token = uni.getStorageSync("token")
			var userName = uni.getStorageSync("userName")
			if (token && userName) {
				this.flage = true
			} else {
				this.flage = false
			}
			this.advertising1 = uni.getStorageSync("advertising")
			if (uni.getStorageSync("advertising") == 1) {
				this.advertising1 = 1
			} else if (uni.getStorageSync("advertising") == 2) {
				this.advertising1 = 2
			} else {
				this.advertising1 = 1
			}
			// var timestamp = Date.parse(new Date());
			// var expiration = timestamp + 1800000; //缓存30分钟
			// var data_expiration = wx.getStorageSync("data_expiration");
			// if (data_expiration) {
			// 	if (timestamp > data_expiration) {
			// 		wx.clearStorageSync()
			// 	}
			// } else {
			// 	wx.setStorageSync("data_expiration", expiration)
			// }
			this.getAdvertiseImg();
			this.getIndexWindowBanner()
			var that = this
			uni.getSystemInfo({
				success: function(e) {
					let myStatusBar = 0
					let myCustomBar = 0
					let myNvaMartom = 0
					let myNavHeight = 0
					let custom = uni.getMenuButtonBoundingClientRect();
					myStatusBar = e.statusBarHeight;
					myNavHeight = custom.height
					myNvaMartom = custom.top - e.statusBarHeight
					myCustomBar = (myNvaMartom * 2 + custom.height) - 2
					that.StatusBar = myStatusBar * 750 / wx.getSystemInfoSync()
						.windowWidth;
					that.CustomBar = (myCustomBar * 750 / wx.getSystemInfoSync()
						.windowWidth) + 12;
					that.NvaMartom = myNvaMartom * 750 / wx.getSystemInfoSync()
						.windowWidth;
					that.NavHeight = myNavHeight * 750 / wx.getSystemInfoSync()
						.windowWidth;
					that.Page_MagTOP = that.CustomBar + that.StatusBar
				}
			})
			// 获取到二维码原始链接内容
			this.scene = decodeURIComponent(query.scene)
			this.linkName = decodeURIComponent(query.name)
			if (this.scene && this.scene != "undefined") {
				var arr = this.scene.split('&');
				var arrs = [];
				arr.forEach(e => {
					arrs.push(e.split('='));
				});
				this.userid = arrs[0][1]
				this.role = arrs[1][1]
				if (this.role) {
					uni.setStorageSync('role', this.role)
				}
				if (this.userid) {
					uni.setStorageSync('userid', this.userid)
				}
			} else if (this.linkName == "link") {
				this.role = decodeURIComponent(query.role)
				this.userid = decodeURIComponent(query.uid)
				if (this.role) {
					uni.setStorageSync('role', this.role)
				}
				if (this.userid) {
					uni.setStorageSync('userid', this.userid)
				}
			}else {
				this.userid = " "
				this.role = " "
				if (this.role) {
					uni.setStorageSync('role', this.role)
				}
				if (this.userid) {
					uni.setStorageSync('userid', this.userid)
				}
			}

		},
		onShow() {
			var timestamp = Date.parse(new Date());
			var timer = 1*24*60*60*1000
			var expiration = timestamp + timer; //缓存24小时
			var data_expiration = wx.getStorageSync("data_expiration");
			if (data_expiration) {
				if (timestamp > data_expiration) {
					wx.clearStorageSync()
				}
			} else {
				wx.setStorageSync("data_expiration", expiration)
			}
			
			this.getserviceInfo()
			this.shopCode = uni.getStorageSync("code")
			this.shopNum = uni.getStorageSync("shopNum")
			this.getStyleByIdList()
			getRouter()
			this.getTitle()
			this.getBanner()
			// this.getGiftPack()
			// this.getPersonNumbers()
			this.getcategoryt()
			this.getArticle()
			this.getByOrgNum()
			this.getHeight()
			this.getIndexBrandList()
			this.getShareIcon()
			this.isShowShareButton()
			this.DetailByOrgNumList()
			this.getcouponIndexList()
			var token = uni.getStorageSync('token')
			if (token) {
				this.BeConfirmed()
			}
			uni.removeStorageSync('chooseList')
			if (typeof this.getTabBar === 'function' &&
				this.getTabBar()) {
				this.getTabBar().setData({
					selectedIndex: 1
				})
			}

		},
		onReachBottom: function() {
			if (this.goodsDataList.length !== 0) {
			// if (this.hasNextPage) {
				this.pageNum++
				this.getGoodsList()
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.shopCode = uni.getStorageSync("code")
			this.shopNum = uni.getStorageSync("shopNum")
			refresh(this.getDataMsg)
		},
		methods: {
			getserviceInfo(){
				serviceInfo().then(res=>{
					if(res.success){
						// console.log(res.data,"客服信息----")
						this.serviceData = res.data
					}
				})
			},
			callMe(number){
				wx.makePhoneCall({
					phoneNumber: '' + number,
					success() {},
					fail() {}
				})
			},
			toService(urls){
				if(urls){
					uni.navigateTo({
						url:'/personalPage/service/weChatService?url='+urls
					})
				}else{
					toast({
						title:'暂无微信'
					})
				}
			},
			openShare() {
				this.shareContetn = true
			},
			closeshareContetn() {
				this.shareContetn = false
			},
			openShop() {
				uni.navigateTo({
					url: '/pages/index/indexAdv'
				})
			},
			getStyleByIdList() {
				getStyleById().then(res => {
					if(!res) return
					if(res.code=='35'){
						this.shopNum = res.data
						this.shopCode = res.code
					}else{
						this.style = res.data
						this.color1 = this.style.loginbtn
						this.color = this.style.indextitle
						this.color2 = this.style.prodcuttext
						this.background = this.style.indexnotice
						this.background1 = this.style.colorblue
						this.background2 = this.style.searchbtn
						this.imgUrl = this.style.indeximg
						this.imageURL = this.style.indexsearchIcon
						this.imageURL4 = this.style.indexbackground
					}
					
				})
			},
			// 去开屏广告详情页
			goDetailType(url) {
				if(url){
					var weixinUrl = url.split('/')[0]+'//'+url.split('/')[2]
					if(weixinUrl=='https://mp.weixin.qq.com'){
						uni.navigateTo({
							url:'/goodsDetail/webView?url='+url
						})
					}else{
						var linkUrl = url.split('?')[1]
						if (url == "/pages/index/index" || url ==
							"/pages/prodcutClass/prodcutClass" || url == "/pages/cart/cart" || url ==
							"/pages/integral/integral" || url == "/pages/personal/personal") {
							uni.switchTab({
								url: this.advertiseImgListUrl,
							})
						} else if (url.indexOf('/goodsDetail/goodGift') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkUrl + '&goodsType=20'
							})
						} else if (url != "" && url != null) {
							uni.navigateTo({
								url: url
							})
						} else {
							if (res.specialActivityStatus == 1) {
								uni.navigateTo({
									url: '/personalPages/pages/activePage/activePage?id=' + res.specialActivityId
								})
							}
						}
					}
				}
			},
			jmp: function() {
				uni.setStorageSync('advertising', 2)
				this.advertising1 = 2
				clearInterval(this.x); //清除定时器
			},
			// 开屏广告
			getAdvertiseImg() {
				advertiseImg().then(res => {
					this.advertiseImgList = res.data
					if (res.data.length > 0 && this.advertising1 == 1) {

					} else if (res.data.length > 0 && this.advertising1 == 2) {
						// wx.showTabBar();
					} else {
						// wx.showTabBar();
						this.advertising1 = ''
					}
				})
			},
			//是否展示大图
			DetailByOrgNumList() {
				DetailByOrgNum().then(res => {
					this.bigSwiper = res.data.isBigPic
					// console.log(this.bigSwiper, 'this.bigSwiper');
				})
			},
			//首页广告
			getIndexWindowBanner() {
				getIndexWindowBannerList().then(res => {

					if (res.data.length > 0) {
						this.bannerImgList = res.data
						this.advertiseImgListUrl = res.data[0].linkUrl
						this.showAdvertising = true
					} else {
						this.showAdvertising = false
					}
				})
			},
			close() {
				this.showAdvertising = false
			},
			closeBtn() {
				this.isShowPackage = false
			},
			closeShare() {
				this.shareFinishImg = false
			},
			getbanner(item) {

				this.advertising1 = 0
			},

			// 去广告详情
			goToDetail(item) {
				// item.forEach((res) => {
					// 判断是不是商城链接
					var model = item.linkUrl.indexOf('model=1')
					// 截取正确的跳转路径
					var linkType = item.linkUrl.split('?')[0]
					var linkNum = item.linkUrl.split('?')[1]
					var weixinUrl = item.linkUrl.split('/')[0]+'//'+item.linkUrl.split('/')[2]
					if(weixinUrl=='https://mp.weixin.qq.com'){
						uni.navigateTo({
							url:'/goodsDetail/webView?url='+item.linkUrl
						})
					}else{
						// 商城链接
						if (item.linkUrl.indexOf('model=1') != -1) {
							if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
								'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
								uni.switchTab({
									url: linkType
								})
							} else {
								if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
									uni.navigateTo({
										url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
									})
								} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
									uni.navigateTo({
										url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
									})
								} else {
									uni.navigateTo({
										url: item.linkUrl
									})
								}
							}
						} else if (item.linkUrl.indexOf('model=0') != -1) {
							if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
								'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
						
								uni.switchTab({
									url: linkType
								})
							} else {
								if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
									uni.navigateTo({
										url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
									})
								} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
									uni.navigateTo({
										url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
									})
								} else {
									uni.navigateTo({
										url: item.linkUrl
									})
								}
							}
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
						
							} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					}
					
				// })
			},

			showtime() {
				var nowtime = new Date(); //获取当前时间
				this.activityGoodsList.forEach((item) => {
					item.goodsPrice.promotionEndTime = item.goodsPrice.promotionEndTime.replaceAll('-', '/')
					item.goodsPrice.promotionStartTime = item.goodsPrice.promotionStartTime.replaceAll('-', '/')
					if (item.goodsPrice.promotionStatus == 20) {
						// this.endtime = new Date(item.goodsPrice.promotionEndTime)
						var lefttime = new Date(item.goodsPrice.promotionEndTime) - nowtime.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数

						if (leftd < 0) {
							leftd = 0
						} else if (lefth < 0) {
							lefth = 0
						} else if (leftm < 0) {
							leftm = 0
						} else if (lefts < 0) {
							lefts = 0
						}
						if (lefth < 10) {
							this.countdown = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						} else {
							this.countdown = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}

						// console.log(this.countdown,'countdown')
						item.countdown = this.countdown
					} else if (item.goodsPrice.promotionStatus == 10) {
						var lefttime = new Date(item.goodsPrice.promotionStartTime) - nowtime
							.getTime(), //距离结束时间的毫秒数
							leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)), //计算天数
							lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24), //计算小时数
							leftm = Math.floor(lefttime / (1000 * 60) % 60), //计算分钟数
							lefts = Math.floor(lefttime / 1000 % 60); //计算秒数
						if (leftd < 0) {
							leftd = 0
						} else if (lefth < 0) {
							lefth = 0
						} else if (leftm < 0) {
							leftm = 0
						} else if (lefts < 0) {
							lefts = 0
						}
						if (lefth < 10) {
							this.countdown1 = leftd + "天" + '0' + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						} else {
							this.countdown1 = leftd + "天" + lefth + ":" + leftm + ":" + lefts; //返回倒计时的字符串
						}
						// console.log(this.countdown,'countdown')
						item.countdown1 = this.countdown1
					}

					// this.countdownList.push(this.countdown)
				})
			},
			getActivityGoodsList() {
				var data = {
					pageSize: 20,
					pageNum: 1,
					// 正常商品限时折扣1
					goodsType: 1,
				}
				getActivityGoods(data).then(res => {
					if (res.success) {
						// console.log(res.data, ' res.data====');
						this.activityGoodsList = res.data;
						this.activityGoodsList.forEach((item) => {
							if (!item.goodsPictureUrl)
								item.goodsPictureUrl = item.pictureUrl
						})
						this.activityGoodsList = this.activityGoodsList.slice(0, 3)
					}
				})
			},
			// 是否显示分享icon
			isShowShareButton() {
				showShareButton().then(res => {
					this.isShow = res.data.shareBtn
					// console.log(res,"分享icon")
				})
			},
			goReceive() {
				uni.navigateTo({
					url: '/personalPage/receivePackage'
				})
			},
			// 获取分享icon
			getShareIcon() {
				shareIcon().then(res => {
					this.shareIcon = res.data
					// console.log(res,"分享icon")
				})
			},
			// 分享店铺
			toShareShop() {
				uni.navigateTo({
					url: '/personalPage/share/shareShop'
				})
			},
			// 分享有礼
			toShareGift() {
				uni.navigateTo({
					url: '/personalPage/share/shareGift'
				})
			},
			// 获取访客数量
			// getPersonNumbers() {
			// 	wx.login({
			// 		//成功放回
			// 		success: (res) => {
			// 			let code = res.code
			// 			getPersonNumber(code).then(res => {})
			// 		}
			// 	})
			// },
			getAppIconList() {
				getAppIcon().then(res => {
					if (res.success) {
						this.appIconList = res.data[4];
						this.appIconList1 = res.data[5];
						this.appIconList2 = res.data[6];
						// console.log(this.appIconList,'123111')
					}
				})

			},
			// 下拉刷新
			getDataMsg() {
				this.getGoodsType()
				this.getTitle()
				this.getBanner()
				this.getcategoryt()
				this.getArticle()
				this.getByOrgNum()
				this.getHeight()
				this.getIndexBrandList()
				getRouter();
			},
			getGoodsType() {
				getGoodsRecommendType().then(res => {
					if (res.code == "0") {
						res.data.forEach(item => {
							item.flag = false
						})
						this.code = res.data[0].recommendType
						this.pageNum = 1
						this.getGoodsList()
						res.data[0].flag = true
						this.getGoodsTypeList = res.data
					}
				})
			},
			// 首页品牌部分
			getIndexBrandList() {
				indexBrandList().then(res => {
					if (res.data.length == 3) {
						this.brandList = res.data.slice(0, 3)
					} else if (res.data.length < 3) {
						this.brandList = [];
					} else if (res.data.length > 3 && res.data.length < 8) {
						this.brandList = res.data.slice(0, 4)
					} else if (res.data.length >= 8) {
						this.brandList = res.data.slice(0, 8)
					}

				})
			},
			//去品牌专区
			goBrandList() {
				uni.navigateTo({
					url: '/goodsLIst/brandList'
				})
			},
			//去限时折扣专区
			goActivityGoodsList() {
				uni.navigateTo({
					url: '/goodsLIst/activityGoodsLIst?goodsType=1'
				})
			},
			toproductList(item) {
				uni.navigateTo({
					url: '/goodsLIst/goodsLIst?brandName=' + item.name + '&brandId=' + item.id,
				})
			},
			colseCall() {

				this.ConfirmedTelmark = false
			},
			goComfin(name, orderStatus) {
				uni.navigateTo({
					url: '/personalPage/orderPage?orderStatus=' + orderStatus + '&name=' + name
				})
			},
			getTitle() {
				getIndexTitle().then(res => {
					this.title = res.data.displayName
					uni.setStorageSync('company', this.title);
					this.logo = res.data.logUrl
				})
			},
			isTelmark: function() {
				this.telmark = true
			},
			BeConfirmed() {
				toBeConfirmed().then(res => {
					if (res.success) {
						this.ConfirmedNum = res.data
						if (res.data == 0) {
							this.ConfirmedTelmark = false
						} else {
							this.ConfirmedTelmark = true
						}
					}
				})
			},
			getBanner() {
				getIndexBannerList().then(res => {
					if (res.code == '0') {
						this.getBannerList = res.data
					}
				})
			},
			getGiftPack() {
				getAppGiftPack().then(res => {
					if (res.code == '0') {
						this.packages = res.data
						this.isShowPackage = true
					}else{}
				})
			},
			goDetail(goodsId, bool) {
				if (bool) {
					uni.navigateTo({
						url: '/goodsDetail/goodsDetail?goodsId=' + goodsId + "&type=1" + "&isSample=1"
					})
				} else {
					uni.navigateTo({
						url: '/integralPages/integralDetail?integralId=' + goodsId
					})
				}
			},
			goLeaveWords() {
				uni.navigateTo({
					url: '/personalPage/leaveWord'
				})
			},
		async openChat() {
			console.log(`=====111111111111111222222222222===`)
			this.chatOpen = true

			// 如果已有消息，说明是重复打开，不再加载
			if (this.chatMessages.length > 0) return

			// 新对话：按 botId 加载快捷问题（异步不阻塞）
			this._loadQuickQuestions(this.chatBotId)

			// 调用云函数获取活跃线程和历史消息
			try {
				const res = await wx.cloud.callFunction({
					name: 'getChatThread',
					data: { botId: this.chatBotId }
				})
				const { threadId, messages } = res.result || {}

			if (messages && messages.length > 0) {
				this.chatThreadId = threadId
				this.chatMessages = messages.map((m, i) => ({
					id: 'msg-load-' + i,
					role: m.role === 'assistant' ? 'ai' : m.role,
					content: m.content
				}))
				this.showNewChatBtn = true
				// 滚动到最后一条用户消息
				let lastUserIdx = -1
				for (let i = this.chatMessages.length - 1; i >= 0; i--) {
					if (this.chatMessages[i].role === 'user') {
						lastUserIdx = i
						break
					}
				}
				if (lastUserIdx >= 0) {
					this.scrollToMsg = ''
					this.$nextTick(() => { this.scrollToMsg = 'msg-' + lastUserIdx })
				}
			} else {
					this.chatThreadId = threadId || ''
				}
			} catch (err) {
				console.error('[智能问答] 加载对话历史失败', err)
				// 失败不影响使用，从头开始
			}
		},
		// 按 botId 从数据库加载快捷问题
		async _loadQuickQuestions(botId) {
			try {
				const res = await wx.cloud.callFunction({
					name: 'getQuickQuestions',
					data: { botId }
				})
				const questions = (res.result && res.result.questions) || []
				this.quickQuestions = questions
			} catch (err) {
				console.error('[智能问答] 加载快捷问题失败', err)
			}
		},
			// 关闭对话框（保留数据，下次打开可继续）
			closeChat() {
				this.chatOpen = false
			},
			// 新对话
			async startNewChat() {
				const { chatThreadId } = this
				if (chatThreadId) {
					wx.cloud.callFunction({
					name: 'closeChatThread',
					data: { threadId: chatThreadId }
					}).catch(err => {
					console.error('[智能问答] 关闭旧线程失败', err)
					})
				}
			this.chatMessages = []
			this.chatThreadId = ''
			this.showNewChatBtn = false
			// 新对话：重新加载快捷问题
			this._loadQuickQuestions(this.chatBotId)
		},
			// 输入内容
			onChatInput(e) {
				this.chatInput = e.detail.value
				this.canSend = !!e.detail.value.trim() && !this.chatLoading
			},

			// 快捷问题
		onQuickQuestion(e) {
			const q = e.currentTarget.dataset.q
			this.chatInput = q
			this.canSend = !!q.trim() && !this.chatLoading
				this.sendChat()
			},
			// 发送消息
			async sendChat() {
				const { chatInput, chatLoading } = this
				if (!chatInput.trim() || chatLoading) return

				const userMsg = {
					id: 'msg-' + Date.now(),
					role: 'user',
					content: chatInput.trim()
				}
			console.error('==============sendChat========', chatInput)
				const messages = [...this.chatMessages, userMsg]
				this.chatMessages = messages
				this.chatInput = ''
				this.chatLoading = true
				this.canSend = false
		this.scrollToMsg = ''
		this.$nextTick(() => { this.scrollToMsg = 'msg-' + (messages.length - 1) })
				// 特殊关键词：输入"测试"返回跳转链接
				if (userMsg.content === '测试') {
					const aiMsg = {
					id: 'msg-' + Date.now(),
					role: 'ai',
					content: '点击跳转到我的页面 👉 ',
					link: { text: '跳转', url: '/pages/prodcutClass/prodcutClass'}
					}
					const newMsgs = [...this.chatMessages, aiMsg]
					this.chatMessages = newMsgs
					this.chatLoading = false
			this.scrollToMsg = ''
		this.$nextTick(() => { this.scrollToMsg = 'msg-' + (newMsgs.length - 1) })
			return
		}

	// 特殊关键词：输入"卡片"返回小程序卡片
			if (userMsg.content === '卡片') {
				const aiMsg = {
				id: 'msg-' + Date.now(),
				role: 'ai',
				content: '为您生成小程序卡片，点击即可跳转：',
				card: { title: '产品分类', desc: '点击进入产品分类页面', path: '/pages/prodcutClass/prodcutClass', image: 'cloud://cloud1-d1gdmvmst507ae4d9.636c-cloud1-d1gdmvmst507ae4d9-1305841482/991d679157999e8648d1a0eec87bda9a.png' }
				}
					const newMsgs = [...this.chatMessages, aiMsg]
					this.chatMessages = newMsgs
					this.chatLoading = false
			this.scrollToMsg = ''
		this.$nextTick(() => { this.scrollToMsg = 'msg-' + (newMsgs.length - 1) })
			return
		}

		try {
					// 1. 调用云函数获取相关产品数据（作为 context 传入 bot）
					const dbRes = await wx.cloud.callFunction({
					name: 'aiChat',
					data: { question: userMsg.content }
					})
					const { products = [], factories = [], categories = [] } = dbRes.result || {}

					// 2. 构建 context 信息
					let contextInfo = ''

					// 3. 生成唯一 ID
					const generateId = () => {
					const timestamp = Date.now().toString().slice(-4)
					const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
					return timestamp + random
					}

					// 4. 使用 wx.cloud.extend.AI.bot.sendMessage 调用 Agent
					let aiText = ''

					// 添加 AI 占位消息（先显示等待提示）
				const aiMsg = {
					id: 'msg-' + Date.now(),
					role: 'ai',
					content: '正在查询，请等待...',
					recommendQuestions: []
				}
					const msgs = [...this.chatMessages, aiMsg]
					this.chatMessages = msgs

					const idx = this.chatMessages.length - 1
					// 复用 threadId，首次对话则生成并保存
					let threadId = this.chatThreadId
					if (!threadId) {
					threadId = 'thread_id_' + generateId()
					this.chatThreadId = threadId
					}

					// 构建历史消息（排除占位消息和卡片消息，截断最近20条）
					const historyMessages = this.chatMessages
					.filter(m => (m.role === 'user' || m.role === 'ai') && !m.card && m.content !== '正在查询，请等待...')
					.slice(-20)
					.map(m => ({
						id: m.id,
						role: m.role === 'ai' ? 'assistant' : m.role,
						content: m.content
					}))

					// 503 错误不会抛异常，需要同时检测 sendMessage 返回值和 eventStream 中的错误
					let retryCount = 0
					const maxRetries = 5
					let aiSuccess = false

					while (retryCount <= maxRetries && !aiSuccess) {
					let res = null
					let needRetry = false
					let retryReason = ''
					aiText = '' // 每次重试清空之前的内容

						try {
						res = await wx.cloud.extend.AI.bot.sendMessage({
						data: {
							botId: 'agent-tengxunyunz-2eiueb23fdc573',
							threadId: threadId,
							runId: 'run_id_' + generateId(),
							messages: [
							...historyMessages,
							{ id: String(Date.now()), role: 'user', content: userMsg.content }
							],
							tools: [],
							context: contextInfo ? [{ key: 'db_data', content: contextInfo }] : [],
							state: {},
							forwardedProps: {},
						}
						})

						for await (const event of res.eventStream) {
							let data
							try {
							data = JSON.parse(event.data)
							} catch (parseErr) {
							console.error('[智能问答] 解析事件数据失败:', event.data)
							continue
							}
							
							switch (data.type) {
						case 'TEXT_MESSAGE_CONTENT':
							aiText += data.delta
							this.chatMessages[idx].content = aiText
							this.chatLoading = false
					this.scrollToMsg = ''
					this.$nextTick(() => { this.scrollToMsg = 'msg-' + idx })
							break
							case 'RUN_ERROR':
								console.error('[智能问答] 流式响应错误:', data.message)
								// 检测 503 类错误，触发重试
								const errMsg = data.message || ''
								if (errMsg.includes('503') || errMsg.includes('Service Unavailable') || errMsg.includes('unavailable') || errMsg.includes('冷启动')) {
								needRetry = true
								console.error('=======================503')
								retryReason = 'RUN_ERROR: ' + errMsg.substring(0, 100)
								} else {
								// 非 503 的 RUN_ERROR，显示错误并结束
								this.chatMessages[idx].content = `AI 服务出错：${errMsg || '未知错误'}`
								this.chatLoading = false
								aiSuccess = true // 标记结束，不再重试
								}
								break
						case 'RUN_FINISHED':
							// 流式结束，保存消息到数据库
							if (userMsg.content && aiText) {
							const currentThreadId = this.chatThreadId

							// 一次调用保存：用户消息 + AI消息 + 线程更新 + 消息计数（关键，失败要提示用户）
							try {
								await wx.cloud.callFunction({
								name: 'saveChatRound',
								data: {
									threadId: currentThreadId,
									userContent: userMsg.content,
									aiContent: aiText
								}
								})
							} catch (err) {
								console.error('[saveChatRound] 保存消息失败', err)
								uni.showToast({ title: '消息保存失败，请检查网络', icon: 'none' })
							}

							// 审计日志（非关键，异步不阻塞主流程）
							wx.cloud.callFunction({
								name: 'saveChatLog',
								data: { question: userMsg.content, answer: aiText }
							}).catch(err => console.error('[saveChatLog] 保存失败', err))

						// 显示新对话按钮
						this.showNewChatBtn = true
						// 获取追问建议（非关键，异步不阻塞主流程）
						this._fetchRecommendQuestions(idx, userMsg.content, aiText, historyMessages)
						}
						aiSuccess = true // 成功完成
							break
							}

							// 如果检测到需要重试，跳出 eventStream 循环
							if (needRetry) break
						}
						} catch (streamErr) {
						// eventStream 遍历过程中抛出异常（如连接中断）
						const errStr = [streamErr.message, streamErr.errMsg, JSON.stringify(streamErr)].join(' ')
						console.error('[智能问答] eventStream 异常:', errStr.substring(0, 300))

						if (errStr.includes('503') || errStr.includes('Service Unavailable') || errStr.includes('unavailable')) {
							needRetry = true
							retryReason = 'eventStream 异常(503)'
						} else {
							throw streamErr
						}
						}

						// 如果流中没有收到任何内容且未成功，也需要重试
						if (!aiSuccess && !needRetry && !aiText) {
						needRetry = true
						retryReason = 'eventStream 为空（无内容返回）'
						}
					
					// 处理重试
					if (needRetry && retryCount < maxRetries) {
						retryCount++
						const waitTime = Math.pow(2, retryCount) * 2000
						console.log(`[智能问答] 检测到 503 错误(${retryReason})，第 ${retryCount} 次重试，等待 ${waitTime}ms...`)

						this.chatMessages[idx].content = `小助手正在为你努力查询中，需要一点等待时间......`
						//[`chatMessages[${idx}].content`]: `AI 服务启动中，请稍候...（第 ${retryCount} 次重试，约 ${waitTime / 1000} 秒后重试）`

						await new Promise(resolve => setTimeout(resolve, waitTime))
					} else if (needRetry) {
						// 已达最大重试次数
						console.error(`[智能问答] 已达最大重试次数(${maxRetries})，放弃重试`)
						throw new Error(`AI 服务暂时不可用(${retryReason})，请稍后重试`)
					}
					}

					// 确保加载状态关闭
					this.chatLoading = false
					this.canSend = !!this.chatInput.trim()

				} catch (err) {
					console.error('智能问答失败:', err)
					const fallback = this._generateFallbackAnswer(userMsg.content)
					const aiMsg = {
					id: 'msg-' + Date.now(),
					role: 'ai',
					content: fallback
					}

					const newMessages = [...this.chatMessages, aiMsg]
					this.chatMessages = newMessages
					this.chatLoading = false
					this.canSend = !!this.chatInput.trim()
			this.scrollToMsg = ''
		this.$nextTick(() => { this.scrollToMsg = 'msg-' + (newMessages.length - 1) })
					// 保存降级回答
					wx.cloud.callFunction({
					name: 'saveChatLog',
					data: { question: userMsg.content, answer: fallback }
					}).catch(err => console.error('[saveChatLog] 降级回答保存失败', err))
				}
			},
	// 获取追问建议问题（方案二：用 sendMessage 自行生成，不依赖控制台 isNeedRecommend 开关）
	async _fetchRecommendQuestions(idx, userMsg, aiReply, historyMessages) {
		// AI 回复为兜底文案（无法回答）时，不显示追问建议
		const fallbackKeywords = '根据现有知识库信息，我无法回答您的问题。'
		console.error('===============questions===aiReply=======', aiReply)
		if (aiReply && aiReply.includes(fallbackKeywords)) {
			return
		}

		const botId = 'agent-tengxunyunz-2eiueb23fdc573'
		try {
			// 构造追问生成指令，附带完整对话上下文（历史 + AI 回复 + 生成指令）
			const recommendPrompt = '基于以上对话内容，请推测用户接下来可能想继续提问的3个问题。只输出问题本身，每行一个，不要编号、不要引号、不要任何解释或前后缀。'
			const messages = [
				...historyMessages,
				{ id: String(Date.now()) + 'r', role: 'assistant', content: aiReply },
				{ id: String(Date.now()) + 'u', role: 'user', content: recommendPrompt }
			]

			// 使用独立的 threadId，避免污染主对话历史
			const recThread = 'recommend_' + Date.now()
			const res = await wx.cloud.extend.AI.bot.sendMessage({
				data: {
					botId: botId,
					threadId: recThread,
					runId: 'rec_run_' + Date.now(),
					messages: messages,
					tools: [],
					context: [],
					state: {},
					forwardedProps: {}
				}
			})

			// 读取流式响应，累积文本
			let recText = ''
			for await (const event of res.eventStream) {
				let data
				try {
					data = JSON.parse(event.data)
				} catch (e) {
					continue
				}
				if (data.type === 'TEXT_MESSAGE_CONTENT') {
					recText += data.delta
				}
			}

			// 解析推荐问题：按换行分割，去除编号/引号前缀，过滤空行，最多3条
			const questions = recText
				.split(/\n+/)
				.map(q => q
					.replace(/^\d+[\].、)）]\s*/, '')
					.replace(/^[-•·]\s*/, '')
					.replace(/^["「『（(]+|["」』）)]+$/g, '')
					.trim()
				)
				.filter(q => q && q.length > 2 && q.length < 100)
				.slice(0, 3)
			if (questions.length > 0 && this.chatMessages[idx]) {
				console.error('===============questions==========', questions)
				if (questions&& questions.includes(fallbackKeywords)) {
					return
				}
				this.$set(this.chatMessages[idx], 'recommendQuestions', questions)
			}
		} catch (err) {
			console.error('[sendMessage 获取推荐问题] 失败', err)
		}
	},
		// 复制消息内容
		copyMessage(index) {
			const msg = this.chatMessages[index]
			if (!msg || !msg.content) return

				uni.setClipboardData({
					data: msg.content,
					success: () => {
					uni.showToast({ title: '已复制', icon: 'success' })
					}
				})
			},
			// 点击消息中的链接
		onChatLinkTap(e) {
			const index = e.currentTarget.dataset.idx
			const item = this.chatMessages[index]
			if (!item) return
			const url = (item.link && item.link.url) || (item.card && item.card.path)
			if (!url) return
			const tabPages = ['/pages/index/index', '/pages/prodcutClass/prodcutClass', '/pages/cart/cart', '/pages/integral/integral', '/pages/personal/personal']
			if (tabPages.includes(url)) {
				uni.switchTab({ url })
			} else {
				uni.navigateTo({ url })
			}
		},
			getArticle(option) {
				var postData = {
					pageNum: this.pageNum,
				};
				getArticleList(postData

				).then(res => {
					res.data.forEach(item => {
						item.createTime = moment(res.data.createTime).format('YYYY.MM.DD HH:mm:ss')
					})
					this.articleList = res.data;
				})
			},
			getcategoryt() {
				getFunctionAreaList().then(res => {
					if (res.data) {
						this.getcategoryList = []
						res.data.forEach(item => {
							if (item.status == 10) {
								this.getcategoryList.push(item)
							}
						})
					}

				})
			},
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
			goArticleList(item) {
				uni.navigateTo({
					url: '/personalPage/notice_detail?articleId=' + item.id
				})
			},
			titleBtn(code, index, flag) {
				this.code = code;
				this.pageNum = 1;
				this.goodsDataList = [];
				if (index == 1) {
					this.$nextTick(item => {
						this.$set(this.getGoodsTypeList[index], 'flag', true)
						this.$set(this.getGoodsTypeList[0], 'flag', false)
					})
					this.getGoodsList()
				}
				if (index == 0) {
					this.$nextTick(item => {
						this.$set(this.getGoodsTypeList[index], 'flag', true)
						this.$set(this.getGoodsTypeList[1], 'flag', false)
					})
					this.getGoodsList()
				}
			},
			goProductsCross(){
				uni.navigateTo({
					url: '/goodsDetail/COA/productsCross'
				})
			},
			goSamplePage() {
				uni.navigateTo({
					url: '/goodsDetail/samplePage/samplePage'
				})
			},
			goRepair() {
				let flage = false
				var token = uni.getStorageSync("token")
				var userName = uni.getStorageSync("userName")
				if (token && userName) {
					flage = true
				} else {
					flage = false
				}
				if (flage) {
					uni.navigateTo({
						url: '/personalPage/repair/repair'
					})
				} else {
					uni.showModal({
						title: "提示",
						content: '未登录不能提交报修单，是否去登录？',
						success(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/loginPages/indexlogin'
								})
							} else if (res.cancel) {

							}

						}
					})
				}
			},
			getGoodsList() {
				var RecommendItemParam = {
					recommedTypeCode: this.code,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				getGoodsRecommendItemDetail(RecommendItemParam).then(res => {
					if (res.success) {
						if (this.goodsDataList.length < res.data.total) {
							res.data.list.forEach((item) => {
								this.goodsDataList.push(item)
							})
							// this.goodsDataList = this.goodsDataList.concat(res.data.list);
						}
						this.hasNextPage = res.data.hasNextPage
					}
				})
			},
			getByOrgNum() {
				getExclusiveServiceStaffInfo().then(res => {
					if (res.success) {
						if (res.data.customerServiceMobile && res.data.customerServiceName) {
							this.exclusive.customerServiceMobile = res.data.customerServiceMobile
							this.exclusive.customerServiceName = res.data.customerServiceName
						} else {
							getDetailByOrgNum().then(res1 => {
								if (res1.success) {
									if (res1.data.customerServiceMobile) {
										this.exclusive.customerServiceMobile = res1.data
											.customerServiceMobile
										this.exclusive.customerServiceName = '客服电话'
										// 
									} else {
										this.isMobile = true
									}
								}

							})
						}
					} else {
						getDetailByOrgNum().then(res1 => {
							if (res1.success) {
								if (res1.data.customerServiceMobile) {
									this.exclusive.customerServiceMobile = res1.data.customerServiceMobile
									this.exclusive.customerServiceName = '客服电话'
								} else {
									this.isMobile = true
								}
							}

						})
					}
				})

			},
			goCategory(item) {
				// 判断是不是商城链接
				var model = item.linkUrl.indexOf('model=1')
				// 截取正确的跳转路径
				var linkType = item.linkUrl.split('?')[0]
				var linkNum = item.linkUrl.split('?')[1]
				var weixinUrl = item.linkUrl.split('/')[0]+'//'+item.linkUrl.split('/')[2]
				if(weixinUrl=='https://mp.weixin.qq.com'){
					uni.navigateTo({
						url:'/goodsDetail/webView?url='+item.linkUrl
					})
				}else{
					// 商城链接
					if (item.linkUrl.indexOf('model=1') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
							} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else if (item.linkUrl.indexOf('model=0') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
					
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
					
							} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else {
						if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
							})
					
						} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
							})
						} else {
							uni.navigateTo({
								url: item.linkUrl
							})
						}
					
					}
				}
				
			},
			call: function(e) {
				wx.makePhoneCall({
					phoneNumber: '' + e,
					success() {},
					fail() {}
				})
			},
			callShopNum: function(e) {
				wx.makePhoneCall({
					phoneNumber: '' + e,
					success() {},
					fail() {}
				})
			},
			cancel() {
				this.telmark = false
			},
			goGoodList(item) {
				// 判断是不是商城链接
				var model = item.linkUrl.indexOf('model=1')
				// 截取正确的跳转路径
				var linkType = item.linkUrl.split('?')[0]
				var linkNum = item.linkUrl.split('?')[1]
				// var str='https://mp.weixin.qq.com/s/nkOX0HuN3fAxOGRRE48CVQ'
				var weixinUrl = item.linkUrl.split('/')[0]+'//'+item.linkUrl.split('/')[2]
				if(weixinUrl=='https://mp.weixin.qq.com'){
					uni.navigateTo({
						url:'/goodsDetail/webView?url='+item.linkUrl
					})
				}else{
					// 商城链接
					if (item.linkUrl.indexOf('model=1') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass'||
							linkType == '/pages/integral/integral') {
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
							} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
								console.log('123123')
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else if (item.linkUrl.indexOf('model=0') != -1) {
						if (linkType == '/pages/index/index' || linkType == '/pages/cart/cart' || linkType ==
							'/pages/personal/personal' || linkType == '/pages/prodcutClass/prodcutClass') {
							uni.switchTab({
								url: linkType
							})
						} else {
							if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
								})
							} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
								uni.navigateTo({
									url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
								})
							} else {
								uni.navigateTo({
									url: item.linkUrl
								})
							}
						}
					} else {
						if (item.linkUrl.indexOf('/goodsDetail/goodSample') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkNum + '&iSsampleList=true'
							})
						} else if (item.linkUrl.indexOf('/goodsDetail/goodGift') != -1) {
							uni.navigateTo({
								url: '/goodsDetail/goodsDetail?' + linkNum + '&goodsType=20'
							})
						} else {
							uni.navigateTo({
								url: item.linkUrl
							})
						}
					}
				}
				
			},
			// 获取优惠券列表
			getcouponIndexList(){
				couponIndexList().then(res=>{
					if(res.success){
						this.couponList = res.data
						// console.log(res,"优惠券列表")
					}
				})
			},
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
			
		}
	}
</script>
<style>
	page{
		width: 100%;
		background-color: #F4F4F4;
	}
</style>
<style scoped lang="scss">
	@import url("@/static/LHT/indexPublic.css");
	// 服务到期样式
	.endDate{
		width: 100%;
		height:100vh;
		background: rgba(255,255,255,0.7);
		
		.header_text {
			width: 750upx;
			text-align:center;
			font-size: 34upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #212121;
		}
		.header-content{
			margin-top:100upx;
			.cont_image{
				width:750upx;
				height:500upx;
			}
			.cont_text{
				width:750upx;
				text-align:center;
				.cont_text_title{
					font-size: 30rpx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					line-height: 50rpx;
				}
			}
			.cont_texts{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 44rpx;
			}
			
		}
		
	}
	// 开屏广告样式
	.content1 {
		width: 100vw;
		height: 100vh;

		image {
			width: 100%;
			height: 100%;
		}

		.skip {
			display: flex;
			justify-content: center;
			width: 160upx;
			height: 50upx;
			line-height: 50upx;
			text-align: center;
			border-radius: 80upx;
			position: absolute;
			bottom: 80upx;
			right: 60upx;
			background: rgba(255, 255, 255, .2);
			color: #FFFFFF;

		}
	}
	
	// 首页样式
	.content {
		width: 100%;
		background: #f6f6f6 !important;
		display: flex;
		flex-directions: column;
		align-items: center;
		justify-content: center;
		
		// 客服弹窗 待确认订单弹窗
		.call {
			width: 100vw;
			height: 100vh;
			background-color: rgba(0, 0, 0, .4) !important;
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;

			.mark {
				width: 556upx;
				height: 395upx;
				background: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/wx/red/index/call_bg.png) no-repeat;
				background-size: 100% 100%;
				text-align: center;

				image {
					width: 100upx;
					height: 100upx;
					margin-top: 12upx;

				}

				.tel_name {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: #333333;
					margin-top: 30upx;
				}

				.tel {
					width: 556upx;
					height: 106upx;
					border-top: 1px solid #EEEEEE;
					display: flex;
					justify-content: space-between;
					margin-top: 34upx;

					view {
						width: 277upx;
						height: 106upx;
						text-align: center;
						line-height: 106upx;
					}

					view:nth-child(1) {
						width: 277upx;
						height: 106upx;
						border-right: 1px solid #EEEEEE;
						text-align: center;
						line-height: 106upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
					}


				}


			}

			.popoutContent {
				z-index: 9999;
				width: 580upx;
				height: 534upx;
				text-align: center;
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border-radius: 20upx;
				background: #FFFFFF;

				.popoutTitle {
					height: 33upx;
					font-size: 32upx;
					font-family: Microsoft YaHei;
					font-weight: bold;
					color: #333333;
					box-sizing: border-box;
					padding-top: 71upx;
					padding-left: 1upx;
					display: flex;
				}

				.popoutLine {
					width: 56upx;
					height: 6upx;
					margin-top: 50upx;
					margin-left: 61upx;
				}

				.popoutNumber {
					width: 439upx;
					height: 78upx;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-left: 60upx;
					margin-top: 20upx;
					white-space: pre-wrap;
					line-height: 50upx;
					text-align: left;
				}

				.popoutNumber span {
					color: #E10213;
				}

				.popoutText {
					width: 439upx;
					height: 75upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 48upx;
					margin-top: 50upx;
					margin-left: 50upx;
					display: flex;
					text-align: left;
				}


			}
		}

		// 内容
		.contentHeader {
			width: 100%;
			height: 438upx;
			
			// 大banner
			.bigStyleSwiper{
				.swiper{
					width: 100%;
					height: 960upx;
					background: linear-gradient(#ffffff, #f8f8f8);
				}
				
			}

			.header {
				width: 100%;
				margin: 0 auto;

				.header-text {
					text-align: center;

					image {
						width: 32upx;
						height: 32upx;
						margin-right: 6upx;
					}
				}
			}
			
			// 小banner
			.bannerImg {
				width: 100%;
				height: 400upx;
				margin: 20upx auto 0;
				overflow: hidden;
			
				image {
					height: 100%;
					width: 100%;
				}
			}
			
			// 广告和功能区
			.notice_classify{
				width:100%;
				background-color:#FAFBFB;
				
				// 通知
				.notice_content {
					width: 690upx;
					height: 70upx;
					margin: 0 auto 20upx;
					border-radius: 10upx;
					background-color: #FFFFFF;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					overflow: hidden;
					box-shadow: 0upx 0upx 100upx rgba(207, 217, 213, 0.4);
				
					.notice_content_two {
						width: 599upx;
						height: 32upx;
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
				
				// 功能区
				.classify {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					margin: 20upx auto 0;
					background: #ffffff;
					border-radius: 10upx;
					padding-top: 18upx;
				
					.classifyBox {
						width: 120upx;
						margin-left: 25upx;
						margin-bottom: 17upx;
				
						image {
							width: 118upx;
							height: 118upx;
						}
				
						.classifyText {
							width: 118upx;
							text-align: center;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #333333;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}
			
			// 优惠券模块
			.coupon{
				width: 100%;
				height: 170upx;
				background: #FFFFFF;
				padding:20upx 0;
				margin-top:20upx;
				
				.couponList {
					width: 690upx;
					height: 170rpx;
					margin :0 auto;
					white-space: nowrap;
					
					.couponItem {
						width:246upx;
						height: 170rpx;
						background: url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/discounts_cartbg.png');
						background-size:100% 100%;
						display: inline-block;
						text-align: center;
						font-size: 36rpx;
						margin-right:20upx;
						position:relative;
						
						.alreadyImg{
							width:62upx;
							height:50upx;
							position:absolute;
							left:0;
							top:0;
						}
						.price{
							color: #FF5000;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: bold;
							line-height:140upx;
							
							text{
								color: #FF5000;
								font-size: 60rpx;
								font-family: PingFang SC;
								font-weight: 800;
							}
						}
						.price_text{
							width:246upx;
							text-align:center;
							color: #FFFFFF;
							font-size: 22rpx;
							font-family: PingFang SC;
							font-weight: bold;
							margin-top:7upx;
							position:absolute;
							bottom:8upx;
						}
					}
				}
				
			}
			
			// 样品申请模块
			.Samples{
				width: 100%;
				background: #FFFFFF;
				margin-top:20upx;
				padding:30upx 0;
				
				.repairsAndsample {
					width:690upx;
					margin:0 auto 0;
					display: flex;
					justify-content:space-between;
					.repairs {
						width: 330upx;
						height: 180upx;
						image{
							width: 330upx;
							height: 180upx;
						}
					}
					.sample {
						width: 330upx;
						height: 180upx;
						image{
							width: 330upx;
							height: 180upx;
						}
					}
				}
				.samples {
					width: 690upx;
					height: 140upx;
					margin:0 auto 0;
				
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			// 专属服务
			.customerService{
				width: 100%;
				margin: 20upx auto 0;
				background: #ffffff;
				
				.customerService_cont{
					width: 690upx;
					padding:20upx 30upx;
					
					.integralBrandTop {
						width: 100%;
						margin: 0 auto;
						margin-bottom: 30upx;
					
						.integralBrandText {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #202021;
							padding-top: 10upx;
						}
					}
					.customerServiceFlex {
						width: 690upx;
						margin: 0 auto;
						
						.customerServiceFlex_s{
							width:100%;
							margin: 0 auto;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							
							.customerServiceFlex_item {
								width:100%;
								display: flex;
								justify-content: space-between;
								padding: 15upx 0;
								.customerServiceFlex_left{
									// width: 200upx;
									display: flex;
									justify-content: space-between;
									
									
									.serviceFlex_left_left{
										width: 88upx;
										height: 88upx;
										margin-right: 15upx;
										
										image{
											width: 100%;
											height: 100%;
											border-radius: 50%;
										}
									}
									.serviceFlex_left_right{
										// margin-top:5px;
										.view_1{
											font-size: 28rpx;
											font-family: PingFang SC;
											font-weight: bold;
											color: #333333;
										}
										.view_2{
											font-size: 24rpx;
											font-family: PingFang SC;
											font-weight: 500;
											color: #929396;
											margin-top:10px;
										}
									}
								}
								.customerServiceFlex_right{
									width: 240upx;
									.serviceFlex_left_top{
										width: 100%;
										display: flex;
										justify-content: start;
										image{
											width: 28upx;
											height: 28upx;
											margin-top: 10upx;
										}
										view{
											font-size: 24rpx;
											font-family: PingFang SC;
											font-weight: 500;
											color: #333333;
											margin-top: 8upx;
											margin-left: 15upx;
										}
									}
								}
							}
						}
					}
					
				}
			}
			
			// 品牌专区及限时特价
			.integralBrand {
				width: 100%;
				margin: 20upx auto 0;
				background: #ffffff;
				
				.integralBrand_cont{
					width: 690upx;
					padding:20upx 30upx;
					
					.integralBrandTop {
						width: 100%;
						margin: 0 auto;
						display: flex;
						justify-content: space-between;
					
						.integralBrandText {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #202021;
							padding-top: 10upx;
						}
					
						.integralBrandMore {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #666666;
							padding-top: 10upx;
						}
					}
					// 品牌专区
					.integralBrandFlex {
						width: 690upx;
						margin: 0 auto;
						
						.integralBrandFlex_s{
							margin: 0 auto;
							display: flex;
							flex-wrap: wrap;
							justify-content: space-between;
							
							.integralBrandFlex_item {
								text-align: center;
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 500;
								color: #333333;
								margin: 30upx 5upx 0 5upx;
								view{
									width: 140upx;
									height: 80upx;
									margin: 0 auto;
									image{
										width: 140upx;
										height: 80upx;
									}
								}
							}
						}	
					}
					// 限时特价
					.discount{
						width: 690upx;
						display: flex;
						flex-wrap: wrap;
						justify-content: space-between;
						.discountList {
							margin: 0 auto;
							white-space: nowrap;
							
							.discountList_box {
								text-align: left;
								width: 340upx;
								height: 200px;
								border: 1px solid #ffffff;
								display: inline-block;
								border-radius: 20upx;
								position: relative;
								
								.discountList_box1 {
									margin-top: 20upx;
									width: 150px;
									height: 150px;
									position: relative;
								
									.canbuyimageBottom {
										width: 94.5%;
										height: 40upx;
										position: absolute;
										left: 0;
										bottom: 0;
										background: linear-gradient(-70deg, #FF4F26 10%, #FA9956 100%);
										border-radius: 0upx 0upx 10upx 10upx;
										font-size: 20upx;
										line-height: 40upx;
										padding: 0upx 8upx;
										color: #FFFFFF;
										font-weight: normal;
									}
								
									.pic {
										width: 150px;
										height: 150px;
										border-radius: 20upx;
									}
								}
								.txt {
									width: 300upx;
									margin-top: 10upx;
									font-size: 30upx;
									font-family: PingFang SC;
									font-weight: 500;
									color: #202021;
									overflow: hidden;
									text-overflow: ellipsis;
									line-height: 38upx;
									
									.txt2_span1{
										font-size: 36upx;
										font-family: PingFang SC;
										font-weight: bold;
										color: #FF5000;
									}
									.txt2_span2{
										text-decoration: line-through;
										font-size: 30upx;
										margin-left: 20upx;
										color:#9FA0A5;
										font-weight: normal;
									}
								}
							}
							
							
						}
					}
					
				}
			}

			// 精选好物
			.contentSelect {
				width: 100%;
				background: #fff;
				margin: 20upx auto 0;
				
				// tab
				.selectTopTitle {
					width: calc(100% - 260upx);
					height: 50upx;
					display: flex;
					justify-content: space-between;
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin: 0 auto;
					padding-top:36upx;

					image {
						width: 126upx;
						height: 50upx;
					}

					.titleName {
						line-height: 30upx;
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #202021;
					}
				}
				
				// 商品列表
				.selection {
					width: calc(100% - 60upx);
					margin: 20upx auto;
					padding-bottom:20upx;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.selectGoods {
						width: 330upx;
						// height: 475upx;
						margin-top: 30upx;

						image {
							width: 330upx;
							height: 330upx;
							border-radius: 20upx;
						}

						.selectGoodsTitle {
							width: 314upx;
							height: 76upx;
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							overflow: hidden;
							line-height: 38upx;
						}

						.selectGoodsPrice {
							display: flex;
							margin-top: 15upx;
							font-weight: bold;
							color: #FF5000;
							
							span {
								font-size: 28upx;
								font-family: DIN-Bold;
								margin-top: 8upx;
							}

							.selectGoodsMoney {
								font-size: 36upx;
								font-family: PingFang SC;
							}

							
						}
						.unit{
							width: 100%;
							
							view{
								font-size: 24upx;
								line-height: 40upx;
								color: #666666;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}
						}

						.getIntegral {
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
							margin-top: 15upx;
							margin-right: 10upx;
							display:inline-block;
						}
						.getIntegral2 {
							width:38upx;
							height: 42upx;
							background:url('https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/skyd/courtesyCard/couponLogo.png');
							background-size:100% 100%;
							font-size: 24rpx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #FFFFFF;
							line-height: 40rpx;
							text-align: center;
							margin-top: 15upx;
							display:inline-block;
						}

					}
				}
			}

		}
		
		// 按钮
		.suspend {
			position: fixed;
			bottom: 130upx;
			right: 30upx;

			.suspendContent {
				width: 86upx;
				background: #FFFFFF;
				border: 1upx solid #EEEEEE;
				border-radius: 42upx;

				image {
					width: 60upx;
					height: 60upx;
					margin-top: 20upx;
					margin-left: 13upx;
				}

				.suspendTwo {
					height: 23upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 20upx;
					padding-bottom: 10upx;
				}

				.suspendPhone {
					height: 23upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #202021;
					margin-left: 20upx;
					margin-bottom: 30upx;
					padding-top: 5upx;
				}
			}

			.suspendLink {
				width: 62upx;
				border-bottom: 1upx solid #EEEEEE;
				margin-left: 12upx;
				margin-top: 20upx;
			}
		}

		// 广告弹框样式
		.advertise {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .4);
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2023;

			.advertising {
				width: 688upx;
				.gift {
					width:440upx;	
					height:660upx;	
					margin-left: 130upx;					
					background-image: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E8%83%8C%E6%99%AF%402x.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: relative;
					.font {
						position: absolute;
						top: 80upx;
						left: 80upx;
						color: #F9E3B5;
						font-size: 56upx;
						font-weight: 700;
					}
					
					.font1 {
						position: absolute;
						top: 156upx;
						left: 54upx;
						color: #F9E3B5;
						font-size: 24upx;
						font-weight: 500;
					}
					
				}
					
				.gift1 {
					width:440upx;	
					height:420upx;	
					margin-left: 130upx;					
					background-image: url(https://oss-sp-data.oss-cn-hangzhou.aliyuncs.com/img/LHT/%E8%83%8C%E6%99%AF%402x%20%281%29.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: relative;
					.font {
						position: absolute;
						top: 80upx;
						left: 80upx;
						color: #F9E3B5;
						font-size: 56upx;
						font-weight: 700;
					}
					
					.font1 {
						position: absolute;
						top: 156upx;
						left: 80upx;
						color: #F9E3B5;
						font-size: 24upx;
						font-weight: 500;
					}
					.goods {
						width: 380upx;
						height: 106upx;
						background: #fff;
						position: absolute;
						top: 200upx;
						left: 29upx;
						border-radius: 10upx;
						line-height: 106upx;
						
						image {
							width: 80upx;
							height: 80upx;
							margin-top: 12upx;
							margin-left: 10upx;
						}
						
						.goodsFont1 {
							color:#5B5B5B;
							font-size: 26upx;
							font-weight: normal;
							margin-left: 25upx;
							margin-top:-26upx;
							position: absolute;
							top: 2upx;
							left: 85upx;
						}
						
						.goodsFont2 {
							color:#F69000;
							font-size: 48upx;
							font-weight: normal;
							margin-left: 25upx;
							margin-top: 3upx;
							position: absolute;
							top: 2upx;
							left: 85upx;
						}
						
					}
					.font2 {
						width: 310upx;
						height: 52upx;
						border-radius: 26upx;
						background: #FFA526;
						position: absolute;
						top: 325upx;
						left: 60upx;
						text-align:center;
						line-height: 52upx;
						color: #FCF9F2;
						font-size: 22upx;
						font-weight: medium;
					}
				
					
					}
				

				
				image {
					width: 688upx;
					// height: 850upx;
				}
			}

			.closes {
				width: 15upx;
				height: 15upx;

				image {
					width: 80upx;
					height: 80upx;
					margin-top: 20upx;
					margin-left: 300upx;
					// margin:0 auto;
				}

			}
		}
		.shareFinish {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .4);
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2023;

			.advertising {
				width: 500upx;

				image {
					width: 500upx;
					// height: 850upx;
				}
			}

			.closes {
				width: 15upx;
				height: 15upx;

				image {
					width: 80upx;
					height: 80upx;
					margin-top: -50upx;
					margin-left: 430upx;
					// margin:0 auto;
				}

			}
		}

		// 分享有礼弹框
		.add_popup {
			width: 100%;
			height: 100vh;
			background-color: rgba(0, 0, 0, .4);
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 2023;

			.shareType {
				width: 690upx;
				height: 400upx;
				background-color: #fff;
				border-radius: 20upx;
				margin: 1000upx auto 0;

				.shareTypeTop {
					padding-top: 30upx;
					display: flex;
					margin-left: 20upx;

					.TypeImg {
						image {
							width: 88upx;
							height: 88upx;
						}
					}

					.TypeImgRight {
						margin-left: 50upx;

						.TypeShareNum {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: #34393D;

							span {
								color: #EE281E;
							}
						}

						.TypeShareMore {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #9FA0A5;
						}
					}
				}

				.shareWechatContent {
					width: 634upx;
					border-top: 1upx solid #EEEEEE;
					display: flex;
					margin: 30upx auto 0;
					padding-top: 30upx;

					.shareWechatLeft {
						margin-left: 140upx;

						image {
							width: 100upx;
							height: 100upx;
						}

						.ShareStyle {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: #202021;
						}
					}
				}
			}

		}

	}
	


	//聊天对话框
	/* 对话框遮罩 */
	.chat-overlay {
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 200;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	}

	/* 对话框主体 */
	.chat-dialog {
	width: 100%;
	height: 80vh;
	background: #f5f5f5;
	border-radius: 32rpx 32rpx 0 0;
	display: flex;
	flex-direction: column;
	}


	.chat-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 28rpx 30rpx;
	background: #EE281E;
	border-radius: 32rpx 32rpx 0 0;
	flex-shrink: 0;
	}
	.chat-header-left  { display: flex; align-items: center; }
	.chat-header-right { display: flex; align-items: center; gap: 16rpx; }
	.chat-header-icon  { font-size: 36rpx; margin-right: 12rpx; }
	.chat-header-title { font-size: 32rpx; color: #ffffff; font-weight: bold; }

	/* 新对话按钮 */
	.chat-new-btn {
	font-size: 24rpx;
	color: #fff;
	background: rgba(255,255,255,0.25);
	padding: 8rpx 20rpx;
	border-radius: 24rpx;
	border: 1rpx solid rgba(255,255,255,0.5);
	}
	.chat-new-btn:active { background: rgba(255,255,255,0.4); }

	/* 关闭按钮 */
	.chat-close {
	font-size: 32rpx;
	color: rgba(255,255,255,0.8);
	padding: 8rpx 16rpx;
	}

	.chat-messages {
	flex: 1;
	height: 0;
	padding: 24rpx 24rpx 16rpx;
	}

	///原来总结样式

	/* 消息行 */
	.chat-msg        { display: flex; align-items: flex-start; margin-bottom: 24rpx; }
	.chat-msg-user   { justify-content: flex-end; }
	.chat-msg-ai     { justify-content: flex-start; }

	/* 头像 */
	.chat-avatar     { width: 64rpx; height: 64rpx; border-radius: 50%; flex-shrink: 0; overflow: hidden; }
	.ai-avatar       { background: #e8f5e9; margin-right: 16rpx; display: flex; align-items: center; justify-content: center; font-size: 32rpx; }
	.user-avatar     { background: #e3f2fd; margin-left: 16rpx; display: flex; align-items: center; justify-content: center; font-size: 32rpx; }
	.avatar-img      { width: 100%; height: 100%; border-radius: 50%; }
	.avatar-emoji    { font-size: 32rpx; }

	/* 气泡包裹 */
	.chat-bubble-wrap   { max-width: 70%; display: flex; flex-direction: column; position: relative; }
	.ai-bubble-wrap     { align-items: flex-start; max-width: 78%; }
	.user-bubble-wrap   { align-items: flex-end; }

	/* 气泡本体 */
	.chat-bubble   { padding: 20rpx 24rpx; border-radius: 20rpx; font-size: 28rpx; line-height: 1.6; word-break: break-all; }
	.ai-bubble     { background: #fff; color: #333; border-top-left-radius: 4rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.06); }
	.user-bubble   { background: #4CAF50; color: #fff; border-top-right-radius: 4rpx; }
	.chat-bubble:active { opacity: 0.85; }

	/* 复制提示 */
	.copy-tip                  { font-size: 20rpx; color: #999; text-align: right; margin-top: 8rpx; line-height: 1; }
	.ai-bubble .copy-tip      { color: #999; }
	.user-bubble .copy-tip    { color: rgba(255,255,255,0.7); }

	/* 链接 */
	.chat-link { color: #1E88E5; text-decoration: underline; margin-left: 8rpx; font-weight: bold; }

	.chat-card          { margin-top: 16rpx; background: #fff; border: 1rpx solid #e0e0e0; border-radius: 12rpx; overflow: hidden; width: 100%; }
	.chat-card-cover    { width: 100%; height: 240rpx; display: block; }
	.chat-card-body     { padding: 16rpx 20rpx; }
	.chat-card-title    { font-size: 28rpx; font-weight: bold; color: #333; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.chat-card-desc     { font-size: 22rpx; color: #999; margin-top: 6rpx; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.chat-card:active   { opacity: 0.85; }

	.chat-typing     { padding: 24rpx 32rpx; }
	.typing-dots     { display: flex; align-items: center; gap: 8rpx; }
	.typing-dots .dot               { width: 12rpx; height: 12rpx; background: #999; border-radius: 50%; animation: typing-bounce 1.2s ease-in-out infinite; }
	.typing-dots .dot:nth-child(2)  { animation-delay: 0.2s; }
	.typing-dots .dot:nth-child(3)  { animation-delay: 0.4s; }

	@keyframes typing-bounce {
	0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
	30%            { transform: translateY(-8rpx); opacity: 1; }
	}


	.chat-quick-questions       { display: flex; gap: 16rpx; padding: 0 24rpx 16rpx; flex-shrink: 0; flex-wrap: wrap; }
	.chat-quick-questions-input { display: flex; gap: 16rpx; padding: 0 24rpx 16rpx; flex-shrink: 0; flex-wrap: wrap; }
	.quick-q                   { font-size: 24rpx; color: #212121; background: #FFF3E0; padding: 12rpx 24rpx; border-radius: 24rpx; border: 1rpx solid #c8e6c9; }
	.quick-q:active            { background: #c8e6c9; }

	.chat-recommend-questions   { display: flex; gap: 12rpx; padding: 12rpx 0 0; flex-wrap: wrap; }
	.recommend-q               { font-size: 24rpx; color: #FF6B00; background: #FFF8F0; padding: 12rpx 20rpx; border-radius: 20rpx; border: 1rpx solid #FFE0C0; }
	.recommend-q:active        { background: #FFE8D0; }


	.chat-input-area {
	display: flex;
	align-items: center;
	padding: 30rpx 24rpx;
	padding-bottom: calc(66rpx + env(safe-area-inset-bottom));
	background: #fff;
	border-top: 1rpx solid #eee;
	flex-shrink: 0;
	}

	.chat-input {
	flex: 1;
	height: 72rpx;
	background: #fafafa;
	border-radius: 36rpx;
	padding: 0 28rpx;
	font-size: 28rpx;
	color: #333;
	border: 2rpx solid #e8e8e8;
	box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
	transition: all 0.3s ease;
	caret-color: #EE281E;
	}

	.chat-input-focus {
	background: #fff;
	border-color: #EE281E;
	box-shadow: 0 2rpx 16rpx rgba(76,175,80,0.15);
	}

	.chat-input-placeholder { color: #bbb; font-size: 28rpx; }

	.chat-send-btn {
	flex-shrink: 0;
	margin-left: 16rpx;
	padding: 14rpx 28rpx;
	border-radius: 36rpx;
	font-size: 26rpx;
	font-weight: bold;
	transition: all 0.25s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100rpx;
	height: 50rpx;
	}

	.chat-send-btn-t{
	flex-shrink: 0;
	color:#EE281E;
	
	margin-left: 66rpx;
	padding: 14rpx 28rpx;
	border-radius: 36rpx;
	font-size: 26rpx;
	font-weight: bold;
	transition: all 0.25s ease;
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 100rpx;
	height: 50rpx;
	}

	.chat-send-disabled  { background: #e8e8e8; color: #bbb; pointer-events: none; }
	.chat-send-active    { background: linear-gradient(135deg, #EE281E, #EE281E); color: #fff; box-shadow: 0 4rpx 12rpx rgba(76,175,80,0.35); }
	.chat-send-active:active { background: linear-gradient(135deg, #EE281E, #EE281E); box-shadow: 0 2rpx 6rpx rgba(76,175,80,0.25); transform: scale(0.96); }


</style>
