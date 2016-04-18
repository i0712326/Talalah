/**
 * 
 */
define(['jquery','underscore','backbone'],function($, _, Backbone){
	
	var GreetModel = Backbone.Model.extend({});
	
	var View1 = Backbone.View.extend({
		   
	    initialize: function() {
	        this.render();
	    },

	    render: function() {
	        this.$el.html(this.model.get('Message') + " from the View 1"); 
	        return this;
	    }
	});

	var View2 = Backbone.View.extend({
	   
	    initialize: function() {
	        this.render();
	    },

	    render: function() {
	        this.$el.html(this.model.get('Message') + " from the View 2"); 
	        return this;
	    }
	});

	var View3 = Backbone.View.extend({
	    
	    initialize: function() {
	        this.render();
	    },

	    render: function() {
	        this.$el.html(this.model.get('Message') + " from the View 3"); 
	        return this;
	    }
	});
	
	var ContainerView = Backbone.View.extend({
	     myChildView: null,
	     
	     render: function() {
	        this.$el.html("Greeting Area"); 

	        this.$el.append(this.myChildView.$el); 
	        return this;
	    }
	});
	
	
	var greeting = new GreetModel({ Message: "Hello world" });

	var container = new ContainerView({ el: $("#AppContainer"), model: greeting });
	
	var AppRouter = Backbone.Router.extend({
		greeting: null,
	    container: null,
	    view1: null,
	    view2: null,
	    view3: null,
	    
	    initialize: function() {
	        this.greeting = new GreetModel({ Message: "Hello world" });
	        this.container = new ContainerView({ el: $("#AppContainer"), model: this.greeting });
	    },

	    routes: {
	        "": "handleRoute1",
	        "view1": "handleRoute1",
	        "view2": "handleRoute2",
	        "view3": "handleRoute3",
	        "view1/:id":"handleRouteParam"
	    },

	    handleRoute1: function () {
	        if (this.view1 == null) {
	            this.view1 = new View1({ model: this.greeting });
	        }
	        this.container.myChildView = this.view1;
	        this.container.render();
	    },

	    handleRoute2: function () {
	        if (this.view2 == null) {
	            this.view2 = new View2({ model: this.greeting });
	        }

	        this.container.myChildView = this.view2;
	        this.container.render();
	    },

	    handleRoute3: function () {
	        if (this.view3 == null) {
	            this.view3 = new View3({ model: this.greeting });
	        }

	        this.container.myChildView = this.view3;
	        this.container.render();
	    },
	    
	    handleRouteParam:function(id){
	    	 if (this.view1 == null) {
	    		 	this.greeting.set("Message","This another hello world "+id);
		            this.view1 = new View1({ model: this.greeting });
		        }
		        this.container.myChildView = this.view1;
		        this.container.render();
	    }
	});
	
	return {
		start:function(){
			var appRouter = new AppRouter();
			Backbone.history.start();
		}
	}
});