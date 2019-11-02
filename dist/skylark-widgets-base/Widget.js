/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-browser","skylark-domx-data","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-domx-velm","skylark-domx-query","skylark-domx-fx","skylark-domx-plugins","skylark-data-collection/HashMap","./base"],function(t,i,e,s,n,r,a,o,h,l,d,u,c){var f=d.Plugin.inherit({klassName:"Widget",_elmx:o,_construct:function(t,e){i.isHtmlNode(t)?e=this._parse(t,e):(e=t,t=null),this.overrided(t,e),t?this._velm=o(this._elm):(this._velm=this._create(),this._elm=this._velm.elm()),Object.defineProperty(this,"state",{value:this.options.state||new u}),this._init();var s=this.options.addons;if(s){var n=this.constructor.addons;for(var r in s)for(var a=0;a<s[r].length;a++){var h=s[r][a];if(i.isString(h)){var l=h,d=n[r][l],c=d.ctor?d.ctor:d;this.addon(c,d.options)}}}},_parse:function(t,e){var n=s.data(t,"options");if(n){var r=JSON.parse("{"+n+"}");e=i.mixin(r,e)}return e||{}},_create:function(){var t=this.options.template;if(t)return this._elmx(t);throw new Error("The template is not existed in options!")},_init:function(){var t=this;this.widgetClass&&this._velm.addClass(this.widgetClass),this.state.on("changed",function(i,e){t._refresh(e.data)})},_startup:function(){},_refresh:function(t){},mapping:{events:{},attributs:{},properties:{},styles:{}},addon:function(t,i){var e=t.categoryName,s=t.addonName;return this._addons=this.addons||{},(this._addons[e]=this._addons[e]||{})[s]=new t(this,i),this},addons:function(t,e){this._addons=this.addons||{};var s=this._addons[t]=this._addons[t]||{};if(void 0==e)return i.clone(s||null);i.mixin(s,e)},render:function(){return this._elm},getEnclosing:function(t){return null},getEnclosed:function(){return children=new ArrayList,children},show:function(){this._velm.show()},hide:function(){this._velm.hide()},focus:function(){try{this._velm.focus()}catch(t){}return this},blur:function(){return this._velm.blur(),this},enable:function(){return this.state.set("disabled",!1),this},disable:function(){return this.state.set("disabled",!0),this},aria:function(t,i){const e=this,s=e.getEl(e.ariaTarget);return void 0===i?e._aria[t]:(e._aria[t]=i,e.state.get("rendered")&&s.setAttribute("role"===t?t:"aria-"+t,i),e)},attr:function(t,i){var e=this._velm,s=e.attr(t,i);return s==e?this:s},css:function(t,i){var e=this._velm,s=e.css(t,i);return s==e?this:s},data:function(t,i){var e=this._velm,s=e.data(t,i);return s==e?this:s},prop:function(t,i){var e=this._velm,s=e.prop(t,i);return s==e?this:s},throb:function(t){return l.throb(this._elm,t)},attach:function(t,i){var e=t;i&&"child"!=i?"before"==i?r.before(e,this._elm):"after"==i&&r.after(e,this._elm):r.append(e,this._elm),this._startup()},detach:function(){this._velm.remove()}});return f.inherit=function(t){var i=d.Plugin.inherit.apply(this,arguments);function e(t){i.prototype[t]=function(i){return void 0!==i?(this.state.set(t,i),this):this.state.get(t)}}if(t.state)for(var s in t.state)e(s);return t.pluginName&&d.register(i,t.pluginName),i},f.register=function(t,i){var e=t.prototype,s=i||e.pluginName;function n(i){t.prototype[i]=function(t){return void 0!==t?(this.state.set(i,t),this):this.state.get(i)}}if(e.state)for(var r in e.state)n(r);return s&&d.register(t,s),t},c.Widget=f});
//# sourceMappingURL=sourcemaps/Widget.js.map
