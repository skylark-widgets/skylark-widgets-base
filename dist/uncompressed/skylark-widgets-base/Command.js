define([
	"skylark-langx/Evented",
	"./CommandManager"
], function(Evented,commands){

	var Command = Evented.inherit({
		"klassName" : "Command",

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

		"label" : {
			//desc : "Represents the caption of the action.",
			//type : String
			get : function() {
				return this._options.label;
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


	    /**
	     * Executes the command. Additional arguments are passed to the executing function
	     *
	     * @return {$.Promise} a  promise that will be resolved when the command completes.
	     */
		execute: function(){
			this.trigger("executed");
		},

        isEnabled: function(context) {
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
		"init":	 function(name,options){
			this._name = name;
			this._options = options || {};
		}
	
	});
	
	return commands.Command = Command;
});


