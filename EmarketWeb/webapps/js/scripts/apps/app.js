define(['underscore', 'backbone','handlebars'],
function(_, Backbone, Handlebars) {
    
    var Product = Backbone.Model.extend({
    	defaults:{
    		id:'123456',
    		name:'Jame Smith',
    		company:'East India'
    	}
    });
    
    var Products = Backbone.Collection.extend({
    	url:'#',
    	model:Product
    });
    
    var ProductView = Backbone.View.extend({
    	template:Handlebars.compile($('#mcc_template').html()),
    	render:function(){
            return this.$el.html(this.template(this.model.toJSON()));
    	}
    });
    
    var ProductsView = Backbone.View.extend({
    	render:function(){
            _.each(this.collection.models, function (item) {
            	 var productView = new ProductView({model: item});
                 this.$el.append(productView.render());
            }, this);
            return this.$el;
    	}
    });
    
    return {
        start: function() {
        	
        	var product1 = new Product();	
        	var product2 = new Product();
        	var product3 = new Product();
        	var product4 = new Product();
        	var product5 = new Product();
        	var product6 = new Product();
        	var product7 = new Product();
        	
        	product2.set('id','234565');
        	product2.set('name','Adam Trailor');
        	product2.set('company','East London');
        	
        	product3.set('id','345678');
        	product3.set('name','Jame Martin');
        	product3.set('company','West Deliver');
        	
        	product4.set('id','555441');
        	product4.set('name','Allie Stone');
        	product4.set('company','East Commercial');
        	
        	product5.set('id','567441');
        	product5.set('name','Emmy Loiy');
        	product5.set('company','East Commercial');
        	
        	product6.set('id','777445');
        	product6.set('name','Luise Anderson');
        	product6.set('company','North Trading');
        	
        	product7.set('id','777448');
        	product7.set('name','John Anderson');
        	product7.set('company','North Trading');
        	
        	var products = new Products([product1,product2, product3, product4, product5, product6, product7]);
        	products.fetch();
        	console.log(products);
        	var productsView = new ProductsView({collection:products});
        	
            $('#content').append(productsView.render());
            
            
        }
    };
});