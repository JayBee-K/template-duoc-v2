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

	$(function () {
		handleStickyHeader();
		handleNavigationMobile();
		handleSliderHero();
		handleSliderPartner();

		handleToggleSearch();
		$(window).resize(() => {
			windowWidth = $(window).width();
		});
	});
})(jQuery);
