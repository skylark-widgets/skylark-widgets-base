define([
	"skylark-langx/Evented",
	"./base"
], function(Evented,base){

	var CommandManager = Evented.inherit({
		"klassName"		:	"Manager",


		addAction : function(category,name,fn,options) {

		},

		executeAction : function() {

		},

		removeAction : function(category,name) {

		}

	});

	return base.CommandManager = CommandManager;

});

