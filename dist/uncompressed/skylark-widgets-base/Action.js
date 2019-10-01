define([
	"skylark-langx/Evented",
	"./base",
	"./ActionManager"
], function(Evented, base, ActiionManager){

	var Action = Evented.inherit({
		"klassName" : "Action",

		"category" : {
			//desc : "Group or category where the action belongs.",
			//type : String
			get : function() {
				return this._options.category;
			}
		},

		"checked" : {
			//desc : "Indicates whether client controls and menu items appear checked.",
			//type : Boolean
			get : function() {
				return this._options.checked;
			}
		},

		"icon" : {
			//desc : "Represents the icon class of the action.",
			//type : String
			get : function() {
				return this._options.icon;
			}
		},

		"text" : {
			//desc : "Represents the caption of the action.",
			//type : String
			get : function() {
				return this._options.text;
			},
			set : function(value) {
				if (this._options.text !== value) {
					this._options.text = value;
					this.trigger("checkingDisabled");
					if (this._setDisabled) {
						this._setDisabled();
					}
				}				
			}
		},

		"name" : {
			//desc : "Represents the caption of the action.",
			//type : String
			get : function() {
				return this._name;
			}
		},

		"shortcut" : {
			//desc : "Shortcut that triggers the action.",
			//type : String
			get : function() {
				return this._options.shortCut;
			}
		},
		
		"tooltip" : {
			//desc : "Stores the Help hint text.",
			//type : String
			get : function() {
				return this._options.tooltip;
			}
		},

		"disabled" : {
			//type : Boolean
			get : function() {
				return this._options.disabled;
			},

			set : function(value) {
				if (this._options.disabled !== value) {
					this._options.disabled = value;
					if (this._setDisabled) {
						this._setDisabled();
					}
				}				
			}
		},


	    /**
	     * Executes the command. Additional arguments are passed to the executing function
	     *
	     * @return {$.Promise} a  promise that will be resolved when the command completes.
	     */
		execute: function(){
			if (this._execute) {
				this._execute();
			}
			this.trigger("executed");
		},

        disabled: function(context) {
        	var e = this.trigger("checkingDisabled");
        	if (e && e.result) {
        		return false;
        	} else {
            	return true;
        	}
        },

        shouldShow: function(context) {
        	var e = this.trigger("checkingHidden");
        	if (e && e.result) {
        		return false;
        	} else {
            	return true;
        	}
		},

		option : function(key) {
			return this._options[key];
		},

		"init":	 function(name,options){
			this._name = name;
			this._options = options || {};
		}
	
	});
	
	return base.Action = Action;
});


