(function(){

// +++++++++++++++++++++++++++++++++++++++++++++
//      ACCORDEON: Acordeón para el historial
// +++++++++++++++++++++++++++++++++++++++++++++

	var accordeon = function (options){
		if($(options.obj).length){
			if(options.first){
				$(options.obj).find(options.trigger).first().addClass(options.claseActivo)
				.find('.icon').toggleClass(options.minusIcon);
				$(options.obj).find(options.contenedor).not(':first').hide();
			} else {
				$(options.obj).find(options.contenedor).hide();
			}
			$(options.obj).find(options.trigger).click(function(){
				$(this).next(options.contenedor).slideToggle();//.siblings(options.contenedor+':visible').slideUp()
				$(this).toggleClass(options.claseActivo).find('.icon').toggleClass(options.minusIcon);
				$(this).siblings(options.trigger).removeClass(options.claseActivo).find('.icon').removeClass(options.minusIcon);
			});
		}
	},

// ++++++++++++++++++++++++++++++++
//      ADDEVENT: Atachar evento
// ++++++++++++++++++++++++++++++++

	addEvent = function ( obj, type, fn ){
		if (obj.addEventListener){
			obj.addEventListener( type, fn, false );
		} else if (obj.attachEvent){
			obj["e"+type+fn] = fn;
			obj[type+fn] = function(){ obj["e"+type+fn]( window.event ); };
			obj.attachEvent( "on"+type, obj[type+fn] );
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CHANGEBOX: Cambiar div para seleccionar direccion/tarjeta
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	changeBox = function (options) {
		if($(options.obj).length){
			$(options.obj).find(options.objetivo).each(function(){
				var $this = $(this);
				$this.click(function(){

					quitaClase({obj: options.objetivo, clase: options.activo});
					uncheck(options.inputradio);
					$this.addClass(options.activo);
					$this.find('input').attr('checked', true);
				});
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CAROUSELSWIPER: Iniciar carruseles con Swiper
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	carouselSwiper = function (options){
		if ($(options.obj).length){
			if(options.slide){
				var $size = parseInt($(options.obj).find(options.slideCSS).size(), 10);
				if($size > options.slide){
					var swiper = new Swiper(options.obj, options.options);
				} else {
					$(options.arrowLeft).hide();
					$(options.arrowRight).hide();
				}
			} else {
				var swiper = new Swiper(options.obj, options.options);
			}
			if(options.arrow){
				$(options.arrowLeft).click(function(e) {
					e.preventDefault();
					swiper.swipePrev();
				});
				$(options.arrowRight).click(function(e) {
					e.preventDefault();
					swiper.swipeNext();
				});
			}
			if(options.automaticPlay){
				$(options.obj).click(function(e){
					e.preventDefault();
				});
			}
		}
	},

// +++++++++++++++++++++++++++++++++++++++++
//      CUSTOMCHECKBOX: Cambiar checkbox
// +++++++++++++++++++++++++++++++++++++++++

	customCheckbox = function (obj){
		if($(obj).length){
			$(obj).each(function(){
				var $this = $(this),
					$clase;
				if($this.prop('checked')){
					$clase = 'selectCheckbox';
				} else {
					$clase = 'unselectCheckbox';
				}
				$(this).next().andSelf().wrapAll('<div class="divCheckbox"/>');
				$this.parent().prepend('<span class="icon spanCheckbox '+$clase+'"/>');
				$this.parent().find('.spanCheckbox').click(function(){
					if($this.prop('checked')){
						$(this).removeClass('selectCheckbox');
						$(this).addClass('unselectCheckbox');
					} else {
						$(this).removeClass('unselectCheckbox');
						$(this).addClass('selectCheckbox');
					}
					$this.trigger('click');
				});
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMRADIO: Cambiar radio buttons por input text para el género
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	customRadio = function (obj){
		if($(obj).length){
			$(obj).find('input[type="radio"]').each(function(){
				var $this = $(this);
				$this.wrap('<div class="divRadio"/>');
				$this.parent().append('<span class="spanRadio">'+$(this).val()+'</span>');
				$this.parent().find('.spanRadio').click(function(){
					if($this.prop('checked')){
						unchecRadio(obj);
					} else {
						unchecRadio(obj);
						$(this).addClass('spanSelected');
					}
					$this.trigger('click');
				});
			});
		}
	},
	unchecRadio = function (obj){
		var $radio = $(obj).find('input[type="radio"]');
		$radio.each(function(){
			$(this).parent().find('.spanRadio')
			.removeClass('spanSelected');
		});
	},

// +++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSELECT: Customizar el select
// +++++++++++++++++++++++++++++++++++++++++++

	customSelect = function (obj){
		if($(obj).length){
			$(obj).each(function () {
				var $this = $(this),
				numberOfOptions = $(this).children('option').length,
				selectContent;
				$this.addClass('selectHidden');
				$this.wrap('<div class="selectContainer"/>');
				if($this.data('clase')){
					$this.parent().addClass($this.data('clase'));
				}
				if($this.data('inputselect')) {
					selectContent = '<input type="text" class="selectContent">';
				} else {
					selectContent = '<span class="selectContent"/>';
				}
				$this.after(selectContent+'<span class="icon selectTrigger"/>');
				var $styledSelect = $this.next('.selectContent');
				if($this.data('inputselect')) {
					$styledSelect.attr('placeholder',$this.children('option').eq(0).text())
					.addClass($this.children('option').eq(0).data('icon'));
				} else {
					$styledSelect.text($this.children('option').eq(0).text())
					.addClass($this.children('option').eq(0).data('icon'));
				}
				var $list = $('<ul />', {
					'class': 'selectOptions'
				}).insertAfter($this.parent().find('span.selectTrigger'));
				for (var i = 0; i < numberOfOptions; i++) {
					$('<li />', {
						text: $this.children('option').eq(i).text(),
						rel: $this.children('option').eq(i).val(),
						'data-class': $this.children('option').eq(i).data('icon')
					}).appendTo($list);
				}
				var $listItems = $list.children('li');
				$this.parent().find('span.selectTrigger').click(function (e) {
					e.stopPropagation();
					$('div.styledSelect.active').each(function () {
						$(this).removeClass('active').next('ul.selectOptions').hide();
					});
					$(this).toggleClass('active').next('ul.selectOptions').toggle();
				});
				$listItems.click(function (e) {
					e.stopPropagation();
					if($this.data('inputselect')) {
						$styledSelect.val($(this).text()).removeClass('active')
						.removeClass().addClass('selectActive selectContent '+$(this).data('class'));
					} else {
						$styledSelect.text($(this).text()).removeClass('active')
						.removeClass().addClass('selectActive selectContent '+$(this).data('class'));
					}
					$this.val($(this).attr('rel')).change();
					$list.hide();
				});
				$(document).click(function () {
					$styledSelect.removeClass('active');
					$list.hide();
				});
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSLIDER: Deslizar el rango para cambiar valor de bits
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	customSlider = function (options){
		if($(options.obj).length) {
			$(options.obj).each(function(){
				var $this = $(this),
					$price,
					$priceItem,
					$percent,
					$percentItem,
					$realprice,
					$realpriceitem,
					$datamax,
					$save,
					$saveItem;
				if($this.data('moveprice')){
					$realpriceitem = $('.'+$this.data('realpriceitem'));
					$realprice = parseInt($this.data('realprice'),10);
					$realpriceitem.text($realprice);
					$priceItem = $('.'+$this.data('priceitem'));
					$price = parseInt($this.data('price'), 10);
					$priceItem.text($price);
					$percentItem = $('.'+$this.data('percent'));
					$percent = 100 - parseInt((100 * $price) / $realprice, 10);
					$percentItem.text($percent);
					$saveItem = $('.'+$this.data('saveitem'));
					$save = $this.data('save');
					$saveItem.text($save);
					if($this.data('max') > $price) {
						$datamax = $price;
					} else {
						$datamax = $this.data('max');
					}
				}
				$this.wrap('<div class="'+ options.wrapper +'"><div class="slider-holder"/>');
				$this.parent().append('<a href="#" class="ui-slider-handle"><span class="'+ options.bit +'"></span><span class="'+ options.amount +'">$<em>'+$this.val()+'</em></span></a>');
				$this.parent().parent().append('<span class="'+ options.textValue +' '+ options.textMin +'">'+$this.data('min')+'</span><span class="'+ options.textValue +' '+ options.textMax +'">'+$datamax+'</span>');
				$this.parent().parent().find('.slider-holder').slider({
					range: 'min',
					value: +$this.val(),
					min: +$this.data('min'),
					max: +$datamax,
					slide: function(event, ui){
						$this.val(ui.value);
						$this.parent().find('.'+ options.amount +' em').text(+ui.value);
						if($this.data('moveprice')) {
							$priceItem.text($price - ui.value);
							$percent = 100 - parseInt((100 * ($price - ui.value)) / $realprice, 10);
							$percentItem.text($percent);
						}
						if($this.data('save')){
							$saveItem.text($save+ui.value);
						}
					},
					step: $this.data('step')
				});
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      CUSTOMSTEPPER: Sumar y restar valores del stepper
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	customStepper = function (obj) {
		if($(obj).length){
			$(obj).each(function(){
				$(this).wrap('<div class="stepper"/>');
				var $this = $(this).parent();
				$this.append('<span class="icon plus"/><span class="icon minus"/>');
				$this.find('.icon').click(function(){
					var $newVal,
						$button = $(this),
						$oldValue = parseInt($button.parent().find("input").val(), 10);
					if ($button.hasClass('plus')) {
						$newVal = $oldValue + 1;
					} else if ($button.hasClass('minus')){
						if ($oldValue >= 2) {
							$newVal = $oldValue - 1;
						} else {
							$newVal = 1;
						}
					}
					$button.parent().find("input").val($newVal);
				});
				$this.find('input').keydown(function (e) {
					var keyCode = e.keyCode || e.which,
						arrow = {up: 38, down: 40 },
						$newVal,
						$oldValue = parseInt($(this).val(), 10);
					switch (keyCode) {
						case arrow.up:
							$newVal = $oldValue + 1;
						break;
						case arrow.down:
							$newVal = $oldValue - 1;
						break;
					}
					if($newVal >= 1) {
						$(this).val($newVal);
					}
				});
			});
		}
	},

// +++++++++++++++++++++++++++++++++++
//      DROPMENU: Abrir los menús
// +++++++++++++++++++++++++++++++++++

	dropMenu = function (options){
		if($(options.obj).length){
			$(options.trigger).click(function(){
				$(options.other).slideUp();
				$(options.obj).slideDown();
			});
			$(options.obj).each(function(){
				var $objeto;
				if (options.carro === true) {
					$objeto = $(this).find('.wrapper').children().eq(0);
				} else {
					$objeto = $(this).find('.wrapper');
				}
				$(options.obj).find('.miCuenta-close').click(function(){
					$(options.obj).slideUp();
				});
				$objeto.bind({
					click: function(e){
						e.stopPropagation();
					},
					mouseenter: function(){
						$(this).slideDown();
					},
					mouseleave: function(){
						$(document).click(function(){
							$(options.obj).slideUp();
							$(document).unbind('click');
						});
					}
				});
			});
		}
	},

// ++++++++++++++++++++++++++++++++++++++
//      FANCYBOX: Modales con FancyBox
// ++++++++++++++++++++++++++++++++++++++

	fancybox = function (obj){
		if($(obj).length){
			$(obj).each(function(){
				var $this = $(this);
				$this.fancybox({
					padding: 0,
					margin: 0,
					width: $this.data('fancyboxwidth'),
					iframe: {
						scrolling: 'auto',
						preload: true
					},
					type: 'iframe',
				});
				if ($this.data('fancyboxhref')){
					$this.fancybox({
						padding: 0,
						margin: 0,
						width: $this.data('fancyboxwidth'),
						href: $this.data('fancyboxhref'),
						iframe: {
							scrolling: 'auto',
							preload: true
						},
						type: 'iframe'
					});
				}
				if ($this.data('fancybox-noclosebtn')){
					$this.fancybox({
						padding: 0,
						margin: 0,
						closeBtn: false,
						width: $this.data('fancyboxwidth'),
						href: $this.data('fancyboxhref'),
						iframe: {
							scrolling: 'auto',
							preload: true
						},
						type: 'iframe'
					});
				}
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      OPENFOLDER: Abrir el DIV superior del encabezado
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	openFolder = function (options){
		if($(options.obj).length){
			$(options.trigger).click(function(){
				$(options.obj).slideUp();
				$(options.objetivo).slideDown();
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      QUITACLASE: Remover todas las clases con una iteración
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	quitaClase = function (options){
		$(options.obj).each(function(){
			$(this).removeClass(options.clase);
		});
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      SCROLLPANE: Scroll que aparece / desaparece
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	scrollpane = function (obj, father) {
		if(father) {
			if($(father).css('display') === 'none') {
				$(father).css('display', 'block');
				$(obj).jScrollPane({
					horizontalDragMinWidth: 40,
					horizontalDragMaxWidth: 40
				});
			$(father).css('display', 'none');
			} else {
				$(obj).jScrollPane({
					horizontalDragMinWidth: 40,
					horizontalDragMaxWidth: 40
				});
			}
		}
	},

// +++++++++++++++++++++++++++++++++++
//      TABS: Pestañas
// ++++++++++++++++++++++++++++++++++++

	tabs = function (obj, tabClass) {
		if($(obj).length){
			$(tabClass).hide().eq(0).show();
			$(obj).find('li').click(function(e){
				e.preventDefault();
				$(tabClass).hide();
				$(obj).find('li').removeClass('tabSelected');
				var id = $(this).find('a').attr('href');
				$(id).fadeToggle();
				$(this).addClass('tabSelected');
			});
		}
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      UNCHECK: Iterar para remover el checked en radiobutton y checkbox
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	uncheck = function (obj) {
		$(obj).each(function(){
			$(this).attr('checked', false);
		});
	},

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//      VALIDAR: Validar formularios
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	validar = function (obj) {
		jQuery.extend(jQuery.validator.messages, {
			required: "Campo requerido.",
			remote: "Llena este campo.",
			email: "Escribe una dirección de correo válida",
			url: "Escribe una URL válida.",
			date: "Escribe una fecha válida.",
			dateISO: "Escribe una fecha (ISO) válida.",
			number: "Escribe un número entero válido.",
			digits: "Escribe sólo dígitos.",
			creditcard: "Escribe un número de tarjeta válido.",
			equalTo: "Escribe el mismo valor de nuevo.",
			accept: "Escribe un valor con una extensión aceptada.",
			maxlength: jQuery.validator.format("No escribas más de {0} caracteres."),
			minlength: jQuery.validator.format("No escribas menos de {0} caracteres."),
			rangelength: jQuery.validator.format("Escribe un valor entre {0} y {1} caracteres."),
			range: jQuery.validator.format("Escribe un valor entre {0} y {1}."),
			max: jQuery.validator.format("Escribe un valor menor o igual a {0}."),
			min: jQuery.validator.format("Escribe un valor mayor o igual a {0}.")
		});
		if($(obj.container).length) {
			$(obj.form).validate({
				errorClass: 'errorInputError',
				errorElement: 'span',
				onfocusout: function (element) {
					$(element).valid();
				},
				success: function (label) {
					label.addClass('errorInputOK');
				},
				rules: obj.rules,
				validClass: 'errorInputOK'
			});
		}
	},


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//     DOCUMENTREADY: Funciones que se deben cargar al finalizar el DOM
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	documentReady = function (){
		accordeon({
			obj: '.accordeonWinbits',
			trigger: 'h2',
			first: true, // Si quieren que sea abra el primer elemento en la carga, poner TRUE
			claseActivo: 'activo',
			contenedor: '.accordeonContent',
			minusIcon: 'minusIcon'
		});
		carouselSwiper({
			obj: '.shippingCarrusel-carrusel',
			options: {
				slideClass: 'shippingCarrusel-slide',
				wrapperClass: 'shippingCarrusel-wrapper',
				grabCursor: true,
				useCSS3Transforms: false,
				
			},
			arrow: true,
			arrowLeft: '#wb-micuenta-address .prev',
			arrowRight: '#wb-micuenta-address .next',
			slide: 5,
			slideCSS: '.shippingCarrusel-slide'
		});
		carouselSwiper({
			obj: '.creditcardCarrousel',
			options: {
				slideClass: 'creditcardCarrousel-slide',
				wrapperClass: 'creditcardCarrousel-wrapper',
				grabCursor: true,
				useCSS3Transforms: false,
				onSlideChangeStart: function(s){
					if (s.activeIndex === 0) {
						$('#wb-micuenta-creditcard .prev').hide();
						$('#wb-micuenta-creditcard .next').show();
					} else if (s.activeIndex === s.slides.length-1) {
						$('#wb-micuenta-creditcard .prev').show();
						$('#wb-micuenta-creditcard .next').hide();
					} else {
						$('#wb-micuenta-creditcard .prev').show();
						$('#wb-micuenta-creditcard .next').show();
					}
				}
			},
			arrow: true,
			arrowLeft: '#wb-micuenta-creditcard .prev',
			arrowRight: '#wb-micuenta-creditcard .next',
			slide: 5,
			slideCSS: '.creditcardCarrousel-slide'
		});
		changeBox({
			obj: '.shippingCarrusel',
			objetivo: '.shippingCarrusel-slide',
			activo: 'shippingSelected',
			inputradio: '.shippingRadio'
		});
		changeBox({
			obj: '.creditcardCarrousel',
			objetivo: '.creditcardCarrousel-slide',
			activo: 'creditcardSelected',
			inputradio: '.creditcardRadio'
		});
		changeBox({
			obj: '.shippingAddresses',
			objetivo: '.shippingItem',
			activo: 'shippingSelected',
			inputradio: '.shippingRadio'
		});
		changeBox({
			obj: '.creditcards',
			objetivo: '.creditcardItem',
			activo: 'creditcardSelected',
			inputradio: '.creditcardRadio'
		});
		customCheckbox('.checkbox');
		customRadio('.divGender');
		customSelect ('.select');
		customSlider ({
			obj: '.slideInput',
			wrapper: 'sliderWrapper',
			bit: 'icon bit',
			amount: 'sliderAmount',
			textValue: 'textValue',
			textMin: 'textMinValue',
			textMax: 'textMaxValue',
		});
		customStepper('.inputStepper');
		dropMenu({
			obj: '.miCuentaDiv',
			clase: '.dropMenu',
			trigger: '.triggerMiCuenta, .miCuenta .link',
			other: '.miCarritoDiv'
		});
		dropMenu({
			obj: '.miCarritoDiv',
			clase: '.dropMenu',
			trigger: '.shopCarMin',
			other: '.miCuentaDiv',
			carro: true
		});
		fancybox('.fancybox');
		openFolder({
			obj: '.knowMoreMin',
			trigger: '.knowMoreMin .openClose',
			objetivo: '.knowMoreMax'
		});
		openFolder({
			obj: '.knowMoreMax',
			trigger: '.knowMoreMax .openClose',
			objetivo: '.knowMoreMin'
		});
		openFolder({
			obj: '.myProfile .miPerfil',
			trigger:  '.myProfile .miPerfil .editBtn',
			objetivo: '.myProfile .editMiPerfil'
		});
		openFolder({
			obj: '.myProfile .editMiPerfil',
			trigger: '.myProfile .editMiPerfil .linkBack',
			objetivo: '.myProfile .miPerfil'
		});
		openFolder({
			obj: '.myProfile .miPerfil',
			trigger: '.myProfile .miPerfil .changePassBtn',
			objetivo: '.myProfile .changePassDiv'
		});
		openFolder({
			obj: '.myProfile .changePassDiv',
			trigger: '.myProfile .changePassDiv .linkBack',
			objetivo: '.myProfile .miPerfil'
		});
		openFolder({
			obj: '.myAddress .editMiDireccion',
			trigger: '.myAddress .editMiDireccion .linkBack',
			objetivo: '.myAddress .miDireccion'
		});
		openFolder({
			obj: '.mySuscription .miSuscripcion',
			trigger: '.mySuscription .miSuscripcion .editBtn, .mySuscription .miSuscripcion .editLink',
			objetivo: '.mySuscription .editSuscription'
		});
		openFolder({
			obj: '.mySuscription .editSuscription',
			trigger: '.mySuscription .editSuscription .linkBack',
			objetivo: '.mySuscription .miSuscripcion'
		});
		openFolder({
			obj: '.shippingAddresses',
			trigger: '.shippingAdd',
			objetivo: '.shippingNewAddress'
		});
		openFolder({
			obj: '.shippingNewAddress',
			trigger: '.submitButton .btnCancel',
			objetivo: '.shippingAddresses'
		});
		openFolder({
			obj: '.creditcards',
			trigger: '.creditcardAdd',
			objetivo: '.newCreditCard'
		});
		openFolder({
			obj: '.newCreditCard',
			trigger: '.newCreditCard .btnCancel',
			objetivo: '.creditcards'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.checkoutPaymentCreditcard .btnCheckout',
			objetivo: '.checkoutPaymentCreditValidate'
		});
		openFolder({
			obj: '.checkoutPaymentCreditValidate',
			trigger: '.checkoutPaymentCreditValidate .btnCancel',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.paymentMethod .debitCreditCard',
			objetivo: '.checkoutPaymentNewCard'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.paymentMethod .mesesSinInteresesCard',
			objetivo: '.mesesSinInteresesTab'
		});
		openFolder({
			obj: '.mesesSinInteresesTab',
			trigger: '.mesesSinInteresesTab .btnCancel',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.checkoutPaymentNewCard',
			trigger: '.checkoutPaymentNewCard .btnCancel',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.paymentMethod .cashDeposit',
			objetivo: '.checkoutPaymentCash'
		});
		openFolder({
			obj: '.checkoutPaymentCash',
			trigger: '.checkoutPaymentCash .linkBack',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.paymentMethod .paypalPay',
			objetivo: '.checkoutPaymentPayPal'
		});
		openFolder({
			obj: '.checkoutPaymentPayPal',
			trigger: '.checkoutPaymentPayPal .linkBack',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.checkoutPaymentCreditcard',
			trigger: '.paymentMethod .oxxoPay',
			objetivo: '.checkoutPaymentOxxo'
		});
		openFolder({
			obj: '.checkoutPaymentOxxo',
			trigger: '.checkoutPaymentOxxo .linkBack',
			objetivo: '.checkoutPaymentCreditcard'
		});
		openFolder({
			obj: '.shipCarrusel',
			trigger: '.shippingAdd span',
			objetivo: '.miCuenta-tab .shippingNewAddress'
		});
		openFolder({
			obj: '.miCuenta-tab .shippingNewAddress',
			trigger: '.shippingNewAddress .btnCancel',
			objetivo: '.shipCarrusel'
		});
		openFolder({
			obj: '.ccCarrusel',
			trigger: '.creditcardAdd span',
			objetivo: '.miCuenta-tab .creditcardNew'
		});
		openFolder({
			obj: '.miCuenta-tab .creditcardNew',
			trigger: '.creditcardNew .btnCancel',
			objetivo: '.ccCarrusel'
		});
		scrollpane('.carritoContainer.scrollPanel', '.miCarritoDiv');
		scrollpane('.wishlistContainer.scrollPanel', '.miCuentaDiv');
		tabs('.miCuenta-linktabs', '.miCuenta-tab');
		validar({
			container: '.loginForm',
			form: '#loginForm'
		});
		validar({
			container: '.registro01',
			form: '#registro01',
			rules: {
				againPassword: {
					equalTo: '#password'
				}
			}
		});
		validar({
			container: '.miCuenta-profile',
			form: '#miCuenta-profile'
		});
		validar({
			container: '.miCuenta-password',
			form: '#miCuenta-password',
			rules: {
				winbitsPasswordNewAgain: {
					equalTo: '#winbitsPasswordNew'
				}
			}
		});
		validar({
			container: '.shippingNewAddress',
			form: '#shippingNewAddress'
		});
		validar({
			container: '.editMiDireccion',
			form: '#editMiDireccion'
		});
		validar({
			container: '.creditcardNew',
			form: '#creditcardNew'
		});
		validar({
			container: '.checkoutPaymentCreditValidate',
			form: '#checkoutPaymentCreditValidate'
		});
		validar({
			container: '.checkoutPaymentNewCard',
			form: '#checkoutPaymentNewCard'
		});
		validar({
			container: '.mesesSinInteresesTab',
			form: '#checkoutPaymentNewCard-msi'
		});
		validar({
			container: '.bodyModal',
			form: '#bodyModal'
		});
	};

// ++++++++++++++++
// ++++++++++++++++
//      INICIAR
// ++++++++++++++++
// ++++++++++++++++

	addEvent(window, 'load', documentReady);
})();