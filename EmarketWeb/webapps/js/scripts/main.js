requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.3.min',
        underscore: 'lib/underscore-min',
        handlebars:'lib/handlebars-v3.0.1',
        backbone: 'lib/backbone-min',
        backboneRelational:'lib/backbone-relational',
        text:'lib/text'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        backbone_relational:{
        	deps:['jquery','underscore','backbone'],
        	exports:'BackboneRealtional'
        },
        underscore: {
            exports: '_'
        },
        jquery: {
            exports: '$'
        }
    }
});

require([ 'underscore', 'backbone', 'scripts/apps/routerDriven',
		'scripts/apps/merchantCodes','scripts/apps/merchantCrud' ], function(_, Backbone, app, mcc,mcrud) {
	//mcrud.start();
	//app.start();
	mcc.start();
});