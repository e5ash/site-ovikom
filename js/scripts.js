// Popup
var Popup = {
    block: $('.popup'),
    window: $('.popup__window'),
    container: $('.popup__container'),
    title: $('.popup__title'),
    close: $('.popup__close'),
    bg: $('.popup__bg'),
    speed: 500,
    funShow: function () {
        var scrollTop = $(window).scrollTop(),
            height = $(window).height();
        this.block.css('padding-top', scrollTop + 20).fadeIn(this.speed).height(height - scrollTop - 20);
    },
    funHide: function () {
        this.block.fadeOut(this.speed);
    }
}

$('.popupShow').click(function() {
    Popup.funShow();
});

Popup.close.click(function() {
    Popup.funHide();
});

Popup.bg.click(function() {
    Popup.funHide();
});



// Select
var select = $('.select');
select.each(function() {
	var parent = $(this),
		selectTitle = $(this).find($('.select__title')),
		selectList = $(this).find($('.select__list')),
		selectParsing = $(this).find($('.select__parsing')),
		selectParsingItem = $(this).find($('.select__parsing option'));
	if (selectParsing) {
		selectParsingItem.each(function() {
			selectParsingItemText = $(this).text();
			selectParsingItemValue = $(this).attr('value');
			var selectString = '<li class="select__list-item" data-target="' + selectParsingItemValue + '">' + selectParsingItemText + '</li>';
				selectList.append(selectString);
			if ($(this).attr('selected')) {
				selectTitle.text(selectParsingItemText);
			}
			selectParsingItemText = selectParsingItemValue = null;
		});
	}
	parent = selectTitle = selectList = selectParsing = selectParsingItem = selectString = null;
});
function selectOpen(){
	$('.select__title').click(function() {
		var parent = $(this).parents('.select');
		parent.toggleClass('select_open');
		parent = null;

	});
}
selectOpen();

function selectItemActive() {
	$('.select__list-item').click(function() {
		var parent = $(this).parents('.select'),
			parsingItem = parent.find($('.select__parsing option')),
			attr = $(this).attr('data-target'),
			title = parent.find($('.select__title'));
		parsingItem.each(function() {
			$(this).removeAttr('selected');
			if ($(this).attr('value') == attr) {
				var text = $(this).text();
				title.text(text);
				$(this).attr('selected', 'selected');
			}
		});
		parent.toggleClass('select_open');
		parent = parsingItem = attr = title = null;
		
	});
}
selectItemActive();
select = null;



// Tabs
var tabs = $('.tabs');
tabs.each(function() {
	var parent = $(this);
		tabsNav = $(this).find('.tabs__nav'),
		tabsNavItem = $(this).find('.tabs__nav-item');
	tabsNavItem.each(function() {
		var attr = $(this).attr('data-target');
		if ($(this).hasClass('tabs__nav-item_select')) {
			var tab = parent.find('#' + attr);
			tab.show();
		}
		attr = tab = null;
	});
	parent = tabsNav = tabsNavItem = null;
});

function tabsActive() {
 	$('.tabs__nav-item').click(function() {
 		var parent = $('.tabs'),
 			attr = $(this).attr('data-target'),
 			tabs = parent.find('.tabs__tab'),
 			navItem = parent.find('.tabs__nav-item');
 		navItem.each(function() {
			$(this).removeClass('tabs__nav-item_select');
		});
 		if ($(this).hasClass('tabs__nav-item_select') == false) {
 			$(this).addClass('tabs__nav-item_select');
 			tabs.each(function() {
				$(this).hide();
			});
			
 			var tab = parent.find('#' + attr);
			tab.show();
			
 		}
 		parent = attr = tab = tabs = navItem = null;
 	});
} 
tabsActive();
tabs = null;

$('.menu__btn').click(function () {
	$(this).toggleClass('menu__btn_click');
	$('.menu__hidden').slideToggle(300);
});

$('.banner_sub').slick({
	arrows: false,
	dots: true
});



$('.phone').mask("+7 (999) 999-99-99");


$('.catalog__title').click(function() {
	$(this).toggleClass('catalog__title_click');
	var friend = $(this).siblings('.catalog__group-content');
	friend.slideToggle(300);
});


var viewTable = $('.view__table'),
	viewList = $('.view__list');
	catalogList = $('.catalog__list')

function list100p() {
	if (viewTable.hasClass('view__table_select')) {
	catalogList.removeClass('catalog__list_100p');
	}
	else{
		catalogList.addClass('catalog__list_100p');
	}
}

list100p();

viewList.click(function() {
	$(this).addClass('view__list_select');
	viewTable.removeClass('view__table_select');
	list100p();
});

viewTable.click(function() {
	$(this).addClass('view__table_select');
	viewList.removeClass('view__list_select');
	list100p();
});




$('form').submit(function() {
	$.ajax({
	    type: "POST",
	    url: "/order.php",
	    data: $(this).serialize()
	}).done(function() {
	    popupForm.css('display','none');
	    popupMessage.css('display','block');
	});
	return false;
});