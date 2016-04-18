define(['jquery','underscore', 'backbone','handlebars','text!scripts/template/mcc/mcc_template.html'], function($, _, Backbone, Handlebars, temp) {
	
	var MerchantCode = Backbone.Model.extend({});
	
	var MerchantCodes = Backbone.Collection.extend({
		url:'/EmarketService/WebService/mcc/get?first=1&max=30',
		model:MerchantCode
	});
	
	var MerchantCodeView = Backbone.View.extend({
		className:'itemClass',
		template:Handlebars.compile($(temp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		}
	});
	
	var MerchantCodesView = Backbone.View.extend({
		render:function(){
			_.each(this.collection.models, function (item) {
           	 	var merchantCodeView = new MerchantCodeView({model: item});
                this.$el.append(merchantCodeView.render());
				}, this);
			return this.$el;
		}
	});
	
	return {
		start:function(){
			var merchantCodes = new MerchantCodes();
			merchantCodes.fetch({
				success : function(items, response, options) {
					var merchantCodesView = new MerchantCodesView({collection:items});
					$('#content').append(merchantCodesView.render());
				}
			});
			
			
		}
	}
});
