/*!
* i3g-responsive - v0.0.1
* Homepage: http://i-3global.com
* Author: i3Global
* Author URL: http://i-3global.com/
*/
(function ($) {
	'use strict';
	/*jshint indent:4 */

	$.serviceResponsive = function() {
		var $window = window;
		var gl;
		var iPadVersion = false;
		var previousSmallestScreenSize = {
			sum: 0,
			value: 1200
		};
		var helper = {
			screenClass: null,
			isExtraSmall: function() {
				return (getSmallestScreenSize($window) < 768);
			},
			isSmall: function() {
				return (getSmallestScreenSize($window) >= 768 && getSmallestScreenSize($window) < 992);
			},
			isMedium: function() {
				return (getSmallestScreenSize($window) >= 992 && getSmallestScreenSize($window) < 1200);
			},
			isLarge: function() {
				return (getSmallestScreenSize($window) >= 1200 && getSmallestScreenSize($window) < 1920);
			},
			isExtraLarge: function() {
				return (getSmallestScreenSize($window) >= 1920);
			},
			getScreenClass: getScreenClass,
			getDeviceType: function() {
				var deviceType = 'Desktop';			// Default Settings

				if(this.isSmartDevice){				// Determine device type [Desktop, Mobile]
					deviceType = 'Mobile';
				}
				return deviceType;
			},
			winWidth: getSmallestScreenSize($window),
			isSmartDevice: isSmartDevice($window),
			maxAnisotropy: checkMaxAnisotropy(),
			isFastCPU: isFastCPU(),
			isHighPerformance: isHighPerformance(),
			isOldDevice: isOldDevice(),
			isIE: isIE(),
			isiPad: isiPad($window),
			getiPadVersion: getiPadVersion($window)
		};


		function getScreenClass () {

			if ( helper.isExtraSmall() ) {
				helper.screenClass = 'xs';
			} else if ( helper.isSmall() ) {
				helper.screenClass = 'sm';
			} else if ( helper.isMedium() ) {
				helper.screenClass = 'md';
			} else if ( helper.isLarge() ) {
				helper.screenClass = 'lg';
			} else if ( helper.isExtraLarge() ) {
				helper.screenClass = 'xlg';
			} else {
				// default
				helper.screenClass = 'lg';
			}

			return helper.screenClass;
		}


		function watcherScreenClass(prev, latest) {

			if(prev !== latest) {
				$(window).trigger('app.screen.size.updated', latest);
				console.log(latest);
			}
		}


		function getSmallestScreenSize($window) {
			// Emulators and some devices may lie about the window size but not the screen size so use the smallest value possible

			// Optimization to only run the sort once per resize
			if($window.innerWidth + $window.outerWidth + $window.screen.availWidth !==  previousSmallestScreenSize.sum) {
				previousSmallestScreenSize.sum = $window.innerWidth + $window.outerWidth + $window.screen.availWidth;
				var arr = [$window.innerWidth, $window.outerWidth, $window.screen.availWidth]; 								// removed $window.screen.width
				arr.sort(function(a, b){ return a-b; });    																// sort by lowest screen size first
				for(var i=0;i<arr.length;i++) {
					if(arr[i] === 0) {
						arr.splice(i, 1);
						if(arr.length) {
							i=0;
						}
					}
				}
				previousSmallestScreenSize.value = arr[0];
			}
			return previousSmallestScreenSize.value;    																	// return lowest screensize
		}




		function isIE() {
			var myNav = navigator.userAgent.toLowerCase();
			return (myNav.indexOf('msie') !== -1) ? parseInt(myNav.split('msie')[1]) : false;
		}




		function isSmartDevice( $window ) {
			var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
			var isMobile = false; //initiate as false
			// device detection
			if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0,4))) isMobile = true;

			if(isMobile) {
				$('body').addClass('is-mobile');
			}

			return isMobile;
			/*return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile|Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFHW|KFTT|WFFOWI/).test(ua);*/
		}




		function initWebGL(canvas) {
			gl = null;

			try {
				// Try to grab the standard context. If it fails, fallback to experimental.
				gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			}
			catch(e) {}

			// If we don't have a GL context, give up now
			if (!gl) {
				gl = null;
			}

			return gl;
		}




		function checkMaxAnisotropy() {
			var max = 0;
			var canvas;

			if($('.webGL-testing') === null) {
				$(body).append('<div class="webGL-testing"></div>');
			}

			canvas = $('.webGL-testing');
			gl = initWebGL(canvas);

			try {
				// Try to grab the standard context. If it fails, fallback to experimental.
				gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			}
			catch(e) {}

			if (gl) {
				var ext = (
					gl.getExtension('EXT_texture_filter_anisotropic') ||
					gl.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
					gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
				);

				if (ext){
					max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
				}
			}
			return max;
		}




		function isOldDevice() {
			if(isSmartDevice($window) && window.devicePixelRatio === 1 && checkMaxAnisotropy() < 4 || isiPad( $window ) && checkMaxAnisotropy() < 4) {
				return true;
			} else {
				return false;
			}
		}


		function cpuTest() {
			var _speedconstant = 1.15600e-8;
			var d = new Date();
			var amount = 150000000;

			for (var i = amount; i>0; i--) {}

			var newd = new Date();
			var accnewd = Number(String(newd.getSeconds())+"."+String(newd.getMilliseconds()));
			var accd = Number(String(d.getSeconds())+"."+String(d.getMilliseconds()));
			var di = accnewd-accd;

			if (d.getMinutes() != newd.getMinutes()) {
				di = (60*(newd.getMinutes()-d.getMinutes()))+di;
			}

			var spd = ((_speedconstant*amount)/di);

			return spd;
		}

		function isFastCPU() {
			var cpuTests = [];
			cpuTests = [cpuTest(),cpuTest(),cpuTest()];
			cpuTests.sort(function(a, b) {
				return a - b;
			});
			if(cpuTests.pop() > 5) {		// 6 is about the same as Samsung Galaxy S6
				return true;
			} else {
				return false;
			}
		}


		function isHighPerformance() {
			if (isFastCPU() && !isOldDevice() ) {
				return true;
			} else {
				return false;
			}
		}


		function isiPad( $window ) {
			var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
			return (/iPad/).test(ua);
		}

		function test_cpu(force){
			var d=document,dc=d.cookie,dcr=/CpuSpeed=([^;]+);/,r=dcr.exec(dc), mhz = 0;

			if (r&&!force){
				mhz = r[1];
			} else {
				var average,t1,t2,t,l,report=0,passes,offset=d.all?110:150;

				passes = 40;

				for (l=0;l<passes;l++){
					t1 = new Date().getTime();
					for (t=0;t<20000;t++){}
					t2 = new Date().getTime();
					report += t2-t1;
				}
				average = report/passes;

				mhz = parseInt((65/average)*offset);
				d.cookie = 'CpuSpeed=' + mhz + ';';
			}
			console.log('mhz', mhz);
			return mhz;
		}



		window.ondevicemotion = function(event) {
			if (!iPadVersion && navigator.platform.indexOf("iPad") != -1) {
				iPadVersion = 1;
				if (event.acceleration) iPadVersion = 2;
			}
			window.ondevicemotion = null;
		};




		function getiPadVersion( $window ) {
			if(isiPad(window) && window.devicePixelRatio === 2) {
				if(checkMaxAnisotropy() < 4) {
					iPadVersion = 3;
				} else {
					iPadVersion = 4;
				}
			}
			return iPadVersion;
		}




		function isKindle( $window ) {
			var ua = $window.navigator.userAgent || $window.navigator.vendor || $window.opera;
			return (/Kindle|Silk|KFAPW|KFARWI|KFASWI|KFFOWI|KFJW|KFMEWI|KFOT|KFSAW|KFSOWI|KFTBW|KFHW|KFTT|WFFOWI/).test(ua);
		}



		$.serviceResponsive.runOnceTimeout = '';

		function onResizeFunction(e) {
			// reduce the app wide triggers and updates to one per 100ms every resize
			clearTimeout($.serviceResponsive.runOnceTimeout);
			$.serviceResponsive.runOnceTimeout = setTimeout(function() {
				watcherScreenClass(helper.screenClass, getScreenClass());
			},100);
		}



		function init () {
			getScreenClass();	// set the initial ScreenClass onload

			// The initial load of the component should request the screen class itself instead of waiting for this to broadcast
			setTimeout(function(){
				watcherScreenClass(helper.screenClass, getScreenClass());
			},100);

			$(window).resize( onResizeFunction );

		}


		init();

		return helper;
	};


}(jQuery));
