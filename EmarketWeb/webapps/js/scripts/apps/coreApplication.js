/*****
 * 
 * Core Application for client communicate with server for requesting data.
 * 
 *****/
define(['jquery', 'underscore', 'backbone','handlebars','backboneRelational',
        'text!/EmarketWeb/template/product/product.html',
        'text!/EmarketWeb/template/product/detail.html'],
		function($, _, Backbone, Handlebars, BackboneRelation, temp, detail) {

	/**
	 * 
	 *  Product Model, Collection, View 
	 *  
	 *  */
	
	var Merchant = Backbone.RelationalModel.extend({
		relations:[{
			type:'HasMany',
			key:'products',
			relateMode:'Product',
			reverseRelation:{
				key:'product'
			}
		}]
	});
	
	// Model
	var Product = Backbone.RelationalModel.extend({
		urlRoot:'/EmarketService/WebService/product/get'
	});
	
	// Collection of Product
	var Products = Backbone.Collection.extend({model:Product});
	
	// View and View's collection
	
	var ProductView = Backbone.View.extend({
		className :'col-xs-3 col-sm-3 col-lg-3',
		template:Handlebars.compile($(temp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'click' : 'getDetail'
		},
		getDetail:function(e){
			var model = this.model.toJSON();
			var prod = Product.findOrCreate({id:model.id});
			var mcId = prod.get("merchant").mcId;
			var id	 = prod.id;
			Backbone.history.navigate('#Product/'+mcId+'/'+prod.id);
		}
	});
	
	var ProductViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function (item) {
           	 	var productView = new ProductView({model: item});
                this.$el.append(productView.render());
				}, this);
			return this.$el;
		}
	});
	
	/* travel product */
	
	var TravelProds = Backbone.Collection.extend({
		url:'/EmarketService/WebService/product/getByMcc?mcc=4722&review=3&first=0&max=4',
		model:Product
	});
	
	/* Fashion Product */
	var FashionProds = Backbone.Collection.extend({
		url:'/EmarketService/WebService/product/getByMcc?mcc=7011&review=3&first=0&max=4',
		model:Product
	});
	
	/* Living Product Show */
	var LivingProds = Backbone.Collection.extend({
		url:'/EmarketService/WebService/product/getByMcc?mcc=7012&review=3&first=0&max=5',
		model:Product
	});
	
	/**
	 * 
	 * detail of product
	 * 
	 */
	var ProductDetailView = Backbone.View.extend({
		className:'container',
		template : Handlebars.compile($(detail).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	/**
	 * 
	 * application execution 
	 * 
	 * 
	 * */
	return {
		startUp:function(){
			/* Travel Recommend */
			var travelProds = new TravelProds();
			travelProds.fetch({
				success : function(items, response, options) {
					var travelProdViews = new ProductViews({collection:items});
					$('.travel_product #products').append(travelProdViews.render());
				}
			});
			/* Fashion Recommend */
			var fashionProds = new FashionProds();
			fashionProds.fetch({
				success : function(items, response, options) {
					var fashionProdViews = new ProductViews({collection:items});
					$('.fashion_product #products').append(fashionProdViews.render());
				}
			});
			
			/* Living Recommend */
			var livingProds = new LivingProds();
			livingProds.fetch({
				success : function(items, response, options) {
					var livingProdViews = new ProductViews({collection:items});
					$('.living_product #products').append(livingProdViews.render());
				}
			});
		},
		/* function to fetch views for #Travel */
		fetchTravel : function(){
			var travelProds = new Products();
			travelProds.url = '/EmarketService/WebService/product/getByMcc?mcc=4722&review=3&first=0&max=25';
			travelProds.fetch({
				success : function(items, response, options){
					var travelProdViews = new ProductViews({collection:items});
					$('.travel_product #products').append(travelProdViews.render());
				}
			});
		},
		/* function to fetch views for #Fashion */
		fetchFashion : function(){
			var fashionProds = new Products();
			fashionProds.url = '/EmarketService/WebService/product/getByMcc?mcc=4722&review=3&first=0&max=25';
			fashionProds.fetch({
				success : function(items, response, options){
					var fashionProdViews = new ProductViews({collection:items});
					$('.fashion_product #products').append(fashionProdViews.render());
				}
			});
		},
		/* function to fetch views for #Living */
		fetchLiving : function(){
			var livingProds = new Products();
			livingProds.url = '/EmarketService/WebService/product/getByMcc?mcc=4722&review=3&first=0&max=25';
			livingProds.fetch({
				success:function(items, response, options){
					var livingProdViews = ProductViews({collection:items});
					$('.living_product #products').append(livingProdViews.render());
				}
			});
		},
		/* function to fetch company information */
		fetchInfo : function(){
			
		},
		getProduct : function(mc,id){
			var product = new Product();
			product.url ='/EmarketService/WebService/product/get/'+mc+'/'+id;
			product.fetch();
			var productDetailView = new ProductDetailView({model:product});
			$('#pageContent').append(productDetailView.render());
		}
	};
	
});