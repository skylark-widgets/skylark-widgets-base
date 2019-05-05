/**
 * skylark-ui-commands - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-ui-commands/commands',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("ui.commands",{});
});
define('skylark-ui-commands/Command',[
	"skylark-langx/Evented",
	"./commands"
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



define('skylark-ui-commands/Manager',[
	"skylark-langx/Evented"
], function(Evented){

	var Manager = Evented.inherit({
		"klassName"		:	"Manager",


		addAction : function(category,name,fn,options) {

		},

		executeAction : function() {

		},

		removeAction : function(category,name) {

		}

	});

	return Manager;

});


define('skylark-ui-commands/main',[
	"./commands",
	"./Command",
	"./Manager"
],function(commands){
	return commands;
});
define('skylark-ui-commands', ['skylark-ui-commands/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-ui-commands.js.map
