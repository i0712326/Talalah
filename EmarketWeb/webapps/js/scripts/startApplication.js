/**
 * 
 */
requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.1.3.min',
        bootstrap:'lib/bootstrap.min',
        underscore: 'lib/underscore-min',
        handlebars:'lib/handlebars-v3.0.1',
        backbone: 'lib/backbone-min',
        backboneRelational:'lib/backbone-relational',
        verify:'lib/verify.notify.min',
        text:'lib/text',
        css:'lib/css.min'
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
        },
        bootstrap:{
        	deps:['jquery'],
        	exports:'Bootstrap'
        },
        verify:{
        	deps:['jquery'],
        	exports:'Verify'
        },
        easy_zoom:{
        	deps:['jquery'],
        	exports:'easyZoom'
        }
    }
});

require([ 'underscore', 'backbone', 'bootstrap', 'scripts/apps/startApp' ], function(_, Backbone,Bootstrap, app) {
	app.start();
});
