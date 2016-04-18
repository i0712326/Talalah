/**
 * Product for Home Page Controller
 */
define(['jquery',
        'underscore',
        'backbone',
        'handlebars',
        'text!scripts/template/product/product.html',
        'text!scripts/template/product/detail.html',
        'text!scripts/template/product/productList.html'],
		function($, _, Backbone, Handlebars, temp, detailTemp, productList){
	
	var Product = Backbone.Model.extend({});
	var Products = Backbone.Collection.extend({model:Product});
	
	var ItemView = Backbone.View.extend({
		className:'row product-block',
		template:Handlebars.compile($(productList).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ItemViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function(item){
				var itemView = new ItemView({model:item});
				this.$el.append(itemView.render());
			}, this);
			return this.$el.html();
		}
	});
	
	var ProductDetailView = Backbone.View.extend({
		template:Handlebars.compile($(detailTemp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductView = Backbone.View.extend({
		className:'col-sm-2 col-lg-2 col-md-2',
		template:Handlebars.compile($(temp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'click' : 'getDetail'
		},
		getDetail:function(e){
			var model = this.model.toJSON();
			var prod = new Product();
			prod.url = "/EmarketService/WebService/product/get/"+model.id;
			prod.fetch({
				success:function(items, response, option){
					Backbone.history.navigate('#Detail/'+model.id);
					var prodDetailView = new ProductDetailView({model:items});
					$('#container').empty();
					$('#container').append(prodDetailView.render());
				}
			});
		}
	});
	
	var ProductViews = Backbone.View.extend({
		className:'row',
		render:function(){
			_.each(this.collection.models, function (item) {
           	 	var productView = new ProductView({model: item});
                this.$el.append(productView.render());
				}, this);
			return this.$el;
		}
	});
	
	return {
		start:function(url){
			var products = new Products();
			products.url = url;
			products.fetch({
				success: function(items, response, options) {
					var productViews = new ProductViews({collection:items});
					$('#content').empty();
					$('#content').html(productViews.render());
					
				}
			})
		},
		searchProduct:function(keyVal){
			var products = new Products();
			products.url = "/EmarketService/WebService/product/search/"+keyVal+"/0/30";
			products.fetch({
				success:function(items,response,options){
					var itemViews = new ItemViews({collection:items});
					$('#container').empty();
					$('#container').html(itemViews.render());
				}
			});
		}
	}
	
});