/**
 * skylark-widgets-base - The skylark widget base library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/Evented","./base","./ActionManager"],function(t,i,e){var n=t.inherit({klassName:"Action",category:{get:function(){return this._options.category}},checked:{get:function(){return this._options.checked}},icon:{get:function(){return this._options.icon}},text:{get:function(){return this._options.text},set:function(t){this._options.text!==t&&(this._options.text=t,this.trigger("checkingDisabled"),this._setDisabled&&this._setDisabled())}},name:{get:function(){return this._name}},shortcut:{get:function(){return this._options.shortCut}},tooltip:{get:function(){return this._options.tooltip}},disabled:{get:function(){return this._options.disabled},set:function(t){this._options.disabled!==t&&(this._options.disabled=t,this._setDisabled&&this._setDisabled())}},execute:function(){this._execute&&this._execute(),this.trigger("executed")},disabled:function(t){var i=this.trigger("checkingDisabled");return!i||!i.result},shouldShow:function(t){var i=this.trigger("checkingHidden");return!i||!i.result},option:function(t){return this._options[t]},init:function(t,i){this._name=t,this._options=i||{}}});return i.Action=n});
//# sourceMappingURL=sourcemaps/Action.js.map
