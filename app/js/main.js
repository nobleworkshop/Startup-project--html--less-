$(document).ready(function() {
	
	/* Page Scroll to id fn call */
	$("nav a,a[href='#top'],a[rel='m_PageScroll2id'],a.PageScroll2id").mPageScroll2id({
		highlightSelector:"nav a"
	});

	/* Owl carousel */
	$("#owl-testimonials").owlCarousel({
		// Most important owl features
		    items : 1,
		    itemsCustom : false,
		    itemsDesktop : [1199,4],
		    itemsDesktopSmall : [980,3],
		    itemsTablet: [768,2],
		    itemsTabletSmall: false,
		    itemsMobile : [479,1],
		    singleItem : true,
		    itemsScaleUp : false,

		    // Navigation
		    navigation : true,
		    navigationText : ["",""],
		    rewindNav : true,
		    scrollPerPage : false,

		    //Pagination
		    pagination : true,
		    paginationNumbers: false,

		    //Basic Speeds
		    slideSpeed : 800,
	        paginationSpeed : 800,
	        rewindSpeed : 1000,

	        autoHeight: true,

	});

	// JQUERY VALIDATE JS
	$("#order_form").validate({
	  
	  rules: {
	  	name: { required: true },
	    email: { required: true, email: true },
	    skype: { required: true },
	    phone: { required: true }
	  },

	  messages: {
	  	name: "Пожалуйста, введите свое имя и фамилию",
	  	email: {
	  	  required: "Нам необходим ваш email адрес, чтобы связаться с вами",
	  	  email: "Email адрес должен быть в формате name@domain.com . Возможно вы ввели email с ошибкой."
	  	},
	  	skype: "Пожалуйста, введите ваш Skype логин",
	  	phone: "Пожалуйста, введите ваш телефон в международном формате",
	  }

	});



});


var askQuestionModule = (function (){

    // Инициализирует наш модуль
    var init = function() {
    	_setUpListeners();
    };

    // Прослушивает события
    var _setUpListeners = function() {
        console.log('Start Listen - askQuestionModule - _setUpListeners');

        // Прослушка событий...

        // Показ модального окна
        $('.ask_question').on('click', _showModal);
        $('.policy').on('click', _showModalPolicy);
        $('.video_otziv1').on('click', _showModalvideo_otziv1);
        $('.video_otziv2').on('click', _showModalvideo_otziv2);

    };

    var _showModal = function (e) {

    	// Проверка срабатывания действия
    	console.log('Call for Modal for Ask a question');

    	// Отменяем стандартное поведение элемента. 
    	// В данном случае это перемещение вверх окна по ссылке. 
    	// Может быть отмена отправки формы. И т.д.
    	e.preventDefault();

    	// Создаем переменные для быстрого обращения к моадбному окну и форме внутри него
    	var divModal = $('#modal_ask_a_question'),
    		form = divModal.find('.form');
        
        //Вешаем событие плагина bPopup на нужное нам модальное окно
    	divModal.bPopup({
    		// Тут настройки плагина bPopup
    		speed: 650,
    		transition: 'slideDown',
    		closeClass: 'close-popup',
    		onClose: function () {
    		    form.find('.server-mes').text('').hide();
    		    form.trigger("reset");
    		}
    	});//divModal.bPopp
    };//_showModal


    var _showModalPolicy = function (e) {

    	// Проверка срабатывания действия
    	console.log('Call for Modal for Ask a question');

    	// Отменяем стандартное поведение элемента. 
    	// В данном случае это перемещение вверх окна по ссылке. 
    	// Может быть отмена отправки формы. И т.д.
    	e.preventDefault();

    	// Создаем переменные для быстрого обращения к моадбному окну и форме внутри него
    	var divModal = $('#modal_policy');
        
        //Вешаем событие плагина bPopup на нужное нам модальное окно
    	divModal.bPopup({
    		// Тут настройки плагина bPopup
    		speed: 650,
    		transition: 'slideDown',
    		closeClass: 'close-popup',
    		onClose: function () {
    		    form.find('.server-mes').text('').hide();
    		    form.trigger("reset");
    		}
    	});//divModal.bPopp

    };//_showModalPolicy

    var _showModalvideo_otziv1 = function (e) {
    	console.log('Call for Modal for Ask a question');
    	e.preventDefault();

    	var divModal = $('#modal_video_otziv1');
        
    	divModal.bPopup({
    		// Тут настройки плагина bPopup
    		speed: 650,
    		transition: 'slideDown',
    		closeClass: 'close-popup',
    		onClose: function () {
    		    form.find('.server-mes').text('').hide();
    		    form.trigger("reset");
    		}
    	});//divModal.bPopp

    };//_showModalvideo_otziv1

    var _showModalvideo_otziv2 = function (e) {

    	console.log('Call for Modal for Ask a question');
    	e.preventDefault();
    	var divModal = $('#modal_video_otziv2');
        
    	divModal.bPopup({
    		// Тут настройки плагина bPopup
    		speed: 650,
    		transition: 'slideDown',
    		closeClass: 'close-popup',
    		onClose: function () {
    		    form.find('.server-mes').text('').hide();
    		    form.trigger("reset");
    		}
    	});//divModal.bPopp

    };//_showModalvideo_otziv2


    // Возвращаем объект (публичные методы)
    return {
        init: init
    };

})();

askQuestionModule.init();



