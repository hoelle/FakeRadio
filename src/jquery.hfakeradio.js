/*
 hFakeRadio v0.2
 (c) 2014 Hoelle Development e.U. - hoelle.net
 license: http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {
	var hFakeRadioNamespace = 'hFakeRadio',
		methods = {
			init: function (options) {
				var settings = $.extend({
						// place default settings here
					}, options),
					radioCss = {
						display: 'block',
						position: 'absolute',
						width: '100%',
						height: '100%',
						left: 0,
						top: 0,
						opacity: 0,
						cursor: 'pointer',
						border: 0,
						outline: 0,
						behavior: 'none'
					};

				return this.each(function () {
					var $this = $(this),
						data = $this.data(hFakeRadioNamespace);

					// If the plugin hasn't been initialized yet
					if (!data) {
						/*
						 Do more setup stuff here
						 */

						var $container = $('<div class="fake-radio" />'),
							$radio = $this.clone().removeClass('fake-radio');

						$container.addClass($radio.attr('class'));
						$radio.addClass('origin').css(radioCss);
						$container.append($radio);
						$this.replaceWith($container);

						$radio.change(function (e) {
							if ($(this).prop('checked')) {
								$container.addClass('checked');
							}
							else {
								$container.removeClass('checked');
							}
							if (!!e.originalEvent) {
								$('input[name="' + $radio.attr('name') + '"]').not($radio).change();
							}
						}).change();

						$this.data(hFakeRadioNamespace, $.extend(settings, {
							target: $this,
							container: $container,
							radio: $radio
						}));
						data = $this.data(hFakeRadioNamespace);
					}

				});
			},

			destroy: function () {
				return this.each(function () {
					var $this = $(this),
						data = $this.data(hFakeRadioNamespace);

					// Namespacing FTW
					$(window).unbind('.' + hFakeRadioNamespace);
					data.container.replaceWith(data.radio.removeClass('origin'));
					$this.removeData(hFakeRadioNamespace);
				});
			},
		};

	$.fn.hFakeRadio = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.hFakeRadio');
		}
	};

})(jQuery);