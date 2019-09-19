define([
	"./base",
  "skylark-langx/Evented"	
],function(base,Evented){

	var Addon = Evented.inherit({

		_construct : function(widget,options) {
			this._widget = widget;
			this._options = options;
			if (this._init) {
				this._init();
			}
		}

	});

	return base.Addon = Addon;

});