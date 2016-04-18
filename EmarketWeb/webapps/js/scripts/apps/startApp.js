/**
 * 
 */
define(['jquery', 'underscore', 'backbone','handlebars','/EmarketWeb/js/scripts/apps/coreApplication.js',
        'text!/EmarketWeb/template/home/home.html',
        'text!/EmarketWeb/template/travel/travel.html',
        'text!/EmarketWeb/template/fashion/fashion.html',
        'text!/EmarketWeb/template/living/living.html',
        'text!/EmarketWeb/template/contact/contact.html',
        'text!/EmarketWeb/template/product/detail.html'],
function($, _, Backbone, Handlebars, app, home, travel, fashion, living, contact, detail) {
	
	/****
	 * 
	 *  Application Router for each URI 
	 *  
	 ****/

	var ApplicationRouter = Backbone.Router.extend({
		initialize: function(){
			$('#searchItem').on('click', function(e){
				var keyVal = $('#itemSearchVal').val().trim();
				if(key.trim()!==""){
					
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
			'Product/:mc/:id':'getProduct'
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
		getProduct:function(mc, id){
			app.getProduct(mc,id);
		}
	});
	
	return{
		start:function(){
			var applicationRouter = new ApplicationRouter();
			Backbone.history.start();
		}
	}
	
	
});