/**
 * skylark-widgets-base - The skylark widget base library.
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
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-widgets-base/base',[
	"skylark-langx/skylark"
],function(skylark){
	return skylark.attach("widgets.base",{});
});
define('skylark-langx-numbers/Vector2',[
	"./numbers"
] ,function(numbers) {


	function Vector2( x, y ) {

		this.x = x || 0;
		this.y = y || 0;

	}

	Object.defineProperties( Vector2.prototype, {

		"width": {

			get: function () {

				return this.x;

			},

			set: function ( value ) {

				this.x = value;

			}

		},

		"height": {

			get: function () {

				return this.y;

			},

			set: function ( value ) {

				this.y = value;

			}

		}

	} );

	Object.assign( Vector2.prototype, {

		set: function ( x, y ) {

			this.x = x;
			this.y = y;

			return this;

		},

		setScalar: function ( scalar ) {

			this.x = scalar;
			this.y = scalar;

			return this;

		},

		setX: function ( x ) {

			this.x = x;

			return this;

		},

		setY: function ( y ) {

			this.y = y;

			return this;

		},


		clone: function () {

			return new this.constructor( this.x, this.y );

		},

		copy: function ( v ) {

			this.x = v.x;
			this.y = v.y;

			return this;

		},

		add: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
				return this.addVectors( v, w );

			}

			this.x += v.x;
			this.y += v.y;

			return this;

		},

		addScalar: function ( s ) {

			this.x += s;
			this.y += s;

			return this;

		},

		addVectors: function ( a, b ) {

			this.x = a.x + b.x;
			this.y = a.y + b.y;

			return this;

		},

		addScaledVector: function ( v, s ) {

			this.x += v.x * s;
			this.y += v.y * s;

			return this;

		},

		sub: function ( v, w ) {

			if ( w !== undefined ) {

				console.warn( 'Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
				return this.subVectors( v, w );

			}

			this.x -= v.x;
			this.y -= v.y;

			return this;

		},

		subScalar: function ( s ) {

			this.x -= s;
			this.y -= s;

			return this;

		},

		subVectors: function ( a, b ) {

			this.x = a.x - b.x;
			this.y = a.y - b.y;

			return this;

		},

		multiply: function ( v ) {

			this.x *= v.x;
			this.y *= v.y;

			return this;

		},

		multiplyScalar: function ( scalar ) {

			this.x *= scalar;
			this.y *= scalar;

			return this;

		},

		divide: function ( v ) {

			this.x /= v.x;
			this.y /= v.y;

			return this;

		},

		divideScalar: function ( scalar ) {

			return this.multiplyScalar( 1 / scalar );

		},

		applyMatrix3: function ( m ) {

			var x = this.x, y = this.y;
			var e = m.elements;

			this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
			this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

			return this;

		},

		min: function ( v ) {

			this.x = Math.min( this.x, v.x );
			this.y = Math.min( this.y, v.y );

			return this;

		},

		max: function ( v ) {

			this.x = Math.max( this.x, v.x );
			this.y = Math.max( this.y, v.y );

			return this;

		},

		clamp: function ( min, max ) {

			// assumes min < max, componentwise

			this.x = Math.max( min.x, Math.min( max.x, this.x ) );
			this.y = Math.max( min.y, Math.min( max.y, this.y ) );

			return this;

		},

		clampScalar: function ( minVal, maxVal ) {

			this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
			this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

			return this;

		},

		clampLength: function ( min, max ) {

			var length = this.length();

			return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

		},

		floor: function () {

			this.x = Math.floor( this.x );
			this.y = Math.floor( this.y );

			return this;

		},

		ceil: function () {

			this.x = Math.ceil( this.x );
			this.y = Math.ceil( this.y );

			return this;

		},

		round: function () {

			this.x = Math.round( this.x );
			this.y = Math.round( this.y );

			return this;

		},

		roundToZero: function () {

			this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
			this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

			return this;

		},

		negate: function () {

			this.x = - this.x;
			this.y = - this.y;

			return this;

		},

		dot: function ( v ) {

			return this.x * v.x + this.y * v.y;

		},

		cross: function ( v ) {

			return this.x * v.y - this.y * v.x;

		},

		lengthSq: function () {

			return this.x * this.x + this.y * this.y;

		},

		length: function () {

			return Math.sqrt( this.x * this.x + this.y * this.y );

		},

		manhattanLength: function () {

			return Math.abs( this.x ) + Math.abs( this.y );

		},

		normalize: function () {

			return this.divideScalar( this.length() || 1 );

		},

		angle: function () {

			// computes the angle in radians with respect to the positive x-axis

			var angle = Math.atan2( - this.y, - this.x ) + Math.PI;

			return angle;

		},

		distanceTo: function ( v ) {

			return Math.sqrt( this.distanceToSquared( v ) );

		},

		distanceToSquared: function ( v ) {

			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;

		},

		manhattanDistanceTo: function ( v ) {

			return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

		},

		setLength: function ( length ) {

			return this.normalize().multiplyScalar( length );

		},

		lerp: function ( v, alpha ) {

			this.x += ( v.x - this.x ) * alpha;
			this.y += ( v.y - this.y ) * alpha;

			return this;

		},

		lerpVectors: function ( v1, v2, alpha ) {

			return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );

		},

		equals: function ( v ) {

			return ( ( v.x === this.x ) && ( v.y === this.y ) );

		},

		fromArray: function ( array, offset ) {

			if ( offset === undefined ) offset = 0;

			this.x = array[ offset ];
			this.y = array[ offset + 1 ];

			return this;

		},

		toArray: function ( array, offset ) {

			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;

			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;

			return array;

		},


		rotateAround: function ( center, angle ) {

			var c = Math.cos( angle ), s = Math.sin( angle );

			var x = this.x - center.x;
			var y = this.y - center.y;

			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;

			return this;

		}

	} );


	return numbers.Vector2 = Vector2 ;
});

define('skylark-widgets-base/SkinManager',[
],function(){	
	"use strict";

	function SkinManager(){}

	var list = [],
		skins = [];

	//Add skin to list
	function register(skin, name) {
		list.push(name);
		skins[name] = skin;
	}

	//Get a skin instance
	function get(name) {
		if (!name) {
			name = list[0];
		}
		return new skins[name]();
	};

	function getList() {
		return list.slice();
	}

	return {
		register,
		get,
		getList
	};
});
define('skylark-widgets-base/Widget',[
  "skylark-langx-ns",
  "skylark-langx-types",
  "skylark-langx-objects",
  "skylark-langx-events",
  "skylark-langx-numbers/Vector2",
  "skylark-domx-browser",
  "skylark-domx-data",
  "skylark-domx-eventer",
  "skylark-domx-noder",
  "skylark-domx-files",
  "skylark-domx-geom",
  "skylark-domx-velm",
  "skylark-domx-query",
  "skylark-domx-fx",
  "skylark-domx-plugins",
  "skylark-data-collection/HashMap",
  "./base",
  "./SkinManager"
],function(skylark,types,objects,events,Vector2,browser,datax,eventer,noder,files,geom,elmx,$,fx, plugins,HashMap,base,SkinManager){

/*---------------------------------------------------------------------------------*/

  var Widget = plugins.Plugin.inherit({
    klassName: "Widget",

    _construct : function(parent,elm,options) {
        if (parent && !(parent instanceof Widget)) {
           options = elm;
           elm = parent;
           parent = null;
        }
        if (types.isHtmlNode(elm)) {
          options = this._parse(elm,options);
        } else {
          options = elm;
          elm = null;
        }
        if (types.isString(options)) {
          options = {
            tagName : options
          };
        }
        this.overrided(elm,options);

        if (!elm) {
          this._velm = this._create();
          this._elm = this._velm.elm();
        } else {
          this._velm = this.elmx(this._elm);
        }
        
        Object.defineProperty(this,"state",{
          value :this.options.state || new HashMap()
        });

        /** 
         * True if the element is visible.
         *
         * @attribute visible
         * @type {Boolean}
         */
        this.visible = true;
        
        /**
         * Size of this component in px.
         *
         * @attribute size
         * @type {Vector2}
         */
        this.size = new Vector2(0, 0);
        
        /**
         * Location of this component relatively to its parent in px.
         *
         * @attribute location
         * @type {Vector2}
         */
        this.location = new Vector2(0, 0);

        /**
         * Locationing mode, indicates how to anchor the component.
         *
         * @attribute mode
         * @type {Number}
         */
        this._mode = Widget.TOP_LEFT;

        //this.state = this.options.state || new Map();
        this._init();

        var addonCategoryOptions = this.options.addons;
        if (addonCategoryOptions) {
          var widgetCtor = this.constructor,
              addons = widgetCtor.addons;
          for (var categoryName in addonCategoryOptions) {
              for (var i =0;i < addonCategoryOptions[categoryName].length; i++ ) {
                var addonOption = addonCategoryOptions[categoryName][i];
                if (types.isString(addonOption)) {
                  var addonName = addonOption,
                      addonSetting = addons[categoryName][addonName],
                      addonCtor = addonSetting.ctor ? addonSetting.ctor : addonSetting;

                  this.addon(addonCtor,addonSetting.options);

                }

              }
          }
        }

        if (parent) {
          this.parent(parent);
        }
        //if (this._elm.parentElement) {
        //  // The widget is already in document
        //  this._startup();
        //}
    },

    /**
     * Parses widget options from attached element.
     * This is a callback method called by constructor when attached element is specified.
     * @method _parse
     * @return {Object} options.
     */
    _parse : function(elm,options) {
      var optionsAttr = datax.data(elm,"options");
      if (optionsAttr) {
         //var options1 = JSON.parse("{" + optionsAttr + "}");
         var options1 = eval("({" + optionsAttr + "})");
         options = objects.mixin(options1,options); 
      }
      return options || {};
    },

    /**
     * Create html element for this widget.
     * This is a callback method called by constructor when attached element is not specified.
     * @method _create
     */
    _create : function() {
        var template = this.options.template;
        if (template) {
          return this.elmx(template);
        } else {
          var tagName = this.options.tagName;
          if (tagName) {
            return this.elmx(noder.createElement(tagName,{
              style : {
                position : "absolute",
                overflow : "hidden"
              }
            }))
          } else {
            throw new Error("The template or tagName is not existed in options!");
          }
        }
    },


    /**
     * Init widget.
     * This is a callback method called by constructor.
     * @method _init
     */
    _init : function() {
      var self = this;
      if (this.widgetClass) {
        this._velm.addClass(this.widgetClass);
      }
      this.state.on("changed",function(e,args) {
        self._refresh(args.data);
      });
    },


    /**
     * Startup widget.
     * This is a callback method called when widget element is added into dom.
     * @method _post
     */
    _startup : function() {

    },

    /**
     * Update the location of this widget.
     * 
     * @method updateLocation
     */
    _updateLocation : function(mode) {
      if(mode !== undefined) {
        this._mode = mode;
      }

      if(this._mode === Widget.TOP_LEFT || this._mode === Widget.TOP_RIGHT) {
        this._elm.style.top = this.location.y + "px";
      } else {
        this._elm.style.bottom = this.location.y + "px";
      }

      if(this._mode === Widget.TOP_LEFT || this._mode === Widget.BOTTOM_LEFT) {
        this._elm.style.left = this.location.x + "px";
      } else {
        this._elm.style.right = this.location.x + "px";
      }
    },

    /**
     * Update the size of this widget.
     * 
     * @method updateSize
     */
    updateSize : function(){
      this._elm.style.width = this.size.x + "px";
      this._elm.style.height = this.size.y + "px";
    },

    /**
     * Update the visibility of this widget.
     *
     * @method updateVisibility
     */
    updateVisibility : function() {
      this._elm.style.display = this.visible ? "block" : "none";
    },


    /**
     * Refresh widget.
     * This is a callback method called when widget state is changed.
     * @method _refresh
     */
    _refresh : function(updates) {
      /*
      var _ = this._,
          model = _.model,
          dom = _.dom,
          props = {

          };
      updates = updates || {};
      for (var attrName in updates){
          var v = updates[attrName].value;
          if (v && v.toCss) {
              v.toCss(props);
              updates[attrName].processed = true;
          }

      };

      this.css(props);

      if (updates["disabled"]) {
          var v = updates["disabled"].value;
          dom.aria('disabled', v);
          self.classes.toggle('disabled', v);
      }
      */
    },                

    mapping : {
      "events" : {
  //       'mousedown .title':  'edit',
  //       'click .button':     'save',
  //       'click .open':       function(e) { ... }            
      },

      "attributs" : {

      },

      "properties" : {

      },

      "styles" : {

      }
    },

    addon : function(ctor,setting) {
      var categoryName = ctor.categoryName,
          addonName = ctor.addonName;

      this._addons = this.addons || {};
      var category = this._addons[categoryName] = this._addons[categoryName] || {};
      category[addonName] = new ctor(this,setting);
      return this;
    },

    addons : function(categoryName,settings) {
      this._addons = this.addons || {};
      var category = this._addons[categoryName] = this._addons[categoryName] || {};

      if (settings == undefined) {
        return objects.clone(category || null);
      } else {
        objects.mixin(category,settings);
      }
    },


    /**
     * Returns a html element representing the widget.
     *
     * @method render
     * @return {HtmlElement} HTML element representing the widget.
     */
    render: function() {
      return this._elm;
    },



    /**
     * Returns a parent widget  enclosing this widgets, or null if not exist.
     *
     * @method getEnclosing
     * @return {Widget} The enclosing parent widget, or null if not exist.
     */
    getEnclosing : function(selector) {
      return null;
    },

    /**
     * Returns a widget collection with all enclosed child widgets.
     *
     * @method getEnclosed
     * @return {List} Collection with all enclosed child widgets..
     */
    getEnclosed : function() {
      var self = this;
          children = new ArrayList();
      return children;
    },


    getSkin : function() {
      return SkinManager.get();
    },

    /**
     * Sets the visible state to true.
     *
     * @method show
     * @return {Widget} Current widget instance.
     */

    show : function() {
      this._velm.show();
    },

    /**
     * Sets the visible state to false.
     *
     * @method hide
     * @return {Widget} Current widget instance.
     */
    hide : function() {
      this._velm.hide();
    },

    /**
     * Focuses the current widget.
     *
     * @method focus
     * @return {Widget} Current widget instance.
     */
    focus :function() {
      try {
        this._velm.focus();
      } catch (ex) {
        // Ignore IE error
      }

      return this;
    },

    /**
     * Blurs the current widget.
     *
     * @method blur
     * @return {Widget} Current widget instance.
     */
    blur : function() {
      this._velm.blur();

      return this;
    },

    enable: function () {
      this.state.set('disabled',false);
      return this;
    },

    disable: function () {
      this.state.set('disabled',true);
      return this;
    },


    /** 
     * Add a CSS class to the base DOM element of this Element.
     * 
     * @method addClass
     * @param {String} name Name of the class to be added.
     */
    addClass : function(name){
      this._velm.addClass(name);
      return this;
    },

    /** 
     * Remove a CSS class from the base DOM element of this Element.
     * 
     * @method removeClass
     * @param {String} name Name of the class to be removed.
     */
    removeClass: function(name) {
      this._velm.removeClass(name);
      return this;
    },

    /**
     * Sets the specified aria property.
     *
     * @method aria
     * @param {String} name Name of the aria property to set.
     * @param {String} value Value of the aria property.
     * @return {Widget} Current widget instance.
     */
    aria : function(name, value) {
      const self = this, elm = self.getEl(self.ariaTarget);

      if (typeof value === 'undefined') {
        return self._aria[name];
      }

      self._aria[name] = value;

      if (self.state.get('rendered')) {
        elm.setAttribute(name === 'role' ? name : 'aria-' + name, value);
      }

      return self;
    },

    attr: function (name,value) {
        var velm = this._velm,
            ret = velm.attr(name,value);
        return ret == velm ? this : ret;
    },

    getAttr : function(name) {
      return this._velm.attr(name);
    },

    setAttr : function(name,value) {
      this._velm.attr(name,value);
      return this;
    },


    /**
     * Calculate the location of the container to make it centered.
     *
     * Calculated relatively to its parent size.
     * 
     * @method center
     */
    center : function() {
      this.location.set((this.parent.size.x - this.size.x) / 2, (this.parent.size.y - this.size.y) / 2);
    },

    css: function (name, value) {
        var velm = this._velm,
            ret = velm.css(name, value);
        return ret == velm ? this : ret;
    },

    getStyle : function(name) {
      return this._velm.css(name);
    },

    setStyle : function(name,value) {
      this._velm.css(name,value);
      return this;
    },

    data: function (name, value) {
        var velm = this._velm,
            ret = velm.data(name,value);
        return ret == velm ? this : ret;
    },


    getData : function(name) {
      return this._velm.data(name);
    },

    setData : function(name,value) {
      this._velm.data(name,value);
      return this;
    },


    parent : function(parent) {
      if (parent) {
        this._parent = parent;
        this.attach(parent._elm);
      } else {
        return this._parent;
      }
    },

    getParent : function() {
      return this._parent;
    },

    setParent : function(parent) {
      this._parent = parent;
      this.attach(parent._elm);
      return this;
    },


    prop: function (name,value) {
        var velm = this._velm,
            ret = velm.prop(name,value);
        return ret == velm ? this : ret;
    },

    getProp : function(name) {
      return this._velm.prop(name);
    },

    setProp : function(name,value) {
      this._velm.prop(name,value);
      return this;
    },

    throb: function(params) {
      return fx.throb(this._elm,params);
    },

    emit : function(type,params) {
      var e = events.createEvent(type,{
        data : params
      });
      return events.Emitter.prototype.emit.call(this,e,params);
    },

    /**
     * Update component appearance.
     * 
     * Should be called after changing size or location.
     *
     * Uses the updateVisibility and if the element is visible calls the updateSize and updateLocation (in this order) methods to update the interface.
     * 
     * @method update
     */
    update : function() {
      this._updateVisibility();

      if(this.visible) {
        this._updateSize();
        this._updateLocation();
      }
    },


    /**
     *  Attach the current widget element to dom document.
     *
     * @method attach
     * @return {Widget} This Widget.
     */
    attach : function(target,position){
        var elm = target;
        if (!position || position=="child") {
            noder.append(elm,this._elm);
        } else  if (position == "before") {
            noder.before(elm,this._elm);
        } else if (position == "after") {
            noder.after(elm,this._elm);
        }
        this._startup();
    },

    /**
     *  Detach the current widget element from dom document.
     *
     * @method html
     * @return {HtmlElement} HTML element representing the widget.
     */
    detach : function() {
      this._velm.remove();
    }
  });

  /**
   * Top-left locationing.
   *
   * @static
   * @attribute TOP_LEFT
   * @type {Number}
   */
  Widget.TOP_LEFT = 0;

  /**
   * Top-right locationing.
   *
   * @static
   * @attribute TOP_RIGHT
   * @type {Number}
   */
  Widget.TOP_RIGHT = 1;

  /**
   * Bottom-left locationing.
   *
   * @static
   * @attribute BOTTOM_LEFT
   * @type {Number}
   */
  Widget.BOTTOM_LEFT = 2;

  /**
   * Bottom-right locationing.
   *
   * @static
   * @attribute BOTTOM_RIGHT
   * @type {Number}
   */
  Widget.BOTTOM_RIGHT = 3;

  Widget.inherit = function(meta) {
    var ctor = plugins.Plugin.inherit.apply(this,arguments);

    function addStatePropMethod(name) {
        ctor.prototype[name] = function(value) {
          if (value !== undefined) {
            this.state.set(name,value);
            return this;
          } else {
            return this.state.get(name);
          }
        };
    }
    if (meta.state) {
      for (var name in meta.state) {
          addStatePropMethod(name);
      }
    }

    if (meta.pluginName) {
      plugins.register(ctor,meta.pluginName);
    }
    return ctor;
  };

  Widget.register = function(ctor,widgetName) {
    var meta = ctor.prototype,
        pluginName = widgetName || meta.pluginName;

    function addStatePropMethod(name) {
        ctor.prototype[name] = function(value) {
          if (value !== undefined) {
            this.state.set(name,value);
            return this;
          } else {
            return this.state.get(name);
          }
        };
    }
    if (meta.state) {
      for (var name in meta.state) {
          addStatePropMethod(name);
      }
    }

    if (pluginName) {
      plugins.register(ctor,pluginName);
    }
    return ctor;
  };

  return base.Widget = Widget;
});

define('skylark-widgets-base/SkinDark',[
	"./SkinManager"
],function(SkinManager){	
	"use strict";

	function SkinDark() {
		this.font = "Arial";

		//Color
		this.barColor = "#222222";
		this.sepColor = "#292929";
		this.panelColor = "#333333";
		this.resizeTabColor = "#222222";
		this.boxColor = "#444444";
		this.textColor = "#FFFFFF";
		this.iconColor = "#FFFFFF";

		//Button
		this.buttonColor = "#222222";
		this.buttonOverColor = "#555555";
		this.buttonLightColor = "#333333";
		
		//Audio player
		this.audioTrack = "#222222";
		this.audioScrubber = "#FFFFFF";
		this.audioProgress = "#555555";

		//Body
		document.body.style.fontFamily = this.font;
		document.body.style.color = this.textColor;
		document.body.style.fontSize = "12px";
	}

	SkinManager.register(SkinDark, "dark");

	return SkinDark;
});

define('skylark-widgets-base/main',[
	"./base",
	"./Widget",
	"./SkinManager",
	"./SkinDark"
],function(base){
	return base;
});
define('skylark-widgets-base', ['skylark-widgets-base/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-widgets-base.js.map
