define([
  "skylark-langx/langx",	
  "skylark-langx/Evented",
	"./base"
],function(langx,Evented,base){

	var Addon = Evented.inherit({

		_construct : function(widget,options) {
			this._widget = widget;
            Object.defineProperty(this,"options",{
              value :langx.mixin({},this.options,options,true)
            });
			if (this._init) {
				this._init();
			}
		}

	});

	return base.Addon = Addon;

});