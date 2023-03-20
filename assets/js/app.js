(function ($) {
	'use strict';
	let windowWidth = $(window).width();

	const handleStickyHeader = () => {
		const header = $('#header');
		const headerPosition = header.offset().top;
		$(window).scroll(function () {
			const scrollValue = $(window).scrollTop();
			if (scrollValue > headerPosition) {
				header.addClass('is-sticky');
			} else {
				header.removeClass('is-sticky');
			}
		});
	}

	const handleNavigationMobile = () => {
		if (windowWidth < 992) {
			if ($("#header .header-navigation > ul > li > ul").length) {
				$("#header .header-navigation").attr('id', 'hasMenu');
				$("#header .header-navigation > ul > li > ul").each(function (index) {
					$(this).prev().attr({
						"href": "#subMenu_" + index,
						"data-bs-toggle": "collapse"
					});

					$(this).attr({
						"id": "subMenu_" + index,
						"class": "collapse list-unstyled mb-0 header-navigation_sub--list",
						"data-bs-parent": "#hasMenu"
					});

					if ($(this).find('.header-navigation_child--list').length > 0) {
						$(this).find('.header-navigation_child--list').each(function (index_sub) {
							$(this).prev().attr({
								"href": "#subMenu_child_" + index + "_" + index_sub,
								"data-bs-toggle": "collapse"
							});
							$(this).attr({
								"id": "subMenu_child_" + index + "_" + index_sub,
								"class": "collapse header-navigation_child--list",
								"data-bs-parent": "#subMenu_" + index
							});
						})
					}
				});

				$('.header-navigation_item--link').click(function () {
					$("#header .header-navigation .header-navigation_child--list").collapse('hide');
				});
			}

			$('#call-navigation').click(function () {
				if (!$('body').hasClass('is-navigation')) {
					$('body').addClass('is-navigation');
				} else {
					$("#header .header-navigation > ul > li > .header-navigation_sub--list, #header .header-navigation .header-navigation_child--list").collapse('hide');
					$('body').removeClass('is-navigation');
				}
			});

			$('#close-navigation, #header-overlay').click(function () {
				$("#header .header-navigation > ul > li > .header-navigation_sub--list, #header .header-navigation .header-navigation_child--list").collapse('hide');
				$('body').removeClass('is-navigation');
			});
		} else {
			if ($("#header .header-navigation > ul > li > ul").length) {
				$("#header .header-navigation > ul > li > ul").each(function (index) {
					$(this).prev().attr({
						"href": "javascript:void(0);"
					});
				});
			}
		}
	}

	const handleSliderHero = function () {
		if ($('#slider-hero').length) {
			new Swiper('#slider-hero .swiper', {
				speed: 400,
				slidesPerView: 1,
				preloadImages: false,
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				pagination: {
					el: "#slider-hero .swiper-actions-pagination",
					clickable: true,
				},
				navigation: {
					nextEl: '#slider-hero .swiper-actions_next',
					prevEl: '#slider-hero .swiper-actions_prev',
				},
			});
		}
	}

	const handleSliderPartner = function () {
		if ($('#slider-partner').length) {
			new Swiper('#slider-partner .swiper', {
				speed: 400,
				slidesPerView: 6,
				spaceBetween: 20,
				preloadImages: false,
				loop: true,
				autoplay: {
					delay: 8000,
					disableOnInteraction: false,
				},
				breakpoints: {
					320: {
						slidesPerView: 2,
					},
					600: {
						slidesPerView: 3,
					},
					991: {
						slidesPerView: 4,
					},
					1024: {
						slidesPerView: 5,
					},
				},
			});
		}
	}

	const handleToggleSearch = function () {
		$('.header-toggle_button').click(function () {
			let header_search = $('.header-toggle_button').closest('.header-search');
			header_search.toggleClass('header-search_show');
		});
	}

	const handleInitFancyBoxArticle = () => {
		const imgList = $('#article-detail_content img');
		if (imgList.length > 0) {
			imgList.each((index, elm) => {
				$(elm).wrap(`<a style="cursor: zoom-in" href="${$(elm).attr('src')}" data-caption="${$(elm).attr('alt')}" data-fancybox="images"></a>`);
			});

			$('[data-fancybox="images"]').fancybox({
				thumbs: {
					autoStart: true,
				},
			});
		}
	}

	let [avatarThumb, avatarPhoto] = [];
	let handleSlideProduct = function () {
		if ($('#detail-avatar_thumb').length > 0) {
			avatarThumb = new Swiper('#detail-avatar_thumb .swiper', {
				loopAdditionalSlides: 0,
				spaceBetween: 15,
				slidesPerView: 4,
				breakpoints: {
					320: {
						slidesPerView: 3.5,
					},
					1199: {
						slidesPerView: 4,
					},
				},
			});

			avatarPhoto = new Swiper('#detail-avatar_photo .swiper', {
				thumbs: {
					swiper: avatarThumb,
				},
				slidesPerView: 1,
			});

			avatarPhoto.on('slideChangeTransitionStart', function () {
				avatarThumb.slideTo(avatarPhoto.activeIndex);
			});
		} else {
			avatarPhoto = new Swiper('#detail-avatar_photo .swiper', {
				slidesPerView: 1,
			});
		}
		handleZoomImageProduct($('#detail-avatar_photo [data-fancybox=product-image]'), avatarPhoto, avatarThumb);
	}

	const handleZoomImageProduct = function (elm, avatarPhoto, avatarThumb) {
		let i = 0;
		elm.click(function () {
			i = 0;
		});

		elm.fancybox({
			touch: true,
			beforeShow: function (instance, current) {
				let index = $(`[data-fancybox='product-image'][href='${current.src}']`).attr('data-index');
				avatarPhoto.slideTo(index - 1);
				if ($('#detail-thumb_photo').length > 0) {
					avatarThumb.slideTo(index - 1);
				}
			},
		});
	}
	const handleInitFancyBoxProduct = () => {
		const imgList = $('#product-detail_content img');
		if (imgList.length > 0) {
			imgList.each((index, elm) => {
				$(elm).wrap(`<a style="cursor: zoom-in" href="${$(elm).attr('src')}" data-caption="${$(elm).attr('alt')}" data-fancybox="images"></a>`);
			});

			$('[data-fancybox="images"]').fancybox({
				thumbs: {
					autoStart: true,
				},
			});
		}
	}
	const handleSliderProductRelated = function () {
		if ($('#slider-related').length) {
			new Swiper('#slider-related > .swiper', {
				slidesPerView: 6,
				spaceBetween: 15,
				speed: 1000,
				loop: !1,
				pagination: {
					el: '#slider-related  .swiper-pagination',
					clickable: 1,
				},
				navigation: {
					nextEl: '#slider-related .button-next',
					prevEl: '#slider-related .button-prev',
				},
				breakpoints: {
					320: {
						slidesPerView: 1,
					},
					375: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					991: {
						slidesPerView: 4,
					},
					1200: {
						slidesPerView: 5,
					},
					1400: {
						slidesPerView: 6,
					},
				},
			});
		}
	};
	const handleSliderProductFeature = function () {
		if ($('#slider-feature').length) {
			new Swiper('#slider-feature > .swiper', {
				slidesPerView: 1,
				spaceBetween: 15,
				speed: 1000,
				pagination: {
					el: '#slider-feature  .swiper-pagination',
					clickable: 1,
				},
				loop: true,
				autoplay: {
					delay: 2000,
					disableOnInteraction: false,
				},
			});
		}
	};

	let [timelineNumber, timelineContent] = [];
	let handleSlideTimeline = function () {
		timelineNumber = new Swiper('#timeline-step .swiper', {
			loopAdditionalSlides: 0,
			slidesPerView: 6,
			breakpoints: {
				320: {
					slidesPerView: 3.1,
				},
				1199: {
					slidesPerView: 5.1,
				},
				1399: {
					slidesPerView: 6,
				},
			},
		});

		timelineContent = new Swiper('#timeline-content .swiper', {
			thumbs: {
				swiper: timelineNumber,
			},
			autoHeight: true, //enable auto height
			slidesPerView: 1,
			navigation: {
				nextEl: '#timeline-content .swiper-actions_next',
				prevEl: '#timeline-content .swiper-actions_prev',
			},
		});

		timelineContent.on('slideChangeTransitionStart', function () {
			timelineNumber.slideTo(timelineContent.activeIndex);
		});

	}

	$(function () {
		handleStickyHeader();
		handleNavigationMobile();
		handleSliderHero();
		handleSliderPartner();

		handleToggleSearch();
		$(window).resize(() => {
			windowWidth = $(window).width();
			handleStickyHeader();
			handleNavigationMobile();
		});

		handleInitFancyBoxArticle();
		handleSlideProduct();
		handleInitFancyBoxProduct();
		handleSliderProductRelated();
		handleSliderProductFeature();
		handleSlideTimeline();
	});
})(jQuery);
