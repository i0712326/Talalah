define([
        'jquery', 'underscore', 'backbone',
        'text!/EmarketWeb/template/merchant/myStore.html',
        'text!/EmarketWeb/template/merchant/myProduct.html'], 
        function($,_,Backbone, myStore, myProduct){
	
	/*Product Model and View */
	var ProductModel = Backbone.Model.extend({});
	var ProductModels = Backbone.Collection.extend({
		url:'/EmarketService/WebService/product/get?first=1&max=30',
		model:ProductModel
	});
	var ProductView = Backbone.View.extend({
		className:'productItemClass',
		template:_.template($(myProduct).html()),
		render : function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var ProductViews = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function (item) {
           	 	var productView = new productView({model: item});
                this.$el.append(merchantCodeView.render());
				}, this);
			return this.$el;
		}
	});
	
	/* Merchant Model and View */
	var MerchantModel = Backbone.Model.extend({
		urlRoot:'http://localhost:8080/EmarketService/WebService/Merchant/get'
	});
	
	var MerchantView = Backbone.Model.extend({
		className:'merchantInfo',
		template:_.template($(merchantTemp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSoN()));
		}
	});
	
	/* Payment Model and View */
	
	var Payment = Backbone.Model.extend({});
	
	var Shipping = Backbone.Model.extend({});
	
	var Order = Backbone.Model.extend({});
	
	var MyStoreRouter = Backbone.Router.extend({
		routes:{
			'':'start',
			'Product/Add':'addProduct',
			'Product/Search':'searchProduct',
			'Product/Edit':'editProduct',
			'Product/Delete':'deleteProduct',
			'Account/Payment':'paymentAccount',
			'Account/History':'historyAccount',
			'Order/Incoming':'incomingOrder',
			'Order/OutGoing':'outGoingOrder',
			'Shipping/Shipped':'shippedShipping',
			'Shipping/Unshipped':'unshippedShipping'
		},
		start:function(){
			
		},
		addProduct : function(){
			
		},
		searchProduct:function(){
			
		},
		editProduct:function(){
			
		},
		deleteProduct:function(){
			
		},
		paymentAccount:function(){
			
		},
		historyAccount:function(){
			
		},
		incomingOrder:function(){
			
		},
		outGoingOrder:function(){
			
		},
		shippedShipping : function(){},
		unshippedShipping : function(){}
	});
	
	
});