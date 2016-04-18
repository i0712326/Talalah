/**
 * 
 */
define(['jquery','underscore','backbone','backboneRelational','text!scripts/template/mcc/mc_template.html'],function($, _, Backbone, BackboneRelation, temp){
	
	var MerchantCode = Backbone.RelationalModel.extend({
	});
	
	var Merchant = Backbone.RelationalModel.extend({
		url:'/EmarketService/WebService/merchant/save',
		relations:[{
			type:Backbone.HasOne,
			key:'merchantCode',
			relateMode:'MerchantCode'
		}]
	});
	
	var MerchantView = Backbone.View.extend({
		className:'mcClass',
		template:_.template($(temp).html()),
		render:function(){
			return this.$el.html(this.template(this.model.toJSON()));
		},
		events:{
			'click #saveMc':'save'
		},
		save:function(){
			var mcc = new MerchantCode();
			mcc.set("mcc",$('#mcc').val());
			
			var mc = new Merchant({merchantCode:mcc});
			mc.set("mcId",$('#mcid').val());
			mc.set("name",$("#mcna").val());
			mc.set("address",$("#addr").val());
			mc.set("tel",$('#tel').val());
			mc.set("email",$('#email').val());
			mc.set("fax",$('#fax').val());
			
			mc.save();
			
		}
	});
	
	return {
		start:function(){
			var merchant = new Merchant({});
			var merchantView = new MerchantView({model:merchant});
			$('#MerchantView').append(merchantView.render());
		}
	}
});