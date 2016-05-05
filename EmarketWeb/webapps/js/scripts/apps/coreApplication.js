/*****
 * 
 * Core Application for client communicate with server for requesting data.
 * 
 *****/
define(['jquery', 'underscore', 'backbone','handlebars','backboneRelational', 
        '/EmarketWeb/js/lib/easyzoom.min.js',
        'text!/EmarketWeb/template/product/product.html',
        'text!/EmarketWeb/template/product/detail.html',
        'text!/EmarketWeb/template/product/productImages.html',
        'text!/EmarketWeb/template/product/comment.html',
        'text!/EmarketWeb/template/product/productList.html'
        ],
		function($, _, Backbone, Handlebars, BackboneRelation, easyZoom, temp, detail, prodImg, commentTemp, prdList) {

	/**
	 * 
	 *  Product Model, Collection, View 
	 *  
	 *  */
	// Merchant Model
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
	
	// Model product
	var Product = Backbone.RelationalModel.extend({
		urlRoot:'/EmarketService/WebService/product/get'
	});
	// Product image
	var ProductImg = Backbone.Model.extend({});
	var ProductImgs = Backbone.Collection.extend({
		model:ProductImg
	});
	// Comment
	var Comment = Backbone.Model.extend({});
	var Comments = Backbone.Collection.extend({
		model:Comment
	});
	
	// Collection of Product
	var Products = Backbone.Collection.extend({model:Product});
	
	// View and View's collection
	
	var ProductImgView = Backbone.View.extend({
		className :'product_option',
		template : Handlebars.compile($(prodImg).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events : {
			'click':'showImg'
		},
		showImg : function(e){
			var model = this.model.toJSON();
			var product = model.product;
			var picName = model.picName;
			var img = '/EmarketWeb/content/'+product.merchant.merchantCode.mcc+'/'+product.merchant.mcId+'/'+product.id+'/'+picName;
			var pic = document.getElementById('prodImg');
			pic.src = img;
			var largeImg = document.getElementById('largeImg');
			largeImg.href = img;
		}
	});
	
	var ProductImgsView = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function (item) {
           	 	var productImgView = new ProductImgView({model: item});
                this.$el.append(productImgView.render());
				}, this);
			return this.$el;
		}
	});
	
	// product view
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
			var prd  = prod.toJSON();
			var id	 = prod.id;
			var mcc  = prd.merchant.merchantCode.mcc;
			var productDetailView = new ProductDetailView({model:prod});
			$('#pageContent').html(productDetailView.render());
			var prodImgs = new ProductImgs();
			prodImgs.url = '/EmarketService/WebService/productImg/get?id='+prd.id;
			prodImgs.fetch({
				success:function(items, response, option){
					var prodImgsView = new ProductImgsView({collection:items});
					$('#prdImgs').append(prodImgsView.render());
				}
			});
			var relatedProds = new Products();
			relatedProds.url = '/EmarketService/WebService/product/getByMcc?mcc='+prd.merchant.merchantCode.mcc+'&review=3&first=0&max=10';
			relatedProds.fetch({
				success:function(items,response, option){
					var prodViews = new ProductViews({collection:items});
					$('.row #relatedItem').append(prodViews.render());
				}
			});
			
			var comments = new Comments();
			comments.url = '/EmarketService/WebService/comment/get?id='+prd.id+'&first=0&max=10';
			comments.fetch({
				success:function(items, response, option){
					var commentViews = new CommentViews({collection:items});
					$('.row #custReview').append(commentViews.render());
				}
			});
			Backbone.history.navigate('#Product/'+mcc+"/"+prd.merchant.mcId+"/"+prd.id);
			$('a.zoom').easyZoom();
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
	
	var ProductListView = Backbone.View.extend({
		className:'product-block',
		template : Handlebars.compile($(prdList).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductListViews = Backbone.View.extend({
		render : function(){
			_.each(this.collection.models, function(item){
				var productListView = new ProductListView({model:item});
				this.$el.append(productListView.render());
			}, this);
			return this.$el;
		}
	});
	
	// comment view and views
	
	var CommentView = Backbone.View.extend({
		className : 'row comment-block',
		template : Handlebars.compile($(commentTemp).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var CommentViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function (item) {
           	 	var commentView = new CommentView({model: item});
                this.$el.append(commentView.render());
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
		getProduct : function(mcc,mcId,pid){
			var prod = new Product();
			prod.set('id',pid);
			prod.fetch({
				success:function(item, response, option){
					var productDetailView = new ProductDetailView({model:prod});
					$('#pageContent').html(productDetailView.render());
				}
			});
			
			var prodImgs = new ProductImgs();
			prodImgs.url = '/EmarketService/WebService/productImg/get?id='+pid;
			prodImgs.fetch({
				success:function(items, response, option){
					var prodImgsView = new ProductImgsView({collection:items});
					$('#prdImgs').append(prodImgsView.render());
				}
			});
			var relatedProds = new Products();
			relatedProds.url = '/EmarketService/WebService/product/getByMcc?mcc='+mcc+'&review=3&first=0&max=10';
			relatedProds.fetch({
				success:function(items,response, option){
					var prodViews = new ProductViews({collection:items});
					$('.row #relatedItem').append(prodViews.render());
				}
			});
			
			var comments = new Comments();
			comments.url = '/EmarketService/WebService/comment/get?id='+pid+'&first=0&max=10';
			comments.fetch({
				success:function(items, response, option){
					var commentViews = new CommentViews({collection:items});
					$('.row #custReview').append(commentViews.render());
				}
			});
		
			//$('a.zoom').easyZoom();
		},
		searchDashView : function(keyVal){
			var products = new Products();
			products.url = '/EmarketService/WebService/product/search/'+keyVal+'/0/30';
			products.fetch({
				success:function(items, response, option){
					var productViews = new ProductViews({collection:items});
					$('#subnavigation').addClass('container');
					$('#searchContent').append(productViews.render());
				}
			});
		},
		searchListView : function(keyVal){
			var products = new Products();
			products.url = '/EmarketService/WebService/product/search/'+keyVal+'/0/30';
			products.fetch({
				success:function(items, response, option){
					var productListViews = new ProductListViews({collection:items});
					$('#subnavigation').addClass('container');
					$('#searchContent').append(productListViews.render());
				}
			});
		}
	};
	
});