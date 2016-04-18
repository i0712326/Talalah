/**
 * 
 */
define([ 'jquery', 'underscore', 'backbone','verify', 
         'js/scripts/apps/productControl.js',
         'text!scripts/content/home.html',
         'text!scripts/content/travel.html',
         'text!scripts/content/fashion.html',
         'text!scripts/content/logon.html'
       ], function($, _, Backbone, Verify, app, home, travel, fashion, logon) {

	// router module

	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			$('#searchItem').on('click',function(e){
				var keyVal = $('#itemSearchVal').val();
				app.searchProduct(keyVal);
			});
			
		},
		routes : {
			'':'index',
			'Home' : 'index',
			'Travel' : 'travel',
			'Fashion' : 'fashion',
			'Living' : 'living'
		},
		index : function() {
			$('.nav li').removeClass('active');
			$('#item-home').addClass('active');
			$('#container').empty();
			$('#container').append($(home).html());
			var url = '/EmarketService/WebService/product/getByRank?first=0&max=30';
			app.start(url);
		},
		travel : function() {
			$('.nav li').removeClass('active');
			$('#item-travel').addClass('active');
			$('#container').empty();
			$('#container').append($(travel).html());
			var url = '/EmarketService/WebService/product/get?first=1&max=30';
			app.start(url);
		},
		fashion : function() {
			$('.nav li').removeClass('active');
			$('#item-fashion').addClass('active');
			$('#container').empty();
			$('#container').append($(fashion).html());
			var url = '/EmarketService/WebService/product/get?first=2&max=30';
			app.start(url);
		},
		living : function() {
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			var url = '/EmarketService/WebService/product/get?first=3&max=30';
			app.start(url);
		}
	});
	
	return {
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}

});