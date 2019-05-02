define([
	"skylark-langx/Evented",
	"qscript/lang/Event"
], function(Evented,Event){
    var ActionCheckingEvent = Class.declare({
        "-parent-": Event,
        "-public-": {
            "-attributes-": {
                "context"  :   {
                    // the attribute name which is changed
                    "type"  :   Object
                },
                "result" : {
                	"type" : Object,
                	"writable" : true
                }       
            }
        }
    });

	var Action = Evented.inherit({
		"klassName" : "Action",

		"category" : {
			//desc : "Group or category where the action belongs.",
			//type : String
			get : function() {
				return this._category;
			}
		},

		"checked" : {
			//desc : "Indicates whether client controls and menu items appear checked.",
			//type : Boolean
			get : function() {
				return this._checked;
			}
		},

		"iconClass" : {
			//desc : "Represents the icon class of the action.",
			//type : String
			get : function() {
				return this._iconClass;
			}
		},

		"label" : {
			//desc : "Represents the caption of the action.",
			//type : String
			get : function() {
				return this._label;
			}
		},

		"shortCut" : {
			//desc : "Shortcut that triggers the action.",
			//type : String
			get : function() {
				return this._shortCut;
			}
		},
		"tooltip" : {
			//desc : "Stores the Help hint text.",
			//type : String
			get : function() {
				return this._tooltip;
			}
		},

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
		"init":	 function(params){
			this._setupAttributeValues(params);
		}
	
	});
	
	return Action;
});


