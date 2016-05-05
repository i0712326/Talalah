/**
 * 
 */
define(['jquery', 'underscore', 'backbone','handlebars',
        '/EmarketWeb/js/scripts/apps/coreApplication.js',        
        'text!/EmarketWeb/template/home/home.html',
        'text!/EmarketWeb/template/travel/travel.html',
        'text!/EmarketWeb/template/fashion/fashion.html',
        'text!/EmarketWeb/template/living/living.html',
        'text!/EmarketWeb/template/contact/contact.html',
        'text!/EmarketWeb/template/product/detail.html',
        'text!/EmarketWeb/template/product/productSearch.html'],
function($, _, Backbone, Handlebars, app, home, travel, fashion, living, contact, detail, searchProd) {
	
	/****
	 * 
	 *  Application Router for each URI 
	 *  
	 ****/

	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			$('#searchItem').on('click', function(e){
				var keyVal = $('#itemSearchVal').val().trim();
				if(keyVal.trim()!==""){
					$('#pageContent').empty();
					$('#pageContent').html($(searchProd).html());
					app.searchDashView(keyVal);
					// add action for dash view options
					$('#dashItems').on('click', function(e){
						$('#searchContent').empty();
						$('#listItems').removeClass('active');
						$('#dashItems').addClass('active');
						app.searchDashView(keyVal);
					});
					// add action for list view options
					$('#listItems').on('click', function(e){
						$('#searchContent').empty();
						$('#dashItems').removeClass('active');
						$('#listItems').addClass('active');
						app.searchListView(keyVal);
					});
				}
			});
		},
		routes : {
			'':'index',
			'Home' : 'index',
			'Travel' : 'travel',
			'Fashion' : 'fashion',
			'Living' : 'living',
			'Contact' : 'info',
			'Product/:mcc/:mcId/:id':'getProduct'
		},
		index : function() {
			$('.nav li').removeClass('active');
			$('#item-home').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append($(home).html());
			app.startUp();
		},
		travel : function() {
			$('.nav li').removeClass('active');
			$('#item-travel').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append($(travel).html());
			app.fetchTravel();
		},
		fashion : function() {
			$('.nav li').removeClass('active');
			$('#item-fashion').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append($(fashion).html());
			app.fetchFashion();
		},
		living : function() {
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append($(living).html());
			app.fetchLiving();
		},
		info : function(){
			$('.nav li').removeClass('active');
			$('#item-living').addClass('active');
			$('#pageContent').empty();
			$('#pageContent').append($(contact).html());
			//app.fetchInfo();
		},
		getProduct:function(mcc, mcId, pid){
			app.getProduct(mcc, mcId, pid);
		}
	});
	
	return{
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}
	
	
});