define([
	"./base",
  "skylark-langx/Evented"	
],function(base){

	var Addon = Evented.inherit({

		_construct : function(widget,options) {
			this._widget = widget;
			this._options = options;
		}

	});

	return base.Addon = Addon;

});